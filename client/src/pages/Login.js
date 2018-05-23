import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "../components/TextFieldGroup";
import { loginUser } from "../actions/auth";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {}

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.loginUser({ email, password }, this.props.history);
  };
  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps, { loginUser })(withRouter(LoginPage));
