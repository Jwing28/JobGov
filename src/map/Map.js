import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

//going to need to loop through each pair of lat/lng
//to create x number of markers on the map...
// {props.isMarkerShown && (props.markers.map(marker=> {
//   <Marker position={{ lat: marker.lat, lng: marker.lng }} />
// }))}

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}
      center={{ lat: props.location.lat, lng: props.location.lng }}
    >
      {props.isMarkerShown && (
        <Marker
          position={{ lat: props.location.lat, lng: props.location.lng }}
        />
      )}
    </GoogleMap>
  ))
);

export default Map;

//export default props => <div className={props.componentClass}>Map</div>;

//lat: -34.397, lng: 150.644
