
exports.up = function(knex, Promise) {
  return knex.schema.createTable("book_grade", table => {
    table.string("bookId").notNullable().references("id").inTable("book");
    table.string("gradeId").notNullable().references("id").inTable("grade");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("book_grade");
};
