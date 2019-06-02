import React, { Component } from "react";

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
      return (
        <div>
          <p>Upload your CSV file first</p>
        </div>
      );
    } else {
      return (
        <div>
          <p className="mb-1 text-center">Confirm CSV table headers</p>
          <form onSubmit={this.onSubmit}>
            <select
              onChange={this.onChange}
              name="column_one"
              value={this.state.column_one}
            >
              <option value="" disabled defaultValue>
                Column 1
              </option>
              <option value="ADDRESS">ADDRESS</option>
              <option value="CITY">CITY</option>
              <option value="STATE">STATE</option>
              <option value="ZIPCODE">ZIPCODE</option>
              <option value="CATEGORY">CATEGORY</option>
            </select>
            <select
              onChange={this.onChange}
              name="column_two"
              value={this.state.column_two}
            >
              <option value="" disabled defaultValue>
                Column 2
              </option>
              <option value="ADDRESS">ADDRESS</option>
              <option value="CITY">CITY</option>
              <option value="STATE">STATE</option>
              <option value="ZIPCODE">ZIPCODE</option>
              <option value="CATEGORY">CATEGORY</option>
            </select>
            <select
              onChange={this.onChange}
              name="column_three"
              value={this.state.column_three}
            >
              <option value="" disabled defaultValue>
                Column 3
              </option>
              <option value="ADDRESS">ADDRESS</option>
              <option value="CITY">CITY</option>
              <option value="STATE">STATE</option>
              <option value="ZIPCODE">ZIPCODE</option>
              <option value="CATEGORY">CATEGORY</option>
            </select>
            <select
              onChange={this.onChange}
              name="column_four"
              value={this.state.column_four}
            >
              <option value="" disabled defaultValue>
                Column 4
              </option>
              <option value="ADDRESS">ADDRESS</option>
              <option value="CITY">CITY</option>
              <option value="STATE">STATE</option>
              <option value="ZIPCODE">ZIPCODE</option>
              <option value="CATEGORY">CATEGORY</option>
            </select>
            <select
              onChange={this.onChange}
              name="column_five"
              value={this.state.column_five}
            >
              <option value="" disabled defaultValue>
                Column 5
              </option>
              <option value="ADDRESS">ADDRESS</option>
              <option value="CITY">CITY</option>
              <option value="STATE">STATE</option>
              <option value="ZIPCODE">ZIPCODE</option>
              <option value="CATEGORY">CATEGORY</option>
            </select>
            <div className="row justify-content-center">
              <input
                type="submit"
                value="Submit Headers"
                className="btn btn-info mt-2"
              />
            </div>
          </form>
        </div>
      );
    }
  }
}
