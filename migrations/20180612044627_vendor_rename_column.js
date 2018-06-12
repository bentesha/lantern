
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("vendor", table => {
    table.renameColumn("isArchieved", "isArchived");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("vendor", table => {
    table.renameColumn("isArchived", "isArchieved");
  })
};
