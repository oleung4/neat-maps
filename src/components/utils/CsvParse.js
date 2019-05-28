// @vtex/react-csv-parse

import React from "react";

import Papa from "papaparse";
import { apply, compose, lift, splitAt, zipObj } from "ramda";

class CsvParse extends React.Component {
  handleFile = event => {
    const file = event.target.files[0];
    const keys = this.props.keys;
    const onDataUploaded = this.props.onDataUploaded;
    const onError = this.props.onError;

    Papa.parse(file, {
      skipEmptyLines: true,
      error: function(err, file, inputElem, reason) {
        onError({ err, file, inputElem, reason });
      },
      complete: function(results) {
        const data = results.data;

        // remove display headers
        // keep the first row
        // data.shift()

        // add api headers
        data.unshift(keys);

        // convert arrays to objects
        const formatedResult = compose(
          apply(lift(zipObj)),
          splitAt(1)
        )(data);

        // send result to state
        onDataUploaded(formatedResult);
      }
    });
  };

  render() {
    return this.props.render(this.handleFile);
  }
}

export default CsvParse;
