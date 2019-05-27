import React, { Component } from "react";
import CsvParse from "@vtex/react-csv-parse";

import "./App.css";

import Map from "./components/Map";
import Login from "./components/Login";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

export class App extends Component {
  state = {
    csvData: null,
    categories: null,
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

  handleData = data => {
    // console.log(Array.isArray(data));
    // processing csv directly from upload
    let points = [];
    let categories = [];

    data.map(e => {
      let point = {
        category: e.CATEGORY,
        address: `${e.ADDRESS}, ${e.CITY}, ${e.STATE}, ${e.ZIPCODE}`
      };

      return {
        points: points.push(point),
        categories: categories.push(e.CATEGORY)
      };
    });

    this.setState({
      csvData: points,
      categories
    });
  };

  render() {
    if (
      this.state.isAuthenticated &&
      Object.keys(this.state.user).length !== 0
    ) {
      const keys = ["CATEGORY", "STATE", "CITY", "ZIPCODE", "ADDRESS"];

      return (
        <div id="page-container">
          <Navbar />
          <div className="container" id="content-wrap">
            <div className="row justify-content-center">
              <h2>Select your CSV file</h2>
            </div>
            <div className="row justify-content-center">
              <CsvParse
                keys={keys}
                onDataUploaded={this.handleData}
                onError={this.handleError}
                render={onChange => (
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Upload</span>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        accept=".csv"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        onChange={onChange}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                )}
              />
            </div>
            {/* display map below */}
            <div className="row justify-content-center">
              <h5 style={{ marginBottom: "1.5rem" }}>
                The map will render below
              </h5>
            </div>
            <Map
              addresses={this.state.csvData}
              categories={this.state.categories}
            />
          </div>
          <Footer />
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
