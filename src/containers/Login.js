import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./Signup.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!email || !password) {
        setMessageError("*Tous les champs doivent être saisis");
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_PATH_SERVER}/user/login`,
          { email, password }
        );
        if (response.status === 200) {
          setMessageError("");
          setUser(response.data.token);
          history.push("/");
        } else {
          setMessageError("*Identifiants incorrects");
          setUser("");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // Render
  return (
    <div className="container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Connexion</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeHolder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeHolder="Mot de passe"
        />
        <span className="message-error">{messageError}</span>
        <button type="submit">Se connecter</button>
        <Link to="/signup">Vous n'avez pas de compte ? Inscrivez-vous !</Link>
      </form>
    </div>
  );
};

export default Login;
