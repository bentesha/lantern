
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("book", table => {
    table.dropColumn("grade");
  });
};

exports.down = function(knex, Promise) {
  //Non reversible migration
};
