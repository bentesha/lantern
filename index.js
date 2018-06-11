"use strict";

const express = require("express");
const manager = require("./services/session-manager");
const MenuContext = require("./core/menu-context");
const analytics = require("./admin/data/analytics");

const app = express();

app.get("/ussd", (request, response) => {
  const startTime = Date.now();
  //Make sure msidn is pressent, and session id is pressent
  let msisdn = request.query.msisdn;
  let sessionId = request.query.sessionid;
  let input = request.query.input || "";

  if (!msisdn || !sessionId) {
    response.set({ session: "Q" }); //Drop this session
    response.send(
      "Sorry, there was a problem processing your request. Please retry!"
    );
    return;
  }
  //--
  analytics.logSession(sessionId, msisdn);
  //--
  //Restore state
  manager.getState(sessionId, async (error, state) => {
    if (error) {
      response.set({ session: "Q" }); //Drop this session
      response.send(
        "There seems to be a problem with the server. Please retry again later!"
      );
    } else {
      try {
        let isNewSession = false;
        if (!state) {
          state = {
            menu: "default",
            data: {}
          };
          isNewSession = true;
          manager.saveState(sessionId, state);
        }
        let context = new MenuContext();
        context.data = state.data;
        context.input = isNewSession ? null : input;
        context.msisdn = msisdn;
        context.sessionId = sessionId;
        //Execute menu
        let responseMessage = await context.execute(state.menu);
        state.data = context.data;
        state.menu = context.currentMenu;
        manager.saveState(sessionId, state);
        response.set({ session: context.quit ? "Q" : "C" });
        response.send(responseMessage);
        //--
        const endTime = Date.now();
        await analytics.logRequest(sessionId, msisdn, startTime, endTime);
      } catch (error) {
        console.log(error);
      }
    }
  });
});

app.listen(4200);
