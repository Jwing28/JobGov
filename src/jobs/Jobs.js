import React from "react";
import { Panel, PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";

/*
  props.jobData
    for every object in array: job
      job.start_date
      job.organization_name
      job.position_title
      job.locations[0]
      job.url
*/

const Jobs = props => (
  <div className={props.componentClass}>
    <PageHeader>Job Results:</PageHeader>;
    <Panel>
      <Panel.Heading>
        <Panel.Title>Type: {props.jobType}</Panel.Title>
      </Panel.Heading>
      {props.jobDetails.length
        ? props.jobDetails.map((job, idx) => (
            <ListGroup key={idx}>
              <ListGroupItem bsStyle="info">
                Title: {job.position_title}
              </ListGroupItem>
              <ListGroupItem>
                Organization: {job.organization_name}
              </ListGroupItem>
              <ListGroupItem>Start: {job.start_date}</ListGroupItem>
              <ListGroupItem>
                {job.locations[0].split(",")[0] +
                  ", " +
                  job.locations[0].split(",")[1]}
              </ListGroupItem>
              <ListGroupItem>
                Link:{" "}
                <a href={job.url} target="_blank">
                  {job.url}
                </a>
              </ListGroupItem>
            </ListGroup>
          ))
        : ""}
    </Panel>
  </div>
);

export default Jobs;
