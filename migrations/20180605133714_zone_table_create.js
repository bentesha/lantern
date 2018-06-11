const id = require("../utils/id");

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("zone", table => {
      table.string("id").primary();
      table
        .string("name")
        .unique()
        .notNullable();
    })
    .then(() => {
      //Create default zones
      const zones = [
        "Kanda ya Pwani",
        "Kanda ya Kaskazini",
        "Kanda ya Ziwa",
        "Kanda ya Kati",
        "Kanda ya Juu Kusini",
        "Kanda ya Kusini"
      ].map(name => {
        return { id: id(), name };
      });
      return knex.into("zone").insert(zones);
    });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("zone")
};
