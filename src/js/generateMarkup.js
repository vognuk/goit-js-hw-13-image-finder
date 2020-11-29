import FetchImage from './fetchImage';
// import countryListTpl   from '../templates/dropdown.hbs';
// import countriesListTpl from '../templates/countries-list.hbs';
import galleryCardTpl from '../templates/gallery-card.hbs';
import formTpl from '../templates/form.hbs';
import './form.js';
// import { notification } from './notification';
// import searchValue from './form';
import { debounce, filter, bind } from 'lodash';
// const debounce     = require('lodash.debounce');
// const formOfSearch = require('./form.js').default;


export default class GenerateMarkup {
  constructor({ inputElement, imagesBlock, searchForm, button, searchObject }) { 
    this.refs = {
      input:        document.querySelector(inputElement),
      imagesMarkup: document.querySelector(imagesBlock),
      searchForm:   document.querySelector(searchForm),
      button:       document.querySelector(button),
      searchObject: searchObject,
    };
 
    this.onSearch             = this.onSearch.bind(this);
    this.appendImagesMarkUp = this.appendImagesMarkUp.bind(this);
    this.loadMoreImagesMarkUp = this.loadMoreImagesMarkUp.bind(this);
    
    this.init();
  }
  
  init() {
    this.debounce = debounce(this.onSearch, 500);
    this.refs.input.addEventListener('input', this.debounce);
    this.refs.button.addEventListener('click', this.loadMoreImagesMarkUp);
  }
  
  onSearch(event) { 
    if ((this.refs.searchObject.pagesCount = 1)) {
      this.clearImagesMarkUp();
      this.refs.searchObject.query = event.target.value.trim();

      if (this.refs.searchObject.query === '') {
        this.clearInputField();
        return;
      }
    }
   
    this.fetchReturn();
  }
  
  loadMoreImagesMarkUp(event) {
    if (document.querySelector('.gallery').children.length > 0) {
      this.refs.searchObject.pagesCount += 1;
    } else {
      this.clearInputField();
      return;
    } 

    this.fetchReturn();
  } 
  
  fetchReturn() {
    return this.refs.searchObject
      .getPageOfImagesByName() //this.pagesCount, searchValueForLoadMoreMethod
      .then(this.appendImagesMarkUp)
      .then(this.clearInputField)
      .catch(); //this.onCatchError.bind(this)
  }
  
  appendImagesMarkUp(images) {
    let { total, totalHits, hits } = images;
    console.log(hits);
    // if ((this.pagesCount = 1)) {
    //   this.clearImagesMarkUp();
    // }
    this.showImages(hits);
  }
  
  showImages(hits) {
   this.refs.imagesMarkup.insertAdjacentHTML('beforeend', galleryCardTpl(hits));
   console.log(hits);
  }
  
  showImagesList(hits) {
  // let { singleImage } = hints;
  if (this.refs.imagesMarkup.children.length > 0) {
    this.pagesCount += 1;
    this.loadMoreImagesMarkUp;
  }
  this.refs.searchBlock.insertAdjacentHTML('beforeend', countriesListTpl(hits));
  // const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  // lazyImages.forEach(image => {
  //   image.addEventListener('load', onImageLoaded, { once: true });
  // });
  }
  
  clearImagesMarkUp() {
    return this.refs.imagesMarkup.innerHTML = '';
  }
  
  clearInputField() {
    // return this.refs.input.value = '';
  }
  
//  viewImageByIntersectionObserver() {
//   let options = {
//    root: document.querySelector(this.refs.imagesMarkup),
//    rootMargin: '0px',
//    threshold: 1.0,
//   };
//   let observer = new IntersectionObserver(showImagesList, options);
//   this.onSearch();
//  }

 // //   onCatchError() {
 // //     this.clearInputField();
 // //     notification();
 // //     return;
 // //   }
}
