import React from "react";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";

const Fun = props => {
  if (!props.cityDetails) {
    return "Nothing to see here.";
  }

  let attractionCards = props.cityDetails.map(cityDetails => (
    <Panel key={cityDetails.data.subzone_id} bsStyle="success">
      <Panel.Heading>
        <Panel.Title componentClass="h3">{cityDetails.data.city}</Panel.Title>
      </Panel.Heading>
      <ListGroup>
        <ListGroupItem>Popularity: {cityDetails.data.popularity}</ListGroupItem>
        <ListGroupItem>
          Nightlife Index: {cityDetails.data.nightlife_index}
        </ListGroupItem>
        <ListGroupItem>
          Top Cuisine Types: {cityDetails.data.top_cuisines.join(", ")}
        </ListGroupItem>
      </ListGroup>
    </Panel>
  ));

  return <div>{attractionCards}</div>;
};

export default Fun;
