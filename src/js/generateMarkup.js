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
  constructor({ inputElement, imagesBlock,  searchForm, button, storage}) { //, images
    let pagesCount = 1;

    this.refs = {
      input:        document.querySelector(inputElement),
      imagesMarkup: document.querySelector(imagesBlock),
      searchForm:   document.querySelector(searchForm),
      button:       document.querySelector(button),
      storage:      storage,
    }
  
    this.init();
  }
  
  init() {
    this.debounce = debounce(this.onSearch.bind(this), 500);
    this.refs.input.addEventListener('input', this.debounce);
    this.refs.button.addEventListener('click', this.loadMoreImagesMarkUp);
   
  }

  onSearch(event) {   
    const fetchImage = new FetchImage(this.pagesCount);

    if (this.pagesCount = 1) {
      this.clearImagesMarkUp.apply(this); 
      fetchImage.query = event.target.value.trim();
      
      if (fetchImage.query === '') {
        this.clearInputField.bind(this);
        return;
      }
    }
    
    return fetchImage.getPageOfImagesByName()
      .then(this.appendImagesMarkUp.bind(this))
      .then(this.clearInputField.bind(this))
      .catch() //this.onCatchError.bind(this)
  }

  loadMoreImagesMarkUp(event) {
    this.pagesCount = 2;
    if (document.querySelector('.gallery').children.length > 0) {
      this.pagesCount += 1;
      // console.log(this.refs.imagesMarkup.children.length);
      // localStorage.setItem('pagesCount', pagesCount);
      // return;
    } else {
        this.clearInputField.bind(this);
      return;
    }
    
    const fetchImage = new FetchImage(this.pagesCount);//this.pagesCount, localStorage.getItem('searchValue')
    console.log(`Load more pagesCount: ${this.pagesCount}`);
    // console.log(this.refs.imagesMarkup.children.length);
    
    fetchImage.getPageOfImagesByName() //this.pagesCount, searchValueForLoadMoreMethod
      .then(this.appendImagesMarkUp.bind(this))
      .then(this.clearInputField.bind(this))
      .catch() //this.onCatchError.bind(this)
  }

  viewImageByIntersectionObserver() {
    let options = {
      root:       document.querySelector(this.refs.imagesMarkup),
      rootMargin: '0px',
      threshold:  1.0
    }
    let observer = new IntersectionObserver(showImagesList, options);
    this.onSearch();
  }

  appendImagesMarkUp(images) {
    let { total, totalHits, hits } = images;
    console.log(hits);

    if (this.pagesCount = 1) { 
      this.clearImagesMarkUp();
    }

    this.showImages(hits);

// //     if(countries.find (code => code.status === '404')){
// //       return notification();
// //     }

//     // if (true) {
//     //   this. imagesMarkup(images);
//     //   return;
//     // }
    
    // if (length >= 2 && length <= 10) {
    //   this.clearImagesMarkUp.apply(this);
    //   // this.showCountryListDropdown(countries);
    //   this.showImagesList(hits);
    //   return;
    // }
    
// //     if (length > 10) {
// //       notification();
// //       return;
// //     }
  }

  showImages(hits) {  
    this.refs.imagesMarkup.insertAdjacentHTML('beforeend', galleryCardTpl(hits));
    console.log(this.refs.imagesMarkup.children);
    console.log(this.refs.imagesMarkup.children.length);
  }

// //   showCountryListDropdown(countries) {
// //     this.refs.countriesMarkup.insertAdjacentHTML('beforeend', countryListTpl(countries));
    
// //     let inputCountry = document.querySelector('.js-search');
// //     inputCountry.setAttribute("list", "countries-list");
// //   }

  showImagesList(hits) {
      // let { singleImage } = hints;
     if (this.refs.imagesMarkup.children.length > 0) {
       this.pagesCount += 1;
       this.onSearch;
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
    return this.refs.input.value = '';
  }

// //   onCatchError() {
// //     this.clearInputField();
// //     notification();
// //     return;
// //   }
}
