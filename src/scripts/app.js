//TODO: add timer button functionality and animation (push button) ----DONE at least the basics / maybe add wiggle on activation
//TODO: add timerPage entry/leave animation
//TODO: visually modifi pause timer
//TODO: add sound / visual on mark and pause

//TODO: !!! save state / route to memmory : TAPED for NOW so that the countdown on reload works (remembers the true current values)

/*
timing of the animation function and the writing of the html content
*/

// enter animation has to be triggered from the html insertion function so that everything waits on the leave animation to finish

import homePage from './pages/homePage.js';
import settingsPage from './pages/settingsPage.js';
import { timerPage } from './pages/timerPage.js';

const state = {
  //current page
  curPage: '',
  //requestet page
  requestetPage: '',

  // default slider-values
  defaultSliderValues: {
    repetitions: 10,
    interval: 60,
    pause: 30,
    marker: 1,
  },

  userSetSliderValues: {
    repetitions: 2,
    interval: 10,
    pause: 4,
    marker: 1,
  },

  currentCountdownValues: {
    repetitions: 1,
    interval: 60,
    pause: 30,
    marker: 1,
    counterState: 'interval', // keeps track of the cur. running timer
  },
};

const content = null || document.getElementById('page-container');

const router = function () {
  console.log('Router startet');
  //extract route and update corresponding state elements
  writeURLAnchor();
  console.log(`requestet Page: ${state.requestetPage}`);
  console.log(state);
  //stores the element on which we add the animation end eventlistener
  let animationElement;
  //render page leave animation, if requestet page != current page
  if (state.requestetPage !== state.curPage) {
    // page transition
    switch (state.curPage) {
      case 'initialLoad':
        homePage.insertPageHtml(); //insert html here and skip leave animation
        homePage.enterFromInit();
        break;
      case homePage.pageAnchor:
        animationElement = homePage.leaveToSettingsPage();
        //insert html when animation is done
        //animationElement.addEventListener('animationend',insertPageHtml(event));
        animationElement.onanimationend = () => {
          insertPageHtml();
        };
        break;
      case settingsPage.pageAnchor:
        animationElement = settingsPage.leaveToTimerPage();
        animationElement.onanimationend = () => {
          insertPageHtml();
        };
        break;
      case timerPage.pageAnchor:
        /*animationElement = settingsPage.leaveToTimerPage();
        animationElement.onanimationend = () => {};*/
        insertPageHtml();
        break;
      default:
        break;
    }
  } else {
    // page reload
    switch (state.requestetPage) {
      case homePage.pageAnchor:
        insertPageHtml();
        homePage.enterFromInit();
        break;
      case settingsPage.pageAnchor:
        console.log('settings reload');
        insertPageHtml();
        break;
      case timerPage.pageAnchor:
        console.log('timer reload');
        insertPageHtml();
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
    // if on reload the state variable is resetet and the curPage element is empty it will be asigned the current hash anchor
    if (!state.curPage) {
      state.curPage = state.requestetPage;
    }
  } else {
    state.requestetPage = homePage.pageAnchor;
    state.curPage = 'initialLoad';
  }
};

const insertPageHtml = function () {
  //console.log(event);
  //insert the html of the requestet page (independent of entry route)
  //initial load and homePage have same html
  switch (state.requestetPage) {
    case settingsPage.pageAnchor:
      settingsPage.insertPageHtml();
      settingsPage.enterFromAllPage(); //page enter animation independent from entry rout
      break;
    case homePage.pageAnchor:
      homePage.insertPageHtml();
      //homePage.enterFromInit();
      break;
    case timerPage.pageAnchor:
      timerPage.insertPageHtml();
      //timerPage.enterFromSettingsPage(); //page enter animation
      //when done:
      timerPage.startCountdown();
      break;
    default:
      break;
  }

  //update state
  state.curPage = state.requestetPage;
};

export default state;

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
