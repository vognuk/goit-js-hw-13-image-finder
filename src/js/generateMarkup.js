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
  constructor({ inputElement, imagesBlock,  searchForm }) { //, images
    this.refs = {
      input:             document.querySelector(inputElement),
      imagesMarkup:      document.querySelector(imagesBlock),
      searchForm:        document.querySelector(searchForm),
      // imagesPartialList: document.querySelector(images),
    }
    this.init();
  }
  
  init() {
    this.debounce = debounce(this.onSearch.bind(this), 500);
    this.refs.input.addEventListener('input', this.debounce);
  }

  onSearch(event) {

    // if (images.filter( total => total = )) {

    // };

    let pagesCount = 1;
    const fetchImage = new FetchImage();

    console.log('При каждом последующем запросе page увеличивается на 1, а при поиске по новому ключевому слову необходимо сбрасывать его значение в 1.');
        
    this.clearImagesMarkUp.apply(this); 
    fetchImage.query = event.target.value.trim();
    
    if (fetchImage.query === '') {
      this.clearInputField.bind(this);
      return;
    }

    fetchImage.getPageOfImagesByName()
      .then(this.appendImagesMarkUp.bind(this))
      .then(this.clearInputField.bind(this))
      .catch(this.onCatchError.bind(this))
    
    // console.log(images);
  }

  appendImagesMarkUp(images) {
    // const { length } = images;
    let { total, totalHits, hits } = images;
     console.log(hits);
    this.clearImagesMarkUp();
    this.showImages(hits);

// //     if(countries.find (code => code.status === '404')){
// //       return notification();
// //     }

//     // if (true) {
//     //   this. imagesMarkup(images);
//     //   return;
//     // }
    
    if (length >= 2 && length <= 10) {
      this.clearImagesMarkUp.apply(this);
      // this.showCountryListDropdown(countries);
      this.showImagesList(hits);
      return;
    }
    
// //     if (length > 10) {
// //       notification();
// //       return;
// //     }
  }

  showImages(hits) {
    // document.querySelector(".countries__geted-list").remove();
    this.refs.imagesMarkup.insertAdjacentHTML('beforeend', galleryCardTpl(hits));
  }

// //   showCountryListDropdown(countries) {
// //     this.refs.countriesMarkup.insertAdjacentHTML('beforeend', countryListTpl(countries));
    
// //     let inputCountry = document.querySelector('.js-search');
// //     inputCountry.setAttribute("list", "countries-list");
// //   }

  showImagesList(hits) {
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
