const express = require("express");
const axios = require("axios");
const port = 8080;
const app = express();
const env = require("env2")(".env");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/jobs", (req, res) => {
  const { title, location } = JSON.parse(req.query.jobData);
  const jobUrl = `https://jobs.search.gov/jobs/search.json?query=${title}+jobs+in+${location}`;
  const latlngRequests = [];
  //sending back to client..
  let coordinates = [];
  let jobData = [];

  axios
    .get(jobUrl)
    .then(result => {
      jobData = result.data;
      jobData.forEach(job => {
        let [city, state] = job.locations[0].split(",");
        let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=${
          process.env.DB_GEOCODE_KEY
        }`;
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
          //api returned no location for city
          coordinates.push({ lat: 0, lng: 0 });
        }
      });
      res.send({ jobData: jobData, latlng: coordinates });
    })
    .catch(error => console.log("error: ", error));
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
