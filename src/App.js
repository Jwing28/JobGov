import React, { Component } from "react";
import "./App.css";
import About from "./About";
import Jobs from "./jobs/Jobs";
import Map from "./map/Map";
import States from "./data/states";

class App extends Component {
  state = {
    title: "",
    location: ""
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.title, this.state.location);
  };

  onInputChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    console.log(this.state.title, this.state.location);
    return (
      <div className="App">
        <form onSubmit={this.onSubmit} className="App-user-input">
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.onInputChange}
            placeholder="Job Title:"
          />
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.onInputChange}
            placeholder="State:"
            list="States"
          />
          <datalist id="States">
            {States.map(state => (
              <option key={state} value={state} onSelect={this.onInputChange} />
            ))}
          </datalist>
          <input type="submit" value="Search" />
        </form>
        <Jobs States={States} componentClass="App-jobs" />
        <Map componentClass="App-map" />
        <About componentClass="App-about" />
      </div>
    );
  }
}

export default App;
