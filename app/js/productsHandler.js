const productsSection = document.querySelector('.products');

const createProductHtml = product => {
  const productContainer = document.createElement('div');
  productContainer.classList.add('products__item');

  const productImg = document.createElement('img');
  productImg.src = product.img;
  productImg.setAttribute('alt', `${product.name} image`);
  productContainer.append(productImg);

  const productDescription = document.createElement('p');
  productDescription.innerText = product.description;
  productContainer.append(productDescription);

  return productContainer;
}

fetch('../products.json')
  .then(response => {
    return response.json()
      .then(data => {
        const products = data.products;
        products.map(product => {
          const id = product.id,
                name = product.name
                imgUrl = product.img,
                description = product.description;
          const prod = createProductHtml(product);
          productsSection.append(prod);
        });
      });
  });
