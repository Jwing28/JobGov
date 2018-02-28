import React from "react";

export default props => (
  <div className={props.componentClass}>
    <h3>Created by: Jonathan Lee</h3>
    <img
      src={require("/Users/jonathanlee/Desktop/JobGov/src/assets/images/github.png")}
      alt="Github"
    />
    <img src={require("./assets/images/linkedin.png")} alt="LinkedIn" />
  </div>
);
