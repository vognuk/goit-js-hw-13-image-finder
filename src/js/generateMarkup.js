import FetchImage     from './fetchImage';
import galleryCardTpl from '../templates/gallery-card.hbs';
import buttonTpl      from '../templates/loadMoreButton.hbs';
import formTpl from '../templates/form.hbs';
import './form.js';
import { debounce, filter, bind } from 'lodash';

// import preloaderTpl from '../templates/preloader.hbs';
// import { notification } from './notification';
// import searchValue from './form';
// const debounce     = require('lodash.debounce');
// const formOfSearch = require('./form.js').default;
// import * as fetchImage from './js/apiService.js';
// import * as basicLightbox from 'basiclightbox';


export default class GenerateMarkup {
  constructor({ inputElement, galleryBlock, imagesBlock, searchForm, loadMoreButton, searchObject }) { 
    this.refs = {
      input:          document.querySelector(inputElement),
      galleryBlock:   document.querySelector(galleryBlock),
      imagesMarkup:   document.querySelector(imagesBlock),
      searchForm:     document.querySelector(searchForm),
      loadMoreButton: document.querySelector(loadMoreButton),
      searchObject:   searchObject,
    };
 
    this.onSearch             = this.onSearch.bind(this);
    this.appendImagesMarkUp   = this.appendImagesMarkUp.bind(this);
    this.loadMoreImagesMarkUp = this.loadMoreImagesMarkUp.bind(this);
    
    this.init();
  }
  
  init() {
    this.debounce = debounce(this.onSearch, 500);
    this.refs.input.addEventListener('input', this.debounce);
  }
  
  onSearch(event) { 
    if (this.refs.searchObject.pagesCount = 1) {
      this.clearImagesMarkUp();
      this.refs.searchObject.query = event.target.value.trim();
      this.removeLoadMoreBtn();

      if (this.refs.searchObject.query === '') {
        this.clearInputField();
        return;
      }
    }
   
    this.fetchReturn();
    this.appendLoadMoreBtn();
  }

  
  // showBigImage(hits) {
  //   let {largeImageURL} = hits;
  //   const instance = basicLightbox.create(`<img src="assets/images/image.png" width="800" height="600">`);
  //   instance.show();
  // }
  
  loadMoreImagesMarkUp(event) {
    
    if (document.querySelector('.gallery').children.length > 0) {
      this.refs.searchObject.pagesCount += 1;
    } else {
      this.clearInputField('gallery__load-more-btn');
      return;
    } 
    
    this.fetchReturn();
   
    // this.refs.galleryBlock.scrollTo(0, window.innerHeight);

    // if (!document.querySelector('#cube-loader')) {
    //   this.refs.galleryBlock.insertAdjacentHTML('afterbegin', preloaderTpl());
    // }

    // this.removePreloader();
  } 

  // removePreloader() {
  //   window.onload = document.querySelector('#cube-loader').innerHTML = '';
  // }
  
  fetchReturn() {
    return window.onload = this.refs.searchObject
      .getPageOfImagesByName() //this.pagesCount, searchValueForLoadMoreMethod
      .then(this.appendImagesMarkUp)
      .then(this.clearInputField)
      .catch(); //this.onCatchError.bind(this)
  }

  appendLoadMoreBtn() {
    if (!document.querySelector('[data-load-more]')) {
      this.refs.galleryBlock.insertAdjacentHTML('beforeend', buttonTpl());
    }
    document.querySelector('[data-load-more]').addEventListener('click', this.loadMoreImagesMarkUp);
    console.log(document.documentElement.clientHeight);
  }

  removeLoadMoreBtn() {
    return this.refs.imagesMarkup.innerHTML = '';
  }

  appendImagesMarkUp(images) {
    let { total, totalHits, hits } = images;
    this.showImages(hits);
  }
  
  showImages(hits) {
    this.refs.imagesMarkup.insertAdjacentHTML('beforeend', galleryCardTpl(hits));
  }
  
  showImagesList(hits) {
    if (this.refs.imagesMarkup.children.length > 0) {
      this.pagesCount += 1;
      this.loadMoreImagesMarkUp;
    }
    this.refs.searchBlock.insertAdjacentHTML('beforeend', countriesListTpl(hits));
  }
  
  clearImagesMarkUp() {
    return this.refs.imagesMarkup.innerHTML = '';
  }
  
  clearInputField() {
    return this.refs.input.value = '';
  }

 // //   onCatchError() {
 // //     this.clearInputField();
 // //     notification();
 // //     return;
 // //   }
}
