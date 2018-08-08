import React from 'react'
import PropTypes from 'prop-types';
import PostItem from './PostItem';

const PostFeed = ({posts, onDelete, toggleLike}) => {
  return (
    posts.map(post => <PostItem key={post._id} post={post} onDelete={onDelete} toggleLike={toggleLike} />)
  )
}

PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostFeed;
