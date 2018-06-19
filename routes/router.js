const dashboard = require("./dashboard");
const errors = require("./errors");
const users = require("./user");
const auth = require("./auth");
const requireAuth = require("./protected");
const books = require("./books");

module.exports = function(app){
  app.use("/", auth);
  //All routes from here requires a used logged in
  app.use(requireAuth);
  app.use("/", dashboard);
  app.use("/users", users);
  app.use("/books", books);
  app.use("*", errors);
};