import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProfileForm from "../components/ProfileForm";
import { createProfile, getCurrentProfile } from "../actions/profile";

class EditProfilePage extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleSubmit = formData => {
    console.log("form", formData);
    this.props.createProfile(formData, this.props.history);
  };

  render() {
    const { profile } = this.props;

    return (
      <div className="edit-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <ProfileForm
                profile={profile.profile}
                submit={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfilePage.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = ({ profile, errors }) => ({
  profile,
  errors
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(
  withRouter(EditProfilePage)
);
