const { urls } = require("../config");

module.exports = function(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect(urls.login);
  }
};
