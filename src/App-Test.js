import React, { Component } from "react";
import CSVReader from "react-csv-reader";

import "./App.css";

import Map from "./components/Map-test";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import VerifyCol from "./components/VerifyCol";

export class App extends Component {
  state = {
    currentFile: null,
    filenames: [],
    csvRaw: [],
    headers: null,
    csvData: []
  };

  // first get headers from user input
  setHeaders = order => {
    // array of formatted addresses
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

    this.setState(
      {
        headers: order,
        csvData
      },
      // localStorage only supports strings as values
      localStorage.setItem(this.state.currentFile, JSON.stringify(csvData))
    );
    console.log(JSON.parse(localStorage.getItem(this.state.currentFile)));
  };

  handleForce = (data, filename) => {
    console.log(data);
    this.setState({
      csvRaw: data,
      currentFile: filename,
      filenames: [...this.state.filenames, filename]
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
              // label="Select CSV with secret Death Star statistics"
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
            <p style={{ marginBottom: "1.5rem", marginTop: "1.5rem" }}>
              The map will render below
            </p>
          </div>
          <Map addresses={this.state.csvData} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
