import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import JokeApp from './components/JokeApp';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <h1>Chuck Norris Jokes</h1>
          <JokeApp />
        </div>
      </Provider>
    );
  }
}

export default App;
