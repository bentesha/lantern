
exports.up = function(knex, Promise) {
  return knex.schema.createTable("ussd_session", table => {
    table.string("sessionId").notNullable().primary();
    table.dateTime("startDate").notNullable();
    table.dateTime("endDate").notNullable();
    table.string("msisdn").notNullable();
    table.string("selection_level2");
    table.string("selection_level1");
    table.string("zoneId").references("id").inTable("zone");
    table.integer("vendorCount");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("ussd_session");
};
