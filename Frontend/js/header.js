document.addEventListener('DOMContentLoaded', () => {
  const welcomeUser = document.getElementById('welcome_user');
  const signinLink = document.getElementById('signin');
  const signupLink = document.getElementById('signup');
  const logoutLink = document.getElementById('logout');

  // Retrieve the user data sent by the server
  const userData = JSON.parse(JSON.stringify(user));

  if (userData.first_name) {
    // User is logged in, display user name and hide Sign In and Create an account
    welcomeUser.textContent = `Hello, ${userData.first_name}`;
    signinLink.style.display = 'none';
    signupLink.style.display = 'none';
    logoutLink.style.display = 'block'; // Show Log out link
  } else {
    // User is not logged in, hide Log out link and display Sign In and Create an account
    welcomeUser.style.display = 'none';
    signinLink.style.display = 'block'; // Show Sign In link
    signupLink.style.display = 'block'; // Show Create an account link
    logoutLink.style.display = 'none';
  }
});

// code for changing header when the page scrolls

window.addEventListener('scroll', function () {
  let header = document.querySelector('header');
  let headerIcon = document.querySelectorAll('.header-icon');
  let currency = document.querySelector('#currency');
  let scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    header.classList.add('scrolled');
    headerIcon.forEach(function (icon) {
      icon.style.color = 'black';
    });
    currency.style.color = 'black';
  } else {
    header.classList.remove('scrolled');
    headerIcon.forEach(function (icon) {
      icon.style.color = 'white';
    });
    currency.style.color = 'white';
  }
});
