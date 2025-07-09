import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;
    let cartItem = this.cartItems.find(item => item.product.id === product.id);
    if (cartItem) {
      cartItem.count += 1;
    } else {
      cartItem = {
        product,
        count: 1
      };
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    if (!cartItem) return;
    cartItem.count += amount;
    if (cartItem.count <= 0) {
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    let body = document.createElement('div');

    for (let item of this.cartItems) {
      let productElem = this.renderProduct(item.product, item.count);
      body.append(productElem);
    }

    body.append(this.renderOrderForm());
    this.modal.setBody(body);
    this.modal.open();
    body.addEventListener('click', (event) => {
      let plusBtn = event.target.closest('.cart-counter__button_plus');
      let minusBtn = event.target.closest('.cart-counter__button_minus');
      
      if (!plusBtn && !minusBtn) return;
      let productElem = event.target.closest('.cart-product');
      if (!productElem) return;

      let productId = productElem.dataset.productId;

      if (plusBtn) {
        this.updateProductCount(productId, 1);
      }
      if (minusBtn) {
        this.updateProductCount(productId, -1);
      }
    });

    let form = body.querySelector('.cart-form');
    form.addEventListener('submit', (event) => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) {
      return;
    }

    if (this.isEmpty()) {
      this.modal.close();
      return;
    }

    let productId = cartItem.product.id;
    let modalBody = this.modal.modal.querySelector('.modal__body');
    let productCountElem = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    let productPriceElem = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    let infoPriceElem = modalBody.querySelector(`.cart-buttons__info-price`);

    if (productCountElem) {
      productCountElem.textContent = cartItem.count;
    }

    if (productPriceElem) {
      let totalPrice = (cartItem.product.price * cartItem.count).toFixed(2);
      productPriceElem.textContent = `€${totalPrice}`;
    }

    if (infoPriceElem) {
      infoPriceElem.textContent = `€${this.getTotalPrice().toFixed(2)}`;
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    let form = event.target;
    let submitButton = form.querySelector('button[type="submit"]');
    submitButton.classList.add('is-loading');
    let formData = new FormData(form);

    try {
      let response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        this.modal.setTitle('Success!');
        this.cartItems = [];
        this.modal.setBody(createElement(`
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
        `));

        this.cartIcon.update(this);
      }
    } catch (error) {
      console.error('Ошибка отправки формы', error);
    } finally {
      submitButton.classList.remove('is-loading');
    }
  }

  addEventListeners() {
  this.cartIcon.elem.onclick = () => this.renderModal();
  }
};


