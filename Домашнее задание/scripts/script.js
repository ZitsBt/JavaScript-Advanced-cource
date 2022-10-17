"use strict";

class GoodsItem {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
  }

  render() {
    return `<div class="goods-item">
              <img src="${this.img}"
              <h3>${this.title}</h3>
              <p>${this.price}</p>
          <button data-price="${this.price}" class="buy-button">Купить</button>
            </div>
      `;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150, img: 'http://placekitten.com/150' },
      { title: 'Socks', price: 50, img: 'http://placekitten.com/150' },
      { title: 'Jacket', price: 350, img: 'http://placekitten.com/150' },
      { title: 'Shoes', price: 250, img: 'http://placekitten.com/150' },
    ];
  }

  //====Здание №2=====
  /**
   * Метод определяет общую суммарную стоимость всех добаленных товаров
   * @param (number) cartAmount Содержит общую стоимость товаров.
   */
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
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price, good.img);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;

  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.totalPrice();

// const goods = [
//   { title: 'Shirt', price: 150, img: 'http://placekitten.com/150' },
//   { title: 'Socks', price: 50, img: 'https://placekitten.com/150' },
//   { title: 'Jacket', price: 350, img: 'http://placekitten.com/150' },
//   { title: 'Shoes', price: 250, img: 'http://placekitten.com/150' },
// ];

// const renderGoodsItem = (title, price, img) => {
//   return `
//   <div class="goods-item">
//     <img src="${img}"
//     <h3>${title}</h3>
//     <p>${price}</p>
//     <button class="buy-button">Купить</button>
//   </div>
//   `;
// };

// const renderGoodsList = (list) => {
//   let goodsList = list.map(item => renderGoodsItem(item.title, item.price,
//     item.img));
//   document.querySelector('.goods-list').innerHTML = goodsList.join("");
// }

// renderGoodsList(goods);

//=====Задание №1======

/**
 * Данный класс рендерит карточку товара добавленного в корзину.
 * ± будет похож на класс GoodsItem
 */
class CartItem {
  constructor() {
    //Принимает значения названия, цены и изображения товара
  }

  render() {
    //html-код рендера карточик товара
  }
}

/**
 * Рендерит товары и вставляет их в карзину
 * Возможно, лучше сделать наследование от GoodsList, т.к. многие действия и 
 * значения повторяются
 */
class CartBox {
  constructor() {
    //Принимает значение итоговой цены в корзине
  }

  addCartItem() {
    //Добавляет товар в корзину
  }

  removeCartItem() {
    //Удаляет товар из корзины
  }

  caeculateCart() {
    // Вставляет html-разметку с общей стоимостью товаров в корзине
  }

  render() {
    //Принимает массив из fetchGoods() и вставляем его в разметку из класса 
    //CartItem 
  }
}
