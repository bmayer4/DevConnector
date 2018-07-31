import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';  //so we can redirect in actions
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/authActions';

class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        })
      }
    }

    componentDidMount() {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
      }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history);  //could call .then here and redirect if my thunk returned an async function (which returns promise)
    }

  render() {

    const { errors } = this.state;
    const shouldDisable = !this.state.name || !this.state.email || !this.state.password || !this.state.password2;
    
    return (
    <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your DevConnector account</p>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="text" className={`form-control form-control-lg ${errors.name && 'is-invalid'}`} value={this.state.name} onChange={this.onChange} placeholder="Name" name="name"/>
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="form-group">
              <input type="email" className={`form-control form-control-lg ${errors.email && 'is-invalid'}`} value={this.state.email} onChange={this.onChange} placeholder="Email Address" name="email"/>
              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="form-group">
              <input type="password" className={`form-control form-control-lg ${errors.password && 'is-invalid'}`} value={this.state.password} onChange={this.onChange} placeholder="Password" name="password"/>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="form-group">
              <input type="password" className={`form-control form-control-lg ${errors.password2 && 'is-invalid'}`} value={this.state.password2} onChange={this.onChange} placeholder="Confirm Password" name="password2"/>
              {errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
            </div>
            <input disabled={shouldDisable} type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (userData, history) => dispatch(registerUser(userData, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));