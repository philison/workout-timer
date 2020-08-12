const settingsPage = {
  pageAnchor: 'settingsPage',

  insertPageHtml: function () {
    console.log('Settings insertPageHtml');
  },

  enterFromAllPage: function (params) {
    console.log('enterFromAllPage');
  },

  leaveToTimerPage: function () {
    console.log('leaveToTimerPage');
  },
};

export default settingsPage;
