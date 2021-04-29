import { combineReducers } from 'redux';

import { songReducer, settingsReducer, playStateReducer } from './reducers';

export const reducers = combineReducers({
  songs: songReducer,
  settings: settingsReducer,
  playState: playStateReducer,
});

export * from './actions';
