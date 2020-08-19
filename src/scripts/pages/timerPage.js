import state from '../app.js';
import { insertHTML } from '../components/services.js';
import RadialSlider from '../components/radialSlider.js';

const timerPage = {
  pageAnchor: 'timerPage',

  insertPageHtml: function () {
    console.log('Timer insertPageHtml');
    //TODO: fill with html
    let html = `<div id="timer-page-container" class="page">
    <div class="testContainer-timer">
      <a class="ball-timer" href="/#homePage">
        Settings
      </a>
    </div>
    <div class="testContainer-slider-timer"></div>
  </div>`;

    insertHTML(html);
    console.log('timer html insertet');
    //console.log(document.querySelector('#page-container').innerHTML);

    // create new slider,
    const radialSlider4 = new RadialSlider(
      4,
      10,
      [1, 10],
      [130, 230],
      true,
      '.testContainer-slider-timer'
    );

    // init slider
    radialSlider4.init();
  },

  enterFromSettingsPage: function () {
    state.curPage = this.pageAnchor;
    console.log('enterFromSettingsPage');
  },

  leaveToSettingsPage: function () {
    console.log('leaveToSettingsPage');
  },
};

export default timerPage;
