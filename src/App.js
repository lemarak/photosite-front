import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Profile from "./containers/Profile";
import Gallery from "./containers/Gallery";
import Outing from "./containers/Outing";

require("dotenv").config();

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/gallery">
          <Gallery />
        </Route>
        <Route path="/outing">
          <Outing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
