import React from "react";
import Landing from './components/Landing';
import Games from './components/Games';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
        <>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/*" component={Games} />
          </Switch>
        </>
      </Router>
  );
}

export default App;