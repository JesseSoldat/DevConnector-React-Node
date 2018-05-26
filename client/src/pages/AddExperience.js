import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ExpForm from "../components/ExpForm";
import { addExperience } from "../actions/profile";

class AddExperiencePage extends Component {
  handleSubmit = exp => {
    console.log(exp);
    this.props.addExperience(exp, this.props.history);
  };

  render() {
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <ExpForm handleSubmit={this.handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addExperience })(withRouter(AddExperiencePage));
