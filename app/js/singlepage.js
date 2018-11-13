$(document).ready(() => {
  //Создавать товары
  let product1 = new Product(150, 'MANGO PEOPLE T-SHIRT', 52.00, 'img/girls/1.jpg', '.featureditemsmesh');
  let product2 = new Product(151, 'MANGO PEOPLE T-SHIRT', 62.00, 'img/girls/Layer_45.png', '.featureditemsmesh');
  let product3 = new Product(152, 'MANGO PEOPLE T-SHIRT', 72.00, 'img/girls/3.jpg', '.featureditemsmesh');
  let product4 = new Product(153, 'MANGO PEOPLE T-SHIRT', 82.00, 'img/girls/4.jpg', '.featureditemsmesh');

  //Корзина
  let mycart = new Cart('getCart.json', '.cartinfo');


  $('[src = "img/girls/Layer_45.png"]').addClass('image-position')
    .after('<img class="image3" src="img/girls/rectangle.jpg">');


  //Обработчик
  $('.featureditemsmesh').on('click', '.product__cartbuttonflex', e => {
    mycart.addProduct(e.target);
    $(e.target).effect('highlight');
    console.log(mycart.basketItems)
  });

  //ещё один обработчик
  $('.cartinfo').on('click', '.productInCart__crossbutton', event => {
    let $CurrentProduct = $(event.target).parent();
    mycart.remove($CurrentProduct)
  });

  let $navmenuLink = $('.nav__menu');
  let $needToBeActive = $('#needToBeActive');
  $needToBeActive.addClass('nav__menulinks_active');

  $navmenuLink.on('mouseenter', '.nav__menulinks', event => {
    if (($(event.target) !== $needToBeActive)) {
      $(event.target).addClass('nav__menulinks_active');
    }
  });

  $navmenuLink.on('mouseout', '.nav__menulinks', event => {
    if (($(event.target) !== $needToBeActive)) {
      $(event.target).removeClass('nav__menulinks_active')
    }
    $needToBeActive.addClass('nav__menulinks_active');
  });

  let $addToCartButtonBig = $('.ProductProperties__cartlink');
  $addToCartButtonBig.attr('data-id', 1)
    .attr('data-name', 'MOSCHINO CHEAP AND CHIC')
    .attr('data-price', 561)
    .attr('data-picture', 'img/womanproduct.jpg');
  $addToCartButtonBig.on('click', e => {
    mycart.addProduct(e.target);
    $(e.target).effect('highlight');
  });

  let form = new Form('feedback.json', '#feedback')


});