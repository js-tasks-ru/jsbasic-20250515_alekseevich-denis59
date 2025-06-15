import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.render();
    this.initEventListeners();
  }

  render() {
    let { name, price, category, image, id } = this.product;
    let card = createElement(`
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${image}" class="card__image" alt="product">
          <span class="card__price">€${price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);
    return card;
  }

  initEventListeners() {
    let button = this.elem.querySelector('.card__button');
    button.addEventListener('click', () => {
      let event = new CustomEvent('product-add', {
        detail: this.product.id,
        bubbles: true
      });
      this.elem.dispatchEvent(event);
    });
  }
};