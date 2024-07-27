import React, { useCallback, useState } from "react";
import "../styles/FormInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, width, errMessage, options, ...input } = props;
  return (
    <div style={{ width: width }} className="input">
      <label>
        {label}
        <span className="req">{props.required ? "*" : ""}</span>
      </label>
      {props.type === "select" ? (
        <select
          {...input}
          focused={focused.toString()}
          onBlur={() => setFocused(true)}
        >
          {options?.map((item, i) => (
            <option key={i} value={props.name === "isdCode" ? item : item.iso2}>
              {props.name === "isdCode" ? item : item.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...input}
          focused={focused.toString()}
          onBlur={() => setFocused(true)}
        />
      )}

      <span className="error">{errMessage}</span>
    </div>
  );
};

export default FormInput;
