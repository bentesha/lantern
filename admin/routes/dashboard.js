const express = require("express");

module.exports = express.Router()
  .get("/", (request, response) => {
    response.render("dashboard");
  });
