const express = require("express");
const store = require("../data/vendor");
const zoneStore = require("../data/zone");
const validate = require("../validations/vendor");

module.exports = express
  .Router()
  .get("/", async (request, response) => {
    try {
      const context = {
        model: await Promise.all((await store.getAll()).map(async item => {
          item.zone = await zoneStore.getById(item.zoneId);
          return item;
        }))
      };
      response.render("vendors/index", context);
    } catch (error) {
      console.log(error);
      //TODO Handle error
      response.sendStatus(500);
    }
  })
  .get("/:id", async (request, response) => {
    try {
      const model = (await store.getById(request.params.id)) || {};
      const options = await zoneStore.getAll();
      const context = { model, options };
      response.render("vendors/form", context);
    } catch (error) {
      console.log(error);
      //TODO: Handle error
      response.sendStatus(500);
    }
  })
  .post("/", async ({ body }, response) => {
    const validations = validate(body);
    if (validations) {
      const options = await zoneStore.getAll();
      const context = {
        model: body,
        validations,
        options
      };
      response.render("vendors/form", context);
    } else {
      try {
        await store.create(body);
        response.redirect("/vendors");
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
      const options = await zoneStore.getAll();
      const context = {
        validations,
        model: body
      };
      response.render("vendors/form", context);
    } else {
      try {
        await store.update(params.id, body);
        response.redirect("/vendors");
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
      response.redirect("/vendors");
    } catch (error) {
      console.log(error);
      //TODO Handle error
      response.sendStatus(500);
    }
  });
