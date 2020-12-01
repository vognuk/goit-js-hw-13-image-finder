import './js/form.js';
import '../css/normalize.css';
import '../css/reset.css';
import '../css/main.min.css';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';
import GenerateMarkup from './js/generateMarkup.js';
import FetchImage from './js/fetchImage.js'
import parameters from "./js/apiService.js";

const fetchImage = new FetchImage({ parameters });

const renderMarkup = new GenerateMarkup(
  {
    inputElement: '.input',
    galleryBlock: '.gallery__block',
    imagesBlock:  '.gallery',
    searchForm:   '.search-form',
    loadMoreButton: '[data-load-more]',
    searchObject: fetchImage,
  } 
);
