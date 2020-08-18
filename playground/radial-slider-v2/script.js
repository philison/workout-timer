//TODO: add the option to use the slider up side down
//TODO: map angle to settings range, start and end angle for every circle depends on the size
//TODO: fit angle range to the slider-circle size, prevent slider from slipping of screen

// 1. enter the correct parent in the init function
// 2. add id-css selector for the newly created class
// 3.

class RadialSlider {
  constructor(id = 0, defaultValue = 180, upsideDown = false) {
    this.id = id; // 0-indexed
    this.defaultValue = defaultValue;
    this.upsideDown = upsideDown;
    this.draggingSlider = false;
    this.svgCenter = [];
    this.radialSliderSvg = {};
    this.radialSliderPath = {};
    this.radialSliderValueDispContainer = {};
    this.radialSliderValueDisp = {};
    this.angle = 0;
    this.svgPathLength = 0;
    this.parent = {};
    this.html = `<div id="radial-slider-container-${this.id}" class="radial-slider-container">
    <div class="radial-slider-valueDisp-container">
      <div class="radial-slider-valueDisp">0</div>
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
    this.parent = document.querySelector('.container');
    this.insertHTML(this.parent);

    // get elements
    this.radialSliderSvg = document.querySelector(
      `#radial-slider-container-${this.id} .radial-slider-svg`
    );
    this.radialSliderPath = document.querySelector(
      `#radial-slider-container-${this.id} .radial-slider-path`
    );
    this.radialSliderValueDisp = document.querySelector(
      `#radial-slider-container-${this.id} .radial-slider-valueDisp`
    );
    this.radialSliderValueDispContainer = document.querySelector(
      `#radial-slider-container-${this.id} .radial-slider-valueDisp-container`
    );

    // get svg center !!! put in INIT
    // getBoundingClientRect() returns coordinates relativ to the viewport, not the whole document
    this.svgCenter[0] =
      this.radialSliderSvg.getBoundingClientRect().left +
      this.radialSliderSvg.getBoundingClientRect().width / 2;
    this.svgCenter[1] =
      this.radialSliderSvg.getBoundingClientRect().top +
      this.radialSliderSvg.getBoundingClientRect().height / 2;

    // get PathLength
    this.svgPathLength =
      this.radialSliderPath.getTotalLength() +
      parseInt(this.radialSliderPath.getAttribute('stroke-width'));
    this.radialSliderPath.style.strokeDasharray = this.svgPathLength;
    this.radialSliderPath.style.strokeDashoffset = this.svgPathLength;

    //set default value
    this.angle = this.defaultValue;
    this.updateUI();

    this.addMouseEventListener();
    this.addTouchEventListener();
  }

  addMouseEventListener() {
    // Mouse Input
    this.radialSliderPath.addEventListener('mousedown', (e) => {
      this.draggingSlider = true;

      // with this code block, a tap is enough to adjust the settings / could be refactored
      // calculate postion and resulting angle
      let mousePos = [e.pageX, e.pageY];
      this.currentAngle(mousePos);

      // update UI
      //console.log(`mousemove: ${this.angle}`);
      this.updateUI();
    });

    document.body.addEventListener('mouseup', () => {
      this.draggingSlider = false;
    });

    document.body.addEventListener('mousemove', (e) => {
      //check if mouse is down or up
      if (this.draggingSlider) {
        // calculate postion and resulting angle
        let mousePos = [e.pageX, e.pageY];
        this.currentAngle(mousePos);

        // update UI
        //console.log(`mousemove: ${this.angle}`);
        this.updateUI();
      }
    });
  }

  addTouchEventListener() {
    // Touch Input
    this.radialSliderPath.addEventListener('touchstart', (e) => {
      //e.preventDefault();
      this.draggingSlider = true;

      // with this code block, a tap is enough to adjust the settings / could be refactored
      // calculate postion and resulting angle
      let mousePos = [e.touches[0].pageX, e.touches[0].pageY];
      this.currentAngle(mousePos);

      // update UI
      //console.log(`mousemove: ${this.angle}`);
      this.updateUI();
    });

    document.body.addEventListener('touchend', (e) => {
      //e.preventDefault();
      this.draggingSlider = false;
    });

    document.body.addEventListener('touchmove', (e) => {
      //e.preventDefault();
      //check if mouse is down or up
      if (this.draggingSlider) {
        // calculate postion and resulting angle
        let mousePos = [e.touches[0].pageX, e.touches[0].pageY];
        this.currentAngle(mousePos);

        // update UI
        //console.log(`mousemove: ${this.angle}`);
        this.updateUI();
      }
    });
  }

  currentAngle(mousePos) {
    //console.log(`mousePos: ${mousePos}`);
    //console.log(`svgCenter: ${this.svgCenter}`);
    let x = mousePos[0] - this.svgCenter[0];
    let y = -1 * (mousePos[1] - this.svgCenter[1]);
    //console.log(`ak: ${x} / gk: ${y}`);
    // -90 just to compemsate for rotation
    let angle180 = (Math.atan2(y, x) * 180) / Math.PI;
    console.log(angle180);

    if (!this.upsideDown) {
      this.angle = angle180 >= -90 ? 270 - angle180 : -angle180 - 90;
    } else {
      this.radialSliderSvg.style.transform = 'rotateX(180deg) rotateZ(90deg)';
      this.angle = angle180 >= 90 ? angle180 - 90 : angle180 + 270;
    }

    /*
    -------------from left clockwise:
    transform: rotateZ(180deg);
    this.angle = angle180 >= 0 ? 180 - angle180 : 270- angle180;
    */
  }

  updateUI() {
    // 0.935 to equalize the non-linearity in the circle growth
    // (900 / this.svgPathLength) adds additional space for the displayed angle to breath
    this.radialSliderPath.style.strokeDashoffset =
      this.svgPathLength -
      this.svgPathLength * (-this.angle * (-1 / 360)) * 0.935 -
      900 / this.svgPathLength;
    //console.log(`pathLength: ${this.svgPathLength}`);
    //console.log(`angle: ${this.angle}`);
    //console.log(`DELTA strokeDashOffset: ${-this.svgPathLength * (-this.angle * (-1 / 360))}`);
    //console.log(`pathLength: ${this.svgPathLength}`);
    //console.log(`offset: ${this.radialSliderPath.style.strokeDashoffset}`);

    // update textField
    if (!this.upsideDown) {
      this.radialSliderValueDispContainer.style.transform = `rotateZ(${
        this.angle - 180
      }deg)`;
    } else {
      this.radialSliderValueDispContainer.style.transform = `rotateZ(${-this
        .angle}deg)`;
      this.radialSliderValueDisp.style.transform = 'scaleX(-1) scaleY(-1)';
    }

    this.radialSliderValueDisp.textContent = Math.ceil(this.angle);
    //console.log(this.angle);
  }

  insertHTML(parentEl) {
    parentEl.insertAdjacentHTML('beforeend', this.html);
  }
}

const radialSlider0 = new RadialSlider(0, 180, true);
const radialSlider1 = new RadialSlider(1, 180, false);

radialSlider0.init();
radialSlider1.init();
