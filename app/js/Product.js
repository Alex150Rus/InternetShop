class Product {
  constructor(id, title, price, img = 'https://placehold.it/200x150', container = '#products') {
    this.id = id;
    this.price = price;
    this.title = title;
    this.img = img;
    this.container = container;
    this._render(this.container);
  }

  _render(container) {
    let $wrapper = $('<div/>', {
      class: 'product',
    });

    let $linkWrapperImg = $('<a/>', {
      class: 'product__link',
      href: '#',
    });

    let $img = $('<img/>', {
      class: 'product__image',
      alt: this.title,
      src: this.img
    });

    let $name = $('<h2/>', {
      class: 'product__name',
      text: this.title
    });
    let $price = $('<h2/>', {
      class: 'product__price',
      text: `$ ${Number(this.price).toFixed(2)}`
    });

    let $buyBtn = $('<button/>', {
      class: 'product__cartbuttonflex product__invisiblebutton',
      'data-id': this.id,
      'data-name': this.title,
      'data-price': this.price,
      'data-picture': this.img,
      text: 'Add to Cart'
    });


    // Собираем структуру html
    $img.appendTo($linkWrapperImg);
    $name.appendTo($linkWrapperImg);
    $price.appendTo($linkWrapperImg);
    $linkWrapperImg.appendTo($wrapper);

    $buyBtn.appendTo($wrapper);

    $(container).append($wrapper);
  }
}