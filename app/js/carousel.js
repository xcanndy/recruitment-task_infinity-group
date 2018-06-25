const clientsSection = document.querySelector('#clientsSection');

const createCarousel = slides => {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel');

  const dots = document.createElement('div');
  dots.classList.add('dots');
  carouselContainer.append(dots);

  slides.map( slide => {
    const slideContainer = document.createElement('div');
    slideContainer.classList.add('slide');

    slideContainer.setAttribute('data-id', slide.id);

    if(slide.id == 1)
      slideContainer.setAttribute('data-active', 'true');
    else
      slideContainer.setAttribute('data-active', 'false');

    // slide image
    const slideImage = document.createElement('img');
    slideImage.classList.add('slide__img');
    slideImage.src = slide.img;
    slideImage.alt = `Slide image`;

    slideContainer.append(slideImage);

    // slide review
    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('review');

    const reviewText = document.createElement('p');
    reviewText.classList.add('text-block','text-block--review');
    reviewText.innerText = slide.review.text;

    reviewContainer.append(reviewText);

    const reviewAuthorElement = document.createElement('p');
    reviewAuthorElement.classList.add('review__author');
    reviewAuthorElement.innerText = `${slide.review.author} / `;
    
    const reviewLinkElement = document.createElement('a');
    reviewLinkElement.href = slide.review.link;
    reviewLinkElement.target = '_blank';
    reviewLinkElement.rel = 'noopener';
    reviewLinkElement.innerText = slide.review.linkName;

    reviewAuthorElement.append(reviewLinkElement);
    reviewContainer.append(reviewAuthorElement);

    const reviewTagsElement = document.createElement('div');
    reviewTagsElement.classList.add('review__tags');
    const tags = [...slide.review.tags];
    tags.map((tag, index, tags) => {
      const tagElement = document.createElement('span');
      tagElement.classList.add('tag');
      tagElement.innerText = tags[index];

      reviewTagsElement.append(tagElement);
    });
    reviewContainer.append(reviewTagsElement);

    slideContainer.append(reviewContainer);

    // dot
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.id = `slide-${slide.id}`;
    dot.setAttribute('data-id', slide.id);
    if(slide.id == 1)
      dot.setAttribute('data-active', true);
    else
      dot.setAttribute('data-active', false);

    dot.addEventListener('click', carouselHandler);
    dots.append(dot);

    carouselContainer.insertBefore(slideContainer, dots);
  });

  return carouselContainer;
}

const carouselHandler = e => { 
  const slidesArray = [...clientsSection.querySelectorAll('.slide')];
  const dotsArray = [...clientsSection.querySelectorAll('.dot')];

  dotsArray.map(dot => {
    dot.setAttribute('data-active', false);
  });
  slidesArray.map(slide => {
    slide.setAttribute('data-active', false);
  })
  const currentId = e.target.getAttribute('data-id');
  e.target.setAttribute('data-active', true);
  [...document.querySelectorAll(`[data-id="${currentId}"]`)].map((el) => {
    el.setAttribute('data-active', true);
  })
}

fetch('./carousel.json')
  .then(response => {
    return response.json()
      .then(data => {
        const slides = data.slides;
        clientsSection.appendChild(createCarousel(slides));
      });
  });




