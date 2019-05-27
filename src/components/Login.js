import React, { Component } from "react";
import axios from "axios";
import qs from "querystring";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    console.log(userData);
    axios
      .post(
        "http://neat-mvp-api.herokuapp.com/v1/auth",
        qs.stringify(userData),
        config
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    // call the action
    // this.props.loginUser(userData);
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in with testy@testy.com // 123456
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Email Address"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>{" "}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
