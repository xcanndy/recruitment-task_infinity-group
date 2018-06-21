const form = document.querySelector('.contact__form');

const namePattern = /^[A-Za-z\s]+$/,
      companyNamePattern = /^[A-Za-z0-9\s-_.&]$/,
      phonePattern = /^\d$/,
      emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const invalidModalsHandler = message => {
  const modals = form.querySelector('.modals');
  if(!(form.querySelector('.modals'))) {
    const modals = document.createElement('div');
    modals.classList.add('modals');
    form.prepend(modals);

    const modal = document.createElement('div');
    modal.classList.add('modal','modal--invalid');
    modal.innerText = message;
    modals.append(modal);

  } else {
    const modal = document.createElement('div');
    modal.classList.add('modal','modal--invalid');
    modal.innerText = message;
    modals.append(modal);
  }
}

const removeInvalidModal = () => {
  document.querySelector('.modals').removeChild(document.querySelector('.modal--invalid'));
  
}

const nameInput = document.querySelector('input[name="form__name"]');
const emailInput = document.querySelector('input[name="form__email"]');
const companyNameInput = document.querySelector('input[name="form__company-name"]');
const phoneInput = document.querySelector('input[name="form__phone"]');

const patternHandler = (e, pattern) => {
  if(e.target.value.match(pattern)) 
    return true;
  else 
    return false;
}

const validator = (input, pattern, message) => {
  return e => {
    if(!patternHandler(e, pattern) && !input.classList.contains('invalid')) {
      input.classList.add('invalid');
      invalidModalsHandler(message);
    } else {
      if(patternHandler(e, pattern) && input.classList.contains('invalid')) {
        
      } else if(e.target.value === "") {
        input.classList.remove('invalid');
        removeInvalidModal();
      }
    }
  }
}

nameInput.addEventListener('change', validator(nameInput, namePattern, "Is it legal to have numbers or symbols in name?"));
emailInput.addEventListener('change', validator(emailInput, emailPattern, "Your email looks invalid"));
companyNameInput.addEventListener('change', validator(companyNameInput, companyNamePattern, "Company name should contain only letters, numbers and the following symbols: -_.&!"));
phoneInput.addEventListener('change', validator(phoneInput, phonePattern, "There is no phone numbers with letters and symbols yet."));




