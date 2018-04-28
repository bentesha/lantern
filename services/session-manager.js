const Session  = require('../models/session');

module.exports.getState = function(sessionId, callback){
    return Session.findOne({sessionId: sessionId}, function(err, session){
        callback(err, session ? session.state : null);
    })
};

module.exports.saveState = function(sessionId, state, callback) {
    if(!state) { state = {}; }
    let session = new Session({
        sessionId: sessionId,
        state: state
    });
    session.save();
}