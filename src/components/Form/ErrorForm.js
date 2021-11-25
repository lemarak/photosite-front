import React from "react";

const ErrorForm = (props) => {
  return (
    <div>
      <span className="message-error">{props.children}</span>
    </div>
  );
};

export default ErrorForm;
