export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.segments = steps - 1;
    this.render();
    this.initEventListeners();
  }

  render() {
    let slider = document.createElement('div');
    let thumb = document.createElement('div');
    let progress = document.createElement('div');
    let stepsContainer = document.createElement('div');
    
    slider.className = 'slider';
    progress.className = 'slider__progress';
    
    thumb.className = 'slider__thumb';
    thumb.style.left = '0%';
    thumb.innerHTML = `<span class="slider__value">${this.value}</span>`;
    thumb.ondragstart = () => false;

    progress.style.width = '0%';
  
    stepsContainer.className = 'slider__steps';
    for (let i = 0; i < this.steps; i++) {
      let span = document.createElement('span');
      if (i === this.value) span.className = 'slider__step-active';
      stepsContainer.appendChild(span);
    }

    slider.append(thumb, progress, stepsContainer);
    this.elem = slider;
  }

  initEventListeners() {
    this.elem.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    let sliderRect = this.elem.getBoundingClientRect();
    let clickX = event.clientX - sliderRect.left;
    let clickRelative = clickX / sliderRect.width;
    let approximateValue = clickRelative * this.segments;
    let newValue = Math.round(approximateValue);

    if (newValue === this.value) return;

    this.value = newValue;
    let valuePercents = (this.value / this.segments) * 100;

    this.elem.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;
    this.elem.querySelector('.slider__value').textContent = this.value;

    let spans = this.elem.querySelectorAll('.slider__steps span');
    spans.forEach(span => span.classList.remove('slider__step-active'));
    spans[this.value].classList.add('slider__step-active');

    let customEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    });

    this.elem.dispatchEvent(customEvent);
  }
};
