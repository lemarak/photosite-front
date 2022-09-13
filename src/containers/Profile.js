import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/user/${params.slug}`);
      console.log(response.data);
      const data = response.data;
      setEmail(data.email);
      setUsername(data.account.username);
      setLastname(data.account.lastname);
      setFirstname(data.account.firstname);
      setCity(data.account.city);
      setPhone(data.account.phone);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("city", city);
      formData.append("phone", phone);

      const response = await axios.post("/user/update/", formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        console.log("Update OK");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Render
  return token ? (
    <div className="container">
      <h1>Mon profil</h1>
      <form className="user-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Nom d'utilisateur"
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          placeholder="Nom"
        />
        <input
          type="text"
          value={firstname}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          placeholder="Prénom"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          placeholder="Ville"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="Téléphone"
        />

        <span className="message-error">{messageError}</span>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  ) : (
    <Navigate to={{ pathname: "/login", state: { fromPublish: true } }} />
  );
};

export default Profile;
