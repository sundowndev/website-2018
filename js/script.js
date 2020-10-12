// Directories
const dir_css = './assets';
const dir_images = './images';

// Projects data
data.projects.reverse();

// Backgrounds
let bgImage = document.querySelector('.bg-image');
let bgOverlay = document.querySelector('.bg-overlay');

// Loader overlay
let loader = document.querySelector('.loader');
let logo = document.querySelector('.logo');
let loadBar = document.querySelector('.load-bar');

// Main content
let content = document.querySelector('.main-content');

// Projects
let projectsContainer = document.querySelector('.projects-container');
//let goBack = document.querySelector('.project-goback');

// Menu
let menu = document.querySelector('.menu');
let menuBurger = document.querySelector('.menu-burger');
let menuBurgerBtn = document.querySelector('.menu-burger-btn');
let menuItems = document.querySelectorAll('.menu-item');

/*
 * Init function
 */
window.onload = function() {
  loadBar.style.width = '100%';

  setTimeout(function() {
    fadeout(logo);

    setTimeout(function() {
      hide(loadBar);
      loader.classList.remove('open');
      fadein(menu);
      fadein(menuBurger);
      fadein(logo);
      fadein(content);
    }, 1000);
  }, 1500);
};

/*
 * Burger menu click event
 */
menuBurgerBtn.addEventListener('click', function(e) {
  e.preventDefault();
  toggleMenu();
});

/*
 * Menu items click events
 */
menuItems.forEach(function(e) {
  e.addEventListener('click', function(els) {
    let thisId = e.dataset.section;

    showSection(thisId);

    menuItems.forEach(function(element) {
      element.parentNode.classList.remove('active');
    });

    e.parentNode.classList.add('active');

    if (menu.classList.contains('open')) {
      toggleMenu();
    }
  });
});

/*
 * Show projects in the container
 */
projectsContainer.innerHTML = '';
data.projects.forEach(function(project) {
  projectsContainer.innerHTML +=
    '<div class="project-item" data-id="' +
    data.projects.indexOf(project) +
    '"><a href="#/work/' +
    project.name.toLowerCase() +
    '">' +
    project.name +
    '</a><div class="project-item-bg" style="background-image:url(' +
    dir_images +
    '/' +
    project.thumbnail +
    ');"></div></div>';
});

/*
 * Adding the click event on projects
 */
let projects = document.querySelectorAll('.project-item');

projects.forEach(function(elem) {
  elem.addEventListener('click', function() {
    let projectID = elem.dataset.id;

    setProject(data.projects[projectID]);
  });
});

/*
 * Router JS
 */
const router = new leafeon.Router();

router.add('home', '/', function() {
  showSection('about');
});

router.add('section', '/:section', function(sectionID) {
  showSection(sectionID);

  menuItems.forEach(function(element) {
    if (element.dataset.section === sectionID) {
      element.parentNode.classList.add('active');
    } else {
      element.parentNode.classList.remove('active');
    }
  });
});

router.add('work', '/#/work/:id', function(project) {
  let sectionActive = document.querySelector('.section.active');
  let section = document.querySelector('#project');

  data.projects.forEach(function(elem) {
    if (elem.name.toLowerCase() === project) {
      setProject(elem, true);
      sectionActive.classList.remove('active');
      section.classList.add('active');
    }
  });

  menuItems.forEach(function(element) {
    if (element.dataset.section === 'projects') {
      element.parentNode.classList.add('active');
    } else {
      element.parentNode.classList.remove('active');
    }
  });
});

router.run();
