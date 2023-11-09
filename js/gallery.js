import { showModal } from './modal.js';

const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');
const renderPreview = (picture) => {
  const preview = previewTemplate.cloneNode(true);

  const img = preview.querySelector('img');
  img.src = picture.url;
  img.alt = picture.description;

  const likes = preview.querySelector('.picture__likes');
  likes.textContent = picture.likes;

  const comments = preview.querySelector('.picture__comments');
  comments.textContent = picture.comments.length;
  preview.dataset.id = picture.id;

  return preview;
};

const setContainerClickHandler = (container,pictures) => {
  container.addEventListener('click', (e) => {
    const preview = e.target.closest('[data-id]');
    const previewId = Number(preview?.dataset.previewId);
    if (Number.isNaN(previewId)) {
      return;
    }

    e.preventDefault();
    const picture = pictures.find((item) => item.id === previewId);
    showModal(picture);
  });
};

export const renderGallery = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((item) => {
    const preview = renderPreview(item);

    preview.addEventListener('click', () => showModal(item));
    fragment.append(preview);
  });

  const container = document.querySelector('.pictures');
  setContainerClickHandler(container, pictures);
  container.append(fragment);
};


