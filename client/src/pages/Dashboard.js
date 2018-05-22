import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DashboardPage extends Component {
  renderContent = user => {
    let dashboardContent;

    if (false) {
      //spinner
    } else {
      if (true) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
          </div>
        );
      }
    }
    return dashboardContent;
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {this.renderContent(user)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(DashboardPage);
