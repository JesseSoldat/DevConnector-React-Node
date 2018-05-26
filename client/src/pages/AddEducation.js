import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import EduForm from "../components/EduForm";
import { addEducation } from "../actions/profile";

const AddEducationPage = props => {
  const handleSubmit = edu => {
    props.addEducation(edu, props.history);
  };

  return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any school, bootcamp, etc that you have attended
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <EduForm handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { addEducation })(withRouter(AddEducationPage));
