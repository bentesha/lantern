
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("vendor", table => {
    table.boolean("isArchieved").notNullable().defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("vendor", table => {
    table.dropColumn("isArchieved");
  });
};
