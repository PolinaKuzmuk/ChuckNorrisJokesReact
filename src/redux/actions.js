export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_JOKES = 'FETCH_JOKES';
export const FETCH_RANDOM_JOKE = 'FETCH_RANDOM_JOKE';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const LOAD_FAVORITES = 'LOAD_FAVORITES';

export const fetchCategories = () => async (dispatch) => {
  const response = await fetch('https://api.chucknorris.io/jokes/categories');
  const data = await response.json();
  dispatch({ type: FETCH_CATEGORIES, payload: data });
};

export const fetchJokesByCategory = (category) => async (dispatch) => {
  const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
  const data = await response.json();
  dispatch({ type: FETCH_JOKES, payload: [data] });
};

export const fetchRandomJoke = () => async (dispatch) => {
  const response = await fetch('https://api.chucknorris.io/jokes/random');
  const data = await response.json();
  dispatch({ type: FETCH_RANDOM_JOKE, payload: data });
};

export const addToFavorites = (joke) => (dispatch, getState) => {
  const favorites = [...getState().favorites, joke];
  localStorage.setItem('favorites', JSON.stringify(favorites));
  dispatch({ type: ADD_TO_FAVORITES, payload: joke });
};

export const removeFromFavorites = (jokeId) => (dispatch, getState) => {
  const favorites = getState().favorites.filter((joke) => joke.id !== jokeId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  dispatch({ type: REMOVE_FROM_FAVORITES, payload: jokeId });
};

export const loadFavorites = () => (dispatch) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  dispatch({ type: LOAD_FAVORITES, payload: favorites });
};
