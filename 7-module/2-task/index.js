import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._render();
    this._onEscKey = this._onEscKey.bind(this);
  }

  _render() {
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.modal.innerHTML = `
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    `;
    this.modal.querySelector('.modal__close').addEventListener('click', () => this.close());
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this._onEscKey);
  }

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this._onEscKey);
  }

  setTitle(title) {
    let titleElem = this.modal.querySelector('.modal__title');
    titleElem.textContent = title;
  }

  setBody(node) {
    let bodyElem = this.modal.querySelector('.modal__body');
    bodyElem.innerHTML = '';
    bodyElem.append(node);
  }

  _onEscKey(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }
};