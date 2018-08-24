const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const { app } = require('../server');
const User = require('../models/User');
const { users, populateUsers } = require('../tests/seed/seed');

beforeEach(populateUsers);

describe('POST /api/users', () => {

    it('should not create user if email in use', (done) => {
        request(app)
        .post('/api/users/register')
        .send({ name: 'user1', email: users[0].email, password: 'password123' })
        .expect(400)
        .end(done);
      });

      it('should not create user if invalid data', (done) => {
        request(app)
        .post('/api/users/register')
        .send({ name: 'user1', email: 'user1@yahoo.com', password: '' })
        .expect(400)
        .end(done);
      });

      it('should create user if valid data', (done) => {
        request(app)
        .post('/api/users/register')
        .send({ name: 'user1', email: 'user1@yahoo.com', password: 'password123' })
        .expect(200)
        .end((err, res) => {
            if (err) {
              return done(err);
            }
            User.findOne({email: 'user1@yahoo.com'}).then((user) => {
                expect(user).toBeTruthy();
                expect(user.password).not.toBe('password123');  //it gets hashed
                done();
              }).catch((e) => {
                done(e);
              });

        });
      });

});


describe('POST api/users/login', () => {

    it('should reject invalid login', (done) => {
        request(app)
        .post('/api/users/login')
        .send({email: users[1].email, password: 'invalidpw'})
        .expect(401)
        .end(done);
    });

    it('should login on valid data', (done) => {
        request(app)
        .post('/api/users/login')
        .send({email: users[1].email, password: users[1].password})
        .expect(200)
        .expect((res) => {
            expect(res.body.success).toBeTruthy();
            expect(res.body.token).toBeTruthy();
        })
        .end(done);
    });

});


