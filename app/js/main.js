$(document).ready(() => {
    //Создавать товары
    let product1 = new Product(123, 'man-white', 52, 'img/Item1.png', '.featureditemsmesh');
    let product2 = new Product(124, '', 1200, 'img/Item2.png', '.featureditemsmesh');
    let product3 = new Product(125, 'Мышь', 600, 'img/Item3.png', '.featureditemsmesh');

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