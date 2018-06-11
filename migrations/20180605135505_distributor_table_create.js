
exports.up = function(knex, Promise) {
  return knex.schema.createTable("distributor", table => {
    table.string("id").notNullable().primary();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("phone").notNullable();
    table.boolean("isActive").notNullable().defaultTo(true);
    table.string("zoneId").notNullable().references("id").inTable("zone");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("distributor");
};
