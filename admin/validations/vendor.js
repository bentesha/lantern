const validate = require("validate.js");

module.exports = function(target){
  const rules = {
    firstName: {
      presence: { allowEmpty: false }
    },
    lastName: {
      presence: { allowEmpty: false }
    },
    phone: {
      presence: { allowEmpty: false }
    },
    zoneId: {
      presence: { allowEmpty: false }
    }
  };
  return validate(target, rules);
}