import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, startGetCurrentProfile } from '../../actions/profileActions'; 
import { withRouter } from 'react-router-dom'; 


class EditProfile extends Component {

  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    githubusername: '',
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    errors: {}
  }

  componentDidMount() {
      this.props.startGetCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }

    if (nextProps.profile.profile) {  //{} is true, but not null

    const profile = nextProps.profile.profile;
    const { 
        company = '', 
        website = '', //so doesn't get sent to server undefined, seems to work even if undefined tho
        location = '',
        githubusername = '',
        bio = '',
        social: { twitter = '', facebook = '', instagram = '', youtube = '', linkedin = '' } = {}
      } = profile;

        const skillsCSV = profile.skills.join(',');


        this.setState({
            handle: profile.handle,
            company,
            website,
            location,
            status: profile.status,
            skills: skillsCSV,
            githubusername,
            bio,
            twitter,
            facebook,
            linkedin,
            youtube,
            instagram
           })

    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      githubusername: this.state.githubusername,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram
    }
    this.props.createProfile(profileData, this.props.history)
  }

  onChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    })
  }

  toggleSocial = () => {
    this.setState(prevState => ({
      displaySocialInputs: !prevState.displaySocialInputs
    }))
  }

  render() {

    const { errors, displaySocialInputs } = this.state;

    let socialInputs = (
        <div>
          <InputGroup 
          placeholder="Twitter profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={this.state.twitter}
          onChange={this.onChange}
          error={errors.twitter}
          />
          <InputGroup 
          placeholder="Facebook profile URL"
          name="facebook"
          icon="fab fa-facebook"
          value={this.state.facebook}
          onChange={this.onChange}
          error={errors.facebook}
          />
          <InputGroup 
          placeholder="Linkedin URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={this.state.linkedin}
          onChange={this.onChange}
          error={errors.linkedin}
          />
          <InputGroup 
          placeholder="Youtube channel URL"
          name="youtube"
          icon="fab fa-youtube"
          value={this.state.youtube}
          onChange={this.onChange}
          error={errors.youtube}
          />
          <InputGroup 
          placeholder="Instagram profile URL"
          name="instagram"
          icon="fab fa-instagram"
          value={this.state.instagram}
          onChange={this.onChange}
          error={errors.instagram}
          />
        </div>
      )

    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 1 },
      { label: 'Student', value: 'Student' },
      { label: 'Instructor', value: 'Instructor' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' },
    ]

    return (
  <div className="create-profile">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Profile</h1>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup 
              placeholder="* Profile Handle"
              name="handle"
              value={this.state.handle}
              onChange={this.onChange}
              error={errors.handle}
              info="A unique handle for your profile URL"
              />
              <SelectListGroup 
              placeholder="Status"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
              options={options}
              error={errors.status}
              info="Tell us where you are at in your career"
              />
              <TextFieldGroup 
              placeholder="Company"
              name="company"
              value={this.state.company}
              onChange={this.onChange}
              error={errors.company}
              info="Could be your own company or what that you work for"
              />
              <TextFieldGroup 
              placeholder="Website"
              name="website"
              value={this.state.website}
              onChange={this.onChange}
              error={errors.website}
              info="Your website"
              />
              <TextFieldGroup 
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              error={errors.location}
              info="City or city/state"
              />
              <TextFieldGroup 
              placeholder="Skills"
              name="skills"
              value={this.state.skills}
              onChange={this.onChange}
              error={errors.skills}
              info="Please use a comma seperated list"
              />
              <TextFieldGroup 
              placeholder="Github username"
              name="githubusername"
              value={this.state.githubusername}
              onChange={this.onChange}
              error={errors.githubusername}
              info="If you want your latest repos"
              />
              <TextAreaFieldGroup 
              placeholder="Short Bio"
              name="bio"
              value={this.state.bio}
              onChange={this.onChange}
              error={errors.bio}
              info="Tell us about yourself"
              />

              <div className="mb-3">
                <button type="button" onClick={this.toggleSocial} className="btn-light mr-2">Add Social Network Links</button>
                <span className="text-lead text-muted">Optional</span>
              </div>
              {displaySocialInputs ? socialInputs : null}
              <input type="submit" value="Submit" className="btn btn-info  btn-block mt-4"/>
            </form>
        </div>
      </div>
    </div>
 </div>
    )
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  startGetCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
})

const mapDispatchToProps = (dispatch)  => ({
    createProfile: (profileData, history) => dispatch(createProfile(profileData, history)),
    startGetCurrentProfile: () => dispatch(startGetCurrentProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));
