const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = function(password) {
    let user = this;
 
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) { return reject(); }
            isMatch ? resolve(user) : reject();
        });
    });
}

UserSchema.methods.generateToken = function() {
    let user = this;
    const payload = { id: user.id, email: user.email, avatar: user.avatar };

    let token = jwt.sign(payload, keys.secret, { expiresIn: "12h"  });
    
    return Promise.resolve(token);
}

UserSchema.pre('save', function(next) {
    var user = this;
    if (user.isModified('password')) {   //boolean, don't want to hash already hashed password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) { throw err };
          user.password = hash;
          next();
        })
      });
    } else {
      next();
    }
  });


const User = mongoose.model('users', UserSchema);

module.exports = User;