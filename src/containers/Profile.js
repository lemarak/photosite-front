import React, { useEffect, useState } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import axios from "axios";

import "./Profile.css";

const Profile = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState({});
  const [messageError, setMessageError] = useState("");

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_PATH_SERVER}/user/${params.slug}`
      );
      console.log(response.data);
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
  };

  // Render
  return token ? (
    <div className="container">
      <h1>Mon profil</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
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
          type="text"
          value={lastname}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          placeHolder="Nom"
        />
        <input
          type="text"
          value={firstname}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          placeHolder="Prénom"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          placeHolder="Ville"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeHolder="Téléphone"
        />

        <span className="message-error">{messageError}</span>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  ) : (
    <Redirect to={{ pathname: "/login", state: { fromPublish: true } }} />
  );
};

export default Profile;
