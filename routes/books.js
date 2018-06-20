const express = require("express");
const validate = require("../validations/book");
const publisherStore = require("../data/publisher");
const bookStore = require("../data/book");
const gradeStore = require("../data/grade");

module.exports = express
  .Router()
  .get("/", async (request, response) => {
    try {
      const model = await bookStore.getAll();
      response.render("books/index", { model });
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  })
  .get("/form-options", async (request, response) => {
    try {
      response.json(await bookStore.getOptions());
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  })
  .get("/:id", async ({ params }, response) => {
    try {
      const book =
        params.id === "new" ? {} : await bookStore.getById(params.id);
      const context = { data: JSON.stringify(book) };
      response.render("books/form", context);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  })
  .post("/", async (request, response) => {
    try {
      const errors = validate(request.body);
      if (errors) {
        response.statusCode = 400;
        response.json(errors);
        return;
      }
      const book = request.body;
      if(typeof book.publisher === "string"){
        book.publisher = { name: book.publisher };
      }
      if (!book.publisher.id) {
        const publisher =
          (await publisherStore.getByName(book.publisher.name)) ||
          (await publisherStore.create({
            name: book.publisher.name
          }));
        book.publisherId = publisher.id;
      } else {
        book.publisherId = book.publisher.id;
      }
      book.attachment = JSON.stringify(book.attachment);
      book.coverImage = JSON.stringify(book.coverImage);
      const result = book.id
        ? await bookStore.update(book.id, book)
        : await bookStore.create(book);
      book.authors = book.authors.map(author => {
        return typeof author === "string" ? { name: author } : author;
      });
      const authors = await bookStore.setAuthors(result.id, book.authors);
      const grades = await bookStore.setGrades(result.id, book.grades);
      result.authors = authors;
      result.grades = grades;
      response.json(result);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  })
  .post("/delete/:id", async ({ params }, response) => {
    await bookStore.delete(params.id);
    response.redirect("/books");
  });
