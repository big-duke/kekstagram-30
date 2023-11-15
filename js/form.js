import { isEscape } from './utils.js';
import * as pristine from './pristine.js';
import { resetZoom } from './zoom.js';
import { resetVisual } from './visual.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';


const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];

const bodyElelement = document.body;
const modalElement = document.querySelector('.img-upload__overlay');
const formModal = document.querySelector('.img-upload__form');
const closeModalBtn = document.querySelector('.img-upload__cancel');
const selectFileBtn = document.querySelector('.img-upload__input');
const hashtagsElement = document.querySelector('.text__hashtags');
const commentElement = document.querySelector('.text__description');
const uploadBtn = document.querySelector('#upload-submit');
const fileChooser = document.querySelector('input[type=file]');
const preview = document.querySelector('.img-upload__preview > img');

const showModal = () => {
  bodyElelement.classList.add('modal-open');
  modalElement.classList.remove('hidden');
  document.addEventListener('keydown', documentKeyDownHandler);
};

const hideModal = () => {
  formModal.reset();
  pristine.reset();
  resetZoom();
  resetVisual();
  bodyElelement.classList.remove('modal-open');
  modalElement.classList.add('hidden');
  selectFileBtn.value = '';
  document.removeEventListener('keydown', documentKeyDownHandler);
};

fileChooser.addEventListener('change', () => {

  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const fileType = fileName.split('.').pop();
  const matches = FILE_TYPES.includes(fileType);

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});

function documentKeyDownHandler(e) {
  if (isEscape(e) && !document.querySelector('section.error')) {
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

  if (isValid) {
    uploadBtn.disabled = true;
    const formData = new FormData(formModal);

    sendData(formData).then(() => {
      hideModal();
      showSuccessMessage();
    }).catch(() => showErrorMessage()).finally(() => {
      uploadBtn.disabled = false;
    });

  }
};

export const initForm = () => {
  formModal.addEventListener('submit', submitFormHandler);

  selectFileBtn.addEventListener('change', showModal);
  closeModalBtn.addEventListener('click', hideModal);
  hashtagsElement.addEventListener('keydown', pressEscHandler);
  commentElement.addEventListener('keydown', pressEscHandler);
};

