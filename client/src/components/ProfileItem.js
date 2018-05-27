import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = props => {
  const { profile } = props;

  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-2">
          <img
            src={profile.user.avatar}
            alt="profile"
            className="rounded-circle"
          />
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          <h3>{profile.user.name}</h3>
          <p>
            {profile.status}{" "}
            {profile.company ? <span>at {profile.company}</span> : null}
          </p>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
