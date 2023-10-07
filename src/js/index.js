import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_pnhvG8LOoPkCAyUqXZ2e5Efd52bIppTKRmWym1tIs1CzkAwwRRCQTlwQdJDgsXqr';

import { fetchBreeds, fetchCatPhoto } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loading = document.querySelector('.loader');
const errorShowing = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

window.addEventListener('load', initial);

function initial() {
  let dataBreed;
  fetchBreeds()
    .then(data => {
      dataBreed = data;
      data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
        breedSelect.classList.remove('is-hidden');
        loading.classList.add('is-hidden');
      });
    })
    .catch(err => {
      console.log(err);
      errorShowing.classList.remove('is-hidden');
      breedSelect.classList.add('is-hidden');
      loading.classList.add('is-hidden');
    });

  breedSelect.addEventListener('change', () => {
    const selectBreedId = breedSelect.value;
    loading.classList.remove('is-hidden');
    catInfo.classList.add('is-hidden');
    errorShowing.classList.add('is-hidden');

    fetchCatPhoto(selectBreedId)
      .then(result => {
        const catData = result[0];
        const breedData = dataBreed.find(
          breed => breed.id === catData.breeds[0].id
        );

        const markup = createMarkup(catData, breedData);
        catInfo.innerHTML = markup;

        loading.classList.add('is-hidden');
        catInfo.classList.remove('is-hidden');
      })
      .catch(err => {
        console.log(err);
        errorShowing.classList.remove('is-hidden');
        loading.classList.add('is-hidden');
      });
  });
}

function createMarkup(catData, breedData) {
  return `<div class='catbox'><img src='${catData.url}' width = '300' alt = '${breedData.name}' />
        <div class='textInfo'><h1>${breedData.name}</h1>
        <p>${breedData.description}</p>
        <p><b>Temperament:</b> ${breedData.temperament}</p>
        </div></div>`;
}
