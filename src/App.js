import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import ItemAdded from "./components/ItemAdded";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/added" component={ItemAdded} />
      </Switch>
    </Router>

  );
}

export default App;
