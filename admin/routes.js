const express = require("express");
const vendors = require("./routes/vendors");
const zones = require("./routes/zones");
const dashboard = require("./routes/dashboard");
const errors = require("./routes/errors");
const users = require("./routes/user");
const auth = require("./routes/auth");
const reports = require("./routes/reports");
const authenticate = require("./authenticate");
const protected = require("./protected");
const exportData = require("./routes/export");

module.exports = function(app){
  app.use("/", auth);
  //All routes from here requires a used logged in
  app.use(protected);
  app.use("/", dashboard);
  app.use("/zones", zones);
  app.use("/vendors", vendors);
  app.use("/users", users);
  app.use("/reports", reports);
  app.use("/export", exportData)
;  app.use("*", errors);
};