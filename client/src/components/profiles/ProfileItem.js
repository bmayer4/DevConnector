import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = (props) => {

    const { profile } = props;

  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">

            <div className="col-2">
                <img className="img rounded-circle" src={profile.user.avatar} alt="user" />
            </div>

            <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>{profile.status} { profile.company ? <span>at {profile.company}</span> : null}</p>
            <p>{profile.location ? profile.location : null}</p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">View Profile</Link>
            </div>

            <div className="col-md-4 d-none d-md-block">
                <h4>Skill Set</h4>
                <ul className="list-group">
                {profile.skills.slice(0, 4).map((skill, i) => {
                    return (
                        <li key={i} className="list-group-item">
                            <i className="fa fa-check pr-1"></i>{skill}
                        </li>
                    )
                })}
                </ul>
            </div>

         </div>
      </div>
  )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;
