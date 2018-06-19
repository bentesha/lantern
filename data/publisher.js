const db = require("../data/db");
const genId = require("../utils/id");
const filterProperties = require("../utils/filterProperties");

const table = "publisher";
const allowedProperties = ["name"];

const store = (module.exports = {
  getAll() {
    return db.from(table).select();
  },

  getById(id) {
    return db
      .from(table)
      .where({ id })
      .select()
      .first();
  },

  getByName(name) {
    return db
      .from(table)
      .where({ name })
      .select()
      .first();
  },

  async create(attributes) {
    attributes = filterProperties(attributes, allowedProperties);
    attributes.id = genId();
    await db.into(table).insert(attributes);
    return store.getById(attributes.id);
  }
});
