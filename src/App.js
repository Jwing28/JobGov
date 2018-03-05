import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Jobs from "./jobs/Jobs";
import Map from "./map/Map";
import States from "./data/states";
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  Grid,
  Row,
  Tooltip
} from "react-bootstrap";

class App extends Component {
  state = {
    title: "",
    location: "",
    jobDetails: [],
    coordinates: [],
    error: false
  };

  onSubmit = e => {
    e.preventDefault();
    const latlngRequests = [];
    let coordinates = [];
    let jobData = [];
    const jobUrl = `https://jobs.search.gov/jobs/search.json?query=${
      this.state.title
    }+jobs+in+${this.state.location}`;
    if (this.state.error) {
      this.setState({ error: !this.state.error });
    }

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
        if (jobData.length) {
          this.setState({ jobDetails: jobData, coordinates: coordinates });
        } else {
          this.setState({ error: !this.state.error });
        }
      })
      .catch(error => console.log("error: ", error));
  };

  onInputChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <Form onSubmit={this.onSubmit} className="App-user-input" inline>
              <FormGroup>
                <ControlLabel>Job Title</ControlLabel>{" "}
                <FormControl
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.onInputChange}
                  placeholder="enter title or keyword"
                  required
                />
                <ControlLabel>State</ControlLabel>{" "}
                <FormControl
                  type="text"
                  name="location"
                  value={this.state.location}
                  onChange={this.onInputChange}
                  placeholder="type or use dropdown"
                  list="States"
                  required
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
                <Button bsStyle="primary" type="submit">
                  Search
                </Button>
              </FormGroup>
            </Form>
          </Col>
          {this.state.error ? (
            <div>
              <Tooltip placement="right" className="in" id="tooltip-right">
                Sorry, we could not find that job, please attempt again.
              </Tooltip>
            </div>
          ) : null}
        </Row>
        <Row className="show-grid">
          <Col xs={12} md={3}>
            <Jobs
              States={States}
              jobType={this.state.title}
              jobDetails={this.state.jobDetails}
              componentClass="App-jobs"
            />
          </Col>
          <Col xs={12} md={9}>
            <Map
              isMarkerShown
              locations={
                this.state.coordinates
                  ? this.state.coordinates
                  : { lat: -34.397, lng: 150.644 }
              }
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

/*

<div className="App">
  <Form onSubmit={this.onSubmit} className="App-user-input" inline>
    <FormGroup>
      <ControlLabel>Job Title</ControlLabel>{" "}
      <FormControl
        type="text"
        name="title"
        value={this.state.title}
        onChange={this.onInputChange}
        placeholder="enter title or keyword"
        required
      />
      <ControlLabel>State</ControlLabel>{" "}
      <FormControl
        type="text"
        name="location"
        value={this.state.location}
        onChange={this.onInputChange}
        placeholder="type or use dropdown"
        list="States"
        required
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
  </Form>
  {this.state.error ? (
    <div>
      <Tooltip placement="right" className="in" id="tooltip-right">
        Sorry, we could not find that job, please attempt again.
      </Tooltip>
    </div>
  ) : null}
  <div className="App-results">
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
</div>

*/
