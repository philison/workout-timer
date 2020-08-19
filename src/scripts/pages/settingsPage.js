import state from '../app.js';
import { insertHTML } from '../components/services.js';
import RadialSlider from '../components/radialSlider.js';

const settingsPage = {
  pageAnchor: 'settingsPage',

  insertPageHtml: function () {
    console.log('Settings insertPageHtml');
    let html = `<div id="settings-page-container" class="page">
    
    <div class="testContainer-settings">
      <a class="ball-settings" href="/#timerPage">
        <span class="goBtnText-settings">GO</span>
      </a>
    </div>
    
    <div class="testContainer-slider"></div>
  </div>`;

    insertHTML(html);
    console.log('settings html insertet');
    //console.log(document.querySelector('#page-container').innerHTML);

    // create new slider,
    const radialSlider0 = new RadialSlider(
      0,
      state.defaultSliderValues.repetitions,
      [1, 10],
      [130, 230],
      true,
      '.testContainer-slider'
    );
    const radialSlider1 = new RadialSlider(
      1,
      state.defaultSliderValues.interval,
      [10, 80],
      [130, 230],
      true,
      '.testContainer-slider'
    );
    const radialSlider2 = new RadialSlider(
      2,
      state.defaultSliderValues.pause,
      [0, 60],
      [150, 210],
      true,
      '.testContainer-slider'
    );

    const radialSlider3 = new RadialSlider(
      3,
      state.defaultSliderValues.marker,
      [0, 2],
      [130, 230],
      false,
      '.testContainer-slider'
    );

    // init slider
    radialSlider0.init();
    radialSlider1.init();
    radialSlider2.init();

    radialSlider3.init();
  },

  enterFromAllPage: function () {
    state.curPage = this.pageAnchor;

    // select DOM element to be animated
    let path = document.querySelectorAll('.radial-slider-path');
    path.forEach((e) => {
      e.classList.add('enter-SettingsPage-slider-animation');
    });

    let disp = document.querySelectorAll('.radial-slider-valueDisp-container');
    let sliderIndex = 0;
    disp.forEach((e) => {
      sliderIndex < 3
        ? e.classList.add('enter-SettingsPage-valueDisp-animation-upsideDown')
        : e.classList.add('enter-SettingsPage-valueDisp-animation');
      sliderIndex += 1;
    });

    console.log('enterFromAllPage');
  },

  leaveToTimerPage: function () {
    console.log('leaveToTimerPage /for now homePage');
    let path = document.querySelectorAll('.radial-slider-path');
    let disp = document.querySelectorAll('.radial-slider-valueDisp-container');
    //purge classes
    //ball.classList.remove('enter-HomePage-ball');
    //path.classList.remove('enter-HomePage-appHeading-animation');
    path.forEach((e) => {
      e.classList.remove('enter-SettingsPage-slider-animation');
    });
    let sliderIndex = 0;
    disp.forEach((e) => {
      sliderIndex < 3
        ? e.classList.remove(
            'enter-SettingsPage-valueDisp-animation-upsideDown'
          )
        : e.classList.remove('enter-SettingsPage-valueDisp-animation');
      sliderIndex += 1;
    });

    //ball.classList.add('leaveToSettingsPage-ball');
    //path.classList.add('leave-HomePageToSettingsPage-appHeading-animation');
    path.forEach((e) => {
      e.classList.add('leave-SettingsPage-slider-animation');
    });
    sliderIndex = 0;
    disp.forEach((e) => {
      sliderIndex < 3
        ? e.classList.add('leave-SettingsPage-valueDisp-animation-upsideDown')
        : e.classList.add('leave-SettingsPage-valueDisp-animation');
      sliderIndex += 1;
    });

    return path[0];
  },
};

export default settingsPage;
