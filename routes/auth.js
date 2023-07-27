// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login form
router.get('/signin', (req, res) => {
  res.render('signin', { message: req.flash('error') });
});

// Handle login
router.post('/signin', passport.authenticate('local', {
  successRedirect: '/_header2',
  failureRedirect: '/signin',
  failureFlash: 'Invalid email or password.',
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;