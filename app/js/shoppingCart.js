$(document).ready(() => {

  let mycart = new Cart('getCart.json', '.cartinfo');

  $('.cartinfo').on('click', '.productInCart__crossbutton', event => {
    let $CurrentProduct = $(event.target).parent();
    mycart.remove($CurrentProduct);
    myCartOnCartPage.remove($CurrentProduct);
  });

  let $navmenuLink = $('.nav__menu');

  $navmenuLink.on('mouseenter', '.nav__menulinks', event => {
    $(event.target).addClass('nav__menulinks_active');
  });

  $navmenuLink.on('mouseout', '.nav__menulinks', event => {
    $(event.target).removeClass('nav__menulinks_active')
  });

  class MyCartOnCartPage {
    constructor() {
      this.renderProductsFromCart()
    }

    renderProductsFromCart() {
      console.log(mycart.basketItems);
      for (let product of mycart.basketItems) {
        this.renderProduct(product);
        this.setTotalprice()
      }
    }

    renderProduct(product) {
      let $productWrapper = $('<div/>', {
        class: 'ShoppingCartProduct',
        'data-product': product.id_product
      });

      let $header = $('.ShoppingCartHeader');

      //обёртка для деталей
      let $productDetailsWrapper = $('<div/>', {
        class: 'ShoppingCartProduct__productdetails'
      });

      // обёртка для картинки продукта

      //обёртка для деталей
      let $imageWrapper = $('<div/>', {
        class: 'ShoppingCartProduct__image'
      });

      //обёртка для названия продукта, цвета, размера

      let $productNameWrapper = $('<div/>', {
        class: 'ShoppingCartProduct__description'
      });

      $(`<p class="ShoppingCartProduct__description_ProductName">${product.product_name}</p>`)
        .appendTo($productNameWrapper);

      $(`<a href="#"><img src="${product.picture}" width="100" height="115" alt="${product.product_name}"></a>`)
        .appendTo($imageWrapper);

      let $wrapperForSpans = $('<p/>');

      $('<span class="ShoppingCartProduct__description_ProductChar">Color:</span>')
        .appendTo($wrapperForSpans);
      $('<span class="ShoppingCartProduct__description_ProductCharName">Red</span>')
        .appendTo($wrapperForSpans);

      let $secondWrapperForSpans = $('<p/>');
      $('<span class="ShoppingCartProduct__description_ProductChar">Size:</span>').appendTo($secondWrapperForSpans);
      $('<span class="ShoppingCartProduct__description_ProductCharName">Xll</span>').appendTo($secondWrapperForSpans);

      let $productPriceWrapper = $('<div/>', {
        class: 'ShoppingCartProduct__unitPrice'
      });

      $(`<p>${product.price}</p>`).appendTo($productPriceWrapper);

      let $quantityWrapper = $('<div/>');
      let $quantityInput = $('<input/>', {
        class: 'ShoppingCartProduct__quantity',
        type: 'number',
        placeholder: product.quantity,
        min: '1',
        step: '1'
      });

      $quantityInput.appendTo($quantityWrapper);

      let $shipping = $('<div class="ShoppingCartProduct__shipping"><p>FREE</p></div>');

      let $subtotal = $(`<div class="ShoppingCartProduct__subtotal"><p>$${product.price * product.quantity}</p></div>`);

      let $delButton = $('<div/>', {
        id: 'deleteBtnOnPage',
        class: 'ShoppingCartProduct__action',
        'data-id': product.id_product,
        'data-name': product.product_name,
        'data-price': product.price
      });

      $('<i class="fas fa-times-circle"></i>').appendTo($delButton);

      $imageWrapper.appendTo($productDetailsWrapper);
      $wrapperForSpans.appendTo($productNameWrapper);
      $secondWrapperForSpans.appendTo($productNameWrapper);
      $productNameWrapper.appendTo($productDetailsWrapper);
      $productDetailsWrapper.appendTo($productWrapper);
      $productPriceWrapper.appendTo($productWrapper);
      $quantityWrapper.appendTo($productWrapper);
      $shipping.appendTo($productWrapper);
      $subtotal.appendTo($productWrapper);
      $delButton.appendTo($productWrapper);
      $productWrapper.insertAfter($header)
    }

    setTotalprice() {
      $('.proceedToCheckOut__spanSubTotal').text(`$${mycart.amount}`);
      $('.proceedToCheckOut__spanGrandTotal').text(`$${mycart.amount}`);
    }

    remove(element) {
      let deletedId = element.attr('data-id');
      console.log(deletedId);
      ($(`.ShoppingCartProduct[data-product='${deletedId}']`)).remove();
      this.setTotalprice()
    }

    clearCart() {
      $('.ShoppingCartProduct').remove();
      this.setTotalprice()
    }
  }

  let myCartOnCartPage = new MyCartOnCartPage;

  $('.ShoppingCartProduct').on('click', '#deleteBtnOnPage', e => {
    let $element = $(e.target).parent();
    mycart.remove($element);
    myCartOnCartPage.remove($element);
  });

  $('.ShoppingCartButtons').on('click', '#clearCart', () => {
    mycart.clearCart();
    myCartOnCartPage.clearCart()
  })

});