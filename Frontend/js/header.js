document.addEventListener('DOMContentLoaded', () => {
  const welcomeUser = document.getElementById('welcome_user');
  const signinLink = document.getElementById('signin');
  const signupLink = document.getElementById('signup');
  const logoutLink = document.getElementById('logout');
  const headerIcons = document.getElementsByClassName('header-icon');

  // Retrieve the user data sent by the server
  const userData = JSON.stringify(user);
  console.log(userData);
  // const userData = req.body;

  // Function to fetch user data from the API
  async function fetchUserData() {
    try {
      const response = await fetch('/api/user'); // Call the API endpoint
      console.log(response);
      const userData = await response.json(); // Parse the JSON response
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return {}; // Return an empty object if there's an error
    }
  }

  console.log(userData);
  // Use the fetchUserData() function to get the user data
  fetchUserData().then((userData) => {
    if (userData.first_name) {
      // User is logged in, display user name and hide Sign In and Create an account
      welcomeUser.textContent = `Hello, ${userData.first_name}`;
      headerIcons.style.display = 'none';
      logoutLink.style.display = 'block'; // Show Log out link - this will be in the dropdown in the hamburger menu.
    } else {
      // User is not logged in, hide Log out link and display Sign In and Create an account
      welcomeUser.style.display = 'none';
      signinLink.style.display = 'block'; // Show Sign In link
      signupLink.style.display = 'block'; // Show Create an account link
      logoutLink.style.display = 'none';
    }
  });
});

// code for changing header when the page scrolls

window.addEventListener('scroll', function () {
  let header = document.querySelector('header');
  let headerIcon = document.querySelectorAll('.header-icon');
  let currency = document.querySelector('#currency');
  let scrollPosition = window.scrollY;
  let greeting = document.getElementById('#welcome_user');

  if (scrollPosition > 0) {
    header.classList.add('scrolled');
    headerIcon.forEach(function (icon) {
      icon.style.color = 'black';
    });
    currency.style.color = 'black';
    greeting.style.color = 'black';
  } else {
    header.classList.remove('scrolled');
    headerIcon.forEach(function (icon) {
      icon.style.color = 'white';
    });
    currency.style.color = 'white';
    greeting.style.color = 'white';
  }
});
