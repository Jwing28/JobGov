import React from "react";
import { Panel, Table } from "react-bootstrap";

const Crime = props => {
  if (!props.crimeHistory) {
    return "Nothing to see here.";
  }

  let mostRecentYear = props.crimeHistory.slice().pop();
  return (
    <div>
      <Panel bsStyle="danger">
        <Panel.Heading>
          <Panel.Title componentClass="h3">
            {props.state}-{mostRecentYear.year}-Per 100k
          </Panel.Title>
        </Panel.Heading>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Year</th>
              <th>Violence</th>
              <th>Homicides</th>
            </tr>
          </thead>
          <tbody>
            {props.crimeHistory.length
              ? props.crimeHistory.map((year, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{year.year}</td>
                    <td>
                      {(year.violent_crime / year.population * 100000).toFixed(
                        2
                      )}
                    </td>
                    <td>
                      {(year.homicide / year.population * 100000).toFixed(2)}
                    </td>
                  </tr>
                ))
              : "No data available"}
          </tbody>
        </Table>
      </Panel>
    </div>
  );
};

export default Crime;
