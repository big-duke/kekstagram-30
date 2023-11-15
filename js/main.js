import { renderGallery } from './gallery.js';
import { initForm } from './form.js';
import { getData } from './api.js';
import { showFetchError } from './messages.js';
import { initFilter } from './filters.js';

getData()
  .then((pictures) => {
    renderGallery(pictures);
    initFilter(pictures);
  })
  .catch(() => {
    showFetchError();
  });

initForm();
