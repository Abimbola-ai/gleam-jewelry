// routes/index.js
const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('homepage');
});

// Secret page (accessible after login)
router.get('/_header2', isLoggedIn, (req, res) => {
  res.render('_header2', { username: req.user.username });
});

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin');
}

module.exports = router;
