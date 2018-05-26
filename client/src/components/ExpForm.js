import React, { Component } from "react";

import TextFieldGroup from "./TextFieldGroup";
import TextAreaFieldGroup from "./TextAreaFieldGroup";
import { addExperience } from "../actions/profile";

class ExpForm extends Component {
  state = {
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

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
      company,
      title,
      location,
      from,
      to,
      current,
      description
    } = this.state;

    const experience = {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    };

    this.props.handleSubmit(experience);
  };

  render() {
    const {
      errors,
      company,
      title,
      location,
      from,
      to,
      disabled,
      current,
      description
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          placeholder="* Company"
          name="company"
          value={company}
          onChange={this.onChange}
          error={errors.company}
        />
        <TextFieldGroup
          placeholder="* Job Title"
          name="title"
          value={title}
          onChange={this.onChange}
          error={errors.title}
        />
        <TextFieldGroup
          placeholder="Location"
          name="location"
          value={location}
          onChange={this.onChange}
          error={errors.location}
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
            checked={current}
            onChange={this.onCheck}
            id="current"
          />
          <label htmlFor="current" className="form-check-label">
            Current Job
          </label>
        </div>
        <TextAreaFieldGroup
          placeholder="Job Description"
          name="description"
          value={description}
          onChange={this.onChange}
          error={errors.description}
          info="Tell us about the the position"
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

export default ExpForm;
