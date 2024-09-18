'use strict';

/**
 * element toggle function
 */
const elemToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
}


/**
 * header sticky & go to top
 */
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});


/**
 * navbar toggle
 */
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {
  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);
});


/**
 * radial gradient effect on mouse move
 */
$(document).mousemove(function(event) {
  let windowWidth = $(window).width();
  let windowHeight = $(window).height();

  let mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
  let mouseYpercentage = Math.round(event.pageY / windowHeight * 100);

  $('.radial-gradient').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #3498db, #95b506)');
});


/**
 * skills toggle
 */
const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {
    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { 
      elemToggleFunc(toggleBtns[i]); 
    }
    elemToggleFunc(skillsBox);
  });
}


/**
 * dark & light theme toggle
 */
const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {
  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");
    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");
    localStorage.setItem("theme", "dark_theme");
  }
});


/**
 * check & apply last time selected theme from localStorage
 */
if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}
/** 
 * 
 * SHOW CARDS ANIMATION
 * 
*/
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // When the element is in view, add the 'show' class
      entry.target.classList.add('show');
      entry.target.classList.remove('hidden');
    } else {
      // When the element is out of view, remove the 'show' class to reset
      entry.target.classList.remove('show');
      entry.target.classList.add('hidden');
    }
  });
}, {
  threshold: 0.5 // Trigger when 50% of the element is visible
});

const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((el) => observer.observe(el));

window.addEventListener('load', () => {
  // Add the 'show' class to all elements when the page loads
  const elementsToAnimate = document.querySelectorAll('.headshot-image, .hero-title, .btn-primary');
  elementsToAnimate.forEach((el) => {
    el.classList.add('show');
  });
});




// 
// MOUSE MOVE 
// 

const colors = [
  '#00FF00', // Green
  '#00Ff33',
  '#00FF66',
  '#00FF99',
  '#00FFCC',
  '#00FFFF', // Cyan
  '#00CCFF',
  '#0099FF',
  '#0066FF',
  '#0033FF',
  '#0000FF'  // Blue
];

let colorIndex = 0;
let circlesSinceColorChange = 0;
let lastX = null;
let lastY = null;
let lastCircleTime = 0;
const throttleInterval = 12; // Time in milliseconds
const minDistance = 50; // Distance in pixels


document.addEventListener('mousemove', function(event) {
  if (!cursorEffectEnabled) {
    return; // Exit the function if the effect is disabled
  }

  // Rest of your existing code...

  const now = Date.now();
  const x = event.clientX;
  const y = event.clientY;

  if (lastX === null || lastY === null) {
    lastX = x;
    lastY = y;
  }

  const dx = x - lastX;
  const dy = y - lastY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if ((now - lastCircleTime >= throttleInterval) && (distance >= minDistance)) {
    lastCircleTime = now;
    lastX = x;
    lastY = y;

    const circle = document.createElement('div');
    circle.classList.add('circle');

    const size = 200;
    const circleX = x - size / 2;
    const circleY = y - size / 2;

    circle.style.left = circleX + 'px';
    circle.style.top = circleY + 'px';

    circle.style.backgroundColor = colors[colorIndex];
    circle.style.opacity = '0.5';

    circlesSinceColorChange++;

    if (circlesSinceColorChange >= 5) {
      circlesSinceColorChange = 0;
      colorIndex = (colorIndex + 1) % colors.length;
    }

    document.getElementById('circle-container').appendChild(circle);

    circle.addEventListener('animationend', function() {
      circle.remove();
    });
  }
});



// Variable to track whether the cursor effect is enabled
let cursorEffectEnabled = true;

// Select the toggle button
const cursorToggleBtn = document.querySelector('[data-cursor-toggle-btn]');

// Add event listener to the toggle button
cursorToggleBtn.addEventListener('click', function () {
  cursorEffectEnabled = !cursorEffectEnabled; // Toggle the effect

  // Update the button text
  if (cursorEffectEnabled) {
    cursorToggleBtn.textContent = 'Disable Mouse Trail';
    cursorToggleBtn.classList.remove('active');
  } else {
    cursorToggleBtn.textContent = 'Enable Mouse Trail';
    cursorToggleBtn.classList.add('active');
  }
});
