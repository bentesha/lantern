const db = require("../admin/data/db");
const analytics = require("../admin/data/analytics");

const displayOptions = async function(message) {
  const zones = await db.from("zone").select();
  const options = zones.map(zone => zone.name);
  this.data.zones = zones;
  this.sendMenu(options, message);
};

module.exports = {
  async main() {
    const data = this.data;
    if (this.input == null) {
      await displayOptions.call(this, "Chagua ukanda");
    } else {
      let option = parseInt(this.input);
      if (typeof option == "number" && data.zones[option - 1] !== undefined) {
        const count = 4;
        const zone = data.zones[option - 1];
        const vendors = await db
          .from("vendor")
          .where({ zoneId: zone.id, isArchived: false })
          .orderBy("hits", "asc")
          .select()
          .limit(count);
        if (vendors.length === 0) {
          this.send(
            "Samahani, hakuna wauzaji waliosajiliwa katika ukanda huu!",
            true
          );
        } else {
          const message = vendors.reduce((str, v) => {
            str = str !== "" ? str + "\n" : str;
            return `${str}${v.firstName} ${v.lastName}\n${v.phone}`;
          }, "");
          if (vendors.length === count) {
            await db
              .from("vendor")
              .whereIn("id", vendors.map(v => v.id))
              .increment("hits", 1);
          }
          this.send(message, true);
        }

        //--
        await analytics.logZoneSelection(this.sessionId, zone.id, vendors.length);
        await analytics.logSentContacts(this.sessionId, this.msisdn, vendors);
        //--
      } else {
        //--
        await analytics.logInvalidLevel2Option(this.sessionId);
        //--
        await displayOptions.call(this, "Chaguo lako sio sahihi");
      }
    }
  }
};
