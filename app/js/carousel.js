const sectionContainer = document.querySelector('.container--clients');

const carousel = slides => {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel');

  const dots = document.createElement('div');
  dots.classList.add('dots');
  carouselContainer.append(dots);

  slides.map((slide, id)=> {
    const slideContainer = document.createElement('div');
    slideContainer.classList.add('slide');

    // slide image
    const slideImage = document.createElement('img');
    slideImage.classList.add('slide__img');
    slideImage.src = slide.img;
    slideContainer.append(slideImage);

    // slide review
    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('review');

    const reviewText = document.createElement('p');
    reviewText.classList.add('review__text');
    reviewText.innerText = slide.reviewText;
    reviewContainer.append(reviewText);

    const reviewAuthor = document.createElement('p');
    reviewAuthor.classList.add('review__author');
    const reviewAuthorLink = document.createElement('a');
    reviewAuthorLink.innerText = slide.authorLinkText;
    reviewAuthorLink.href = slide.authorLinkAnchor;
    reviewAuthor.innerHTML = `${slide.reviewAuthor} / ${reviewAuthorLink}`
    reviewContainer.append(reviewAuthor);

    // slide tags
    const reviewTags = document.createElement('div');
    reviewTags.classList.add('review__tags');
    slide.tags.map(tag => {
      const tag = document.createElement('span');
      tag.classList.add('tag');
      tag.innerText = slide.tag.tagText;
      reviewTags.append(tag);
    });
    reviewContainer.append(reviewTags);

    // dot
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.id = `slide-${slide.id}`;
    dot.setAttribute('data-active', false);
    dots.append(dot);

  })
}