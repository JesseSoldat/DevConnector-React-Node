import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Spinner from "../components/Spinner";
import ProfileHeader from "../components/ProfileHeader";
import ProfileAbout from "../components/ProfileAbout";
import ProfileCreds from "../components/ProfileCreds";
import { getProfileByHandle } from "../actions/profile";

class ProfilePage extends Component {
  componentDidMount() {
    this.props.getProfileByHandle(this.props.match.params.handle);
  }

  render() {
    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      const { experience, education } = profile;
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds experience={experience} education={education} />
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = ({ profile }) => ({
  profile
});

export default connect(mapStateToProps, { getProfileByHandle })(ProfilePage);
