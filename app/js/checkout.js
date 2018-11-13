$(document).ready(() => {

  let mycart = new Cart('getCart.json', '.cartinfo');

  $('.cartinfo').on('click', '.productInCart__crossbutton', event => {
    let $CurrentProduct = $(event.target).parent();
    mycart.remove($CurrentProduct)
  });

  let $navmenuLink = $('.nav__menu');

  $navmenuLink.on('mouseenter', '.nav__menulinks', event => {
    $(event.target).addClass('nav__menulinks_active')
  });

  $navmenuLink.on('mouseout', '.nav__menulinks', event => {
    $(event.target).removeClass('nav__menulinks_active')
  });

});