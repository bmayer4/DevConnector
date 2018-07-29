const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    //if nothing there, it won't be empty string needed for Validators isEmpty
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';


    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be between 2 and 4 characters';
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
    }

    if (!isEmpty(data.website)) {  //because it can be empty, not required
        if (!Validator.isURL(data.website)) {
            errors.website = 'The URL is not valid';
        }
    }
    if (!isEmpty(data.youtube)) { 
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'The URL is not valid';
        }
    }
    if (!isEmpty(data.twitter)) { 
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'The URL is not valid';
        }
    }
    if (!isEmpty(data.facebook)) {  
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'The URL is not valid';
        }
    }
    if (!isEmpty(data.linkedin)) {  
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'The URL is not valid';
        }
    }
    if (!isEmpty(data.instagram)) { 
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'The URL is not valid';
        }
    }


    return {
        errors, 
        isValid: isEmpty(errors)
    }
}