import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Jobs from "./jobs/Jobs";
import Map from "./map/Map";
import StateData from "./data/states";
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
    cityAttractions: [],
    stateCrimeData: [],
    error: false
  };

  onSubmit = e => {
    e.preventDefault();
    const latlngRequests = [];
    let coordinatesArr = [];
    let jobData = [];
    const jobUrl = `https://jobs.search.gov/jobs/search.json?query=${
      this.state.title
    }+jobs+in+${this.state.location}`;
    let zomatoLocationURL = `https://developers.zomato.com/api/v2.1/locations?query=${
      this.state.location
    }&count=5`;
    const zomatoKey = "3fbaba438ee77b85d793b1814f7423df";
    let locationDetailRequests = [];
    //retrieve crime data first because user has already selected the state
    let crimeURL = `https://api.usa.gov/crime/fbi/ucr/estimates/states/${
      StateData.stateAbbreviations[this.state.location]
    }?page=1&per_page=29&output=json&api_key=6p1cCPtlsMObrbKOzjvs4PmPALwbI923pS1RqEFJ`;

    //make error known to user
    if (this.state.error) {
      this.setState({ error: !this.state.error });
    }

    axios
      .get(crimeURL, {
        headers: {
          Accept: "application/json"
        }
      })
      .then(crimeHistory => {
        this.setState({ stateCrimeData: crimeHistory.data.results });
      })
      .catch(error =>
        console.log(`Error occurred requesting crime data: ${error}`)
      );

    axios
      .get(jobUrl)
      .then(result => {
        jobData = result.data;
        jobData.forEach(job => {
          let [city, state] = job.locations[0].split(",");
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
              coordinatesArr.push(city.geometry.location);
            });
          } else {
            //api returned no location for city, provide default location
            //later: note to user this is not a valid location
            coordinatesArr.push({ lat: 0, lng: 0 });
          }
        });
        //issue w/ job data? show error user can understand
        if (jobData.length) {
          this.setState({ jobDetails: jobData, coordinates: coordinatesArr });
        } else {
          this.setState({ error: !this.state.error });
        }
      })
      .catch(error => console.log("error: ", error));
    //attractions api
    axios
      .get(zomatoLocationURL, {
        headers: {
          Accept: "application/json",
          "user-key": zomatoKey
        }
      })
      .then(zomatoLocations => {
        let locations = zomatoLocations.data.location_suggestions.filter(
          location => {
            let cityName = location.title.split(", ");
            return (
              location.country_name === "United States" &&
              cityName[cityName.length - 1] === this.state.location
            );
          }
        );
        //now you have all locations in us that match the state user provided
        locations.forEach(location => {
          let zomatoLocationDetailsURL = `https://developers.zomato.com/api/v2.1/location_details?entity_id=${
            location.entity_id
          }&entity_type=${location.entity_type}`;
          locationDetailRequests.push(
            axios.get(zomatoLocationDetailsURL, {
              headers: {
                Accept: "application/json",
                "user-key": zomatoKey
              }
            })
          );
        });
        return axios.all(locationDetailRequests);
      })
      .then(locationDetailResponse => {
        this.setState({ cityAttractions: locationDetailResponse });
      })
      .catch(error => console.log(`An error occurred with yelp: ${error}`));
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
                  placeholder="Title or Keyword"
                  required
                />
                <ControlLabel>State</ControlLabel>{" "}
                <FormControl
                  type="text"
                  name="location"
                  value={this.state.location}
                  onChange={this.onInputChange}
                  placeholder="Type or Dropdown"
                  list="States"
                  required
                />
                <datalist id="States">
                  {StateData.States.map(state => (
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
              States={StateData.States}
              jobType={this.state.title}
              jobDetails={this.state.jobDetails}
              cityDetails={this.state.cityAttractions}
              crimeHistory={this.state.stateCrimeData}
              location={this.state.location || null}
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
