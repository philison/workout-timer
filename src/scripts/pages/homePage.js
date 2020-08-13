import state from '../app.js';
import { insertHTML } from '../components/services.js';

const homePage = {
  pageAnchor: 'homePage',

  insertPageHtml: function () {
    console.log('Home insertPageHtml');

    let html = `<div id="home-page-container" class="page">
    <div class="app-heading">
              <svg
              viewBox="0 0 348 736"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path class="path-appHeading"
                  d="M333 852.5V249V206.367C333 196.753 328.246 187.761 320.301 182.347L315.424 179.024C307.585 173.683 297.155 174.185 289.866 180.255V180.255C282.304 186.554 271.405 186.833 263.53 180.93L262.765 180.357C254.618 174.251 243.383 174.39 235.39 180.696L232.622 182.881C226.122 188.008 222.33 195.83 222.33 204.108V224.835C222.33 238.181 211.511 249 198.165 249V249C184.819 249 174 238.181 174 224.835V194.165C174 180.819 163.181 170 149.835 170V170C136.489 170 125.67 180.819 125.67 194.165V212.633C125.67 222.247 120.915 231.239 112.97 236.653L108.094 239.976C100.255 245.317 89.8248 244.815 82.536 238.745V238.745C74.9733 232.446 64.0748 232.167 56.1995 238.07L55.4346 238.643C47.288 244.749 36.0526 244.61 28.0598 238.304L25.2911 236.119C18.7921 230.992 15 223.17 15 214.892V170V-234.5"
                  stroke="black"
                  stroke-width="30"
              />
              </svg>
        </div>
    <div class="testContainer">
      <a class="ball" href="/#settingsPage">
        <span class="goBtnText">GO</span>
      </a>
    </div>
  </div>`;

    insertHTML(html);
    console.log('home html insertet');
  },

  enterFromInit: function () {
    state.curPage = this.pageAnchor;

    let ball = document.querySelector('.ball');
    ball.classList.add('enter-HomePage-ball');
    console.log(ball);

    // Heading
    let path = document.querySelector('.path-appHeading');
    path.classList.add('enter-HomePage-appHeading-animation');
    console.log(path.getTotalLength());

    console.log('enterFromInit');
  },

  leaveToSettingsPage: function () {
    console.log('leaveToSettingsPage');
    let ball = document.querySelector('.ball');
    let path = document.querySelector('.path-appHeading');
    //purge classes
    ball.classList.remove('enter-HomePage-ball');
    path.classList.remove('enter-HomePage-appHeading-animation');

    ball.classList.add('leaveToSettingsPage-ball');

    //path.classList.remove('leave-HomePageToSettingsPage-appHeading-animation');
    console.log(path);
    path.classList.add('leave-HomePageToSettingsPage-appHeading-animation');
    console.log(path);
    //console.log(ball);
    return ball;
  },
};

export default homePage;

/*
    <!--
          <div class="app-heading">
              <svg
              viewBox="0 0 348 736"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path
                  d="M333 852.5V249V206.367C333 196.753 328.246 187.761 320.301 182.347L315.424 179.024C307.585 173.683 297.155 174.185 289.866 180.255V180.255C282.304 186.554 271.405 186.833 263.53 180.93L262.765 180.357C254.618 174.251 243.383 174.39 235.39 180.696L232.622 182.881C226.122 188.008 222.33 195.83 222.33 204.108V224.835C222.33 238.181 211.511 249 198.165 249V249C184.819 249 174 238.181 174 224.835V194.165C174 180.819 163.181 170 149.835 170V170C136.489 170 125.67 180.819 125.67 194.165V212.633C125.67 222.247 120.915 231.239 112.97 236.653L108.094 239.976C100.255 245.317 89.8248 244.815 82.536 238.745V238.745C74.9733 232.446 64.0748 232.167 56.1995 238.07L55.4346 238.643C47.288 244.749 36.0526 244.61 28.0598 238.304L25.2911 236.119C18.7921 230.992 15 223.17 15 214.892V170V-234.5"
                  stroke="black"
                  stroke-width="30"
              />
              </svg>
        </div>
        -->
*/
