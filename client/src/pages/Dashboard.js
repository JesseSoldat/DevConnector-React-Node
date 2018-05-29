import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../components/Spinner";
import Experience from "../components/Experience";
import Education from "../components/Education";
import ProfileActions from "../components/ProfileActions";
import { getCurrentProfile, deleteAccount } from "../actions/profile";

class DashboardPage extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    this.props.deleteAccount(this.props.history);
  };

  renderContent = user => {
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (profile && Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <div className="pb-5">
              <p className="lead text-muted">Welcome {user.name}</p>
              <ProfileActions />
              {profile.experience.length > 0 ? (
                <Experience experience={profile.experience} />
              ) : (
                <div>
                  <h4 className="mb-4 mt-2">No Experience added</h4>
                </div>
              )}
              {profile.education.length > 0 ? (
                <Education education={profile.education} />
              ) : (
                <div>
                  <h4 className="mb-4 mt-2">No Education added</h4>
                </div>
              )}
            </div>
            <div>
              <button className="btn btn-danger" onClick={this.onDeleteClick}>
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
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

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  withRouter(DashboardPage)
);
