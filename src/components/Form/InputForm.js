import React from "react";
import { ErrorMessage } from "formik";

import ErrorForm from "./ErrorForm";
// With Formik

const InputForm = ({ field, form, ...props }) => {
  return (
    <div className="form-group">
      <input {...field} {...props} />
      <ErrorMessage name={field.name} component={ErrorForm} />
    </div>
  );
};

export default InputForm;
