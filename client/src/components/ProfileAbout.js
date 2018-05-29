import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({ profile }) => {
  let name = profile.user.name;
  name = name[0].toUpperCase() + name.slice(1, name.length);
  let firstName = name.trim().split(" ")[0];

  const skills = profile.skills.map((skill, i) => (
    <div key={i} className="p-3">
      <i className="fa fa-check" /> {skill}
    </div>
  ));

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light">
          <h3 className="text-center text-info">{firstName}'s Bio</h3>
          <p className="lead text-center">
            {profile.bio ? (
              <span>{profile.bio}</span>
            ) : (
              <span>{firstName} does not have a bio</span>
            )}
          </p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
