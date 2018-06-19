const db = require("./db");
const id = require("../utils/id");
const filterProperties = require("../utils/filterProperties");

const allowProperties = ["name"];

const table = "grade";

const store = module.exports = {
  getAll() {
    return db.from(table).select();
  },

  getByName(name) {
    return db
      .from(table)
      .where({ name })
      .select()
      .first();
  },

  getById(id) {
    return db
      .from(table)
      .where({ id })
      .select()
      .first();
  },

  async create(attributes) {
    attributes = filterProperties(attributes, allowProperties);
    attributes.id = id();
    await db.into(table).insert(attributes);
    return store.getById(attributes.id);
  }
};
