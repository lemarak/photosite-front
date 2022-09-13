import axios from "axios";
import React, { useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

// components
import InputForm from "../components/Form/InputForm";

const Login = ({ setUser }) => {
  // states
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("");

  // navigate
  const navigate = useNavigate();

  // validation with Yup
  const userSchema = Yup.object().shape({
    email: Yup.string()
      .email("*Email incorrect")
      .required("*Email obligatoire"),
    password: Yup.string()
      .min(6, "*Mot de passe trop court")
      .required("*Le mot de passe est requis"),
  });

  // submit Form
  const submit = async (values, actions) => {
    try {
      const response = await axios.post("/user/login", { ...values });
      if (response.status === 200) {
        setMessageError("");
        setUser(response.data.user.token, response.data.user.account.slug);
        navigate("/");
      }
    } catch (error) {
      setMessageError("*Identifiants incorrects");
      setUser("", "");
      actions.setSubmitting(false);
      console.log(error.message);
    }
  };

  // Render
  return (
    <div className="container">
      <Formik
        onSubmit={submit}
        initialValues={{ email: "", password: "" }}
        validationSchema={userSchema}
        validateOnBlur={true}
        validateOnChange={false}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          errors,
          touched,
        }) => (
          <form className="user-form" onSubmit={handleSubmit}>
            <h1>Connexion</h1>

            <Field
              name="email"
              type="email"
              placeholder="Email"
              component={InputForm}
            />

            <Field
              name="password"
              type="password"
              placeholder="Mot de passe"
              component={InputForm}
            />
            {messageError ? (
              <span className="message-error">{messageError}</span>
            ) : null}
            <button type="submit" disabled={isSubmitting}>
              Se connecter
            </button>

            <Link to="/signup">
              Vous n'avez pas de compte ? Inscrivez-vous !
            </Link>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
