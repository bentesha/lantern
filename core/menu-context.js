
function MenuContext(){
    
    var data = {};
    var quit = false;
    var input;
    var msisdn;
    var _responseMessage = '';

    //current name of the executing menu
    var currentMenu = 'default';
}

//Load and execute a given menu
MenuContext.prototype.execute = async function (menuName) {
    let menu = require('../menus/' + menuName);
    this.currentMenu = menuName;
    await menu.main.call(this);
    return this._responseMessage;
};

MenuContext.prototype.sendMenu = function (options, caption) {
    count = 1;
    let optionsText = '';
    caption = caption ? caption : '';
    let newLine = caption ? '\n' : '';

    for(let option of options){
        optionsText += `${newLine}${count++}. ${option}`;
        newLine = '\n';
    }
    this._responseMessage = caption + '\n' + optionsText;
}

MenuContext.prototype.send = function(message, quitSession) {
    this._responseMessage = message;
    this.quit = quitSession;
}

MenuContext.prototype.forward = async function(menuName){
    this.quit = false;
    this.input = null;
    return this.execute(menuName);
}

MenuContext.prototype.validateInput = function(input, options){
    input = input - 1;
    return input > 0 && option.length > input;
}

module.exports = MenuContext;