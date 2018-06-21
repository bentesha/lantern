const { urls } = require("../config");

module.exports = function(request, response, next) {
  if (request.user) {
    //Replace response.render method so we can pass
    //session info to the template
    const originalRenderFunc = response.render;
    response.render = function(template, context){
      context = context || {};
      context.session = {
        user: request.user
      };
      originalRenderFunc.call(this, ...arguments)
    }
    next();
  } else {
    response.redirect(urls.login);
  }
};
