export default class LoadMoreBtn {
  constructor() {
      this.refs = {
       loadMoreButton:   document.querySelector('.gallery__load-more-btn'),
      }

    hidden && this.hide();
  }
//   getRefs('.gallery__load-more-btn') {
//     const refs = {};
//     refs.button = document.querySelector(selector);
//     return refs;
//     }
    
  show() {
    this.refs.loadMoreButton.classList.remove('is-hidden');
  }
    
  hide() {
    this.refs.loadMoreButton.classList.add('is-hidden');
  }
}
