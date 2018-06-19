const table = "book";

const allowedProperties = [
  "title",
  "publisherId",
  "isbn",
  "pages",
  "price",
  "language",
  "level",
  "category",
  "subject",
  "edition",
  "year",
  "description",
  "coverImage",
  "attachment"
];

function Book() {
  this.db = require("../data/db");
  this.id = require("../utils/id");
  this.filterProperties = require("../utils/filterProperties");
  this.authorStore = require("./author");
  this.publisherStore = require("./publisher");
  this.gradeStore = require("./grade");
}

Book.prototype.create = async function(attributes) {
  attributes = this.filterProperties(attributes, allowedProperties);
  attributes.id = this.id();
  await this.db.into(table).insert(attributes);
  return this.getById(attributes.id);
};

Book.prototype.update = async function(id, attributes) {
  attributes = this.filterProperties(attributes, allowedProperties);
  await this.db
    .into(table)
    .where({ id })
    .update(attributes);
  return this.db
    .from(table)
    .where({ id })
    .select()
    .first();
};

Book.prototype.setAuthors = async function(id, authors) {
  //Delete all existing authors
  await this.db
    .from("book_author")
    .where({ bookId: id })
    .delete();
  const promises = authors.map(async author => {
    if (!author.id) {
      let result = await this.authorStore.getByName(author.name);
      if (!result) {
        author = await this.authorStore.create({ name: author.name });
      } else {
        author = result;
      }
    }
    await this.db.into("book_author").insert({
      bookId: id,
      authorId: author.id
    });
    return author;
  });
  return Promise.all(promises);
};

Book.prototype.setGrades = async function(id, grades) {
  //Delete existing grades associated with the book
  await this.db
    .from("book_grade")
    .where({ bookId: id })
    .delete();
  const promises = grades.map(async grade => {
    grade = typeof grade === "string" ? { name: grade } : grade;
    if (!grade.id) {
      grade =
        (await this.gradeStore.getByName(grade.name)) ||
        (await this.gradeStore.create({ name: grade.name }));
    }
    await this.db.into("book_grade").insert({
      bookId: id,
      gradeId: grade.id
    });
    return grade;
  });
  return Promise.all(promises);
};

Book.prototype.getById = async function(id) {
  const book = await this.db
    .from(table)
    .where({ id })
    .select()
    .first();
  book.attachment = JSON.parse(book.attachment);
  book.coverImage = JSON.parse(book.coverImage);
  book.publisher = await this.publisherStore.getById(book.publisherId);
  book.authors = await this.getAuthors(id);
  book.grades = await this.getGrades(id);
  return book;
};

Book.prototype.getAll = async function() {
  const books = await this.db.from(table).select();
  const promises = books.map(item => this.getById(item.id));
  return Promise.all(promises);
};

Book.prototype.getAuthors = function(bookId) {
  return this.db
    .from("book_author")
    .innerJoin("author", "authorId", "author.Id")
    .where({ bookId })
    .select("author.*");
};

Book.prototype.getGrades = function(bookId) {
  return this.db
    .from("book_grade")
    .innerJoin("grade", "gradeId", "grade.id")
    .where({ bookId })
    .select("grade.*");
};

Book.prototype.delete = function(id) {
  return this.db
    .from(table)
    .where({ id })
    .delete();
};

Book.prototype.getOptions = async function() {
  const publishers = await this.publisherStore.getAll();
  const authors = await this.authorStore.getAll();
  const levels = await this.db
    .from(table)
    .distinct("level")
    .select()
    .map(item => item.level);
  const categories = await this.db
    .from(table)
    .distinct("category")
    .select()
    .map(item => item.category);
  const subjects = await this.db
    .from(table)
    .distinct("subject")
    .select()
    .map(item => item.subject);
  const grades = await this.gradeStore.getAll();

  return {
    publishers,
    authors,
    subjects,
    levels,
    categories,
    grades
  };
};

module.exports = new Book();
