//TODO: write url request with button link
//TODO: !!! insert and than animate, timing problem ?? animate from prev page state or
//TODO: ignoring reloads for now

//TODO: 1. change home and settings page html
//TODO: 2. add animations
// enter animation has to be triggered from the html insertion function so that everything waits on the leave animation to finish

/*
timing of the animation function and the writing of the html content
*/

import homePage from './pages/homePage.js';
import settingsPage from './pages/settingsPage.js';

const state = {
  //default settings

  //current page
  curPage: '',
  //requestet page
  requestetPage: '',
};

const content = null || document.getElementById('page-container');

const router = function () {
  console.log('Router startet');
  //extract route and update corresponding state elements
  writeURLAnchor();

  //stores the element on which we add the animation end eventlistener
  let animationElement;
  //render page leave animation, if requestet page != current page
  if (state.requestetPage !== state.curPage) {
    switch (state.curPage) {
      case 'initialLoad':
        homePage.insertPageHtml(); //insert html here and skip leave animation
        homePage.enterFromInit();
        break;
      case homePage.pageAnchor:
        animationElement = homePage.leaveToSettingsPage();
        //insert html when animation is done
        animationElement.addEventListener('animationend', insertPageHtml());
        break;
      default:
        break;
    }
  }

  //there can't be anything else in this block, otherwise we have to work with promises to stop executing until the animationend eventlistener is triggered
};

// load and hashchange EventListener when DOMContendLoaded
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// get url request
const writeURLAnchor = function () {
  // on first load the is no anchor set
  if (location.hash) {
    state.requestetPage = location.hash.substring(1);
  } else {
    state.requestetPage = homePage.pageAnchor;
    state.curPage = 'initialLoad';
  }
};

const insertPageHtml = function () {
  //insert the html of the requestet page (independent of entry route)
  //initial load and homePage have same html
  switch (state.requestetPage) {
    case settingsPage.pageAnchor:
      settingsPage.insertPageHtml();
      settingsPage.enterFromAllPage(); //page enter animation independent from entry rout
      break;
    default:
      break;
  }

  //update state
  state.curPage = state.requestetPage;
};

/*
const startEnterRender = function () {
  //render page enter animation
  // settings page has 2 rout entry points but animation starting point is the same
  switch (state.requestetPage) {
    case homePage.pageAnchor:
      homePage.enterFromInit;
      break;

    default:
      break;
  }

  
};
*/
