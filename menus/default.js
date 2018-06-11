const analytics = require("../admin/data/analytics");

module.exports = {
  async main() {
    let options = ["Tafuta Wauzaji", "Taarifa za PICS"];

    switch (this.input) {
      case null:
        this.sendMenu(options);
        break;

      case "1":
        await analytics.logVendorsSelection(this.sessionId);
        return this.forward("vendors");
        break;

      case "2":
        await analytics.logInfoSelection(this.sessionId);
        return this.forward("pics-info");
        break;

      default:
        await analytics.logInvalidLevel1Option(this.sessionId);
        this.sendMenu(options, "Chaguo lako sio sahihi!");
        break;
    }
  }
};
