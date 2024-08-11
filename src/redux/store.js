import { createStore, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";

const middlewares = () => [thunk];
const store = configureStore({reducer: rootReducer, middleware: middlewares});

export default store;
