import state from '../app.js';
import { insertHTML } from '../components/services.js';
import RadialSlider from '../components/radialSlider.js';

//TODO: add additional slider
//TODO: animate slider intro

const settingsPage = {
  pageAnchor: 'settingsPage',

  insertPageHtml: function () {
    console.log('Settings insertPageHtml');
    let html = `<div id="settings-page-container" class="page">
    
    <div class="testContainer-settings">
      <a class="ball-settings" href="/#homePage">
        <span class="goBtnText-settings">GO</span>
      </a>
    </div>
    
    <div class="testContainer-slider"></div>
  </div>`;

    insertHTML(html);
    console.log('settings html insertet');
    //console.log(document.querySelector('#page-container').innerHTML);

    // create new slider,
    const radialSlider0 = new RadialSlider(0, 10, [1, 10], [130, 230], true);
    const radialSlider1 = new RadialSlider(1, 60, [10, 80], [130, 230], true);
    const radialSlider2 = new RadialSlider(2, 30, [0, 60], [150, 210], true);

    const radialSlider3 = new RadialSlider(3, 1, [0, 2], [130, 230], false);

    // init slider
    radialSlider0.init();
    radialSlider1.init();
    radialSlider2.init();

    radialSlider3.init();
  },

  enterFromAllPage: function () {
    state.curPage = this.pageAnchor;
    console.log('enterFromAllPage');
  },

  leaveToTimerPage: function () {
    console.log('leaveToTimerPage');
  },
};

export default settingsPage;
