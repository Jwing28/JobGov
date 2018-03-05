import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
/*
  {props.isMarkerShown && (
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
  )}
*/

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDuJb0JhPVYw37ptXpNO0_TLM-GjNdagik&libraries=geometry,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `90vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={7}
    center={
      props.locations.length
        ? { lat: props.locations[0].lat, lng: props.locations[0].lng }
        : { lat: -34.397, lng: 150.644 }
    }
  >
    {props.isMarkerShown && props.locations.length ? (
      props.locations.map((location, idx) => {
        return <Marker key={idx} position={location} />;
      })
    ) : (
      <Marker
        title="Example Marker"
        position={{ lat: -34.397, lng: 150.644 }}
      />
    )}
  </GoogleMap>
));

export default Map;
