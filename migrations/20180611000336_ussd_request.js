
exports.up = function(knex, Promise) {
  return knex.schema.createTable("ussd_request", table => {
    table.increments("id").primary();
    table.string("sessionId").notNullable();
    table.string("msisdn").notNullable();
    table.dateTime("timestamp").notNullable();
    table.integer("duration").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("ussd_request");
};
