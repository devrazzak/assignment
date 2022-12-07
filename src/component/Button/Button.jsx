import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button
      className={props.className}
      type={props.type}
      onClick={props.handleButton}
      disabled={props.loading}
    >
      {props.text}
      {props.loading && <div className="loader"></div>}
    </button>
  );
};

export default Button;
