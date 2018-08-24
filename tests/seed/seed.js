const {ObjectID} = require('mongodb');
const User = require('../../models/User');

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

  module.exports = {
      users,
      populateUsers
  };

