import React, { Component } from "react";

import TextFieldGroup from "./TextFieldGroup";
import TextAreaFieldGroup from "./TextAreaFieldGroup";
import InputGroup from "./InputGroup";
import SelectListGroup from "./SelectListGroup";
import Spinner from "./Spinner";

class ProfileForm extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile) {
      // console.log("nextProps", nextProps.profile);
      this.hydrateState(nextProps.profile);
    }
  }

  hydrateState = profile => {
    const {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      social
    } = profile;

    const { twitter, facebook, linkedin, youtube, instagram } = social;

    // console.log("skills", skills);
    let skillsCSV;
    if (skills.length > 0) {
      skillsCSV = skills.join(",");
      // console.log("skillsCSV", skillsCSV);
    }

    this.setState(prevState => ({
      handle: handle || "",
      company: company || "",
      website: website || "",
      location: location || "",
      status: status || "",
      skills: skillsCSV || "",
      githubusername: githubusername || "",
      bio: bio || "",
      twitter: twitter || "",
      facebook: facebook || "",
      linkedin: linkedin || "",
      youtube: youtube || "",
      instagram: instagram || ""
    }));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSocialChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onToggleSocialIcons = e => {
    this.setState(prevState => ({
      displaySocialInputs: !prevState.displaySocialInputs
    }));
  };

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      social: {
        facebook: this.state.facebook,
        linkedin: this.state.linkedin,
        youtube: this.state.youtube,
        instagram: this.state.instagram,
        twitter: this.state.twitter
      }
    };

    this.props.submit(profileData);
  };

  render() {
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    const {
      displaySocialInputs,
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
      errors
    } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={twitter}
            onChange={this.onSocialChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={facebook}
            onChange={this.onSocialChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={linkedin}
            onChange={this.onSocialChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={youtube}
            onChange={this.onSocialChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={instagram}
            onChange={this.onSocialChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    let content = <Spinner />;

    const form = (
      <form onSubmit={this.onSubmit}>
        <h1 className="display-4 text-center">Edit Profile</h1>
        <small className="d-block pb-3">* = required fields</small>
        <TextFieldGroup
          placeholder="* Profile Handle"
          name="handle"
          value={handle}
          onChange={this.onChange}
          error={errors.handle}
          info="A unique handle for your profile URL. Your full name, company name, nickname"
        />
        <SelectListGroup
          placeholder="Status"
          name="status"
          value={status}
          onChange={this.onChange}
          options={options}
          error={errors.status}
          info="Give us an idea of where you are at in your career"
        />
        <TextFieldGroup
          placeholder="Company"
          name="company"
          value={company}
          onChange={this.onChange}
          error={errors.company}
          info="Could be your own company or one you work for"
        />
        <TextFieldGroup
          placeholder="Website"
          name="website"
          value={website}
          onChange={this.onChange}
          error={errors.website}
          info="Could be your own website or a company one"
        />
        <TextFieldGroup
          placeholder="Location"
          name="location"
          value={location}
          onChange={this.onChange}
          error={errors.location}
          info="City or city & state suggested (Boston, MA)"
        />
        <TextFieldGroup
          placeholder="* Skills"
          name="skills"
          value={skills}
          onChange={this.onChange}
          error={errors.skills}
          info="Please use a comma separated values (HTML,CSS,JavaScript,PHP)"
        />
        <TextFieldGroup
          placeholder="Github Username"
          name="githubusername"
          value={githubusername}
          onChange={this.onChange}
          error={errors.githubusername}
          info="If you want your latest repos and a Github link, include your username"
        />
        <TextAreaFieldGroup
          placeholder="Short Bio"
          name="bio"
          value={bio}
          onChange={this.onChange}
          error={errors.bio}
          info="Tell us a little bit about yourself"
        />

        <div className="mb-3 mt-2">
          <button
            className="btn btn-light"
            type="button"
            onClick={this.onToggleSocialIcons}
          >
            Add Social Network Links
          </button>
          <span className="text-muted">Optional</span>
        </div>
        {socialInputs}

        <input
          type="submit"
          value="Submit"
          className="btn btn-info btn-block mt-4"
        />
      </form>
    );

    if (
      this.props.profile !== null &&
      Object.keys(this.props.profile).length > 0
    ) {
      content = form;
    }

    return <div>{content}</div>;
  }
}

export default ProfileForm;
