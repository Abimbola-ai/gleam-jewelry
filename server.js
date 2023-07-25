const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const sessions = require('express-session');
// to encrypt password.
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 8080;

const {
  generateRandomString,
  addNewUser,
  findExistingUser,
  usersDb,
  authenticateLogin,
} = require('./helpers');

// express.static, serves the static files - i.e. css & html files
app.use(express.static('frontend'));

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Parse incoming requests with urlencoded payloads (form data)
app.use(bodyParser.urlencoded({ extended: true }));

// use cookie-parser
app.use(cookieParser());

// response when a get request is sent to the homepage.
app.get('/', function (req, res) {
  // check if there is a logged in user
  // retrieve the cookie
  const userId = req.cookies['user_id'];
  const loggedInUser = usersDb[userId];

  if (loggedInUser && usersDb[loggedInUser]) {
    res.sendFile(path.join(__dirname, '/frontend/index.html'), {
      user: loggedInUser,
    });
  }
  res.sendFile(path.join(__dirname, '/frontend/index.html'), {});
});

// authentication routes
// REGISTER ROUTE
app.get('/signup', (req, res) => {
  // get request for signup form to load
  res.sendFile(path.join(__dirname, '/frontend/signup.html'));
});

app.get('/login', (req, res) => {
  // get request for signup form to load
  res.sendFile(path.join(__dirname, '/frontend/signin.html'));
});

// helper route to view users in the db
app.get('/users.json', (req, res) => {
  res.json(usersDb);
});

app.get('/api/user', function (req, res) {
  const userId = req.cookies['user_id'];
  const loggedInUser = usersDb[userId];

  if (loggedInUser && usersDb[userId]) {
    res.json(usersDb[userId]); // Return the user data as JSON response
  } else {
    res.json({}); // Return an empty object if no user is logged in
  }
});

// post request to create user
app.post('/signup', (req, res) => {
  // extract the user information from the request(form)
  const { first_name, last_name, email, password } = req.body;
  // console.log({ 'Body:': req.body });

  // validation - check if user already exists.
  const user = findExistingUser(email, usersDb);
  if (user) {
    res
      .status(403)
      .send(
        'User already exists! <a href="http://localhost:8080/signup">Try Again!</a>'
      );
    return;
  }

  // if not existing user, create new user.
  const salt = bcrypt.genSaltSync(10); //10 is the default. an increase in number makes the password more secure, however it takes longer to generate.
  const hashPassword = bcrypt.hashSync(password, salt);
  console.log(salt);
  console.log(hashPassword);
  const userId = addNewUser(first_name, last_name, email, hashPassword);
  // set the cookie
  res.cookie('user_id', userId);

  // redirect to homepage with name showing in the header
  res.sendFile(path.join(__dirname, '/frontend/index.html'));
});

// LOGIN ROUTE
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // if email or password field is empty send back response with 400 status code.
  if (email === '' || password === '') {
    res
      .status(400)
      .send(
        `Invalid input - email/password field cannot be empty!!! <a href="http://localhost:8080/login">Try Again!</a>`
      );
    return;
  }

  // use email and password fields
  //if email exists then you want to check the password matches then log in and set cookie. authenticate login function handles this.
  const user = authenticateLogin(usersDb, email, password);
  console.log('User:', user);
  // if email does not exist you want to send an error and exit.
  if (!user) {
    res
      .status(403)
      .send(
        'This email/password combination does not exist!!! <a href="http://localhost:8080/login">Try Again!</a>'
      );
    console.log('did not log in');
    return;
  }
  // console.log('did not log in');
  // res.cookie.user_id = user.id;
  res.cookie('user_id', user.id);
  res.redirect('/');
  console.log('logged in');
});

// LOGOUT ROUTE
// app.post('/logout', (req, res) => {
//   // to clear cookies
//   req.session = null;
//   // to redirect to /urls
//   res.redirect('/login');
// });

// Port running
app.listen(port);
console.log('Server started at http://localhost:' + port);
