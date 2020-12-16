const session = require('express-session');

const expsession = () =>
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  });

module.exports = expsession;
