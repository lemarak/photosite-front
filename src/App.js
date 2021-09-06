import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./components/Header";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Profile from "./containers/Profile";
import Gallery from "./containers/Gallery";
import Outing from "./containers/Outing";

require("dotenv").config();

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [isLoading, setIsLoading] = useState(false);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/profile">
          <Profile token={token} />
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
