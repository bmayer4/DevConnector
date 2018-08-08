import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { startGetPosts, startDeletePost, startToggleLikePost } from '../../actions/postActions';
import PostFeed from './PostFeed';


class Posts extends Component {

  componentDidMount() {
    this.props.startGetPosts();
  }

  onDeleteClicked = (id) => {
    this.props.startDeletePost(id);
  }

  onToggleLike = (id) => {
    this.props.startToggleLikePost(id);
  }

  render() {

    const { posts, loading } = this.props.post;
    let postContent;

    if (loading) {
      postContent = <Spinner />
    } else if (posts && posts.length ) {
      postContent = <PostFeed posts={posts} onDelete={this.onDeleteClicked} toggleLike={this.onToggleLike} />
    } else {
      postContent = <p className="lead mt-4">Be the first to create a post..</p>
    }

    return (
      <div className="feed">
        <div className="container">
            <div className="row">
                <div className="col-md-12 m-auto">
                    <PostForm />
                    { postContent }
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  startGetPosts: PropTypes.func.isRequired,
  startDeletePost: PropTypes.func.isRequired,
  startToggleLikePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  post: state.post
})

const mapDispatchToProps = (dispatch) => ({
  startGetPosts: (posts) => dispatch(startGetPosts(posts)),
  startDeletePost: (id) => dispatch(startDeletePost(id)),
  startToggleLikePost: (id) => dispatch(startToggleLikePost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
