import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { startAddComment } from '../../actions/postActions';

class CommentForm extends Component {

    state = {
        text: '',
        errors: {}
    }

   componentWillReceiveProps(nextProps) {
      if (Object.keys(nextProps.errors).length) {
          this.setState({ errors: nextProps.errors })
      }
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
          this.setState({ errors: nextProps.errors })
      }
  }

    onChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { user } = this.props.auth;
        const { postId } = this.props;

        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        };

        this.props.startAddComment(postId, newComment);
        this.setState({ text: '' });
    }

  render() {

    const { errors } = this.state;

    return (
        <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup 
                placeholder="Reply to post" 
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    startAddComment: PropTypes.func.isRequired,
  }
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
  })
  
  const mapDispatchToProps = (dispatch)  => ({
      startAddComment: (postId, post) => dispatch(startAddComment(postId, post))
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
  