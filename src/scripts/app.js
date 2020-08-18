//TODO: write url request with button link
//TODO: !!! insert and than animate, timing problem ?? animate from prev page state or
//TODO: ignoring reloads for now

//TODO: 1. change home and settings page html
//TODO: 2. add animations
// enter animation has to be triggered from the html insertion function so that everything waits on the leave animation to finish

//TODO: !!! save state / route to memmory : TAPED for NOW
// What happens if animation is abborded ? does the event handler get triggered
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

  userSetSliderValues: {
    reps: 10,
    interval: 60,
    pause: 30,
    marker: 1,
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
        //animationElement = settingsPage.leaveToSettingsPage();
        animationElement = settingsPage.leaveToTimerPage();
        animationElement.onanimationend = () => {
          insertPageHtml();
        };
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
