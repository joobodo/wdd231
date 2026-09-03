// Store the selected elements that we are going to use.
let navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

// Toggle click on and off
navbutton.addEventListener("click", () => {
  navbutton.classList.toggle("show");
  navlinks.classList.toggle("show");
});