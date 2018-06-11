
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("user", table => {
    table.boolean("isArchived").notNullable().defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("user", table => {
    table.dropColumn("isArchived");
  });
};
