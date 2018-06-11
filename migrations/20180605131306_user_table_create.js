const shortid = require("shortid");
const id = require("../utils/id");
const password = require("../utils/password");

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("user", table => {
      table
        .string("id")
        .primary()
        .notNullable();
      table
        .string("email")
        .unique()
        .notNullable();
      table.string("firstName").notNullable();
      table.string("lastName").notNullable();
      table.string("password").notNullable();
      table
        .boolean("isAdmin")
        .defaultTo(false)
        .notNullable();
      table
        .boolean("isSystemAccount")
        .defaultTo(false)
        .notNullable();
    })
    .then(async () => {
      const passwordHash = await password.hash("12345");
      //Create default admin user
      return knex.into("user").insert({
        id: id(),
        email: "admin@pics.com",
        firstName: "Admin",
        lastName: "User",
        password: passwordHash,
        isAdmin: true,
        isSystemAccount: true
      });
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user");
};
