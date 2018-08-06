import axios from 'axios';
import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from './types';

/* thunks */
export const startGetCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile').then(res => {
        dispatch(getCurrentProfile(res.data));
    }).catch(err => {
        dispatch(getCurrentProfile({})); 
    })
}

export const startGetProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/handle/${handle}`).then(res => {
        dispatch(getCurrentProfile(res.data));
    }).catch(err => {
        dispatch(getCurrentProfile(null));   //!!!
    })
}

export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile', profileData).then(res => {
        dispatch(clearErrors());
        history.push('/dashboard');
    }).catch(err => {
        dispatch(getErrors(err.response.data)); 
    })
}

export const addExperience = (expData, history) => dispatch => {
    axios.post('/api/profile/experience', expData).then(res => {
        dispatch(clearErrors());
        history.push('/dashboard');
    }).catch(err => {
        dispatch(getErrors(err.response.data)); 
    })
}

export const addEducation = (eduData, history) => dispatch => {
    axios.post('/api/profile/education', eduData).then(res => {
        dispatch(clearErrors());
        history.push('/dashboard');
    }).catch(err => {
        dispatch(getErrors(err.response.data)); 
    })
}

export const deleteExperience = (id) => dispatch => {
    axios.delete(`api/profile/experience/${id}`).then(res => {
        dispatch(getCurrentProfile(res.data));  //cool, never hitting database
    }).catch(err => {
        dispatch(getErrors(err.response.data)); 
    })
}

export const deleteEducation = (id) => dispatch => {
    axios.delete(`api/profile/education/${id}`).then(res => {
        dispatch(getCurrentProfile(res.data));  
    }).catch(err => {
        dispatch(getErrors(err.response.data)); 
    })
}

export const startGetProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('api/profile/all').then(res => {
        dispatch(getProfiles(res.data));  
    }).catch(err => {
        dispatch(getProfiles({}));  
    })
}



export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure you want to delete your account?')) {
        axios.delete('/api/profile').then(res => {
            dispatch(setCurrentUser({}));
        }).catch(err => {
            dispatch(getErrors(err.response.data)); 
        })
    }
}

/* action creators */
export const setProfileLoading = () => {
    return { 
        type: PROFILE_LOADING 
    }
}

export const getCurrentProfile = (profile) => ({  //profile is optional, will be profile or empty object
    type: GET_PROFILE,
    payload: profile
});

export const getProfiles = (profiles) => ({  //profils are optional, will be profiles or empty object
    type: GET_PROFILES,
    payload: profiles
});

export const clearCurrentProfile = () => ({
    type: CLEAR_CURRENT_PROFILE
});

export const setCurrentUser = (decoded) => ({
    type: SET_CURRENT_USER,
    payload: decoded
});

export const getErrors = (errors) => ({
    type: GET_ERRORS,
    payload: errors
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});