const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI).then(() => console.log('MongoDB connected')).catch(err => console.log(err));;

//Passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);


//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
