import { showModal } from './modal.js';
let pictures = [];

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

const onGalleryClick = (e) => {
  const preview = e.target.closest('a.picture[data-id]');
  if (!preview) {
    return;
  }
  e.preventDefault();
  const previewId = Number(preview?.dataset.id);

  const picture = pictures.find((item) => item.id === previewId);
  showModal(picture);
};


const emptyGallery = () => {
  galleryContainer.querySelectorAll('a.picture').forEach((elem) => elem.remove());
};

export const renderGallery = (currentPictures) => {
  const fragment = document.createDocumentFragment();
  pictures = currentPictures;
  emptyGallery();
  currentPictures.forEach((item) => {
    const preview = renderPreview(item);

    // preview.addEventListener('click', () => showModal(item));
    fragment.append(preview);
  });

  galleryContainer.removeEventListener('click',onGalleryClick);
  galleryContainer.addEventListener('click',onGalleryClick);

  galleryContainer.append(fragment);
};
