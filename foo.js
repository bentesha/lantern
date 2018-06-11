const moment = require("moment");

let m = moment();
let m1 = moment().startOf("day");
console.log(m.format());
console.log(m1.format());