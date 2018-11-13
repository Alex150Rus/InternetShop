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

    let $totalWrapper = $('<div/>', {
      class: 'productInCart__total'
    });
    let $totalAmount = $('<p/>', {
      class: 'sum-amount'
    });
    let $totalPrice = $('<p/>', {
      class: 'sum-price'
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
    $totalAmount.appendTo($totalWrapper);
    $totalPrice.appendTo($totalWrapper);
    $totalWrapper.appendTo($(this.container));

    $btnLinkCheckout.appendTo($btnsWrapper);
    $emptyDiv.appendTo($btnsWrapper);
    $btnLinkGoToCart.appendTo($btnsWrapper);

    $btnsWrapper.appendTo(this.container);

  }

  _init(source) {
    this._render();
    if (!localStorage.getItem('myitems')) {
      fetch(source)
        .then(result => result.json())
        .then(data => {
          for (let product of data.contents) {
            this.basketItems.push(product);
            this._renderItem(product);
          }
          this.countGoods = data.countGoods;
          this.amount = data.amount;
          localStorage.setItem('myitems', JSON.stringify(this.basketItems));
          localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
          localStorage.setItem('amount', JSON.stringify(this.amount));
          this._renderSum()
        });
    } else {
      this.basketItems = JSON.parse(localStorage.getItem('myitems'));
      this.countGoods = JSON.parse(localStorage.getItem('countGoods'));
      this.amount = JSON.parse(localStorage.getItem('amount'));
      for (let product of this.basketItems) {
        this._renderItem(product);
        this._updateCart(product);
      }
      this._renderSum()
    }
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
      src: product.picture,
      alt: product.product_name,
      width: '72px',
      height: '85px',
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

    let $deleteBtn = $('<div\>', {
      class: 'productInCart__crossbutton',
      id: 'deleteBtn',
      'data-id': product.id_product,
      'data-name': product.product_name,
      'data-price': product.price
    });

    let $iconForDeleteButton = $('<i/>', {
      class: "fas fa-times-circle"
    });

    $linkWrapperForPicture.append($pictureOfProductIncart);
    $container.append($linkWrapperForPicture);

    $productInCartNameWrapper.append($productInCartNameLink);
    $wrapperForNameStars.append($productInCartNameWrapper);
    for (let i = 0; i < 4; i++) {
      $wrapperForNameStars
        .append($('<i class="fas fa-star"></i>'))
    }
    $wrapperForNameStars.append($('<i class="fas fa-star-half-alt"></i>'));
    $wrapperForNameStars
      .append($(`<p class="productInCart__priceincart">${product.quantity} x $${Number(product.price).toFixed(2)}</p>`));

    $productInCartDescriptionWrapper.append($wrapperForNameStars);
    $container.append($productInCartDescriptionWrapper);
    $deleteBtn.append($iconForDeleteButton);
    $productInCartDescriptionWrapper.append($deleteBtn);

    $container.prependTo($('.cartinfo'))
  }

  _renderSum() {
    $('.sum-amount').text('TOTAL');
    $('.sum-price').text(`$${Number(this.amount).toFixed(2)}`);
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
        quantity: 1,
        picture: $(element).data('picture')
      };
      this.basketItems.push(product);
      this.countGoods += product.quantity;
      this.amount += product.price;
      this._renderItem(product);
    }
    localStorage.setItem('myitems', JSON.stringify(this.basketItems));
    localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
    localStorage.setItem('amount', JSON.stringify(this.amount));
    this._renderSum();
  }

  _updateCart(product) {
    let $container = $(`div[data-product="${product.id_product}"]`);
    $container.find('.productInCart__priceincart').text(`${product.quantity} x $${Number(product.price).toFixed(2)}`);
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
    localStorage.setItem('myitems', JSON.stringify(this.basketItems));
    localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
    localStorage.setItem('amount', JSON.stringify(this.amount));
    this._renderSum();
    ($(`.productInCart[data-product='${$productId}']`)).remove();
    console.log(this.basketItems);
  }

  clearCart(){
    this.countGoods = 0;
    this.amount = 0;
    this.basketItems = [];
    localStorage.setItem('myitems', JSON.stringify(this.basketItems));
    localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
    localStorage.setItem('amount', JSON.stringify(this.amount));
    this._renderSum();
    $('.productInCart').remove()
  }
}