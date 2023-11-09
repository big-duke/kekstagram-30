import { isEscape } from './utils.js';
import * as pristine from './pristine.js';

const bodyElelement = document.body;
const modalElement = document.querySelector('.img-upload__overlay');
const formModal = document.querySelector('.img-upload__form');
const closeModalBtn = document.querySelector('.img-upload__cancel');
const selectFileBtn = document.querySelector('.img-upload__input');
const hashtagsElement = document.querySelector('.text__hashtags');
const commentElement = document.querySelector('.text__description');
const uploadBtn = document.querySelector('#upload-submit');

const showModal = () => {
  bodyElelement.classList.add('modal-open');
  modalElement.classList.remove('hidden');
  document.addEventListener('keydown', documentKeyDownHandler);
};

const hideModal = () => {
  formModal.reset();
  pristine.reset();
  bodyElelement.classList.remove('modal-open');
  modalElement.classList.add('hidden');
  selectFileBtn.value = '';
  document.removeEventListener('keydown', documentKeyDownHandler);
  };

function documentKeyDownHandler(e) {
  if (isEscape(e)) {
    e.preventDefault();
    hideModal();
  }
}
const pressEscHandler = (e) => {
  if (isEscape(e)) {
    e.stopPropagation();
  }
};

const submitFormHandler = (e) => {
  e.preventDefault();

  const isValid = pristine.validate();

};

export const initForm = () => {
  formModal.addEventListener('submit', submitFormHandler);

  selectFileBtn.addEventListener('change', showModal);
  closeModalBtn.addEventListener('click', hideModal);
  hashtagsElement.addEventListener('keydown', pressEscHandler);
  commentElement.addEventListener('keydown', pressEscHandler);
};
