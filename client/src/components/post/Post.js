import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import { startGetPost, getPost, startDeleteComment } from '../../actions/postActions';

class Post extends Component {

componentDidMount() {
  const id = this.props.match.params.id;
  this.props.startGetPost(id);
}

onCommentDelete = (postId, commentId) => {
  this.props.startDeleteComment(postId, commentId);
}

  render() {

    const { post, loading } = this.props.post;
    let postContent;


    if (loading || post && Object.keys(post).length === 0) {  //if (loading) { causes proptypes required problems, else if gets loaded first then loading
      postContent = <Spinner />
    } else if (post && post) {
      postContent = (
        <div>
        <PostItem post={post} showActions={false}/>
        <CommentForm postId={post._id} />
        <CommentFeed postId={post._id} comments={post.comments} onDelete={this.onCommentDelete} />
        </div>
      )
    } else {
      this.props.history.push('/not-found');
    }


    return (
      <div className="post">
        <div className="container">
        <div className="row">
        <div className="col-md-12">
        <Link to="/feed" className="btn btn-light mb-3">Back To Feed</Link>
        {postContent}
        </div>
        </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  startGetPost: PropTypes.func.isRequired,
  startDeleteComment: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  post: state.post
})

const mapDispatchToProps = (dispatch)  => ({
  startGetPost: (id) => dispatch(startGetPost(id)),
  getPost: (post) => dispatch(getPost(post)),
  startDeleteComment: (postId, commentId) => dispatch(startDeleteComment(postId, commentId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post);
