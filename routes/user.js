const store = require("../data/user");
const express = require("express");
const validate = require("../validations/user");
const password = require("../utils/password");

module.exports = express
  .Router()
  .get("/", async (request, response) => {
    try { 
        const context = {
        model: await store.getAll(),
        flash: request.flash()
      };
      response.render("users/index", context);
    } catch (error) {
      console.log(error);
      //TODO Handle error
      response.sendStatus(500);
    }
  })
  .get("/:id", async ({ params }, response) => {
    try {
      const model = (await store.getById(params.id)) || {};
      delete model.password;
      const context = { model };
      response.render("users/form", context);
    } catch (error) {
      console.log(error);
      //TODO Handle error
      response.sendStatus(500);
    }
  })
  .post("/", async ({ body }, response) => {
    //Password is required for new users
    let validations = validate(body);
    if (!body.password) {
      validations = validations || {};
      const message = "Password cannot be blank";
      validations.password = [message];
    } else if (body.password != body.confirmPassword) {
      validations = validations || {};
      const message = "Passwords do not match";
      validations.confirmPassword = [message];
    }
    //Check if email is already in use
    if (!validations || !validations.email) {
      if (await store.getByEmail(body.email)) {
        validations = validations || {};
        validations.email = ["Email already in use"];
      }
    }
    if (validations) {
      delete body.password;
      const context = {
        model: body,
        validations
      };
      response.render("users/form", context);
    } else {
      try {
        body.password = await password.hash(body.password);
        await store.create(body);
        response.redirect("/users");
      } catch (error) {
        console.log(error);
        //TODO Handle error
        response.sendStatus(500);
      }
    }
  })
  .post("/:id", async ({ params, body }, response) => {
    let validations = validate(body);
    if (body.password || body.confirmPassword) {
      if (body.password != body.confirmPassword) {
        validations = validations || {};
        validations.confirmPassword = ["Passwords does not match"];
      } else {
        body.password = await password.hash(body.password);
      }
    } else {
      //Do not update password
      //If password field is left blank
      delete body.password;
    }
    if(!validations || !validations.email){
      const user = await store.getByEmail(body.email);
      if(user && user.id !== params.id){
        validations = validations || {};
        validations.email = ["Email address already in use"];
      }
    }
    if (validations) {
      const context = {
        model: Object.assign({ id: params.id }, body),
        validations
      };
      response.render("users/form", context);
    } else {
      try {
        await store.update(params.id, body);
        response.redirect("/users");
      } catch (error) {
        console.log(error);
        //TODO Handle error
        response.sendStatus(500);
      }
    }
  })
  .post("/delete/:id", async ({ params, flash }, response) => {
    try {
      const user = await store.getById(params.id);
      if(user && user.isAdmin){
        //flash("danger", "Admin account cannot be deleted");
        response.redirect("/users");
        return;
      }
      await store.delete(params.id);
      response.redirect("/users");
    } catch (error) {
      console.log(error);
      //TODO Handle error
      response.sendStatus(500);
    }
  });
