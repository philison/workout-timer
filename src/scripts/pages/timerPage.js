import state from '../app.js';
import { insertHTML } from '../components/services.js';

const timerPage = {
  pageAnchor: 'timerPage',

  insertPageHtml: function () {
    console.log('Settings insertPageHtml');
    //TODO: fill with html
    let html = `<div id="settings-page-container" class="page">
    <div class="testContainer-settings">
      <a class="ball-settings" href="/#homePage">
        Settings
      </a>
    </div>
  </div>`;

    insertHTML(html);
    console.log('timer html insertet');
    //console.log(document.querySelector('#page-container').innerHTML);
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
