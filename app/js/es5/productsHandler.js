'use strict';

var productsSection = document.querySelector('.products');

var createProductHtml = function createProductHtml(product) {
  var productContainer = document.createElement('div');
  productContainer.classList.add('products__item');

  var productImg = document.createElement('img');
  productImg.src = product.img;
  productImg.setAttribute('alt', product.name + ' image');
  productContainer.append(productImg);

  var productDescription = document.createElement('p');
  productDescription.innerText = product.description;
  productContainer.append(productDescription);

  return productContainer;
};

fetch('../products.json').then(function (response) {
  return response.json().then(function (data) {
    var products = data.products;
    products.map(function (product) {
      var id = product.id,
          name = product.name;
      imgUrl = product.img, description = product.description;
      var prod = createProductHtml(product);
      productsSection.append(prod);
    });
  });
});