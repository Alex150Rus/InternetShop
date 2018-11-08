class Cart {
  constructor(source, container = '#cart') {
    this.container = container;
    this.source = source;
    this.countGoods = 0; // Общее кол-во товаров
    this.amount = 0; // Сумма товаров в корзине
    this.basketItems = []; // Товары в корзине
    this._init(this.source);
  }

  _render() {
    let $cartItemsDiv = $('<div/>', {
      class: 'cart-items-wrap'
    });

    let $totalAmount = $('<div/>', {
      class: 'cart-summary sum-amount'
    });
    let $totalPrice = $('<div/>', {
      class: 'cart-summary sum-price'
    });
    $(this.container).text('Корзина');
    $cartItemsDiv.appendTo($(this.container));
    $totalAmount.appendTo($(this.container));
    $totalPrice.appendTo($(this.container));
  }

  _init(source) {
    this._render();
    fetch(source)
      .then(result => result.json())
      .then(data => {
        for (let product of data.contents) {
          this.basketItems.push(product);
          this._renderItem(product);
        }
        this.countGoods = data.countGoods;
        this.amount = data.amount;
        this._renderSum()
      });
  }

  _renderItem(product) {
    let $container = $('<div/>', {
      class: 'cart-item',
      'data-product': product.id_product
    });
    let $deleteBtn = $('<button\>', {
      class: 'deleteBtn',
      id: 'deleteBtn',
      text: 'x',
      'data-id': product.id_product,
      'data-name': product.product_name,
      'data-price': product.price
    });

    $container.append($(`<p class="product-name">${product.product_name}</p>`));
    $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
    $container.append($(`<p class="product-price">${product.price} руб</p>`));
    $container.append($deleteBtn);
    $container.appendTo($('.cart-items-wrap'));
  }

  _renderSum() {
    $('.sum-amount').text(`Всего товаров в корзине: ${this.countGoods}`);
    $('.sum-price').text(`Общая сумма: ${this.amount} руб`);
  }

  addProduct(element) {
    let productId = +$(element).data('id');
    let find = this.basketItems.find(product => product.id_product === productId);
    if (find) {
      find.quantity++;
      this.countGoods++;
      this.amount += find.price;
      this._updateCart(find)
    } else {
      let product = {
        id_product: productId,
        price: +$(element).data('price'),
        product_name: $(element).data('name'),
        quantity: 1
      };
      this.basketItems.push(product);
      this.countGoods += product.quantity;
      this.amount += product.price;
      this._renderItem(product);
    }
    this._renderSum();
  }

  _updateCart(product) {
    let $container = $(`div[data-product="${product.id_product}"]`);
    $container.find('.product-quantity').text(product.quantity);
    $container.find('.product-price').text(`${product.quantity * product.price} руб`);
  }

  remove(element) {
    let $productId = +$(element).data('id');
    let find = this.basketItems.find(product => product.id_product === $productId);
    if (find) {
      this.countGoods -= find.quantity;
      this.amount -= find.price*find.quantity;
      this.basketItems = this.basketItems.filter(function(item) {
        return item !== find
      })

    }
    this._renderSum();
    element.parent().remove();
    console.log(this.basketItems);
  }
}