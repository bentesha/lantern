const authenticate = require("../authenticate");
const express = require("express");

module.exports = express
  .Router()
  .get("/login", (request, response) => {
    const errors = request.flash("error");
    const email = request.flash("email");
    const context = {};
    context.error = Array.isArray(errors) && errors.length >= 1 ?  errors[0] : undefined;
    context.email = Array.isArray(email) && email.length >= 1 ?  email[0] : undefined;
    response.render("login", context);
  })
  .post("/login", authenticate)
  .get("/logout", (request, response) => {
    request.logout();
    response.redirect("/login");
  });
