function initCarousel() {
  let carousel = document.querySelector('.carousel');
  let inner = carousel.querySelector('.carousel__inner');
  let btnPrev = carousel.querySelector('.carousel__arrow_left');
  let btnNext = carousel.querySelector('.carousel__arrow_right');

  let slideWidth = inner.offsetWidth;
  let totalSlides = 4;
  let currentSlide = 0;

  function updateCarousel() {
    inner.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

    btnPrev.style.display = currentSlide === 0 ? 'none' : '';
    btnNext.style.display = currentSlide === totalSlides - 1 ? 'none' : '';
  }

  btnPrev.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateCarousel();
    }
  });

  updateCarousel();
}
