import { generatePicturesData } from './data.js';

const thumbnailTemplate = document.querySelector('#picture').content;
const createThumbnail = (data) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  const img = thumbnail.querySelector('img');
  img.src = data.url;
  img.alt = data.description;

  const likes = thumbnail.querySelector('.picture__likes');
  likes.textContent = data.likes;

  const comments = thumbnail.querySelector('.picture__comments');
  comments.textContent = data.comments.length;

  return thumbnail;

};


export const renderThumbnails = () => {
  const data = generatePicturesData();
  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    const thumbnail = createThumbnail(item);
    fragment.append(thumbnail);
  });

  const container = document.querySelector('.pictures');
  container.append(fragment);
};
