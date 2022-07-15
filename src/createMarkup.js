import {ulRef, divRef} from './refs';

export function createMarkupList(elements) {
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


export function createFullMarkup(elements) {
  const fullInfo = elements
  .map(({capital, population, languages}) => {
    return `
    <ul class="country-info__list">
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