import state from '../app.js';
import { insertHTML } from '../components/services.js';
import RadialCounter from '../components/radialCounter.js';
import countdown from '../components/countdown.js';

export { timerPage, radialCounter4 };

const timerPage = {
  pageAnchor: 'timerPage',

  insertPageHtml: function () {
    console.log('Timer insertPageHtml');
    //TODO: fill with html
    let html = `<div id="timer-page-container" class="page">

    <div class="testContainer-slider-timer"></div>

    <div id="pause" class="timer-buttons-container">
      <a class="timer-buttons" href="#timerPage">
        <span class="material-icons-round timer-buttons-icon">pause</span>
      </a>
    </div>

    <div id="play" class="timer-buttons-container">
      <a class="timer-buttons" href="/#settingsPage">
        <span class="material-icons-round timer-buttons-icon">play_arrow</span>
      </a>
    </div>

    <div id="stop" class="timer-buttons-container">
      <a class="timer-buttons" href="/#settingsPage">
        <span class="material-icons-round timer-buttons-icon">clear</span>
      </a>
    </div>

  </div>`;

    insertHTML(html);
    console.log('timer html insertet');
    //console.log(document.querySelector('#page-container').innerHTML);

    // create new slider,
    radialCounter4 = new RadialCounter(
      4,
      [0, state.userSetSliderValues.interval],
      true,
      '.testContainer-slider-timer'
    );
    // state.userSetSliderValues.interval

    // init slider
    radialCounter4.init();

    /**  listener for buttons **/
    // listener paus button --> function to split button and pause counter
    document
      .querySelector('#pause .timer-buttons')
      .addEventListener('touchstart', () => {
        console.log('pause button pushed');

        //
        countdown.clearCounter();
      });
    document.querySelector('#pause').style.display = 'flex';
    document.querySelector('#play').style.display = 'none';
    document.querySelector('#stop').style.display = 'none';

    // listener x button --> link to settings page
    document
      .querySelector('#play .timer-buttons')
      .addEventListener('touchstart', () => {
        //console.log('Testasdfasfsadf');
      });

    // listener play button --> restart timer
    document
      .querySelector('#stop .timer-buttons')
      .addEventListener('touchstart', () => {
        //console.log('Testasdfasfsadf');
      });
  },

  startCountdown() {
    // if current rep < set reps: start countdown
    // calls function itself as soon as it is done and updates state
    // has to be called where timer runs so in radialcountdown

    // start counter function
    countdown.run();
  },

  enterFromSettingsPage: function () {
    state.curPage = this.pageAnchor;
    console.log('enterFromSettingsPage');
  },

  leaveToSettingsPage: function () {
    console.log('leaveToSettingsPage');
  },
};

// create new slider, has to be outside the init function to make it accessible for the countdown
let radialCounter4;
