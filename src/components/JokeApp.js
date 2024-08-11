import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchCategories,
  fetchJokesByCategory,
  fetchRandomJoke,
  addToFavorites,
  removeFromFavorites,
  loadFavorites,
} from "../redux/actions";

class JokeApp extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.loadFavorites();
  }

  handleCategoryClick = (category) => {
    this.props.fetchJokesByCategory(category);
  };

  handleRandomJokeClick = () => {
    this.props.fetchRandomJoke();
  };

  handleToggleFavorite = (joke) => {
    const isFavorite = this.props.favorites.some((fav) => fav.id === joke.id);
    if (isFavorite) {
      this.props.removeFromFavorites(joke.id);
    } else {
      this.props.addToFavorites(joke);
    }
  };

  render() {
    const { categories, jokes, randomJoke, favorites } = this.props;

    return (
      <div className="container">
        <button onClick={this.handleRandomJokeClick} className="primary">
          Get Random Joke
        </button>
        <h2>Categories</h2>
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category}>
              {category}
              <button className="secondary" onClick={() => this.handleCategoryClick(category)}>Select</button>
            </li>
          ))}
        </ul>
        <h2>Jokes</h2>
        <ul className="joke-list">
          {jokes.map((joke) => {
            const isFavorite = favorites.some((fav) => fav.id === joke.id);
            return (
              <li key={joke.id}>
                {joke.value}
                <i
                  role="button"
                  data-testid="favorite"
                  className={`fas fa-heart heart-icon ${isFavorite ? "heart-icon-filled" : "heart-icon-empty"}`}
                  onClick={() => this.handleToggleFavorite(joke)}
                ></i>
              </li>
            );
          })}
        </ul>
        {randomJoke && (
          <div>
            <h2>Random Joke</h2>
            <p>{randomJoke.value}</p>
            <i
              role="button"
              data-testid="favorite"
              className={`fas fa-heart heart-icon ${
                favorites.some((fav) => fav.id === randomJoke.id) ? "heart-icon-filled" : "heart-icon-empty"
              }`}
              onClick={() => this.handleToggleFavorite(randomJoke)}
            ></i>
          </div>
        )}
        <h2>Favorites</h2>
        <ul className="favorite-list">
          {favorites.map((joke) => (
            <li key={joke.id}>
              {joke.value}
              <i
                role="button"
                data-testid="favorite"
                className="fas fa-heart heart-icon heart-icon-filled"
                onClick={() => this.handleToggleFavorite(joke)}
              ></i>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  jokes: state.jokes,
  randomJoke: state.randomJoke,
  favorites: state.favorites,
});

const mapDispatchToProps = {
  fetchCategories,
  fetchJokesByCategory,
  fetchRandomJoke,
  addToFavorites,
  removeFromFavorites,
  loadFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(JokeApp);
