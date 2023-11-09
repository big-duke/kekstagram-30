import { renderGallery } from './gallery.js';
import { generatePicturesData } from './data.js';
import { initForm } from './form.js';

const pictures = generatePicturesData();
renderGallery(pictures);
initForm();
