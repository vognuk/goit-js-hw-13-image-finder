import './js/form.js';
import '../css/normalize.css';
import '../css/reset.css';
import '../css/main.min.css';
import GenerateMarkup from './js/generateMarkup.js';
import FetchImage from './js/fetchImage.js'
import parameters from "./js/apiService.js";

const fetchImage = new FetchImage({ parameters });

const renderMarkup = new GenerateMarkup(
  {
    input: '.input',
    galleryBlock: '.gallery__block',
    gallery:  '.gallery',
    searchForm:   '.search-form',
    loadMoreButton: '[data-load-more]',
    searchObject: fetchImage,
  } 
);
