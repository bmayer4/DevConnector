import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner.js';
import { startGetProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

class Profiles extends Component {

    componentDidMount() {
        this.props.startGetProfiles();
    }
    
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
        profileItems = <Spinner/>
      } else if (Object.keys(profiles).length) {
        profileItems = profiles.map(profile => {
            return <ProfileItem key={profile._id} profile={profile} />
        })
    } else {
        profileItems = <h4>No Profiles found</h4>
    }

      return (
          <div className="profiles">
          <div className="container">
          <div className="row">
          <div className="col-md-12">
          <h1 className="display-4 text-center">Developer Profiles</h1>
          <p className="lead text-center">Browser and connect with developers</p>
          {profileItems}
          </div>
          </div>
          </div>
          </div>
      )
  }
}
    
Profiles.propTypes = {
  startGetProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

const mapDispatchToProps = (dispatch)  => ({
    startGetProfiles: () => dispatch(startGetProfiles())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
