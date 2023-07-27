// script.js
const heartIcon = document.querySelector('.heart-icon');

// Create a variable to store the state of the icon (clicked or not)
let isClicked = false;

// Function to toggle the icon's color
function toggleIconColor() {
    if (isClicked) {
        heartIcon.style.color = 'black'; // Change the color back to the original
    } else {
        heartIcon.style.color = 'red'; // Change the color to red
    }
    isClicked = !isClicked; // Toggle the state
}

// Add a click event listener to the heart icon
heartIcon.addEventListener('click', toggleIconColor);
