import React from "react";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";

//each card is going to have an image on the left
//and the description will be to its right.

//props.cityDetails
const Fun = props => {
  console.log("fun", props);
  if (!props.cityDetails) {
    return "Nothing to see here.";
  }
  //extract these from each item, and think about how you want to render the cards.
  //popularity, nightlife_index, top_cuisines,
  //locationDetailResponse.data. popularity, nightlife_index, top_cuisines(arr),

  let attractionCards = props.cityDetails.map(cityDetails => (
    <Panel key={cityDetails.data.subzone_id} bsStyle="primary">
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
