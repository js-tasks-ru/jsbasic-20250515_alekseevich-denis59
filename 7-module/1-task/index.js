import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.initRibbonScroll();
    this.initCategorySelection();
  }

  render() {
    let ribbon = document.createElement('div');
    ribbon.classList.add('ribbon');
    
    let leftArrow = document.createElement('button');
    leftArrow.classList.add('ribbon__arrow', 'ribbon__arrow_left');
    leftArrow.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;
    let ribbonInner = document.createElement('nav');
    ribbonInner.classList.add('ribbon__inner');

    let rightArrow = document.createElement('button');
    rightArrow.classList.add('ribbon__arrow', 'ribbon__arrow_right', 'ribbon__arrow_visible');
    rightArrow.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;

    for (let category of this.categories) {
      let link = document.createElement('a');
      link.href = '#';
      link.classList.add('ribbon__item');
      link.dataset.id = category.id;
      link.textContent = category.name;
      ribbonInner.append(link);
    }

    ribbon.append(leftArrow);
    ribbon.append(ribbonInner);
    ribbon.append(rightArrow);

    this.ribbon = ribbon;
    this.ribbonInner = ribbonInner;
    this.leftArrow = leftArrow;
    this.rightArrow = rightArrow;

    return ribbon;
  }

  initRibbonScroll() {
    this.rightArrow.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
    });
    
    this.leftArrow.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
    });

    this.ribbonInner.addEventListener('scroll', () => {
      let scrollLeft = this.ribbonInner.scrollLeft;
      let scrollWidth = this.ribbonInner.scrollWidth;
      let clientWidth = this.ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        this.leftArrow.classList.remove('ribbon__arrow_visible');
      } else {
        this.leftArrow.classList.add('ribbon__arrow_visible');
      }

      if (scrollRight < 1) {
        this.rightArrow.classList.remove('ribbon__arrow_visible');
      } else {
        this.rightArrow.classList.add('ribbon__arrow_visible');
      }
    });
  }

  initCategorySelection() {
    this.ribbonInner.addEventListener('click', (event) => {
      let target = event.target;

      if (event.target.className !== 'ribbon__item') {
        return;
      }

      event.preventDefault();

      this.ribbonInner.querySelectorAll('.ribbon__item').forEach(item => {
        item.classList.remove('ribbon__item_active');
      });

      target.classList.add('ribbon__item_active');

      let ribbonSelectEvent = new CustomEvent('ribbon-select', {
        detail: target.dataset.id,
        bubbles: true
      });

      this.elem.dispatchEvent(ribbonSelectEvent);
    });

    let firstItem = this.ribbonInner.querySelector('.ribbon__item');
    if (firstItem) {
      firstItem.classList.add('ribbon__item_active');
    }
  }
};
