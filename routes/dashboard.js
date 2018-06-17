const express = require("express");

module.exports = express.Router()
.get("/", (request, response) => {
  response.send("This route is not implemented");
});
