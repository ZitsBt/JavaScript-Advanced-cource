"use strict";

const goods = [
  { title: 'Shirt', price: 150, img: 'http://placekitten.com/150' },
  { title: 'Socks', price: 50, img: 'https://placekitten.com/150' },
  { title: 'Jacket', price: 350, img: 'http://placekitten.com/150' },
  { title: 'Shoes', price: 250, img: 'http://placekitten.com/150' },
];

const renderGoodsItem = (title, price, img) => {
  return `
  <div class="goods-item">
    <img src="${img}"
    <h3>${title}</h3>
    <p>${price}</p>
    <button class="buy-button">Купить</button>
  </div>
  `;
};

const renderGoodsList = (list) => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price,
    item.img));
  // document.querySelector('.goods-list').innerHTML = goodsList.join("");

  //goodsList был массивом строк, в котором содержался html код. Следовательно, 
  //метод innerHTML вставил массив эллементов со всем его содержимым, включая
  //запятые.

  //Перебрал массив с помощью метода forEach, чтобы вынести каждый элемент 
  //массива
  // goodsList.forEach(elem => {
  //   document.querySelector('.goods-list')
  //     .insertAdjacentHTML('afterbegin', elem);
  // });

  //Либо сделать проще и использовать метод join() для склейки элементов массива
  document.querySelector('.goods-list').innerHTML = goodsList.join("");
}

renderGoodsList(goods);

//Попробовал упростить, но заново создал колесо. Уверен, что решение было легче.

// class Goods {
//   constructor(img, title, price) {
//     this.img = img;
//     this.title = title;
//     this.price = price;
//   }

//   /**Возвращает HTML разметку для карточки товара со значениями prise, title
//    * и img
//    * @returns {string} html-разметка для товара
//    */
//   renderGoodsItem() {
//     return `
//     <div class="goods-item">
//       <img src="${this.img}"
//       <h3>${this.title}</h3>
//       <p>${this.price}</p>
//       <button class="buy-button">Купить</button>
//     </div>
//   `;
//   }
// }

// const goods = [
//   new Goods('http://placekitten.com/150', 'Shirt', 150),
//   new Goods('http://placekitten.com/150', 'Socks', 50),
//   new Goods('http://placekitten.com/150', 'Jacket', 350),
//   new Goods('http://placekitten.com/150', 'Shoes', 250),
// ];

// document.querySelector('.goods-list').innerHTML = goods
//   .map(elem => elem.renderGoodsItem()).join();

//Буду благодарен, если укажите на ошибке и направите на верное решение