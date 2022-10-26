"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
  constructor(product, img = 'http://placekitten.com/150') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;

  }

  //Генерация товара для католога товара
  render() {
    return `
      <div class="goods-item">
        <img src="${this.img}" alt='Some image'>
        <h3>${this.product_name}</h3>
        <p>${this.price}</p>
        <button 
          data-title="${this.product_name}" 
          data-price="${this.price}" 
          data-id="${this.id_product}" 
          class="buy-button">Купить</button>
      </div>
    `;
  }
}

class GoodsList {
  constructor(url, container, list = list2) {
    this.url = url;
    this.container = container;
    this.list = list;
    this.goods = [];
    this.allProducts = [];
    this._init();
  }

  getProducts(url) {

    return fetch(url ? url : `${API + this.url}`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })

  }

  handleData(data) {
    this.goods = [...data];
    this.render();
  }

  totalPrice() {
    this.cartAmount = 0;

    document
      .querySelector('.goods-list')
      .addEventListener('click', event => {
        if (event.target.tagName != 'BUTTON') {
          return;
        }

        this.cartAmount += +event.target.dataset.price;

        console.log(this.cartAmount);
      });
  }

  render() {
    const block = document.querySelector(this.container);

    for (let good of this.goods) {
      console.log(this.constructor.name);
      const goodItem = new this.list[this.constructor.name](good);
      console.log(goodItem);
      this.allProducts.push(goodItem);
      console.log(this.allProducts);
      block.insertAdjacentHTML('beforeend', goodItem.render());
    }
  }

  _init() {
    return false
  }
}

class ProductsList extends GoodsList {
  constructor(cart, container = `.goods-list`, url = "/catalogData.json") {
    super(url, container);
    this.cart = cart;
    this.getProducts()
      //handleData запускает отрисовку либо каталога товаров, либо списка товаров 
      //корзины
      .then(data => this.handleData(data));
  }

  _init() {
    document
      .querySelector(this.container)
      .addEventListener('click', e => {
        if (e.target.classList.contains('buy-button')) {
          console.log(e.target);
          this.cart.addCartItem(e.target);
        }
      });
  }
}

class ProductItem extends GoodsItem { }

class CartItem extends GoodsItem {
  constructor(product, img = 'http://placekitten.com/150') {
    super(product, img);
    this.quantity = product.quantity;
  }
  //Генерация товаров для корзины товаров
  render() {
    return `
      <div class="cart-item" data-id="${this.id_product}">
        <img src="${this.img}" alt="Some image">
        <div class="cart-item-description">
          <p class="cart-item-title">${this.product_name}</p>
          <p class="cart-item-quantity">Quantity: ${this.quantity}</p>
          <p class="cart-item-price">${this.price}</p>
        </div>
        <div class="cart-item-right-box">
          <div class="cart-item-tottal-price">${this.quantity * this.price}</div>
          <button class="cart-item-del" data-id="${this.id_product}">&times;</button>
        </div>
      </div>`
  }
}

class CartBox extends GoodsList {
  constructor(container = ".cart-box", url = "/getBasket.json") {
    super(url, container);
    this.getProducts()
      .then(data => {
        this.handleData(data.contents);//вывели все товары в корзине 
      })
  }

  addCartItem(element) {
    this.getProducts(`${API}/addToBasket.json`)
      .then(data => {
        if (data.result === 1) {
          let productId = +element.dataset['id'];
          let find = this.allProducts
            .find(product => product.id_product === productId);
          if (find) {
            find.quantity++;
            this._updateCart(find);
          } else {
            let product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['title'],
              quantity: 1
            };
            this.goods = [product];
            this.render();
          }
        } else {
          console.log('Error');
        }
      })
  }

  removeCartItem(element) {
    this.getProducts(`${API}/deleteFromBasket.json`)
      .then(data => {
        if (data.result === 1) {
          let productId = +element.dataset['id'];
          let find = this.allProducts
            .find(product => product.id_product === productId);
          if (find.quantity > 1) {
            find.quantity--;
            this._updateCart(find);
          } else {
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document
              .querySelector(`.cart-item[data-id = "${productId}"]`)
              .remove();
          }
        } else {
          console.log('Error');
        }
      })
  }

  _updateCart(product) {
    let block = document
      .querySelector(`.cart-item[data-id = "${product.id_product}"]`);
    block
      .querySelector('.cart-item-quantity').textContent = `Quantity: ${product.quantity}`;
    block
      .querySelector('.cart-item-tottal-price').textContent = `${product.quantity * product.price}`;
  }

  _init() {
    document
      .querySelector('.cart-button')
      .addEventListener('click', () => {
        document
          .querySelector(this.container)
          .classList.toggle('invisible');
      });
    document
      .querySelector(this.container)
      .addEventListener('click', e => {
        if (e.target.classList.contains('cart-item-del')) {
          this.removeCartItem(e.target);
        }
      })
  }

  caeculateCart() {

  }

}

const list2 = {
  ProductsList: ProductItem,
  CartBox: CartItem
};

let cart = new CartBox();
let products = new ProductsList(cart);