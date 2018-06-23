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
  
  if(scrollPercentage >= 0.0001 && body.offsetWidth >= 768) {
    dataToggleHandler([nav, logo], 'data-scroll', 'true');
    dataToggleHandler([menu, logo], 'data-visible', 'true');
  } else if(scrollPercentage < 0.0001 && body.offsetWidth >= 768) {
    dataToggleHandler([nav, logo], 'data-scroll', 'false');
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

  if(body.offsetWidth >= 768) {
    dataToggleHandler([menu, logo], 'data-visible', toggle);
    dataToggleHandler([nav, logo], 'data-scroll', toggle);
  }
  else if(body.offsetWidth < 768) {
    dataToggleHandler([menu, logo], 'data-visible', toggle);
    dataToggleHandler([btnHamburger, nav, logo], 'data-scroll', toggle);
  } 
}

const sizeChecking = () => {
  if(body.offsetWidth < 768) {
    dataToggleHandler([menu], 'data-visible', 'false');
    dataToggleHandler([nav, logo], 'data-scroll', 'false');
    dataToggleHandler([btnHamburger], 'data-scroll', 'true');

    btnHamburger.disabled = false;
    btnHamburger.addEventListener('click', menuVisibilityHandler)
  }
  if(body.offsetWidth >= 768) {
    dataToggleHandler([btnHamburger], 'data-visible', 'false');
    dataToggleHandler([btnHamburger], 'data-scroll', 'false');
    dataToggleHandler([menu], 'data-visible', 'true');
  }
}

window.addEventListener('scroll', menuScrollHandler);
btnHamburger.addEventListener('click', menuVisibilityHandler);
window.addEventListener('resize', sizeChecking);
sizeChecking();



