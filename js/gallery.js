import { showModal } from './modal.js';

const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');
const galleryContainer = document.querySelector('.pictures');
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

const setContainerClickHandler = (container, pictures) => {
  container.addEventListener('click', (e) => {
    const preview = e.target.closest('a.picture[data-id]');
    if (!preview) {
      return;
    }
    e.preventDefault();
    const previewId = Number(preview?.dataset.id);

    const picture = pictures.find((item) => item.id === previewId);
    showModal(picture);
  });
};

const emptyGallery = () => {
  galleryContainer.querySelectorAll('a.picture').forEach((elem) => elem.remove());
};

export const renderGallery = (pictures) => {
  console.log('renderGallery');
  const fragment = document.createDocumentFragment();
  emptyGallery();
  pictures.forEach((item) => {
    const preview = renderPreview(item);

    // preview.addEventListener('click', () => showModal(item));
    fragment.append(preview);
  });


  setContainerClickHandler(galleryContainer, pictures);
  galleryContainer.append(fragment);
};
