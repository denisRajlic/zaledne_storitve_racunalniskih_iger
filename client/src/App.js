import React, { useState, useEffect, Fragment } from "react";
import io from "socket.io-client";
import Landing from './components/Landing';
import Pacman from './components/Pacman';
import AmongUs from './components/AmongUs';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <Router>
        <>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/pacman" component={Pacman} />
            <Route exact path="/amongus" component={AmongUs} />
          </Switch>
        </>
      </Router>
  );
}

export default App;