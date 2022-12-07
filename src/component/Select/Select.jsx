import React from "react";
import "./Select.css";

const Select = (props) => {
  return (
    <div className="input-group">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <select
        className={props.selectClassName}
        name={props.name}
        id={props.id}
        onBlur={props.onBlur}
        autoComplete="off"
        onChange={props.handleChange}
        value={props.value}
      >
        <option value="">Select Type</option>
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {props.errorMessage && (
        <span className="error">{props.errorMessage}</span>
      )}
    </div>
  );
};

export default Select;
