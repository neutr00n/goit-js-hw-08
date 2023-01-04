import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';

const galleryRef = document.querySelector('.gallery');

function createGalleryItemMarkup({ preview, original, description } = {}) {
  return `
    <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
    `;
}

const galleryItemsMarkup = galleryItems.map(createGalleryItemMarkup).join('');

galleryRef.innerHTML = galleryItemsMarkup;

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
