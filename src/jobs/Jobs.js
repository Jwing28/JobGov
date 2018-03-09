import React from "react";
import formatDate from "../utils/utils";
import Fun from "./fun/Fun";
import Crime from "./crime/Crime";
import {
  Panel,
  PageHeader,
  ListGroup,
  ListGroupItem,
  Tab,
  Tabs
} from "react-bootstrap";

const Jobs = props => {
  console.log("jobs", props);
  return (
    <div className={props.componentClass}>
      <PageHeader>{"USA Jobs"}</PageHeader>
      {props.jobDetails.length ? (
        <Panel>
          <Tabs defaultActiveKey={3} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Jobs">
              {props.jobDetails.map(job => (
                <ListGroup key={job.id}>
                  <ListGroupItem bsStyle="info">
                    {job.position_title}
                  </ListGroupItem>
                  <ListGroupItem>
                    Organization: {job.organization_name}
                  </ListGroupItem>
                  <ListGroupItem>
                    Application Window: {formatDate(job.start_date)} -{" "}
                    {formatDate(job.end_date)}
                  </ListGroupItem>
                  <ListGroupItem>
                    {job.locations[0].split(",")[0] +
                      ", " +
                      job.locations[0].split(",")[1]}
                  </ListGroupItem>
                  <ListGroupItem>
                    <a href={job.url} target="_blank">
                      {"Click here for full description"}
                    </a>
                  </ListGroupItem>
                </ListGroup>
              ))}
            </Tab>
            <Tab eventKey={2} title="Fun">
              <Fun
                cityDetails={
                  props.cityDetails.length ? props.cityDetails : null
                }
              />
            </Tab>
            <Tab eventKey={3} title="Crime">
              <Crime />
            </Tab>
          </Tabs>
        </Panel>
      ) : null}
    </div>
  );
};

export default Jobs;
