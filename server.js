const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 8080;

const { generateRandomString } = require('./helpers');

// express.static, serves the static files - i.e. css & html files
app.use(express.static('frontend'));

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Parse incoming requests with urlencoded payloads (form data)
app.use(bodyParser.urlencoded({ extended: true }));

// use cookie-parser
app.use(cookieParser());

// users object - database
const usersDb = {
  userRandomID: {
    id: 'userRandomID',
    first_name: 'jane',
    last_name: 'smith',
    email: 'user@example.com',
    password: 'this-is-my-password',
  },
  user2RandomID: {
    id: 'user2RandomID',
    first_name: 'john',
    last_name: 'doe',
    email: 'user2@example.com',
    password: 'this-is-my-password2',
  },
};

// sendFile will go here
app.get('/', function (req, res) {
  // check if there is a logged in user
  // retrieve the cookie
  const userId = req.cookies['user_id'];
  const currentUser = usersDb[userId];

  if (currentUser && usersDb[currentUser]) {
    res.sendFile(path.join(__dirname, '/frontend/index.html'), {
      user: usersDb[userId],
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

// helper route to view users
app.get('/users.json', (req, res) => {
  res.json(usersDb);
});

// post request to create user
app.post('/signup', (req, res) => {
  // extract the user information from the request(form)
  const { first_name, last_name, email, password } = req.body;
  // console.log({ 'Body:': req.body });

  // validation - check if user already exists.

  for (let userId in usersDb) {
    if (usersDb[userId].email === email) {
      // user exists
      res.status(403).send('User already exists');
      return;
    }
  }

  // creating user
  const userId = generateRandomString(12);
  // add name, email and password to usersDb
  usersDb[userId] = {
    id: userId,
    first_name,
    last_name,
    email,
    password,
  };

  // set the cookie
  res.cookie('user_id', userId);

  // redirect to homepage with name showing in the header
  res.sendFile(path.join(__dirname, '/frontend/index.html'));
});

// LOGIN ROUTE

// LOGOUT ROUTE

// Port running
app.listen(port);
console.log('Server started at http://localhost:' + port);
