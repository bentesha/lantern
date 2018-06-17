const validate = require("validate.js");

module.exports = function(target) {
  const rules = {
    firstName: {
      presence: { allowEmpty: false }
    },
    lastName: {
      presence: { allowEmpty: false }
    },
    email: {
      presence: { allowEmpty: false },
      email: true
    }
  };

  delete target.isSystemAccount;
  return validate(target, rules);
};
