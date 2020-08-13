import state from '../app.js';
import { insertHTML } from '../components/services.js';

const settingsPage = {
  pageAnchor: 'settingsPage',

  insertPageHtml: function () {
    console.log('Settings insertPageHtml');
    //TODO: fill with html
    let html = `<div id="settings-page-container" class="page">
    <div class="testContainer-settings">
      <a class="ball-settings" href="/#homePage">
        <span class="goBtnText-settings">GO</span>
      </a>
    </div>
  </div>`;

    insertHTML(html);
    console.log('settings html insertet');
    //console.log(document.querySelector('#page-container').innerHTML);
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
