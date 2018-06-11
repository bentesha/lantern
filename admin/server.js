const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const config = require("./config");
const knex = require("knex");
const knexConfig = require("../knexfile");
const path = require("path");
const flash = require("connect-flash");

const app = express();
const env = nunjucks.configure(config.templates.path, {
  express: app,
  watch: config.templates.watch
});
app.set("view engine", config.templates.extension);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    secret: config.session.secret,
    saveUninitialized: true,
    resave: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Configure express routes
require("./routes")(app);

app.listen(config.port, () => {
  console.log("Web server listening on port: " + config.port);
});
