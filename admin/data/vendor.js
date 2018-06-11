const db = require("./db");
const id = require("../../utils/id");
const filterProperties = require("../../utils/filterProperties");

const table = "vendor";

const allowedProperties = [
  "firstName",
  "lastName",
  "zoneId",
  "phone",
  "isActive",
  "hits"
];

module.exports = {
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

  async create(attributes) {
    attributes = filterProperties(attributes, allowedProperties);
    attributes.id = require("../../utils/id")();
    const [id] = await db.into(table).insert(attributes);
    //Reset all hits to 0;
    await db.from(table).update({ hits: 0 });
    return db
      .from(table)
      .where({ id })
      .select()
      .first();
  },

  update(id, attributes) {
    attributes = filterProperties(attributes, allowedProperties);
    return db
      .into(table)
      .where({ id })
      .update(attributes);
  },

  delete(id) {
    return db
      .from(table)
      .where({ id })
      .delete();
  }
};
