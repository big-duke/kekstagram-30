import { renderGallery } from './gallery';
import { Filter } from './const';
import { debounce } from './utils';
const RANDOM_PICTURE_LIMIT = 10;
const RENDER_DELAY_MS = 500;

let filter = Filter.DEFAULT;
let pictures = [];

const debounceRenderGallery = debounce(renderGallery,RENDER_DELAY_MS);

const filterElement = document.querySelector('.img-filters');
const getFilterPictures = () => {
  switch (filter) {
    case Filter.RANDOM:
      return [...pictures]
        .sort(() => 0.5 - Math.random())
        .slice(0, RANDOM_PICTURE_LIMIT);
    case Filter.DISCUSSED:
      return [...pictures].sort(
        (a, b) => b.comments.length - a.comments.length
      );
    default:
      return pictures;
  }
};

filterElement.addEventListener('click', (e) => {

  if (e.target.matches('button')) {

    const currentFilterBtn = filterElement.querySelector('.img-filters__button--active');
    const nextFilterBtn = e.target;

    if (currentFilterBtn.id === nextFilterBtn.id) {
      return;
    }

    currentFilterBtn.classList.remove('img-filters__button--active');
    nextFilterBtn.classList.add('img-filters__button--active');
    filter = nextFilterBtn.id;

    const filteredPictures = getFilterPictures();

    debounceRenderGallery(filteredPictures);
  }
});



const initFilter = (picturesData) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = picturesData;
};

export { initFilter };
