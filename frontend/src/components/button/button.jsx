import React from "react";
import classes from "./button.module.css";

const Button = (props) => {
  return (
    <React.Fragment>
      <button
        type={props.type}
        className={`${classes.button} ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </React.Fragment>
  );
};

export default Button;
