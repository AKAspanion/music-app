import { combineReducers } from 'redux';

import {
  appReducer,
  songReducer,
  settingsReducer,
  playStateReducer,
} from './reducers';

export const reducers = combineReducers({
  app: appReducer,
  songs: songReducer,
  settings: settingsReducer,
  playState: playStateReducer,
});

export * from './actions';
