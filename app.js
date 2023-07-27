// app.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connectFlash = require('connect-flash');
const User = require('./models/User');
const bodyParser = require('body-parser');


// Initialize Express
const app = express();

// Connect to MongoDB (replace 'YOUR_MONGODB_URI' with your actual MongoDB URI)
mongoose.connect('mongodb+srv://ola:ola@cluster0.kuq7thg.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Express middlewares
// Serve static files from the "public" directory
// app.use(express.static('public'));
app.use(express.static('/public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'YourSecretKeyHere',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Routes
app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    try {
        const user = await User.create({
          email: req.body.email,
          password: req.body.password
        });
    
        res.redirect('/signin'); // Redirect to login page after successful registration
      } catch (error) {
        res.status(400).json({ error });
      }
});

app.get('/signin', (req, res) => {
    res.render('signin', { message: req.flash('error') });
});

app.post('/signin', passport.authenticate('local', {
    successRedirect: '/_header2',
    failureRedirect: '/signin',
    failureFlash: true,
}));

app.get('/_header2', isLoggedIn, (req, res) => {
    res.render('_header2', { username: req.user.username });
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server Has Started!');
});

