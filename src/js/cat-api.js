const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_pnhvG8LOoPkCAyUqXZ2e5Efd52bIppTKRmWym1tIs1CzkAwwRRCQTlwQdJDgsXqr';

export function fetchBreeds() {
  return fetch(`${BASE_URL}breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatPhoto(breedId) {
  return fetch(
    `${BASE_URL}images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
