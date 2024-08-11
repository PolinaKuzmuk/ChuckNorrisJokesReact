import {
  FETCH_CATEGORIES,
  FETCH_JOKES,
  FETCH_RANDOM_JOKE,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  LOAD_FAVORITES,
} from "./actions";

const initialState = {
  categories: [],
  jokes: [],
  randomJoke: null,
  favorites: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload };
    case FETCH_JOKES:
      return { ...state, jokes: action.payload };
    case FETCH_RANDOM_JOKE:
      return { ...state, randomJoke: action.payload };
    case ADD_TO_FAVORITES:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FROM_FAVORITES:
      return { ...state, favorites: state.favorites.filter((joke) => joke.id !== action.payload) };
    case LOAD_FAVORITES:
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
}
