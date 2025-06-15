import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0;
    this.elem = this.render();
    this.initCarousel();
    this.initEventListeners();
  }

  render() {
    let carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map(slide => `
            <div class="carousel__slide" data-id="${slide.id}">
              <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                <div class="carousel__title">${slide.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `);
    return carousel;
  }

  initCarousel() {
    this.carouselInner = this.elem.querySelector('.carousel__inner');
    this.arrowRight = this.elem.querySelector('.carousel__arrow_right');
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    this.arrowRight.addEventListener('click', () => this.moveSlide(1));
    this.arrowLeft.addEventListener('click', () => this.moveSlide(-1));
    this.updateArrows();
  }

  moveSlide(direction) {
    let slideWidth = this.carouselInner.offsetWidth;
    this.currentSlideIndex += direction;
    this.carouselInner.style.transform = `translateX(-${slideWidth * this.currentSlideIndex}px)`;
    this.updateArrows();
  }

  updateArrows() {
    this.arrowLeft.style.display = this.currentSlideIndex === 0 ? 'none' : '';
    this.arrowRight.style.display = this.currentSlideIndex === this.slides.length - 1 ? 'none' : '';
  }

  initEventListeners() {
    this.elem.addEventListener('click', (event) => {
      if (event.target.closest('.carousel__button')) {
        let slide = event.target.closest('.carousel__slide');
        let productId = slide.dataset.id;
        this.elem.dispatchEvent(new CustomEvent('product-add', {
          detail: productId,
          bubbles: true
        }));
      }
    });
  }
};
