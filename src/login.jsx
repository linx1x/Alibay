import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleEmailChange = event => {
    console.log("new account email: ", event.target.value);
    this.setState({ email: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();
    console.log("login form submitted");
    let data = new FormData();
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    let response = await fetch("/Login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody from login: ", responseBody);
    let body = JSON.parse(responseBody);
    if (body.success) {
      this.setState({ username: name });
    }
  };
  render = () => {
    if (this.state.email === undefined) {
      return (
        <div className="FormCenter">
          <form onSubmit={this.submitHandler}>
            <div className="FormField">
              <label className="FormField_Label" htmlFor="email">
                Enter your e-mail address
              </label>
              <input
                type="email"
                id="email"
                className="FormField_Input"
                placeholder="Your email here"
                name="email"
                value={this.state.email}
                onCHange={this.handleEmailChange}
              />
            </div>

            <div className="FormField">
              <label ClassName="FormField_Label" htmlFor="password">
                Enter your password
              </label>
              <input
                type="password"
                id="password"
                className="FormField_Input"
                placeholder="Your password here"
                name="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
              <div className="FormField">
                <button className="FormField_Button">Log In</button>
                <Link to="/signup" className="FormField_Link">
                  Don't have an account yet? Click here to sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      );
    }
  };
}
let Signup = connect()(UnconnectedLogin);
export default Signup;
