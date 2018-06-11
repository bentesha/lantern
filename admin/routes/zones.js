const express = require("express");
const store = require("../data/zone");
const validate = require("../validations/zone");

module.exports = express
  .Router()
  .get("/", async (request, response) => {
    try {
      const model = await store.getAll();
      const context = { model };
      response.render("zones/index", context);
    } catch (error) {
      console.log(error);
      //TODO Handle error
      response.sendStatus(500);
    }
  })
  .get("/:id", async ({ params }, response) => {
    try {
      const model = (await store.getById(params.id)) || {};
      const context = { model };
      response.render("zones/form", context);
    } catch (error) {
      console.log(error);
      //TODO Handle error
      response.sendStatus(500);
    }
  })
  .post("/", async ({ body }, response) => {
    const validations = validate(body);
    if (validations) {
      const context = {
        validations,
        model: body
      };
      response.render("zones/form", context);
    } else {
      try {
        await store.create(body);
        response.redirect("/zones");
      } catch (error) {
        console.log(error);
        //TODO Handle error
        response.sendStatus(500);
      }
    }
  })
  .post("/:id", async ({ body, params }, response) => {
    const validations = validate(body);
    if (validations) {
      const context = {
        validations,
        model: Object.assign({ id: params.id }, body)
      };
      response.render("zones/form", context);
    } else {
      try {
        await store.update(params.id, body);
        response.redirect("/zones");
      } catch (error) {
        console.log(error);
        //TODO Handle error
        response.sendStatus(500);
      }
    }
  })
  .post("/delete/:id", async ({ params }, response) => {
    try {
      await store.delete(params.id);
      response.redirect("/zones");
    } catch (error) {
      console.log(error);
      //TODO Handle error
      response.sendStatus(500);
    }
  });
