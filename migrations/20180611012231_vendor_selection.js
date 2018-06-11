
exports.up = function(knex, Promise) {
  return knex.schema.createTable("vendor_selection", table => {
    table.increments("id").primary();
    table.string("sessionId").notNullable().references("sessionId").inTable("ussd_session");
    table.string("msisdn").notNullable();
    table.string("zoneId").notNullable().references("id").inTable("zone");
    table.string("vendorId").notNullable().references("id").inTable("vendor");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("vendor_selection");
};
