export default class FetchImage {
  constructor(pagesCount) { 
    this.searchQuery = '';
    this.pagesCount = pagesCount;
  }

  getPageOfImagesByName(pagesCount, searchValue) {
    if (pagesCount > 1) {
      searchValue = this.localStorage.getItem(searchValue);
    } else {
      searchValue = this.searchQuery;
    }

    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchValue}&page=${this.pagesCount}&per_page=12&key=19206966-979935191003b7da2f180a9ff`)
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
