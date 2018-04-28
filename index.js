const express = require('express');
const manager = require('./services/session-manager');

//const app = express.app();

//Check if session is available
let sessionId = '120';
manager.getState(sessionId, (error, state) => {
    if(error){
        console.log(error);
    } else {
        if(state != null){
            console.log('Session object found');
            console.log(JSON.stringify(state));
        } else {
            console.log('Session object not found');
            let newState = {
                userName: 'Alfred'
            };
            manager.saveState(sessionId, newState);
        }
        
    }
});

//app.listen(2000);
