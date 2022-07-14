import './css/styles.css';
import { onSearch } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inputRef = document.querySelector('#search-box');
const ulRef = document.querySelector('.country-list');
const divRef = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;


const handleSearch = () => {
  const inputValue = inputRef.value.trim();

  if (!inputValue) {
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
        divRef.innerHTML = '';
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
      } else if (data.length === 1) {
        ulRef.innerHTML = ''
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


function createMarkupList(elements) {
  const previewCountryInfo = elements
    .map(({flags, name}) => {
      return `<div class="country-preview">
      <img class="flag" src="${flags.svg}" alt="${name.official} flag"></>
      <h3 class="country-name">${name.official}</h3>
      </div>`;
    })
    .join('');
  ulRef.innerHTML = previewCountryInfo;
}


function createFullMarkup(elements) {
  const fullInfo = elements
  .map(({capital, population, languages}) => {
    return `
    <ul class="country-info">
    <li class="country-item">Capital: ${capital}</li>
    <li class="country-item">Population: ${population}</li>
    <li class="country-item">Languages: ${Object.values(languages)}</li>
    </ul>`;
  })
  .join('');
const CountryInfo = elements.map(({flags, name}) => {
  return `<div class="country-preview">
  <img class="flag" src="${flags.svg}" alt="${name.official} flag"></>
  <h3 class="country-name big">${name.official}</h3>
  </div>`;
})
.join('');
  ulRef.innerHTML = CountryInfo;
  divRef.innerHTML = fullInfo;
}

let debounced = debounce(handleSearch, DEBOUNCE_DELAY);


inputRef.addEventListener('input', debounced);