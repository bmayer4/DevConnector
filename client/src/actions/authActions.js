import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


/* thunks */
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData).then(res => history.push('/login'))
    .catch(err => dispatch(getErrors(err.response.data)));
};

export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch(getErrors(err.response.data)));
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};


/* action creators */
export const getErrors = (errors) => ({
    type: GET_ERRORS,
    payload: errors
});

export const setCurrentUser = (decoded) => ({
    type: SET_CURRENT_USER,
    payload: decoded
});



