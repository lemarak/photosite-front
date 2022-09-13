import "./App.scss";

import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import "./conf/axios-conf";

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
  const [slug, setSlug] = useState(Cookies.get("slug") || null);
  const [isLoading, setIsLoading] = useState(false);

  const setUser = (token, slug) => {
    if (token) {
      setToken(token);
      setSlug(slug);
      Cookies.set("token", token);
      Cookies.set("slug", slug);
    } else {
      setToken(null);
      setSlug(null);
      Cookies.remove("token");
      Cookies.remove("slug");
    }
  };

  return (
    <Router>
      <Header token={token} setUser={setUser} slug={slug} />
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
        <Route path="/profile/:slug">
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
