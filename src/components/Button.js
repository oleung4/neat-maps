import React, { Component } from "react";

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCsv: "null"
    };
  }

  onChange = e => {
    var getFromLocal = key => {
      if (localStorage.hasOwnProperty(key)) {
        return JSON.parse(localStorage.getItem(key));
      }
      return null;
    };

    this.setState({
      selectedCsv: e.target.value
    });

    console.log(getFromLocal(e.target.value));
  };

  render() {
    const optionList = this.props.filenames.map((filename, index) => (
      <option key={index} value={filename}>
        {filename}
      </option>
    ));

    return (
      <div>
        <select
          onChange={this.onChange}
          name="selectedCsv"
          value={this.state.selectedCsv}
        >
          <option value="" defaultValue>
            select
          </option>
          {optionList}
        </select>
      </div>
    );
  }
}
