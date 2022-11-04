const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    basketUrl: '/getBasket.json',
    products: [],
    filtered: [],
    cartItems: [],
    imgCatalog: 'https://via.placeholder.com/200x150',
    imgCart: 'https://via.placeholder.com/50x50',
    userSearch: '',
    isVisibleCart: false,
    show: false
  },

  methods: {
    filter() {
      const regexp = new RegExp(this.userSearch, 'i');
      this.filtered = this.products.filter(product => regexp.test(product.product_name));
      //Вопрос: почему в этом случае filtered вызывается два раза в консоль?
      //И влияет ли это на что-то?
      // console.log(this.filtered);
    },

    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },

    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let findItem = this.cartItems.find(elem => elem.id_product === product.id_product);
            if (findItem) {
              findItem.quantity++;
            } else {
              let newItem = Object.assign({ quantity: 1 }, product);
              this.cartItems.push(newItem);

            }
          }
        })
    },

    remove(product) {
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let findItem = this.cartItems.find(elem => elem.id_product === product.id_product);
            if (findItem.quantity > 1) {
              findItem.quantity--;
            } else {
              this.cartItems.splice(this.cartItems.indexOf(findItem), 1);
            }
          }
        })
    },
  },

  mounted() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
          this.filtered.push(el);
        }
      });

    //Была ошибка у этого блока кода:
    //Uncaught (in promise) TypeError: data is not iterable
    //То есть не читался локальный JSON-файл
    //Исправить не получилось
    this.getJson(`getProducts.json`)
      .then(data => {
        console.log(data); //undefined
        for (let el of data) {
          this.products.push(el);
        }
      });

    this.getJson(`${API + this.basketUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.cartItems.push(el);
        }
      });
  }
})