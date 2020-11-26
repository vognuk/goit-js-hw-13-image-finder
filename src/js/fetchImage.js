// import { error } from "@pnotify/core";
// import { notification } from './notification';

export default class FetchImage {
  constructor(pagesCount) { // imageRequestValue,
    this.searchQuery = '';
    this.pagesCount = pagesCount;
  }

  getPageOfImagesByName(pagesCount) { //, imageRequestValue
    // console.log(imageRequestValue);
    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pagesCount}&per_page=12&key=19206966-979935191003b7da2f180a9ff`)
      .then(res => res.json(), res => res.status)
      .then(images => {return images;})
      .catch(error=> notification('error', "Enter country name!"))
  }
  
  checkInput() {
    if(this.searchQuery = '') {
      return;
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
