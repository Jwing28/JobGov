import React from "react";
import { Panel } from "react-bootstrap";

const Crime = props => (
  <div>
    <Panel bsStyle="danger">
      <Panel.Heading>
        <Panel.Title componentClass="h3">Name of Business</Panel.Title>
      </Panel.Heading>
      <Panel.Body>Business Info</Panel.Body>
    </Panel>
  </div>
);

export default Crime;
