import { combineReducers } from 'redux';

import { songReducer } from './reducers';

export const reducers = combineReducers({
  songs: songReducer,
});

export * from './actions';
