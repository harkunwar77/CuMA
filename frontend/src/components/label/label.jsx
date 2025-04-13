import React from "react";
import classes from "./label.module.css";

const Label = props => {
    return (
      <span className={`${classes.label} ${props.className}`}>
        {props.children}
      </span>
    );
  };
  
  export default Label;
