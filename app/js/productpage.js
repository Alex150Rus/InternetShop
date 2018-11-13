$(document).ready(() => {
  //Создавать товары
  let product1 = new Product(140, 'MANGO PEOPLE T-SHIRT', 52.00, 'img/men/1.jpg', '.featureditemsmesh');
  let product2 = new Product(141, 'MANGO PEOPLE T-SHIRT', 62.00, 'img/men/2.jpg', '.featureditemsmesh');
  let product3 = new Product(142, 'MANGO PEOPLE T-SHIRT', 72.00, 'img/men/3.jpg', '.featureditemsmesh');
  let product4 = new Product(143, 'MANGO PEOPLE T-SHIRT', 82.00, 'img/men/4.jpg', '.featureditemsmesh');
  let product5 = new Product(144, 'MANGO PEOPLE T-SHIRT', 92.00, 'img/men/5.jpg', '.featureditemsmesh');
  let product6 = new Product(145, 'MANGO PEOPLE T-SHIRT', 94.00, 'img/men/6.jpg', '.featureditemsmesh');
  let product7 = new Product(146, 'MANGO PEOPLE T-SHIRT', 95.00, 'img/men/7.jpg', '.featureditemsmesh');
  let product8 = new Product(147, 'MANGO PEOPLE T-SHIRT', 55.00, 'img/men/8.jpg', '.featureditemsmesh');
  let product9 = new Product(148, 'MANGO PEOPLE T-SHIRT', 67.00, 'img/men/9.jpg', '.featureditemsmesh');

  //Корзина
  let mycart = new Cart('getCart.json', '.cartinfo');


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

  let $navmenuLink =  $('.nav__menu');
  let $needToBeActive = $('#needToBeActive');
  $needToBeActive.addClass('nav__menulinks_active');

  $navmenuLink.on('mouseenter', '.nav__menulinks', event=>{
    if (($(event.target) !== $needToBeActive)) {
      $(event.target).addClass('nav__menulinks_active');
    }
  });

  $navmenuLink.on('mouseout', '.nav__menulinks', event=>{
    if (($(event.target) !== $needToBeActive)){
    $(event.target).removeClass('nav__menulinks_active')
    }
    $needToBeActive.addClass('nav__menulinks_active');
  });

});