import { renderGallery } from './gallery.js';
import { initForm } from './form.js';
import { getData } from './api.js';
import { showFetchError } from './messages.js';

getData()
  .then((pictures) => {
    renderGallery(pictures);
  })
  .catch(() => {
    showFetchError();
  });

initForm();
