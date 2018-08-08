import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

const CommentFeed = ({comments, postId, onDelete}) =>  {

  return (
    comments.map(c => <CommentItem key={c._id} comment={c} postId={postId} onDelete={onDelete}/>)
  )
}


CommentFeed.propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired
}
  
export default CommentFeed;
  