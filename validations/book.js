const validate = require("validate.js");
const moment = require("moment");

module.exports = function(book) {
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
    minLeasePeriod: {
      presence: {
        allowEmpty: false
      }
    },
    contentType: {
      presence: {
        allowEmpty: false
      }
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
    },
    edition: {
      presence: { allowEmpty: false }
    },
    year: {
      presence: { allowEmpty: false },
      numericality: {
        greaterThan: 2006,
        lessThanOrEqualTo: moment().year()
      }
    }
  };

  const errors = validate(book, rules);
  return (
    errors &&
    Object.keys(errors).reduce((obj, key) => {
      obj[key] = errors[key].length ? errors[key][0] : undefined;
      return obj;
    }, {})
  );
};
