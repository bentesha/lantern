const db = require("./db");
const moment = require("moment");

const sessionTable = "ussd_session";
const requestTable = "ussd_request";

const _this = (module.exports = {
  logRequest(sessionId, msisdn, startTime, endTime) {
    return db.from(requestTable).insert({
      sessionId,
      msisdn,
      timestamp: startTime,
      duration: endTime - startTime
    });
  },

  async logSession(sessionId, msisdn) {
    const session = await db
      .from(sessionTable)
      .where({ sessionId })
      .select()
      .first();
    if (!session) {
      return db.from(sessionTable).insert({
        sessionId,
        msisdn,
        startDate: moment().format(),
        endDate: moment().format()
      });
    } else {
      return db
        .from(sessionTable)
        .where({ sessionId })
        .update({ endDate: moment().format() });
    }
  },

  logVendorsSelection(sessionId){
    return _this.__logSelection(sessionId, "selection_level1", "VENDORS");
  },

  logInfoSelection(sessionId) {
    return _this.__logSelection(sessionId, "selection_level1", "PICS_INFO");
  },

  logReportCounterfeitSelection(sessionId) {
    return _this.__logSelection(
      sessionId,
      "selection_level2",
      "COUNTERFEIT_INFO"
    );
  },

  logPriceEnquirySelection(sessionId) {
    return _this.__logSelection(sessionId, "selection_level2", "PRICE_INFO");
  },

  logZoneSelection(sessionId, zoneId, vendorCount) {
    return _this.__logSelection(
      sessionId,
      "selection_level2",
      "ZONE",
      zoneId,
      vendorCount
    );
  },

  logSentContacts(sessionId, msisdn, vendors) {
    if(vendors.length === 0) {
      return;
    }
    const data = vendors.map(vendor => {
      return {
        sessionId,
        msisdn,
        zoneId: vendor.zoneId,
        vendorId: vendor.id
      };
    });
    return db.into("vendor_selection").insert(data);
  },

  logInvalidLevel1Option(sessionId){
    return _this.__logSelection(sessionId, "selection_level1", "INVALID_OPTION");
  },

  logInvalidLevel2Option(sessionId){
    return _this.__logSelection(sessionId, "selection_level2", "INVALID_OPTION")
  },

  __logSelection(
    sessionId,
    level,
    selection,
    zoneId = null,
    vendorCount = null
  ) {
    const data = { endDate: moment().format(), zoneId, vendorCount };
    data[level] = selection;
    return db
      .from(sessionTable)
      .where({ sessionId })
      .update(data);
  }
});
