module.exports = function(target, allowedProperties){
  return allowedProperties.reduce((obj, property) => {
    if(property in target){
      obj[property] = target[property];
    }
    return obj;
  }, {})
}