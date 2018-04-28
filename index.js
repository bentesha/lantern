const express = require('express');
const manager = require('./services/session-manager');
const MenuContext = require('./core/menu-context');

const app = express();

app.get('/ussd', (request, response) => {
    //Make sure msidn is pressent, and session id is pressent
    let msisdn = request.query.msisdn;
    let sessionId = request.query.sessionId;
    let input = request.query.input || '';

    if(!msisdn || !sessionId){
        response.set({session: 'Q'}); //Drop this session
        response.send("Sorry, there was a problem processing your request. Please retry!");
        return;
    }

    //Restore state
    manager.getState(sessionId, (error, state) => {
        if(error){
            response.set({session: 'Q'}); //Drop this session
            response.send("There seems to be a problem with the server. Please retry again later!");
        } else {
            let isNewSession = false;
            if(!state){
                state = {
                    menu: 'default',
                    data: {}
                };
                isNewSession = true;
                manager.saveState(sessionId, state);
            }
            let context = new MenuContext();
            context.data = state.data;
            context.input = isNewSession ? null : input;
            context.msisdn = msisdn;
            //Execute menu
            let responseMessage = context.execute(state.menu);
            state.data = context.data;
            state.menu = context.currentMenu;
            manager.saveState(sessionId, state);
            response.set({ session: context.quit ? 'Q' : 'C'});
            response.send(responseMessage);
        }
    });
});

app.listen(2000);
