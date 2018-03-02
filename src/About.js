import React from "react";

export default props => (
  <div className={props.componentClass}>
    <h3>Created by: Jonathan Lee</h3>
    <a
      href="https://github.com/jwing28"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={require("/Users/jonathanlee/Desktop/JobGov/src/assets/images/github.png")}
        alt="Github"
      />
    </a>
    <a
      href="https://www.linkedin.com/in/jwingz"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={require("./assets/images/linkedin.png")} alt="LinkedIn" />
    </a>
  </div>
);
