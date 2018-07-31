import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/authActions';



class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
      }

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
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(user);
    }

  render() {

    const { errors } = this.state;
    const shouldDisable = !this.state.email || !this.state.password;


    return (
     <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="email" className={`form-control form-control-lg ${errors.email && 'is-invalid'}`} value={this.state.email} onChange={this.onChange} placeholder="Email Address" name="email" />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <input type="password" className={`form-control form-control-lg ${errors.password && 'is-invalid'}`} value={this.state.password} onChange={this.onChange} placeholder="Password" name="password" />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userData) => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);