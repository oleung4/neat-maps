import React, { Component } from "react";
import CSVReader from "react-csv-reader";

import "./App.css";

import Map from "./components/Map";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import VerifyCol from "./components/VerifyCol";

export class App extends Component {
  state = {
    csvData: [],
    headers: null,
    categories: []
  };

  // first get headers from user input
  setHeaders = order => {
    this.setState({
      headers: order
    });
  };

  handleForce = data => {
    console.log(data);
    this.setState({
      csvData: data
    });
  };

  handleDarkSideForce = error => {
    console(error);
  };

  render() {
    return (
      <div id="page-container">
        <Navbar />
        <div className="container" id="content-wrap">
          <div className="row justify-content-center">
            <h2>Select your CSV file</h2>
          </div>
          <div className="row justify-content-center">
            <CSVReader
              cssClass="csv-reader-input"
              cssInputClass="csv-input"
              label="Select CSV with secret Death Star statistics"
              onFileLoaded={this.handleForce}
              onError={this.handleDarkSideForce}
              inputId="ObiWan"
              inputStyle={{ color: "red" }}
            />
          </div>
          <div className="row justify-content-center">
            <VerifyCol setHeaders={this.setHeaders} state={this.state} />
          </div>
          <div className="row justify-content-center" />
          {/* display map below */}
          {/* <div className="row justify-content-center">
              <h5 style={{ marginBottom: "1.5rem" }}>
                The map will render below
              </h5>
            </div>
            <Map
              addresses={this.state.csvData}
              categories={this.state.categories}
            /> */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
