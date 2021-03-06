import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {

  onLogout = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    //this.props.clearCurrentProfile();     //teacher had this, fixes bug where users public page would spin when logout
  }

  render() {

    const { isAuthenticated, user} = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
      <Link className="nav-link" to='/feed'>Post Feed</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to='/register'>Dashboard</Link>
      </li>
      <li className="nav-item">
        <a href="#" onClick={this.onLogout} className="nav-link"><img src={user.avatar} alt={user.name}
        className="rounded-circle"
        style={{ width: '25px', marginRight: '10px'}}
        title="You must have a gravatar connected to your email to display an image"
        />Logout</a>
      </li>
    </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to='/register'>Sign Up</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to='/login'>Log In</Link>
      </li>
    </ul>
    );

    return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">DevConnector</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Developers
                </Link>
              </li>
            </ul>
              { isAuthenticated ? authLinks : guestLinks }
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
  clearCurrentProfile: () => dispatch(clearCurrentProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
