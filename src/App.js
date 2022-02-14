import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Trainer from "./components/Trainer";
import Member from "./components/Member";
import Facalty from "./components/Facalty";
// import Header from "./components/Header";

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/trainer" component={Trainer} />
        <Route path="/member" component={Member} />
        <Route path="/facalty" component={Facalty} />
      </Switch>
    </Router>
  );
}

export default App;
