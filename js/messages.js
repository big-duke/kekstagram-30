import {isEscape} from './utils.js';
const MessageConfig = {
  success: {element:document.querySelector('#success').content.querySelector('.success'), btnClass:'.success__button'},
  error: {element:document.querySelector('#error').content.querySelector('.error'), btnClass:'.error__button'}
};


export const showFetchError = () => {
  const fetchErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const element = fetchErrorTemplate.cloneNode(true);
  document.body.appendChild(element);

  setTimeout(() => {
    element.remove();
  }, 5000);
};


const showMessage = (messageConfig) => {
  messageConfig.element
    .querySelector(messageConfig.btnClass)
    .addEventListener('click', hideMessage);
  document.body.append(messageConfig.element);
  document.body.addEventListener('click', bodyClickHandler);
  document.addEventListener('keydown', documentKeyDownHandler);
};

function bodyClickHandler (e) {
  if (e.target.closest('.success') || e.target.closest('.error')) {
    hideMessage();
  }
}

function documentKeyDownHandler(e) {

  if (isEscape(e)) {
    e.preventDefault();
    hideMessage();
  }
}

function hideMessage () {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.body.removeEventListener('click', bodyClickHandler);
  document.removeEventListener('keydown', documentKeyDownHandler);
}



export const showSuccessMessage = () => showMessage(MessageConfig.success);
export const showErrorMessage = () => showMessage(MessageConfig.error);
