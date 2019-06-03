import React, { Component } from "react";
import CSVReader from "react-csv-reader";

import "./App.css";

import Map from "./components/Map";
import Login from "./components/Login";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import VerifyCol from "./components/VerifyCol";
import Button from "./components/Button";

export class App extends Component {
  state = {
    currentFile: null,
    filenames: [],
    csvRaw: [],
    headers: null,
    csvData: [],
    isAuthenticated: false,
    user: {}
  };

  loginUser = data => {
    const user = {
      email: data.data.email,
      id: data.data.id
    };

    this.setState({
      isAuthenticated: true,
      user
    });
  };

  // first get headers from user input
  setHeaders = order => {
    // array of formatted addresses
    let csvData = [];
    // then build the json for each row
    this.state.csvRaw.map(row => {
      var jsonRow = {};
      // logic for key-value pairing for each address' columns
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
        filenames: [...this.state.filenames, this.state.currentFile],
        csvData
      },
      // callback function saving to localStorage - localStorage only supports strings as values
      localStorage.setItem(this.state.currentFile, JSON.stringify(csvData))
    );
    // console.log(JSON.parse(localStorage.getItem(this.state.currentFile)));
  };

  handleForce = (data, filename) => {
    console.log(data);
    this.setState({
      csvRaw: data,
      currentFile: filename
      // filenames: [...this.state.filenames, filename]
    });
  };

  handleDarkSideForce = error => {
    console(error);
  };

  fromLocalStorage = data => {
    if (data !== null) {
      console.log(data);
      this.setState({
        csvData: data
      });
    }
    return null;
  };

  render() {
    if (
      this.state.isAuthenticated &&
      Object.keys(this.state.user).length !== 0
    ) {
      return (
        <div id="page-container">
          <Navbar />
          <div className="container" id="content-wrap">
            <div className="row justify-content-center">
              <h2>First upload a CSV file</h2>
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
            <p className="text-center">or</p>
            <div className="row justify-content-center">
              <p className="mr-1">Select a recently uploaded CSV files</p>
              <Button
                filenames={this.state.filenames}
                fromLocalStorage={this.fromLocalStorage}
              />
            </div>
            <div className="row justify-content-center">
              <VerifyCol setHeaders={this.setHeaders} state={this.state} />
            </div>
            <div className="row justify-content-center" />
            {/* display map below */}
            <Map addresses={this.state.csvData} />
          </div>
          <Footer />{" "}
        </div>
      );
    } else {
      // login page if no user logged in
      return (
        <div id="page-container">
          <Navbar />
          <Login loginUser={this.loginUser} />
          <Footer />
        </div>
      );
    }
  }
}

export default App;
