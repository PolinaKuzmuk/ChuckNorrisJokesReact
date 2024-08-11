import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {thunk} from "redux-thunk";
import "@testing-library/jest-dom";
import JokeApp from "./JokeApp";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  categories: ["animal", "career"],
  jokes: [],
  randomJoke: null,
  favorites: [],
};

describe("JokeApp Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("renders category buttons", () => {
    render(
      <Provider store={store}>
        <JokeApp />
      </Provider>
    );

    const categoryButtons = screen.getAllByText(/Select/i);
    expect(categoryButtons).toHaveLength(initialState.categories.length);
  });

  it("fetches jokes by category when category button is clicked", () => {
    render(
      <Provider store={store}>
        <JokeApp />
      </Provider>
    );

    const categoryButton = screen.getAllByText("Select", { selector: "button" })[0];
    fireEvent.click(categoryButton);

    const actions = store.getActions();
    // console.log("Actions:", actions)
    expect(actions[1].type).toEqual("FETCH_JOKES_BY_CATEGORY");
  });

  it('fetches a random joke when "Get Random Joke" button is clicked', () => {
    render(
      <Provider store={store}>
        <JokeApp />
      </Provider>
    );

    const randomJokeButton = screen.getByText("Get Random Joke");
    // console.log(randomJokeButton)
    // fireEvent.click(randomJokeButton);
    fireEvent(randomJokeButton, new MouseEvent('click', { bubbles: true }));

    const actions = store.getActions();
    console.log("Actions:", actions);
    expect(actions[1].type).toEqual("FETCH_RANDOM_JOKE");
  });

  it("adds a joke to favorites when heart icon is clicked", () => {
    const joke = { id: "123", value: "Funny joke" };
    store = mockStore({ ...initialState, jokes: [joke] });

    render(
      <Provider store={store}>
        <JokeApp />
      </Provider>
    );

    const heartIcon = screen.getAllByTestId("favorite")[0];
    // fireEvent.click(heartIcon);
    fireEvent(heartIcon, new MouseEvent('click', { bubbles: true }));


    const actions = store.getActions();
    expect(actions[1].type).toEqual("ADD_TO_FAVORITES");
  });

  it("removes a joke from favorites when filled heart icon is clicked", () => {
    const joke = { id: "123", value: "Funny joke" };
    store = mockStore({ ...initialState, favorites: [joke] });

    render(
      <Provider store={store}>
        <JokeApp />
      </Provider>
    );

    const filledHeartIcon = document.getElementsByClassName("heart-icon-filled");
    fireEvent.click(filledHeartIcon[0]);

    const actions = store.getActions();
    expect(actions[1].type).toEqual("REMOVE_FROM_FAVORITES");
  });
});
