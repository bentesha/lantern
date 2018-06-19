
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("book", table => {
    table.string("edition");
    table.integer("year");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("book", table => {
    table.dropColumn("edition");
    table.dropColumn("year");
  })
};
