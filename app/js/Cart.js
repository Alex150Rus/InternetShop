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
      class: 'one'
    });

    let $totalAmount = $('<div/>', {
      class: 'productInCart__total'
    });
    let $totalPrice = $('<div/>', {
      class: 'productInCart__total'
    });

    let $btnsWrapper = $('<div/>');
    let $btnLinkCheckout = $('<a/>',{
      class: 'productInCart__cartbuttons',
      href: 'checkout.html',
      text: 'CHECKOUT'
    });
    let $emptyDiv = $('<div/>', {
      class: 'productInCart__emptyelement'
    });
    let $btnLinkGoToCart = $('<a/>',{
      class: 'productInCart__cartbuttons',
      href: 'ShoppingCart.html',
      text: 'GO TO CART'
    });

    $cartItemsDiv.appendTo($(this.container));
    $totalAmount.appendTo($(this.container));
    $totalPrice.appendTo($(this.container));

    $btnLinkCheckout.appendTo($btnsWrapper);
    $emptyDiv.appendTo($btnsWrapper);
    $btnLinkGoToCart.appendTo($btnsWrapper);

    $btnsWrapper.appendTo(this.container);

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
      class: 'productInCart',
      'data-product': product.id_product
    });

    let $linkWrapperForPicture = $('<a/>', {
      class: 'productInCart__imagelink',
      href: '#',
      target: "_blank"
    });

    let $pictureOfProductIncart = $('<img/>',{
      src: product.picture_src,
      alt: product.product_name
    });

    let $productInCartDescriptionWrapper = $('<div/>', {
      class: 'productInCart__description'
    });

    let $wrapperForNameStars = $('<div/>');
    let $productInCartNameWrapper = $('<h2/>', {
      class: 'productInCart__header'
    });
    let $productInCartNameLink = $('<a/>', {
      class: 'productInCart__link',
      href: '#',
      text: product.product_name
    });



    let $deleteBtn = $('<button\>', {
      class: 'deleteBtn',
      id: 'deleteBtn',
      text: 'x',
      'data-id': product.id_product,
      'data-name': product.product_name,
      'data-price': product.price
    });

    $linkWrapperForPicture.append($pictureOfProductIncart);
    $container.append($linkWrapperForPicture);

    $productInCartNameWrapper.append($productInCartNameLink);
    $wrapperForNameStars.append($productInCartNameWrapper);
    $productInCartDescriptionWrapper.append($wrapperForNameStars);
    $container.append($productInCartDescriptionWrapper);
    $container.append($deleteBtn);

    $container.prependTo($('.cartinfo'))


    /* $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
    $container.append($(`<p class="product-price">${product.price} руб</p>`));
    $container.append($deleteBtn);
    $container.appendTo($('.cartinfo'));
    */
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