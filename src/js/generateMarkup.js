import galleryCardTpl from '../templates/gallery-card.hbs';
import './form.js';
import { debounce, bind } from 'lodash';
// import './loadMoreButton.js';

export default class GenerateMarkup {
  constructor({ input, galleryBlock, gallery, searchForm, loadMoreButton, searchObject }) { 
    this.refs = {
      input:          document.querySelector(input),
      galleryBlock:   document.querySelector(galleryBlock),
      gallery:        document.querySelector(gallery),
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
    this.refs.searchObject.pagesCount = 1;
    this.refs.loadMoreButton.addEventListener('click', this.loadMoreImagesMarkUp);
    this.refs.loadMoreButton.setAttribute('hidden', 'true');
  }
  
  onSearch(event) { 
    localStorage.setItem('fetchedLength', 0);
    this.refs.searchObject.query = event.target.value.trim();

    if (this.refs.searchObject.query === '') {
       this.refs.input.value = '';
      return;
    }

    this.clearImagesMarkUp();
    this.refs.loadMoreButton.hidden = false;
    this.fetchReturn();
  }
 
  loadMoreImagesMarkUp() {
    this.fetchReturn();
    this.refs.loadMoreButton.disabled = true;
    setTimeout(this.refs.loadMoreButton.disabled = false, 500);
  } 

  fetchReturn() {
    return window.onload = this.refs.searchObject
      .getPageOfImagesByName()
      .then(this.appendImagesMarkUp)
      .then(this.clearInputField)
      .catch(); //this.onCatchError.bind(this)
  }

  appendImagesMarkUp(images) {
    let { total, totalHits, hits } = images;
    // console.log(totalHits);
    this.refs.searchObject.pagesCount += 1;
    this.showImages(hits);
    localStorage.setItem('fetchedLength', this.refs.gallery.children.length);

    if (parseInt(localStorage.getItem('fetchedLength')) >= totalHits) {
      this.refs.loadMoreButton.setAttribute('hidden', 'true');
      localStorage.setItem('fetchedLength', 0);
    }
  }
  
  showImages(hits) {
    this.refs.gallery.insertAdjacentHTML('beforeend', galleryCardTpl(hits));
    // console.log(hits.length);
  }
  
  clearImagesMarkUp() {
    return this.refs.gallery.innerHTML = '';
  }
  
  onCatchError() {
    this.clearInputField();
    notification();
    return;
  }
}
