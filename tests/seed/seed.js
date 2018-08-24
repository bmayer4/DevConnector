const {ObjectID} = require('mongodb');
const User = require('../../models/User');
const keys = require( '../../config/keys');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();  
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    name: 'user1',
    email: 'user1@test.com',
    password: 'userOnePassword'
  }, {
    _id: userTwoId,
    name: 'user1',
    email: 'user2@test.com',
    password: 'userTwoPassword'
  }];

  const populateUsers = (done) => { 
    User.remove({}).then(() => { 
      var userOne = new User(users[0]).save();  
      var userTwo = new User(users[1]).save();
  
      return Promise.all([userOne, userTwo])
    }).then(() => { 
      done();
    });
  };

    
    let payload1 = { id: users[0].id, name: users[0].name, email: users[0].email };
    let tokenUser1 = jwt.sign(payload1, keys.secret, { expiresIn: "12h"  });  

    let payload2 = { id: users[1].id, name: users[1].name, email: users[1].email };
    let tokenUser2 = jwt.sign(payload2, keys.secret);  

  module.exports = {
      users,
      populateUsers,
      tokenUser1,
      tokenUser2
  };

