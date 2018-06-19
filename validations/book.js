const validate = require("validate.js");

module.exports = function(book){
  const rules = {
    title: {
      presence: { allowEmpty: false }
    },
    publisher: {
      presence: { allowEmpty: false }
    },
    language: {
      presence: { allowEmpty: false }
    },
    authors: {
      presence: { allowEmpty: false }
    },
    isbn: {
      presence: { allowEmpty: false }
    },
    pages: {
      presence: { allowEmpty: false },
      numericality: {
        greaterThan: 0
      }
    },
    price: {
      presence: { allowEmpty: false },
      numericality: {
        greaterThan: 0
      }
    },
    subject: {
      presence: { allowEmpty: false }
    },
    category: {
      presence: { allowEmpty: false }
    },
    level: {
      presence: { allowEmpty: false }
    },
    grades: {
      presence: { allowEmpty: false }
    }
  };

  const errors = validate(book, rules);
  return errors && Object.keys(errors).reduce((obj, key) => {
    obj[key] = errors[key].length ? errors[key][0] : undefined;
    return obj;
  }, {});
}