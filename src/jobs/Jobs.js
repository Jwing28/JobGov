import React from "react";
import formatDate from "../utils/utils";
import { Panel, PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";

const Jobs = props => (
  <div className={props.componentClass}>
    <PageHeader>{"USA Jobs"}</PageHeader>
    <Panel>
      <Panel.Heading>
        <Panel.Title>Job Title: {props.jobType}</Panel.Title>
      </Panel.Heading>
      {props.jobDetails.length
        ? props.jobDetails.map(job => (
            <ListGroup key={job.id}>
              <ListGroupItem bsStyle="info">
                Title: {job.position_title}
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
          ))
        : null}
    </Panel>
  </div>
);

export default Jobs;
