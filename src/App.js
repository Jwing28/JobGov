import React, { Component } from 'react';
import './App.css';
import About from './About';
import Jobs from './jobs/Jobs';
import Map from './map/Map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Jobs />
        <Map />
        <About about="about"/>
      </div>
    );
  }
}

export default App;
