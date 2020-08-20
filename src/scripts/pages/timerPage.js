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

    <!--
    <div id="stop" class="timer-buttons-container">
      <button class="timer-buttons" >
        <span class="material-icons-round timer-buttons-icon">clear</span>
      </button>
    </div>

    <div id="play" class="timer-buttons-container">
      <button class="timer-buttons" >
        <span class="material-icons-round timer-buttons-icon">play_arrow</span>
      </button>
    </div>

    <div id="pause" class="timer-buttons-container">
      <button class="timer-buttons" >
        <span class="material-icons-round timer-buttons-icon">pause</span>
      </button>
    </div>
    -->

    <div  class="timer-buttons-container">
      <a id="stop" class="timer-buttons" href="/#settingsPage">
        <span class="material-icons-round timer-buttons-icon">clear</span>
      </a>
      <button id="play" class="timer-buttons" >
        <span class="material-icons-round timer-buttons-icon">play_arrow</span>
      </button>
      <button id="pause" class="timer-buttons" >
        <span class="material-icons-round timer-buttons-icon">pause</span>
      </button>
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
    const playBtn = document.querySelector('#play');
    const stopBtn = document.querySelector('#stop');
    const pauseBtn = document.querySelector('#pause');

    pauseBtn.style.display = 'flex';

    pauseBtn.addEventListener('touchstart', () => {
      console.log('pause button pushed');

      // clear the countdowns
      countdown.clearCounter();
      pauseBtn.classList.add('btn-click-wiggle-animation');

      function awaitWiggle() {
        // show the play and stop button
        playBtn.style.display = 'flex';
        stopBtn.style.display = 'flex';

        // hidde pause button (with container, or maker container not interactive)
        pauseBtn.style.display = 'none';

        // add animation class
        playBtn.classList.remove('playButton-snuggle-timer-animation');
        playBtn.classList.remove('playButton-clicked-snuggle-timer-animation');
        stopBtn.classList.remove('stopButton-snuggle-timer-animation');
        playBtn.classList.add('playButton-spread-timer-animation');
        stopBtn.classList.add('stopButton-spread-timer-animation');

        pauseBtn.classList.remove('btn-click-wiggle-animation');
        pauseBtn.removeEventListener('animationend', awaitWiggle);
      }

      pauseBtn.addEventListener('animationend', awaitWiggle);
    });

    // listener x button --> link to settings page
    playBtn.addEventListener('touchstart', () => {
      console.log('play Btn');

      // start countdown
      countdown.run();

      // collapse buttons (remove old class, add new one necessary ?)
      playBtn.classList.remove('playButton-spread-timer-animation');
      stopBtn.classList.remove('stopButton-spread-timer-animation');
      playBtn.classList.add('playButton-clicked-snuggle-timer-animation');
      stopBtn.classList.add('stopButton-snuggle-timer-animation');

      function awaitSnugglePlay() {
        // make pause visible
        pauseBtn.style.display = 'flex';

        // hide the play and stop button
        playBtn.style.display = 'none';
        stopBtn.style.display = 'none';
        playBtn.removeEventListener('animationend', awaitSnugglePlay);
      }

      playBtn.addEventListener('animationend', awaitSnugglePlay);
    });

    // listener play button --> restart timer
    stopBtn.addEventListener('touchstart', () => {
      console.log('stop Btn');
      //wiggle
      //stopBtn.classList.add('btn-click-wiggle-animation');

      // clear the countdowns
      countdown.clearCounter();
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
