import React from "react";

const ProfileHeader = props => {
  const { profile } = props;
  const { status, company, website, social } = profile;
  const { twitter, facebook, linkedin, youtube, instagram } = social;

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img
                src={profile.user.avatar}
                alt="profile"
                className="rounded-circle"
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{profile.user.name}</h1>
            <p className="lead text-center">
              {status} {company ? <span>at {company}</span> : null}
            </p>
            <p>
              {website ? (
                <a href={website} className="text-white p-2" target="_blank">
                  <i className="fas fa-globe fa-2x" />
                </a>
              ) : null}
              {twitter ? (
                <a href={twitter} className="text-white p-2" target="_blank">
                  <i className="fab fa-twitter fa-2x" />
                </a>
              ) : null}
              {facebook ? (
                <a href={facebook} className="text-white p-2" target="_blank">
                  <i className="fab fa-facebook fa-2x" />
                </a>
              ) : null}
              {linkedin ? (
                <a href={linkedin} className="text-white p-2" target="_blank">
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              ) : null}
              {youtube ? (
                <a href={youtube} className="text-white p-2" target="_blank">
                  <i className="fab fa-youtube fa-2x" />
                </a>
              ) : null}
              {instagram ? (
                <a href={instagram} className="text-white p-2" target="_blank">
                  <i className="fab fa-instagram fa-2x" />
                </a>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
