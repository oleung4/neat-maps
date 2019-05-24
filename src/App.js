import React, { Component } from "react";
import CsvParse from "@vtex/react-csv-parse";

export class App extends Component {
  state = {
    csvRaw: null
  };

  handleData = data => {
    // console.log(data);
    // this.setState({ csvRaw: data });
    // console.log(this.state.csvRaw[0]);

    // // formating data for geocoding
    // this.state.csvRaw.map(e => {
    //   // allocate key-value format
    //   console.log(
    //     // `${e.CATEGORY}: ${e.ADDRESS}, ${e.CITY}, ${e.STATE}, ${e.ZIPCODE}`
    //     {
    //       category: e.CATEGORY,
    //       address: `${e.ADDRESS}, ${e.CITY}, ${e.STATE}, ${e.ZIPCODE}`
    //     }
    //   );
    // });

    // processing csv directly from upload
    let points = [];

    data.map(e => {
      let point = {
        category: e.CATEGORY,
        address: `${e.ADDRESS}, ${e.CITY}, ${e.STATE}, ${e.ZIPCODE}`
      };

      points.push(point);
    });

    this.setState({
      csvData: points
    });
  };

  render() {
    const keys = ["CATEGORY", "STATE", "CITY", "ZIPCODE", "ADDRESS"];

    return (
      <div className="container">
        <div className="row justify-content-center">
          <h1>upload csv here</h1>
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
      </div>
    );
  }
}

export default App;
