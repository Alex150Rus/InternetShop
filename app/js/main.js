$(document).ready(() => {
  //Создавать товары
  let product1 = new Product(123, 'man-white', 52.00, 'img/Item1.png', '.featureditemsmesh');
  let product2 = new Product(124, 'girl-rose', 52.00, 'img/Item2.png', '.featureditemsmesh');
  let product3 = new Product(125, 'man-blue', 52.00, 'img/Item3.png', '.featureditemsmesh');
  let product4 = new Product(126, 'girl-flowers', 52.00, 'img/Item4.png', '.featureditemsmesh');
  let product5 = new Product(127, 'girl-stripes', 52.00, 'img/Item5.png', '.featureditemsmesh');
  let product6 = new Product(128, 'man-hat', 52.00, 'img/Item6.png', '.featureditemsmesh');
  let product7 = new Product(129, 'man-belt', 52.00, 'img/Item7.png', '.featureditemsmesh');
  let product8 = new Product(130, 'man-blue-hat', 52.00, 'img/Item8.png', '.featureditemsmesh');

  //Корзина
  let mycart = new Cart('getCart.json', '.cartinfo');


  //Обработчик
  $('.featureditemsmesh').on('click', '.product__cartbuttonflex', e => {
      mycart.addProduct(e.target);
    $(e.target).effect('highlight');
      console.log(mycart.basketItems)
  });

  //ещё один обработчик
$('.cartinfo').on('click', '.productInCart__crossbutton', event=> {
    let $CurrentProduct = $(event.target).parent();
    mycart.remove($CurrentProduct)
})

});