const bodyElelement = document.body;
const pictureModal = document.querySelector('.big-picture');
const closeModalBtn = document.querySelector('.big-picture__cancel');
const pictureElement = document.querySelector('.big-picture__img > img');
const descriptionElement = document.querySelector('.social__caption');
const likesCountElement = document.querySelector('.likes-count');

const commentsContainer = document.querySelector('.social__comments');

const commentShownCountElement = document.querySelector(
  '.social__comment-shown-count'
);
const commentTotalCountElement = document.querySelector(
  '.social__comment-total-count'
);
const commentLoaderButton = document.querySelector('.social__comments-loader');

const commentTemplate = document.querySelector('#social__comment').content;

let shownCount = 0;
let pictureComments = [];

const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderComments = () => {
  shownCount += 5;
  if (shownCount >= pictureComments.length) {
    commentLoaderButton.classList.add('hidden');
    shownCount = pictureComments.length;
  } else {
    commentLoaderButton.classList.remove('hidden');
  }
  commentsContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();
  pictureComments.slice(0, shownCount).forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });
  commentsContainer.append(fragment);
  commentShownCountElement.textContent = shownCount;
};

const renderCommentsHandler = (e) => {
  e.preventDefault();
  renderComments();
};

export const showModal = ({ url, description, likes, comments }) => {
  pictureModal.classList.remove('hidden');
  bodyElelement.classList.add('modal-open');

  pictureElement.src = url;
  pictureElement.alt = description;
  likesCountElement.textContent = likes;
  commentTotalCountElement.textContent = comments.length;
  commentShownCountElement.textContent = shownCount;
  descriptionElement.textContent = description;
  pictureComments = comments;
  renderComments();

  document.addEventListener('keydown', handleDocumentKeyDown);
  commentLoaderButton.addEventListener('click',renderCommentsHandler);
};

const hideModal = () => {
  pictureModal.classList.add('hidden');
  bodyElelement.classList.remove('modal-open');
  document.removeEventListener('keydown', handleDocumentKeyDown);
  commentLoaderButton.removeEventListener('click',renderCommentsHandler);
  shownCount = 0;
};

function handleDocumentKeyDown(e) {
  if (e.key === 'Escape') {
    e.preventDefault();
    hideModal();
  }
}

closeModalBtn.addEventListener('click', hideModal);
