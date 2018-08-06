const express = require('express');
const router = express.Router();  //see explanation at lecture 8, 5 mins
const User = require('../../models/User');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');



// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);  //important to use return
    }
   
    User.findOne({ email: req.body.email }).then(user => {    
        if (user) {   
            errors.email = 'Email already exists';
            return res.status(400).json(errors); 
        } 
            //wouldn't be error if no user, would hit this else
            const avatar = gravatar.url(req.body.email, {
                s: '200',  //size
                r: 'pg' ,   //rating
                d: 'mm'     //Default
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            newUser.save().then((user) => {
                res.json(user);
            }).catch(err => res.status(400).json());
    });
});

// @route   POST api/users/login
// @desc    Login user / Returning JWT token
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);  
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then((user) => {
     
        if (!user) { 
            errors.email = 'User not found';
            res.status(404).json(errors);
         }

        user.comparePassword(password).then((user) => {
            user.generateToken().then((token) => {
                if (token) {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
                }
            }).catch(err => { res.json(err) });
            }).catch((e) => {
                errors.password = 'Password incorrect';
                res.status(401).json(errors); 
             });
        }).catch(err => res.json(err));
});

// @route   GET api/users/current
// @desc    Return the current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
})

module.exports = router;  //export for server.js to pick it up

