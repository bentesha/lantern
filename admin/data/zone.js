const db = require("../data/db");
const id = require("../../utils/id");

const table = "zone";

module.exports = {
  getAll() {
    return db
      .select("zone.*")
      .count({ vendors: "vendor.id" })
      .from(table)
      .leftJoin("vendor", "zoneId", "zone.id")
      .groupBy("zone.id");
  },

  getById(id) {
    return db
      .from(table)
      .where({ id })
      .select()
      .first();
  },

  create(attributes) {
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

  update(id, attributes) {
    return db
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
