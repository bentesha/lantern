const analytics = require("../admin/data/analytics");

module.exports = {
  async main() {
    let options = [
      "Thibitisha bei halali ya PICS",
      "Tambua bidhaa bandia"
    ];

    if (this.input === null) {
      this.sendMenu(options, "Karibu PICS - " + this.data.zone);
      return;
    }

    switch (this.input) {
      case "1":
        await analytics.logPriceEnquirySelection(this.sessionId);
        this.send(
          "Asante kwa kutumia PICS.\nBei halali ni Sh.5000 kwa uuzaji wa rejareja.",
          true
        );
        break;

      case "2":
      await analytics.logReportCounterfeitSelection(this.sessionId);
        this.send(
          "Mfuko wa PICS una mistari miwili minene (iliyobanwa kwa chini mara mbili) iliyochapishwa neno PICS na KINGA NJAA kwa nje. Ahsante kwa kutumia PICS",
          true
        );
        break;

      default:
        await analytics.logInvalidLevel2Option(this.sessionId);
        this.sendMenu(options, "Chaguo lako sio sahihi!", options);
        break;
    }
  }
};
