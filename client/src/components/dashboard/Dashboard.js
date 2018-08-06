import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startGetCurrentProfile, deleteAccount, deleteExperience, deleteEducation } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {

    componentDidMount() {
        this.props.startGetCurrentProfile();
    }

    onDeleteClick = (e) => {
      this.props.deleteAccount();
    }

    onExpDeleteClick = (id) => {
      this.props.deleteExperience(id);
    }

    onEduDeleteClick = (id) => {
      this.props.deleteEducation(id);
    }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner/>
    } else if (Object.keys(profile).length) {
        dashboardContent = (
          <div>
          <p className="lead text-muted">
            Welcome <Link to={`/profile/${profile.handle}`}>{ user.name }</Link>
          </p>
          <ProfileActions />
          <Experience experience={profile.experience} expDeleteClick={this.onExpDeleteClick}/>
          <Education education={profile.education} eduDeleteClick={this.onEduDeleteClick} />
          <div style={{  marginBottom: '60px' }} />
          <button className="btn btn-sm btn-danger" onClick={this.onDeleteClick}>DELETE ACCOUNT</button>
          </div>
        )
        } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome { user.name }</p>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to='/create-profile' className="btn btn-lg btn-info">Create Profile</Link>
          </div>
        )
    }
    


    return (
      <div className="dashboard">
        <div className="container">
        <div className="row">
        <div className="col-md-12">
        <h1 className="display-4">Dashboard</h1>
        { dashboardContent }
        </div>
        </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  startGetCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
})

const mapDispatchToProps = (dispatch)  => ({
    startGetCurrentProfile: () => dispatch(startGetCurrentProfile()),
    deleteAccount: () => dispatch(deleteAccount()),
    deleteExperience: (id) => dispatch(deleteExperience(id)),
    deleteEducation: (id) => dispatch(deleteEducation(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
