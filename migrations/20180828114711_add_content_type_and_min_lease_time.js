
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("book", table => {
    table.string("minLeasePeriod").defaultTo("Week").notNullable();
    table.string("contentType").notNullable().defaultTo("Text Book");
  });
};

exports.down = function(knex, Promise) {
  
};
