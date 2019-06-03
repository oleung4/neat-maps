import React, { Component } from "react";

import SelectOption from "./common/SelectOption";

export default class VerifyCol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column_one: "",
      column_two: "",
      column_three: "",
      column_four: "",
      column_five: "",
      headers: null
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const order = [
      this.state.column_one,
      this.state.column_two,
      this.state.column_three,
      this.state.column_four,
      this.state.column_five
    ];

    // passing setHeader function as prop
    this.props.setHeaders(order);
  };

  render() {
    const { csvRaw, headers } = this.props.state;
    // need to add logic for hiding after headers are set
    if ((csvRaw.length > 0 && headers > 0) || csvRaw.length === 0) {
      return <div />;
    } else {
      const options = ["ADDRESS", "CITY", "STATE", "ZIPCODE", "CATEGORY"];

      return (
        <div>
          <p className="mb-1 text-center">Confirm CSV table headers</p>
          <form onSubmit={this.onSubmit}>
            <SelectOption
              onChange={this.onChange}
              name="column_one"
              title="Column 1"
              options={options}
              value={this.state.column_one}
            />
            <SelectOption
              onChange={this.onChange}
              name="column_two"
              title="Column 2"
              options={options}
              value={this.state.column_two}
            />
            <SelectOption
              onChange={this.onChange}
              name="column_three"
              title="Column 3"
              options={options}
              value={this.state.column_three}
            />
            <SelectOption
              onChange={this.onChange}
              name="column_four"
              title="Column 4"
              options={options}
              value={this.state.column_four}
            />
            <SelectOption
              onChange={this.onChange}
              name="column_five"
              title="Column 5"
              options={options}
              value={this.state.column_five}
            />
            <div className="row justify-content-center">
              <p>
                <small>* each column should be unique</small>
              </p>
            </div>

            <div className="row justify-content-center">
              <input
                type="submit"
                value="Submit Headers"
                className="btn btn-info mb-4"
              />
            </div>
          </form>
        </div>
      );
    }
  }
}
