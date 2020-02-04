import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {LobbyScreen} from './lobbyScreen/lobbyScreen';
import {RoundScreen} from "./roundScreen/roundScreen";
import WaitScreen from "./waitScreen/waitScreen";
import { EndGameScreen } from "./endgamescreen/EndGameScreen"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LobbyScreen />
        </Route>
        <Route path="/wait">
          <WaitScreen />
        </Route>
        <Route path="/round">
          <RoundScreen />
        </Route>
        <Route path="/end">
          <EndGameScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
