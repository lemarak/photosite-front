import axios from "axios";
import React, { useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
  // states
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("");

  // history
  const history = useHistory();

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
    console.log("coucou");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PATH_SERVER}/user/login`,
        { ...values }
      );
      if (response.status === 200) {
        setMessageError("");
        setUser(response.data.user.token, response.data.user.account.slug);
        history.push("/");
      } else {
        setMessageError("*Identifiants incorrects");
        setUser("", "");
        actions.setSubmitting(false);
      }
    } catch (error) {
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
            <span className="message-error">{messageError}</span>
            <input
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              placeholder="Email"
            />
            {errors.email && touched.email ? (
              <span className="message-error">{errors.email}</span>
            ) : null}
            <input
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              placeholder="Mot de passe"
            />
            {errors.password && touched.password ? (
              <span className="message-error">{errors.password}</span>
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
