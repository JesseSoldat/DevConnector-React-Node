import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../components/Spinner";
import Experience from "../components/Experience";
import ProfileActions from "../components/ProfileActions";
import { getCurrentProfile } from "../actions/profile";

class DashboardPage extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  renderContent = user => {
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (profile && Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <div style={{ marginBottom: "60px" }}>
              <button className="btn btn-danger">Delete My Account</button>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcom {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, profile }) => ({
  auth,
  profile
});

export default connect(mapStateToProps, { getCurrentProfile })(DashboardPage);
