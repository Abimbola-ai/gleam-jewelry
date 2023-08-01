const bcrypt = require('bcrypt');

// users object - database
const usersDb = {
  userRandomID: {
    id: 'userRandomID',
    first_name: 'Frida',
    last_name: 'smith',
    email: 'user@example.com',
    password: 'my-password',
  },
  user2RandomID: {
    id: 'user2RandomID',
    first_name: 'john',
    last_name: 'doe',
    email: 'user2@example.com',
    password: 'my-password2',
  },
};

// function generating random string.
const generateRandomString = function (length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-*!@#%&';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const addNewUser = (first_name, last_name, email, password) => {
  // creating user
  const userId = generateRandomString(12);
  // add name, email and password to usersDb and create new user object
  const newUser = {
    id: userId,
    first_name,
    last_name,
    email,
    password,
  };
  // push new user to usersDb
  usersDb[userId] = newUser;
  return userId;
};

const findExistingUser = function (email, database) {
  for (let user in database) {
    if (database[user].email === email) {
      return database[user];
    }
  }
  return null;
};

const authenticateLogin = (usersDb, email, password) => {
  for (let user in usersDb) {
    const userEmailFound = findExistingUser(email, usersDb);
    if (userEmailFound && bcrypt.compare(password, usersDb[user].password)) {
      return usersDb[user];
    }
  }
  return false;
};

module.exports = {
  generateRandomString,
  findExistingUser,
  addNewUser,
  usersDb,
  authenticateLogin,
};
