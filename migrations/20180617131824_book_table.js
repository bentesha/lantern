
exports.up = function(knex) {
  return knex.schema.createTable("book", table => {
    table.string("id").primary();
    table.string("title").notNullable();
    table.string("publisherId").notNullable().references("id").inTable("publisher");
    table.string("language").notNullable();
    table.decimal("price", 10, 2).notNullable();
    table.string("description");
    table.boolean("isActive").notNullable().defaultTo(true);
    table.string("category").notNullable();
    table.string("subject").notNullable();
    table.string("grade").notNullable();
    table.string("level").notNullable();
    table.string("isbn").notNullable();
    table.integer("pages").notNullable();
    table.string("attachment").notNullable();
    table.string("coverImage").notNullable();
  })
  .then(() => {
    return knex.schema.createTable("book_author", table => {
      table.string("bookId").notNullable().references("id").inTable("book");
      table.string("authorId").notNullable().references("id").inTable("author");
    });
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("book").then(() => {
    return knex.schema.dropTable("book_author");
  })
};
