require('dotenv').config();
const express = require("express");
const app = express();
const login = require('./login/login');
const users = require('./users/users');
const signup = require('./signup/signup');
const webinars = require('./webinars/webinars');
app.use(express.json({limit: '50mb'}));
// app.use(express.bodyParser({limit: '50mb'}));

app.use('/login', login);
app.use('/users', users);
app.use('/signup', signup);
app.use('/webinars', webinars);

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.listen(3000);

module.exports = app