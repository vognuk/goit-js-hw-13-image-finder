import './js/form.js';
import '../css/normalize.css';
import '../css/reset.css';
import '../css/main.min.css';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';
import GenerateMarkup from './js/generateMarkup.js';
import FetchImage from './js/fetchImage.js'

let searchValue = localStorage.getItem('searchValue');

const renderMarkup = new GenerateMarkup(
  {
  inputElement: '.input',
  imagesBlock:  '.gallery',
  searchForm:   '.search-form',
  // images:       '.gallery',
  } 
);