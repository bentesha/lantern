const Session  = require('../models/session');

module.exports.getState = function(sessionId, callback){
    return Session.findOne({sessionId: sessionId}, function(err, session){
        let state = null;
        if(session && typeof session.state == 'string'){
            state = JSON.parse(session.state);
        }
        callback(err, state);
    })
};

module.exports.saveState = function(sessionId, state, callback) {
    if(!state) { state = {}; }
    Session.findOne({sessionId: sessionId}, (error, session) => {
        if(error){
            console.log(error);
            callback(error, null);
        } else {
            if(!session){
                session = new Session({
                    sessionId: sessionId
                });
            }
            session.state = JSON.stringify(state);
            session.save();
        }
    });
}