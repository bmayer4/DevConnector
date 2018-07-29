const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');  //teacher does it this way to avoid errors from requiring in a model multiple times
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        //console.log(jwtPayload); 
        User.findById(jwtPayload.id).then(user => {
            if (user) {
                return done(null, user);  
            }
            done(null, false);
        }).catch(err => console.log(err));
    }));
}