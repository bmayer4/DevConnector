import axios from 'axios';
import { ADD_POST, GET_ERRORS } from './types';


/* thunks */
export const startAddPost = (postData) => dispatch => {
    axios.post('/api/posts', postData).then(res => {
        dispatch(addPost(res.data));
    }).catch(err => {
        dispatch(getErrors(err.response.data)); 
    })
}

/* action redicers */
export const addPost = (post) => ({
    type: ADD_POST,
    payload: post
});

export const getErrors = (errors) => ({
    type: GET_ERRORS,
    payload: errors
});