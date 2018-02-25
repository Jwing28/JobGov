import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import About from "./About";
import Jobs from "./jobs/Jobs";
import Map from "./map/Map";
import States from "./data/states";
import { Button, FormGroup, FormControl } from "react-bootstrap";

class App extends Component {
  state = {
    title: "",
    location: "",
    lat: 0,
    lng: 0
  };
  // getValidationState() {
  //   const length = this.state.value.length;
  //   if (length > 10) return "success";
  //   else if (length > 5) return "warning";
  //   else if (length > 0) return "error";
  //   return null;
  // }

  onSubmit = e => {
    e.preventDefault();
    axios
      .get("http://localhost:8080/jobs", {
        params: {
          jobData: { title: this.state.title, location: this.state.location }
        }
      })
      .then(result => {
        //result.data.jobdata & result.data.latlng
        //apply jobdata to job section
        //latlng to map
        let { jobData, latlng } = result.data;
      })
      .catch(error => console.log("error: ", error));
  };

  onInputChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit} className="App-user-input">
          <FormGroup>
            <FormControl
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.onInputChange}
              placeholder="Job Title:"
            />

            <FormControl
              type="text"
              name="location"
              value={this.state.location}
              onChange={this.onInputChange}
              placeholder="State:"
              list="States"
            />
            <datalist id="States">
              {States.map(state => (
                <option
                  key={state}
                  value={state}
                  onSelect={this.onInputChange}
                />
              ))}
            </datalist>
            <Button bsStyle="success" type="submit">
              Search
            </Button>
          </FormGroup>
        </form>
        <Jobs States={States} componentClass="App-jobs" />
        <Map
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          location={
            this.state.lat
              ? { lat: this.state.lat, lng: this.state.lng }
              : { lat: -34.397, lng: 150.644 }
          }
        />
        <About componentClass="App-about" />
      </div>
    );
  }
}

export default App;

// axios
//   .get(jobUrl)
//   .then(jobData => {
//     //* * * probably should pass all of this to child component.
//     //result.data is an array. result.data.map -> job
//     //job.locations[0] gives "city, state"
//     //job.organization_name
//     //job.position_title
//     //job.start_date
//     //job.url
//
//     //test one location
//
//     let [city, state] = jobData.data[0].locations[0].split(","); //['Tampa','FL']
//     let locationURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=AIzaSyA9cf1dlbUDpsPGSIMCO6Q8XS0vgHtqoqM`;
//     console.log(jobData);
//     //took result from gov jobs and passing city / state here
//     return axios.get(locationURL);
//   })
//   .then(latlong => {
//     //latlong.data.result[0].geometry.location -> .lat or .lng
//     let { lat, lng } = latlong.data.results[0].geometry.location;
//     lat = parseInt(lat, 10);
//     lng = parseInt(lng, 10);
//
//     this.setState({ lat: lat, lng: lng }); //react-google-maps requires number values
//   })
//   .catch(error => console.log("error", error));
