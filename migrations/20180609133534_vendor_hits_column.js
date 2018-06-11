
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("vendor", table => {
    table.integer("hits").defaultTo(0).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("vendor", table => {
    table.dropColumn("hits");
  })
};
