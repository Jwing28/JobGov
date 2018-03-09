import React from "react";
import { Panel } from "react-bootstrap";

//each card is going to have an image on the left
//and the description will be to its right.

const Fun = props => (
  <div>
    <Panel bsStyle="primary">
      <Panel.Heading>
        <Panel.Title componentClass="h3">Name of Business</Panel.Title>
      </Panel.Heading>
      <Panel.Body>Business Info</Panel.Body>
    </Panel>
  </div>
);

export default Fun;
