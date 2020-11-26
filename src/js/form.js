import { debounce } from 'lodash';

const overlay1 = document.querySelector('.overlay-1');
const overlay2 = document.querySelector('.overlay-2');
const search   = document.querySelector('.search');
const input    = document.querySelector('.input');


let searchValue = '';

overlay1.addEventListener('click', () => {
  search.classList.toggle('active');
    input.onblur = input.removeAttribute('placeholder');

  if (search.classList.contains('active')) {
    setTimeout(() => {
      input.focus();
    }, 200)
  }
})

search.addEventListener('click', () => {
  if (search.classList.contains('active')) {
    setTimeout(() => {
      input.focus();
      input.setAttribute('placeholder', 'Search images...');
    }, 200)
  }
})

overlay2.addEventListener('click', (e) => {
  input.value = '';
  input.focus();
  search.classList.remove('searching');
  input.removeAttribute('placeholder');
  input.classList.toggle('input__animation');
})

document.body.addEventListener('click', (e) => {
  if (!search.contains(e.target) && input.value.length === 0) {
    search.classList.remove('active');
    search.classList.remove('searching');
    input.value  = '';
    input.onblur = input.removeAttribute('placeholder');
  }
})

input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    input.blur();
  }
})

input.addEventListener('input', _.debounce(() => {
  if (input.value.length > 0) {
    input.classList.remove('input__animation');
    search.classList.add('searching');
    searchValue = input.value;
    // localStorage.setItem("searchValue", searchValue);
  } else {
    search.classList.remove('searching');
  }
}, 1000))

input.value = '';
input.blur();
