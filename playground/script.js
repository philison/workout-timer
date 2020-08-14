// Has to be adapted for touch and turned into a class / id selection when selecting the DOM-Elements

let radialSlider = {
  draggingSlider: false,
  svgCenter: [],
  radialSliderSvg: {},
  radialSliderPath: {},
  radialSliderValueDisp: {},
  angle: 0,
  svgPathLength: 0,
  init() {
    console.log('init');

    // get elements
    this.radialSliderSvg = document.querySelector('.radial-slider-svg');
    this.radialSliderPath = document.querySelector('.radial-slider-path');
    this.radialSliderValueDisp = document.querySelector(
      '.radial-slider-valueDisp'
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
    this.radialSliderPath.style.strokeDashoffset = this.svgPathLength - 0.01;
  },

  functionality() {
    //let radialSliderSvg = document.querySelector('.radial-slider-svg');
    //let radialSliderPath = document.querySelector('.radial-slider-path');

    //console.log(centerX);

    this.radialSliderSvg.onmousedown = () => {
      this.draggingSlider = true;
    };

    document.body.onmouseup = () => {
      this.draggingSlider = false;
    };

    document.body.onmousemove = (e) => {
      //check if mouse is down or up
      if (this.draggingSlider) {
        // calculate postion and resulting angle
        let mousePos = [e.pageX, e.pageY];
        this.currentAngle(mousePos);

        // update UI
        console.log(`mousemove: ${this.angle}`);
        this.updateUI();
      }
    };
  },
  currentAngle(mousePos) {
    console.log(`mousePos: ${mousePos}`);
    //console.log(`svgCenter: ${this.svgCenter}`);
    let x = mousePos[0] - this.svgCenter[0];
    let y = -1 * (mousePos[1] - this.svgCenter[1]);
    //console.log(`ak: ${x} / gk: ${y}`);
    // -90 just to compemsate for rotation
    const angle180 = (Math.atan2(y, x) * 180) / Math.PI - 90;

    this.angle = angle180 >= 0 ? angle180 : 360 + angle180;
  },
  updateUI() {
    this.radialSliderPath.style.strokeDashoffset =
      this.svgPathLength - this.svgPathLength * (-this.angle * (-1 / 360));
    //console.log(`pathLength: ${this.svgPathLength}`);
    //console.log(`offset: ${this.radialSliderPath.style.strokeDashoffset}`);

    // update textField
    this.radialSliderValueDisp.textContent = Math.ceil(this.angle);
    console.log(this.angle);
  },
};

radialSlider.init();
radialSlider.functionality();
