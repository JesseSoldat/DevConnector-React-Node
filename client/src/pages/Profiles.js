import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../components/Spinner";
import { getProfiles } from "../actions/profile";

class ProfilesPage extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    console.log(this.props.profile);

    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map((profile, i) => (
          <div key={i}>Profile #{i}</div>
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfilesPage.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = ({ profile }) => ({
  profile
});

export default connect(mapStateToProps, { getProfiles })(ProfilesPage);
