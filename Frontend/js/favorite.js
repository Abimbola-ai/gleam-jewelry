/* Code for Product-category favorites icon when clicked */
const heartIcons = document.querySelectorAll('.heart-icon');

let isClicked = new Array(heartIcons.length).fill(false) //Current state of the icons user selects stored

//Function to toggle the icon's color
function toggleIconColor(index){
  if (isClicked[index]) {
    heartIcons[index].style.color = 'white';
  } else {
    heartIcons[index].style.color = 'red';
  }
  isClicked[index] = !isClicked[index]

}

//Add event listener 
heartIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        toggleIconColor(index);
    });
});


