
exports.up = function(knex, Promise) {
  return knex.schema.createTable("publisher", table => {
    table.string("id").primary();
    table.string("name").notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("publisher");
};
