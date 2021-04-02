import { combineReducers } from 'redux';

import { songReducer, playStateReducer } from './reducers';

export const reducers = combineReducers({
  songs: songReducer,
  playState: playStateReducer,
});

export * from './actions';
