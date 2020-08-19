import state from '../app.js';
import { radialCounter4 } from '../pages/timerPage.js';

/*
// declate setInterval variables with global access so the 
let countDownInterval;
let countDownPause;*/

// update Ui call with parameter
// update the set state values

// out: call itself and update ui with angle on radialCounter
const countdown = {
  countDownInterval: {},
  countDownPause: {},

  clearCounter() {
    try {
      clearInterval(this.countDownInterval);
    } catch (error) {
      console.log('keinen Zugriff ? 1');
    }

    try {
      clearInterval(this.countDownPause);
    } catch (error) {
      console.log('keinen Zugriff ?');
    }
  },

  run() {
    console.log('timer goooooooooooo');
    let countEndValue;
    let countStartValue;
    let countCurrentValue;
    let angle;

    if (
      state.currentCountdownValues.repetitions >
      state.userSetSliderValues.repetitions
    ) {
      // done !!
      console.log('training done');
    } else {
      switch (state.currentCountdownValues.counterState) {
        case 'interval':
          // check for current value
          countEndValue = 0;
          countStartValue = state.userSetSliderValues.interval;
          countCurrentValue = state.currentCountdownValues.interval;

          // clear countdowns, as this might get called by reloading the page and the old intervall still running
          // if (typeof objectToBeTested != "undefined")
          try {
            clearInterval(this.countDownInterval);
          } catch (error) {
            console.log('"countDownInterval" not yet initialized');
          }
          console.log(`interval state:`);
          console.log(state);

          this.countDownInterval = setInterval(() => {
            state.currentCountdownValues.interval -= 0.02;
            countCurrentValue = state.currentCountdownValues.interval;
            //console.log(state.currentCountdownValues.interval);

            // check if the timer is done
            if (countCurrentValue <= countEndValue) {
              // switch state when timer is done and call function
              state.currentCountdownValues.counterState = 'pause';
              countdown.run();
              clearInterval(this.countDownInterval);
            } else {
              // update the radialCountdown
              radialCounter4.value = countCurrentValue;
              radialCounter4.angle =
                ((countCurrentValue - countEndValue) /
                  (countStartValue - countEndValue)) *
                360;
              radialCounter4.updateUI();
            }
          }, 20);

          //console.log('horse');
          break;

        case 'pause':
          // check for current value
          countEndValue = 0;
          countStartValue = state.userSetSliderValues.pause;
          countCurrentValue = state.currentCountdownValues.pause;

          // clear countdowns, as this might get called by reloading the page and the old intervall still running
          // if (typeof objectToBeTested != "undefined")
          try {
            clearInterval(this.countDownPause);
          } catch (error) {
            console.log('"countDownPause" not yet initialized');
          }
          console.log(`pause state:`);
          console.log(state);

          this.countDownPause = setInterval(() => {
            state.currentCountdownValues.pause -= 0.02;
            countCurrentValue = state.currentCountdownValues.pause;
            //console.log(state.currentCountdownValues.pause);

            // check if the timer is done
            if (countCurrentValue <= countEndValue) {
              // reset currValues:
              state.currentCountdownValues.pause =
                state.userSetSliderValues.pause;
              state.currentCountdownValues.interval =
                state.userSetSliderValues.interval;
              console.log('bananas-bananas-bananas-bananas-bananas');
              console.log(state);
              // switch state when timer is done and call function
              state.currentCountdownValues.counterState = 'interval';
              state.currentCountdownValues.repetitions += 1;

              countdown.run();
              clearInterval(this.countDownPause);
            } else {
              // update the radialCountdown
              radialCounter4.value = countCurrentValue;
              radialCounter4.angle =
                ((countCurrentValue - countEndValue) /
                  (countStartValue - countEndValue)) *
                360;
              radialCounter4.updateUI();
            }
          }, 20);
          break;
        default:
          break;
      }
    }

    // update ui (angle)
  },
};

export default countdown;
