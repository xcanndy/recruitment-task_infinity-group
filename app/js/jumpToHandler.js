const sectionsArray = [...document.querySelectorAll('section')];
const buttonJumpTo = document.querySelector('.btn--jump-to'),
      buttonUp = document.querySelector('.btn--jump-to').children[0],
      buttonDown = document.querySelector('.btn--jump-to').children[1];

let currentSection = 0,
    currentHref = sectionsArray[currentSection].id;

const changeSectionUp = () => {

  if(currentSection > 0) {
    currentSection--;
    let currentHref = sectionsArray[currentSection].id;
    buttonUp.href = `#${currentHref}`;
  } else {
    currentHref = '#';
  }

}

const changeSectionDown = () => {
  if(currentSection < sectionsArray.length -1) {
    currentSection++;
    currentHref = sectionsArray[currentSection].id;
    buttonDown.href = `#${currentHref}`;
  }
  
}

const showJumpToButton = () => {
  const position = body.scrollTop,
        clientHeight = body.clientHeight,
        maxScroll = body.scrollHeight - body.clientHeight,
        scrollPercentage = position / maxScroll;
  if(0.3 * clientHeight < position && body.clientWidth >= 768) {
    buttonJumpTo.style.display = 'flex';
  }
    
  else
    buttonJumpTo.style.display = 'none';
}

buttonUp.addEventListener('click', changeSectionUp)
buttonDown.addEventListener('click', changeSectionDown)
window.addEventListener('scroll', showJumpToButton);