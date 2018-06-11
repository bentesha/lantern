const db = require("../data/db");
const id = require("../../utils/id");
const filterProperties = require("../../utils/filterProperties");

const table = "user";
const allowedProperties = [
  "firstName",
  "lastName",
  "email",
  "password",
  "isActive",
  "isAdmin"
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

  getByEmail(email) {
    return db
      .from(table)
      .where({ email })
      .select()
      .first();
  },

  create(attributes) {
    attributes = filterProperties(attributes, allowedProperties);
    attributes.id = id();
    return db
      .into(table)
      .insert(attributes)
      .then(([id]) => {
        return db
          .from(table)
          .where({ id })
          .select()
          .first();
      });
  },

  async update(id, attributes) {
    attributes = filterProperties(attributes, allowedProperties);
    const user = await db
      .from(table)
      .where({ id })
      .select()
      .first();
    if(user && user.isSystemAccount){
      //Prevent changing isAdmin and isActive
      //statuses
      delete attributes.isAdmin;
      delete attributes.isActive;
    }
    return await db
      .from(table)
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
