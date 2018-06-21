const body = document.querySelector('body'),
      nav = document.querySelector('.nav--main'),
      btnHamburger = document.querySelector('#btnHamburger'),
      logo = document.querySelector('#logo'),
      menu = document.querySelector('#menu');
      
const dataToggleHandler = (elements, data, bool) => {
  elements.map(el => {
    el.setAttribute(data, bool);
  });
}

const menuScrollHandler = () => {
  const position = body.scrollTop,
        maxScroll = body.scrollHeight - body.clientHeight,
        scrollPercentage = position / maxScroll;
  
  if(scrollPercentage >= 0.0001) {
    dataToggleHandler([btnHamburger], 'data-scroll', 'true');
    dataToggleHandler([nav, logo], 'data-scroll', 'false');
    dataToggleHandler([menu, logo], 'data-visible', 'false');
  } else {
    dataToggleHandler([btnHamburger], 'data-scroll', 'false');
    dataToggleHandler([menu, logo], 'data-visible', 'true');
  }  
}

const menuVisibilityHandler = () => {
  let isVisible = menu.getAttribute('data-visible'),
      toggle = null;
  if(isVisible === 'false')
    toggle = true;
  else
    toggle = false;

  dataToggleHandler([menu, logo], 'data-visible', toggle);
  dataToggleHandler([nav, logo], 'data-scroll', toggle);
}

window.addEventListener('scroll', menuScrollHandler);
btnHamburger.addEventListener('click', menuVisibilityHandler);



