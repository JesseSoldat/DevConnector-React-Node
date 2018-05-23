import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { logoutUser } from "../actions/auth";

class NavBar extends Component {
  renderAuthLinks = (isAuth, user) => {
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.onLogout} className="nav-link">
            <img
              src={user.avatar}
              alt={user.name}
              className="rounded-circle"
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatar connected to your email to display an image"
            />{" "}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    if (isAuth) return authLinks;

    return guestLinks;
  };

  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { user, isAuth } = this.props.auth;

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggle-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto" />
            {this.renderAuthLinks(isAuth, user)}
          </div>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(NavBar));
