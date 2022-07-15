import './css/styles.css';
import { onSearch } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import {createMarkupList, createFullMarkup} from './createMarkup';
import {inputRef, ulRef, divRef, DEBOUNCE_DELAY} from './refs';


const handleSearch = () => {
  const inputValue = inputRef.value.trim();

  if (!inputValue) {
    divRef.innerHTML = '';
    ulRef.innerHTML = '';
    return;
  } else {
    onSearch()
    .then(data => {
      if (data === undefined) {
        throw new Error('nothing to show...');
      }
      if (data.length > 10 || inputValue === 1) {
        ulRef.innerHTML = '';
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
      } else if (data.length === 1) {
        ulRef.innerHTML = '';
        createFullMarkup(data);
      } else if (data.length <= 10 || data.length >= 2) {
        divRef.innerHTML = '';
        createMarkupList(data);
      } 
    })
    .catch(error => {
      ulRef.innerHTML = '';
      divRef.innerHTML = '';
      Notiflix.Notify.failure("Oops, there is no country with that name");
    });
  }
}

let debounced = debounce(handleSearch, DEBOUNCE_DELAY);

inputRef.addEventListener('input', debounced);