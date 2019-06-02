import React, { Component } from "react";
import CSVReader from "react-csv-reader";

import "./App.css";

import Map from "./components/Map-test";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import VerifyCol from "./components/VerifyCol";

export class App extends Component {
  state = {
    csvRaw: [],
    headers: null,
    csvData: []
  };

  // first get headers from user input
  setHeaders = order => {
    let csvData = [];
    // then build the json for each row
    this.state.csvRaw.map(row => {
      var jsonRow = {};
      row.forEach((currentValue, index) => {
        jsonRow[order[index]] = currentValue;
      });
      return {
        csvData: csvData.push(jsonRow)
      };
    });

    this.setState({
      headers: order,
      csvData
    });
  };

  handleForce = data => {
    console.log(data);
    this.setState({
      csvRaw: data
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
          <div className="row justify-content-center">
            <h5 style={{ marginBottom: "1.5rem" }}>
              The map will render below
            </h5>
          </div>
          <Map addresses={this.state.csvData} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
