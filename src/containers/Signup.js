import React, { useState } from "react";
import axios from "axios";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

// components
import InputForm from "../components/Form/InputForm";

const Signup = ({ setUser }) => {
  // states
  const [messageError, setMessageError] = useState("");

  const history = useHistory();

  // default values Formik
  const getDefaultValues = {
    email: "",
    username: "",
    password1: "",
    password2: "",
  };

  // fields validation Yup
  const userSchema = Yup.object().shape({
    email: Yup.string()
      .email("*Email incorrect")
      .required("*Email obligatoire"),
    username: Yup.string()
      .min(3, "*Le pseudo est trop court")
      .max(49, "*Le pseudo est trop long")
      .required("*Le pseudo est obligatoire"),
    password1: Yup.string()
      .min(6, "*Mot de passe trop court")
      .required("*Le mot de passe est requis"),
    password2: Yup.string()
      .min(6, "*Mot de passe trop court")
      .required("*Le mot de passe est requis")
      .oneOf(
        [Yup.ref("password1"), null],
        "*Les mots de passe ne correspondent pas !"
      ),
  });

  // submit form
  const submit = async (values, actions) => {
    try {
      const { email, username } = { ...values };

      const response = await axios.post(
        `${process.env.REACT_APP_PATH_SERVER}/user/signup`,
        { email, username, password: values.password1 }
      );
      if (response.data.token) {
        setMessageError("");
        setUser(response.data.token, response.data.account.slug);
        history.push("/");
      } else {
        setUser("", "");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setMessageError(
          "*Cet email/nom d'utilisateur a déjà un compte chez nous !"
        );
        setUser("");
        actions.setSubmitting(false);
      }
      console.log(error.message);
    }
  };

  // Render
  return (
    <div className="container">
      <Formik
        onSubmit={submit}
        initialValues={getDefaultValues}
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
            <h1>Inscription</h1>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              component={InputForm}
            />
            <Field
              name="username"
              type="text"
              placeholder="Pseudo"
              component={InputForm}
            />
            <Field
              name="password1"
              type="password"
              placeholder="Mot de passe"
              component={InputForm}
            />
            <Field
              name="password2"
              type="password"
              placeholder="Confirmer Mot de passe"
              component={InputForm}
            />
            {messageError ? (
              <span className="message-error">{messageError}</span>
            ) : null}
            <button type="submit">S'inscrire</button>
            <Link to="/login">Vous avez déjà un compte ? Connectez-vous !</Link>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
