const headerContainer = document.querySelector('.container--header');

const createCookiesElement = () => {
  const cookiesModal = document.createElement('div');
  cookiesModal.classList.add('modal','modal--cookies');

  // cookies image
  const cookiesImage = document.createElement('img');
  cookiesImage.classList.add('modal--cookies__img');
  cookiesImage.src = './images/cookies-img.svg';
  cookiesImage.alt = 'Cookies image';

  cookiesModal.append(cookiesImage);

  // cookies text
  const cookiesText = document.createElement('p');
  cookiesText.classList.add('modal--cookies__text');
  cookiesText.innerText = 'We use own and third party cookies to improve our services and show ads related  to your preferences by analyzing your browser habits. If you continue browsing, we consider you accept its use. You can switch the configuration or learn more ';

  const cookiesTextMore = document.createElement('a');
  cookiesTextMore.href = '#';
  cookiesTextMore.innerText = 'here';

  cookiesText.append(cookiesTextMore);
  cookiesModal.append(cookiesText);

  // cookies button
  const cookiesButton = document.createElement('button');
  cookiesButton.classList.add('btn','btn--cookies-close');

  const cookiesButtonText = document.createElement('span');
  cookiesButtonText.innerText = 'close';

  const cookiesButtonIcon = document.createElement('img');
  cookiesButtonIcon.src = './images/cross.svg';
  cookiesButtonIcon.setAttribute('aria-hidden', true);

  cookiesButton.append(cookiesButtonText);
  cookiesButton.append(cookiesButtonIcon);

  cookiesButton.addEventListener('click', setCookiesAccepted);

  cookiesModal.append(cookiesButton);

  return cookiesModal;
}

const setCookiesAccepted = () => {
  localStorage.setItem('cookiesShowed', 'true');
  headerContainer.removeChild(document.querySelector('.modal--cookies'));
}

const cookiesShowHandler = () => {
  if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem('cookiesShowed') === 'true') {}
    else {
      headerContainer.append(createCookiesElement());
    }
  } else 
      alert('localStorage need to be enabled!');
}

cookiesShowHandler();