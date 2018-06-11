
exports.up = function(knex, Promise) {
  return knex.schema.renameTable("distributor", "vendor");
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable("vendor", "distributor");
};
