'use strict';

const PORT = 3000;

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/router.js');

const app = express();
app.use(morgan('combined'));
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:8081',
    optionsSuccessStatus: 200,
    credentials: true
  }
app.use(cors(corsOptions));

const studentQuery = require('./query/StudentQuery.js')

/*** Passport ***/

/** Authentication-related imports **/
const passport = require('passport');                              // authentication middleware
const LocalStrategy = require('passport-local');                   // authentication strategy (username and password)

/** 
 * Set up authentication strategy to search in the DB a user with a matching password.
 * The user object will contain other information extracted by the method userDao.getUser (i.e., id, username, name).
 **/
passport.use(new LocalStrategy(async function verify(username, password, callback) {
  const user = await studentQuery.getUser(username, password)
  if (!user)
      return callback(null, false, 'Incorrect username or password');

  return callback(null, user); // NOTE: user info in the session (all fields returned by userDao.getUser, i.e, id, username, name)
}));

// Serializing in the session the user object given from LocalStrategy(verify).
passport.serializeUser(function (user, callback) { // this user is id + username + name 
  callback(null, user);
});

// Starting from the data in the session, we extract the current (logged-in) user.
passport.deserializeUser(function (user, callback) { // this user is id + email + name 
  // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
  // e.g.: return userDao.getUserById(id).then(user => callback(null, user)).catch(err => callback(err, null));
  return callback(null, user); // this will be available in req.user
});

//creation of a session
const session = require('express-session');

app.use(session({
  secret: "thisIsNotASecretButDontUseIt",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.authenticate('session'));


/**
* login middleware
*/
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next();
  }
  return res.status(401).json({ error: 'Not authenticated' })
}

/**
 * Login
 */
app.post('/api/login', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
      if (err)
          return next(err);
      if (!user) {
          return res.status(401).json({ error: info });
      }
      req.login(user, (err) => {
          if (err)
              return next(err);

          return res.json(req.user);
      });
  })(req, res, next);
});

/**
* Still logged-in
*/
app.get('/api/login/current', (req, res) => {
  if (req.isAuthenticated()) {
      return res.status(200).json(req.user);
  }
  else
      return res.status(401).json({ error: 'Not authenticated' });
});

/**
* Logout
*/
app.delete('/api/login', (req, res) => {
  req.logout(() => {
      return res.status(200).json({});
  });
});

/* ROUTERS */
app.use('/api', router);

app.listen(PORT,
    () => { console.log(`Server started on http://localhost:${PORT}/`) });
