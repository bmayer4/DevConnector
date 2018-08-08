import axios from 'axios';
import { ADD_POST, GET_ERRORS, CLEAR_ERRORS, GET_POSTS, GET_POST, POST_LOADING, DELETE_POST } from './types';


/* thunks */
export const startAddPost = (postData) => dispatch => {
    dispatch(clearErrors());
    axios.post('/api/posts', postData).then(res => {
        dispatch(addPost(res.data));
    }).catch(err => {
        dispatch(getErrors(err.response.data)); 
    })
}

export const startGetPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios.get('/api/posts').then(res => {
        dispatch(getPosts(res.data));
    }).catch(err => {
        dispatch(getPosts(null));   //no error if no posts
    })
}

export const startGetPost = (id) => dispatch => {
    dispatch(setPostLoading());
    axios.get(`/api/posts/${id}`).then(res => {
        dispatch(getPost(res.data));
    }).catch(err => {
        dispatch(getPost(null)); 
    })
}

export const startDeletePost = (id) => dispatch => {
    axios.delete(`/api/posts/${id}`).then(res => {
        dispatch(deletePost(id));
    }).catch(err => {
        dispatch(getErrors(err.response.data)); 
    })   
}

export const startToggleLikePost = (id) => dispatch => {
    axios.post(`/api/posts/like/${id}`).then(res => {
        dispatch(startGetPosts());  //may want reducer for this
    }).catch(err => {
        dispatch(getErrors(err.response.data)); 
    })
}

export const startAddComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios.post(`/api/posts/comment/${postId}`, commentData).then(res => {
        dispatch(getPost(res.data));
    }).catch(err => {
        dispatch(getErrors(err.response.data)); 
    })
}

export const startDeleteComment = (postId, commentId) => dispatch => {
    axios.delete(`/api/posts/comment/${postId}/${commentId}`).then(res => {
        dispatch(getPost(res.data));
    }).catch(err => {
        dispatch(getErrors(err.response.data)); 
    })
}

/* action redicers */
export const addPost = (post) => ({
    type: ADD_POST,
    payload: post
});

export const getPosts = (posts) => ({
    type: GET_POSTS,
    payload: posts
});

export const getPost = (post) => ({
    type: GET_POST,
    payload: post
});

export const deletePost = (id) => ({
    type: DELETE_POST,
    payload: id
});

export const setPostLoading = () => ({
    type: POST_LOADING
})

export const getErrors = (errors) => ({
    type: GET_ERRORS,
    payload: errors
});

export const clearErrors = (errors) => ({
    type: CLEAR_ERRORS
});