const knex = require("knex");
const knexConfig = require("../knexfile");
const config = require("../config");

module.exports = knex(knexConfig[config.db]);