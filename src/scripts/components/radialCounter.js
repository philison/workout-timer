import state from '../app.js';

// 1. enter the correct parent in the init function
// 2. add id-css selector for the newly created class
// 3. set size of the new slider and adjust the limits

class RadialCounter {
  constructor(
    id = 0,
    sliderValueRange = [0, 10],
    upsideDown = false,
    parentClass = ''
  ) {
    this.id = id; // 0-indexed
    this.sliderValueRange = sliderValueRange;
    this.upsideDown = upsideDown;
    this.parentClass = parentClass;

    this.radialSliderSvg = {};
    this.radialSliderPath = {};
    this.radialSliderValueDispContainer = {};
    this.radialSliderValueDisp = {};

    this.value = this.sliderValueRange[1]; // holds the start value of the slider
    this.angle = 0;
    this.svgPathLength = 0;
    this.parent = {};

    this.html = `<div id="radial-slider-container-${this.id}" class="radial-slider-container">
      <div class="radial-counter-valueDisp-container">
        <div class="radial-counter-valueDisp">0</div>
      </div>
      <svg class="radial-slider-svg" width="100%" viewBox="0 0 100 100">
        <circle 
          class="radial-slider-path"
          fill="none"
          stroke-width="20"
          cx="50"
          cy="50"
          r="40"
        ></circle>
      </svg>
    </div>`;
  }

  init() {
    console.log('init');
    this.parent = document.querySelector(this.parentClass);
    this.insertHTML(this.parent);

    // get elements
    this.radialSliderSvg = document.querySelector(
      `#radial-slider-container-${this.id} .radial-slider-svg`
    );
    this.radialSliderPath = document.querySelector(
      `#radial-slider-container-${this.id} .radial-slider-path`
    );
    this.radialSliderValueDisp = document.querySelector(
      `#radial-slider-container-${this.id} .radial-counter-valueDisp`
    );
    this.radialSliderValueDispContainer = document.querySelector(
      `#radial-slider-container-${this.id} .radial-counter-valueDisp-container`
    );

    // get PathLength
    this.svgPathLength =
      this.radialSliderPath.getTotalLength() +
      parseInt(this.radialSliderPath.getAttribute('stroke-width'));
    this.radialSliderPath.style.strokeDasharray = this.svgPathLength;
    this.radialSliderPath.style.strokeDashoffset = this.svgPathLength;

    //set default angle value
    const rangeUI = 360;
    const rangeValue = this.sliderValueRange[1] - this.sliderValueRange[0];
    this.angle =
      ((this.value - this.sliderValueRange[0]) / rangeValue) * rangeUI;

    //this.updateUIByValue('init');
    this.updateUI;
  }

  updateUI() {
    // slider svg has to get flipped in the init function
    this.radialSliderSvg.style.transform = 'rotateX(180deg) rotateZ(90deg)';

    // 0.935 to equalize the non-linearity in the circle growth
    // (900 / this.svgPathLength) adds additional space for the displayed angle to breath
    // this.angle gets updated by the countdown.run()
    this.radialSliderPath.style.strokeDashoffset =
      this.svgPathLength -
      this.svgPathLength * (-this.angle * (-1 / 360)) * 0.935 -
      900 / this.svgPathLength;

    // update textField

    // this.value gets updated by the countdown.run()
    this.radialSliderValueDisp.textContent = Math.floor(this.value);
    //console.log(this.angle);

    // update the state variables
    //this.updateState();
    //console.log(state.userSetSliderValues);
  }

  insertHTML(parentEl) {
    parentEl.insertAdjacentHTML('beforeend', this.html);
  }
}

export default RadialCounter;

/*
  updateUIByValue(param) {
    // checks if the function is called on initialization or later
    //param && this.value = this.sliderValueRange[1];
    //this.value = param ? 5 : this.value;
    //this.value = param ? this.sliderValueRange[1] : this.value;

    // update Display
    this.radialSliderSvg.style.transform = 'rotateX(180deg) rotateZ(90deg)';
    this.radialSliderValueDisp.textContent = Math.round(this.value);

    //set default value
    const rangeUI = 360;
    const rangeValue = this.sliderValueRange[1] - this.sliderValueRange[0];
    this.angle =
      ((this.value - this.sliderValueRange[0]) / rangeValue) * rangeUI;

    // 0.935 to equalize the non-linearity in the circle growth
    // (900 / this.svgPathLength) adds additional space for the displayed angle to breath
    this.radialSliderPath.style.strokeDashoffset =
      this.svgPathLength -
      this.svgPathLength * (-this.angle * (-1 / 360)) * 0.935 -
      900 / this.svgPathLength;

    // update the state variables
    //this.updateState();
    //console.log(state.userSetSliderValues);
  }*/
