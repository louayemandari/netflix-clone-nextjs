const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./user');
const bcrypt = require('bcrypt')
const cors = require('cors');

const app = express();
// Use CORS middleware
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: /**must add secret and save in env */,
    resave: false,
    saveUninitialized: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());

async function hashPassword(password, saltRounds) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      console.error(error);
      throw new Error('Error hashing password');
    }
  }



passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }

        bcrypt.compare(password, user.password)
          .then((isMatch) => {
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false, { message: 'Incorrect password' });
          })
          .catch((error) => done(error));
      })
      .catch((error) => done(error));
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((error) => done(error));
});

app.post('/auth/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedpass = await hashPassword(password, 12); // Add 'await' here
      const newUser = await User.create({ username, password: hashedpass }); // Use 'password' instead of 'hashedpass'
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

app.post('/auth/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful', user: req.user });
});

app.post('/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.json({ message: 'You have been logged out.' });
    });
  });
  

module.exports = app;
