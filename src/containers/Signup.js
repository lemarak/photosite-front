import React, { useState } from "react";

import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import "./Signup.css";

const Signup = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [messageError, setMessageError] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log("coucou");
      if (!email || !username || !password1 || !password2) {
        setMessageError("* Tous les champs doivent être saisis");
      } else if (password1 !== password2) {
        setMessageError("* Les mots de passe ne correspondent pas !");
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_PATH_SERVER}/user/signup`,
          { email, username, password: password1 }
        );
        if (response.data.token) {
          setMessageError("");
          setUser(response.data.token);
          history.push("/");
        } else {
          setUser("");
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setMessageError(
          "* Cet email/nom d'utilisateur a déjà un compte chez nous !"
        );
        setUser("");
      }
      console.log(error.message);
    }
  };

  // Render
  return (
    <div className="container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Inscription</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeHolder="Email"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeHolder="Nom d'utilisateur"
        />
        <input
          type="password"
          value={password1}
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
          placeHolder="Mot de passe"
        />
        <input
          type="password"
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
          placeHolder="Confirmer mot de passe"
        />
        <span className="message-error">{messageError}</span>
        <button type="submit">S'inscrire</button>
        <Link to="/login">Vous avez déjà un compte ? Connectez-vous !</Link>
      </form>
    </div>
  );
};

export default Signup;
