import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { reducers } from './redux';
import DataStore from './services/data-store';

const WINDOW = window as any;

(async () => {
  try {
    let localStore: any = await DataStore.get('state');

    if (localStore === null) {
      localStore = undefined;
    }

    const store = createStore(
      reducers,
      localStore,
      WINDOW.__REDUX_DEVTOOLS_EXTENSION__ &&
        WINDOW.__REDUX_DEVTOOLS_EXTENSION__(),
    );

    store.subscribe(() => {
      DataStore.set('state', {
        songs: store.getState().songs,
        settings: store.getState().settings,
      });
    });

    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root'),
    );
  } catch (error) {}
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
