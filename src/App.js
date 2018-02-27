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
    jobDetails: [],
    coordinates: []
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
    const jobUrl = `https://jobs.search.gov/jobs/search.json?query=${
      this.state.title
    }+jobs+in+${this.state.location}`;
    const latlngRequests = [];
    let coordinates = [],
      jobData = [];

    axios
      .get(jobUrl)
      .then(result => {
        jobData = result.data;
        jobData.forEach(job => {
          let [city, state] = job.locations[0].split(",");
          //gh-pages doesn't host node
          let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=AIzaSyA9cf1dlbUDpsPGSIMCO6Q8XS0vgHtqoqM`;
          latlngRequests.push(axios.get(geocodeUrl));
        });
        //google maps geolocation requests
        return axios.all(latlngRequests);
      })
      .then(latlng => {
        latlng.forEach(location => {
          if (location.data.results.length) {
            location.data.results.forEach(city => {
              coordinates.push(city.geometry.location);
            });
          } else {
            //api returned no location for city, provide default location
            //later not to user this is not a valid location
            coordinates.push({ lat: 0, lng: 0 });
          }
        });
        console.log(jobData, coordinates);
        this.setState({ jobDetails: jobData, coordinates: coordinates });
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
        <Jobs
          States={States}
          jobType={this.state.title}
          jobDetails={this.state.jobDetails}
          componentClass="App-jobs"
        />
        <Map
          isMarkerShown
          locations={
            this.state.coordinates
              ? this.state.coordinates
              : { lat: -34.397, lng: 150.644 }
          }
        />
        <About componentClass="App-about" />
      </div>
    );
  }
}

export default App;
