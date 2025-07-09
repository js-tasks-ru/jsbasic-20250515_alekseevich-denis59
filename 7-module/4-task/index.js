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
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.addEventListener('pointerdown', this.onPointerDown.bind(this));
    thumb.addEventListener('pointerdown', event => event.preventDefault());
  }

  onClick(event) {
  if (this.isDragging) return;

  let sliderRect = this.elem.getBoundingClientRect();
  let clickX = event.clientX - sliderRect.left;
  let clickRelative = clickX / sliderRect.width;

  if (clickRelative < 0) clickRelative = 0;
  if (clickRelative > 1) clickRelative = 1;

  let approximateValue = clickRelative * this.segments;
  let newValue = Math.round(approximateValue);

  if (newValue === this.value) return;

  this.setValue(newValue);
  }

  onPointerDown(event) {
    event.preventDefault();

    this.isDragging = true;
    this.elem.classList.add('slider_dragging');
    this.pointerMoveHandler = this.onPointerMove.bind(this);
    this.pointerUpHandler = this.onPointerUp.bind(this);

    document.addEventListener('pointermove', this.pointerMoveHandler);
    document.addEventListener('pointerup', this.pointerUpHandler);
  }

  onPointerMove(event) {
  let sliderRect = this.elem.getBoundingClientRect();
  let left = event.clientX - sliderRect.left;
  let leftRelative = left / sliderRect.width;

  if (leftRelative < 0) leftRelative = 0;
  if (leftRelative > 1) leftRelative = 1;

  let leftPercents = leftRelative * 100;
  let approximateValue = leftRelative * this.segments;
  let newValue = Math.round(approximateValue);

  if (newValue !== this.value) {
    this.value = newValue;
    this.elem.querySelector('.slider__value').textContent = this.value;

    let spans = this.elem.querySelectorAll('.slider__steps span');
    spans.forEach(span => span.classList.remove('slider__step-active'));
    spans[this.value].classList.add('slider__step-active');
  }

  this.elem.querySelector('.slider__thumb').style.left = `${leftPercents}%`;
  this.elem.querySelector('.slider__progress').style.width = `${leftPercents}%`;
  }

  onPointerUp(event) {
    let valuePercents = (this.value / this.segments) * 100;
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let customEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    });

    this.isDragging = false;
    this.elem.classList.remove('slider_dragging');
    this.elem.querySelector('.slider__value').textContent = this.value;
    this.elem.dispatchEvent(customEvent);

    document.removeEventListener('pointermove', this.pointerMoveHandler);
    document.removeEventListener('pointerup', this.pointerUpHandler);

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
  }

  setValue(newValue) {
    this.value = newValue;
    let valuePercents = (this.value / this.segments) * 100;
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let spans = this.elem.querySelectorAll('.slider__steps span');
    let customEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    });

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    
    this.elem.querySelector('.slider__value').textContent = this.value;
    this.elem.dispatchEvent(customEvent);

    spans.forEach(span => span.classList.remove('slider__step-active'));
    spans[this.value].classList.add('slider__step-active');
  }
}

