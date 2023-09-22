import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchPhotos } from './js/api-service';
const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let page = 1;
refs.loadMoreBtn.classList.add('is-hide');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const createMarkup = markup => {
  const { totalHits, hits } = markup;
  if (markup.length < 1) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else {
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
  }
  page += 1;
  const arr = hits;
  return arr.map(item => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = item;
    return `<div class="photo-card">
 <a class="gallery__link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
  });
};

const addResult = markup => {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  refs.loadMoreBtn.classList.remove('is-hide');
};
const fetchPhoto = (searchQuery, page) => {
  searchPhotos(searchQuery, page)
    .then(createMarkup)
    .then(addResult)
    .catch(error => console.log(error));
};

const submitItem = e => {
  e.preventDefault();

  const searchQuery = e.target.searchQuery.value.toLowerCase().trim();

  if (searchQuery !== '') {
    fetchPhoto(searchQuery, page);
  }
};

refs.form.addEventListener('submit', submitItem);
