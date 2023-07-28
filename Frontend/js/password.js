// JS code to make password visible
const visibilityBtn = document.getElementById('visibilityBtn');
const visibilityBtn2 = document.getElementById('visibilityBtn2');
visibilityBtn.addEventListener('click', toggleVisibility);
visibilityBtn2.addEventListener('click', toggleVisibility2);

function toggleVisibility() {
  const passwordInput = document.getElementById('password');
  const icon = document.getElementById('icon');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon.innerText = 'visibility_off';
  } else {
    passwordInput.type = 'password';
    icon.innerText = 'visibility';
  }
}

function toggleVisibility2() {
  const passwordInput = document.getElementById('confirmPassword');
  const icon = document.getElementById('icon');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon2.innerText = 'visibility_off';
  } else {
    passwordInput.type = 'password';
    icon2.innerText = 'visibility';
  }
}

// JS code to confirm user entered same password
// document
//   .getElementById('signupForm')
//   .addEventListener('submit', function (event) {
//     event.preventDefault();
//     const password = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;

//     if (password !== confirmPassword) {
//       alert('Passwords do not match. Please try again.');
//     } else {
//       console.log('Signup successful!');
//       // alert("Welcome."); Uncomment to test
//     }
//   });
