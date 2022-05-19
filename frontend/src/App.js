import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Trainer from "./components/Trainer";
import Member from "./components/Member";
import Facalty from "./components/Facalty";
// import Header from "./components/Header";

function App() {
  const validate = localStorage.getItem("authorised");
  console.log(validate);
  const [authorised, setAuthorised] = useState(validate);

  return (
    <Router>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/home">
          <Home setAuthorised={setAuthorised} authorised={authorised} />
        </Route>

        <Route exact path="/">
          <Login setAuthorised={setAuthorised} authorised={authorised} />
        </Route>

        <Route exact path="/trainer">
          <Trainer setAuthorised={setAuthorised} authorised={authorised} />
        </Route>

        <Route exact path="/facalty">
          <Facalty setAuthorised={setAuthorised} authorised={authorised} />
        </Route>

        <Route exact path="/member">
          <Member setAuthorised={setAuthorised} authorised={authorised} />
        </Route>
        {/* <Route path="/member" component={Member} /> */}
        {/* <Route path="/facalty" component={Facalty} /> */}
      </Switch>
    </Router>
  );
}

export default App;
