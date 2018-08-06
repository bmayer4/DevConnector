import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { startGetProfileByHandle } from '../../actions/profileActions';


class Profile extends Component {

  componentDidMount() {
      if (this.props.match.params.handle) {
          this.props.startGetProfileByHandle(this.props.match.params.handle);
      }
  }

  componentWillReceiveProps(nextProps) {
      if (!nextProps.profile.profile && !nextProps.profile.loading) {
          console.log('pushing!');
        this.props.history.push('/not-found');
      }
  }

  render() {

    const { profile, loading} = this.props.profile;
    let profileContent;


        if (loading) {  profileContent = <Spinner /> } 
    
        if(profile && Object.keys(profile).length) {
        profileContent = (
            <div>
            <div className="row">
            <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
            </div>
            <div className="col-md-6" />
            </div>

            <ProfileHeader profile={profile}/>
            <ProfileAbout profile={profile}/>
            <ProfileCreds education={profile.education} experience={profile.experience} />
            {profile.githubusername ? ( <ProfileGithub username={profile.githubusername}/> ) : null}
            </div>
        )

    } 
    
    return (
      <div className="profiles">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                {profileContent}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    profile: state.profile
  })
  
  const mapDispatchToProps = (dispatch)  => ({
       startGetProfileByHandle: (handle) => dispatch(startGetProfileByHandle(handle))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
