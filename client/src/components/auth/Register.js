import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';  //so we can redirect in actions
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

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
            <TextFieldGroup 
            placeholder="Name"
            type="text" 
            name="name"
            value={this.state.name} 
            onChange={this.onChange} 
            error={errors.name}
          />
          <TextFieldGroup 
          placeholder="Email Address"
          type="email" 
          name="email"
          value={this.state.email} 
          onChange={this.onChange} 
          error={errors.email}
          info="Please use a Gravatar email for images"
        />
        <TextFieldGroup 
        placeholder="Password"
        type="password" 
        name="password"
        value={this.state.password} 
        onChange={this.onChange} 
        error={errors.password}
      />
      <TextFieldGroup 
      placeholder="Confirm Password"
      type="password" 
      name="password2"
      value={this.state.password2} 
      onChange={this.onChange} 
      error={errors.password2}
    />
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