const express = require("express");
const db = require("../data/db");

module.exports = express
  .Router()
  .get("/", (request, response) => {
    response.render("export");
  })
  .get("/download", async (request, response) => {
    const result = await db
      .from("ussd_session")
      .innerJoin("zone", "zoneId", "zone.id")
      .orderBy("startDate", "desc")
      .select("ussd_session.*", "zone.name as zoneName");
    response.set('Content-disposition', 'attachment;filename=pics-exported-data.csv');
    response.set("Content-Type", "text/csv");
    if(result.length === 0){
      response.write("");
      response.end();
    } else {
      const header = Object.keys(result[0]).join(",");
      const body = result.map(item => {
        return Object.keys(item).map(key => item[key]).join(",");
      }).join("\n");
      response.write(header + "\n" + body);
      response.end();
    }
  });
