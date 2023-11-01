import { renderGallery } from './gallery.js';
import { generatePicturesData } from './data.js';

const pictures = generatePicturesData();
renderGallery(pictures);
