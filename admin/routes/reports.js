const db = require("../data/db");
const express = require("express");
const moment = require("moment");

const sessionTable = "ussd_session";

module.exports = express
  .Router()
  .get("/usage/:type", async(request, response) => {
    const startDate = moment().subtract({months: 1});
    const endDate = moment();
    const days = endDate.diff(startDate, "days");
    const data = Array(days).fill().reduce((data, item, index) => {
      index += 1;
      data[moment().subtract({days: days - index}).format("DD MMM")] = 0;
      return data;
    }, []);
    const result = await db.from(sessionTable)
      .select(db.raw("date(startDate) as `date`"))
      .count({count: "sessionId"})
      .groupBy(db.raw("date(startDate)"))
      .whereRaw("date(startDate) >= date(?)", startDate.format())
      .andWhereRaw("date(startDate) <= date(?)", endDate.format())
      .orderBy("startDate", "asc");
    result.forEach(item => {
      data[moment(item.date).format("DD MMM")] = item.count;
    })
    const json = {
      labels: Object.keys(data),
      data: Object.keys(data).map(item => data[item])
    }
    response.json(json);
  })
  .get("/requests-per-zone", async (request, response) => {
    const result = await db
      .from("zone")
      .leftJoin("ussd_session", "zoneId", "zone.id")
      .groupBy("zone.id")
      .select("zone.*")
      .count({count: "sessionId"});
    const labels = result.map(item => item.name);
    const data = result.map(item => item.count);
    response.json({ labels, data });
  })
  .get("/requests-by-vendor", async (request, response) => {
    const result = await db
      .from("vendor_selection")
      .innerJoin("zone", "vendor_selection.zoneId", "zone.id")
      .innerJoin("vendor", "vendorId", "vendor.id")
      .groupBy("vendorId")
      .select("vendor.*", "zone.name as zoneName")
      .count({requests: 'sessionId'})
      .orderBy("requests", "desc")
      .map(item => {
        return {
          name: item.firstName + " " + item.lastName,
          zone: item.zoneName,
          requests: item.requests
        };
      });
    response.json(result);
  })
  .get("/requests-by-feature", async (request, response) => {
    const features = {
      COUNTERFEIT_INFO: "Couterfeit Info",
      PRICE_INFO: "Price Info",
      ZONE: "Vendor Search",
      null: "Incomplete Sessions",
      INVALID_OPTION: "Invalid Options"
    };

    const result = await db.from(sessionTable)
      .groupBy("selection_level2")
      .select("selection_level2 as feature")
      .count({ count: "sessionId" });
    const labels = result.map(item => features[item.feature]);
    const data = result.map(item => item.count);
    response.json({ labels, data });
  });
