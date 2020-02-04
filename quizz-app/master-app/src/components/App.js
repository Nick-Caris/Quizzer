import React from 'react';
import { LobbyScreen } from './lobbyscreen/LobbyScreen';
import { CategoryScreen } from './categoryscreen/CategoryScreen';
import { RoundScreen } from './roundscreen/RoundScreen';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { EndGameScreen } from './endgamescreen/EndGameScreen';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <LobbyScreen />
          </Route>
          <Route path="/category">
            <CategoryScreen />
          </Route>
          <Route path="/game">
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
