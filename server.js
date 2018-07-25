const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const keys = require('./config/keys');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI).then(() => console.log('MongoDB connected')).catch(err => console.log(err));;

app.get('/', (req, res) => {
  res.send('hello!');
});

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
