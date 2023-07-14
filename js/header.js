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
