const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

// const sessions = require('express-session');
// use bcrypt to encrypt password.
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

// decodes front end view to enable it work with the backend.
app.use(express.urlencoded({ extended: true }));

// use cookie-parser
app.use(cookieParser());

// sets up ejs template view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import the fetchProduct function from productHelpers.js
// const { fetchProduct } = require('./productHelpers');

// Define user as an empty object to avoid undefined errors
let user = {};

// GET ROUTES
// response when a get request is sent to the homepage.
app.get('/', function (req, res) {
  // check if there is a logged in user /  // Get the user data from the usersDb using the userId
  const userId = req.cookies['user_id'];
  const loggedInUser = usersDb[userId];

  // Update the user object with loggedInUser (if available)
  if (loggedInUser) {
    user = loggedInUser;
  } else {
    // If no logged-in user, set user as an empty object
    user = null;
  }

  // Pass the user data as an object to the homepage template
  const templateVars = {
    user: loggedInUser, // Pass the user data to the homepage template
  };

  res.render('homepage', templateVars);
});

// REGISTER ROUTE
app.get('/signup', (req, res) => {
  // get request for signup form to load
  res.render('signup');
});

app.get('/signin', (req, res) => {
  // get request for signup form to load
  res.render('signin');
});

app.get('/policy', (req, res) => {
  res.render('policy');
});

app.get('/empty_page', (req, res) => {
  res.render('empty_page', { user: req.cookies['user_id'] });
});

app.get('/about-us', (req, res) => {
  res.render('about-us', { user: req.cookies['user_id'] });
});

app.get('/faq', (req, res) => {
  res.render('faq', { user: req.cookies['user_id'] });
});

app.get('/contact', (req, res) => {
  res.render('contact', { user: req.cookies['user_id'] });
});

app.get('/terms_and_conds', (req, res) => {
  res.render('terms_and_conds', { user: req.cookies['user_id'] });
});

app.get('/necklaces', (req, res) => {
  res.render('necklaces', { user: req.cookies['user_id'] });
});

app.get('/earrings', (req, res) => {
  res.render('earrings', { user: req.cookies['user_id'] });
});

app.get('/bracelets', (req, res) => {
  res.render('bracelets', { user: req.cookies['user_id'] });
});

app.get('/rings', (req, res) => {
  res.render('rings', { user: req.cookies['user_id'] });
});

app.get('/policy', (req, res) => {
  res.render('policy', { user: req.cookies['user_id'] });
});

// helper route to view users in the db
app.get('/users.json', (req, res) => {
  res.json(usersDb);
});

// To check who the current logged in user is.
app.get('/api/user', function (req, res) {
  const userId = req.cookies['user_id'];
  const loggedInUser = usersDb[userId];

  if (loggedInUser && usersDb[userId]) {
    res.json(usersDb[userId]); // Return the user data as JSON response
  } else {
    res.json({}); // Return an empty object if no user is logged in
  }
});

// Added begin

// Function to fetch product data from JSON file
async function fetchProduct(productId) {
  try {
    const data = await fs.promises.readFile(
      path.join(__dirname, 'frontend/json/products.json')
    );
    const products = JSON.parse(data);
    const product = products.find((product) => product.id === productId);
    return product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Added end
// Route to handle the product detail page
app.get('/product_detail', async (req, res) => {
  const productId = req.query.id; // Get the product ID from the query parameter
  console.log(productId);
  const product = await fetchProduct(productId); // Fetch the product based on the ID
  const userId = req.cookies['user_id'];
  if (product) {
    // If the product is found, render the product_detail.ejs file and pass the product data as an object
    res.render(path.join(__dirname, '/views/product_detail.ejs'), {
      product,
      userId,
    });
  } else {
    // If the product is not found or an error occurred, render an error page or redirect to the home page
    res.status(404).send('Product not found');
  }
});

// post request to create user
app.post('/signup', (req, res) => {
  // extract the user information from the request(form)
  const { first_name, last_name, email, password, confirm_password } = req.body;
  console.log({ 'Received form data:': req.body });

  if (!email || !password) {
    res.status(400).send('Email and password fields cannot be empty.');
    return;
  }
  // validation - check if user already exists.
  const existingUser = findExistingUser(email, usersDb);
  if (existingUser) {
    res
      .status(409)
      .send(
        'User with this email already exists! <a href="http://localhost:8080/signup">Try Again!</a>'
      );
    return;
  }

  if (password !== confirm_password) {
    res.send(
      'Password does not match. <a href="http://localhost:8080/signup">Please try again.</a>'
    );
    return;
  }

  // if not existing user, create new user.
  const salt = bcrypt.genSaltSync(10); //10 is the default. an increase in number makes the password more secure, however it takes longer to generate.
  const hashPassword = bcrypt.hashSync(password, salt);
  console.log(salt);
  console.log(hashPassword);
  const userId = addNewUser(first_name, last_name, email, hashPassword);

  if (!userId) {
    console.error('Error creating user. userId is undefined.');
    res.status(500).send('Error creating user. Please try again later.');
    return;
  }

  console.log('User created successfully. userId:', userId);
  // set the cookie to log the user in
  res.cookie('user_id', userId);

  // redirect to homepage with name showing in the header after successful signup
  res.redirect('/');
});

// LOGIN ROUTE
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // if email or password field is empty send back response with 400 status code.
  if (email === '' || password === '') {
    res
      .status(400)
      .send(
        `Invalid input - email/password field cannot be empty!!! <a href="http://localhost:8080/signin">Try Again!</a>`
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
        'This email/password combination does not exist!!! <a href="http://localhost:8080/signin">Try Again!</a>'
      );
    console.log('did not log in');
    return;
  }

  // res.cookie.user_id = user.id;

  res.cookie('user_id', user.id);

  res.redirect('/');
  console.log('logged in');
});

// LOGOUT ROUTE
app.post('/logout', (req, res) => {
  //to clear cookies which will logout the user.
  // res.cookie = null;
  // Clear the user_id cookie to log the user out
  res.clearCookie('user_id');

  // req.session = null;
  // to redirect to /urls
  res.redirect('/signin');
});

// Port running
app.listen(port);
console.log('Server started at http://localhost:' + port);
