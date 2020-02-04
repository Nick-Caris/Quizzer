import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Dashboard} from "./dashboard/dashboard";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
