const validate = require("validate.js");

module.exports = function(target){
  const rules = {
    name: {
      presence: { allowEmpty: false }
    }
  };
  return validate(target, rules);
}