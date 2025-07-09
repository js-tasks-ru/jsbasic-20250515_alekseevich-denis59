import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
  this.products = products;
  this.filters = {};
  this.render();
  this.updateFilter({});
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.inner = this.elem.querySelector('.products-grid__inner');
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.inner.innerHTML = '';
    let filtered = this.products.filter(product => {
      if (this.filters.noNuts && product.nuts) {
        return false;
      }
      if (this.filters.vegeterianOnly && !product.vegeterian) {
        return false;
      }
      if (
        this.filters.maxSpiciness !== undefined &&
        product.spiciness > this.filters.maxSpiciness
      ) {
        return false;
      }
      if (
        this.filters.category &&
        product.category !== this.filters.category
      ) {
        return false;
      }
      return true;
    });

    for (let product of filtered) {
      let card = new ProductCard(product);
      this.inner.append(card.elem);
    }
  }
}
