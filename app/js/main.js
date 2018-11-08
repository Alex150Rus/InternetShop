$(document).ready(() => {
  //Создавать товары
  let product1 = new Product(123, 'man-white', 52.00, 'img/Item1.png', '.featureditemsmesh');
  let product2 = new Product(124, 'girl-rose', 52.00, 'img/Item2.png', '.featureditemsmesh');
  let product3 = new Product(125, 'man-blue', 52.00, 'img/Item3.png', '.featureditemsmesh');
  let product4 = new Product(126, 'girl-flowers', 52.00, 'img/Item4.png', '.featureditemsmesh');

  //Корзина
  /*let mycart = new Cart('getCart.json');

  //Обработчик
  $('#products').on('click', '.buyBtn', e => {
      mycart.addProduct(e.target);
      console.log(e.target);
  });

  //ещё один обработчик
$('.cart-items-wrap').on('click', '.deleteBtn', event=> {
    let $CurrentProduct = $(event.target);
    mycart.remove($CurrentProduct)
});
  console.log(mycart);
  */
});