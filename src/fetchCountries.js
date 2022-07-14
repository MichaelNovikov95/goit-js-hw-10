const DATA_BASE = 'https://restcountries.com/v3.1/name';
const inputRef = document.querySelector('#search-box');

export function onSearch(name) {
  name = inputRef.value.trim();
  const url = `${DATA_BASE}/${inputRef.value.trim()}`;

  return fetch(`${url}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        return;
      }
      return response.json();
    })
}