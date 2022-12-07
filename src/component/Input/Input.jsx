import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <div className="input-group">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        className={props.inputClassName}
        type={props.type}
        name={props.name}
        id={props.id}
        onBlur={props.onBlur}
        autoComplete="off"
        onChange={props.handleChange}
        placeholder={props.placeholder}
        value={props.value}
      />
      {props.errorMessage && (
        <span className="error">{props.errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
