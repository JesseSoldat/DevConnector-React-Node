import React, { Component } from "react";

import TextFieldGroup from "./TextFieldGroup";
import TextAreaFieldGroup from "./TextAreaFieldGroup";

class EduForm extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = this.state;

    const edu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    this.props.handleSubmit(edu);
  };

  render() {
    const {
      errors,
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      disabled
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          placeholder="* School"
          name="school"
          value={school}
          onChange={this.onChange}
          error={errors.school}
        />
        <TextFieldGroup
          placeholder="* Degree or Certification"
          name="degree"
          value={degree}
          onChange={this.onChange}
          error={errors.degree}
        />
        <TextFieldGroup
          placeholder="* Field of Study"
          name="fieldofstudy"
          value={fieldofstudy}
          onChange={this.onChange}
          error={errors.fieldofstudy}
        />
        <h6>From Date</h6>
        <TextFieldGroup
          name="from"
          type="date"
          value={from}
          onChange={this.onChange}
          error={errors.from}
        />
        <h6>To Date</h6>
        <TextFieldGroup
          name="to"
          type="date"
          value={to}
          onChange={this.onChange}
          error={errors.to}
          disabled={disabled ? "disabled" : ""}
        />
        <div className="form-check mb-4">
          <input
            type="checkbox"
            className="form-check-input"
            name="current"
            value={current}
            onChange={this.onCheck}
          />
          <label htmlFor="current" className="form-check-label">
            Current School
          </label>
        </div>
        <TextAreaFieldGroup
          placeholder="Program Description"
          name="description"
          value={description}
          onChange={this.onChange}
          error={errors.description}
          info="Tell us about the program that you were in"
        />
        <input
          type="submit"
          value="Submit"
          className="btn btn-info btn-block mt-4"
        />
      </form>
    );
  }
}

export default EduForm;
