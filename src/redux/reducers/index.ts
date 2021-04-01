import { ADD_SONGS, REMOVE_SONGS } from '../actions';

export const songReducer = (state = [], action: any) => {
  switch (action.type) {
    case ADD_SONGS: {
      return [...state, ...action.songs];
    }
    case REMOVE_SONGS: {
      return state.filter((song, index) => index !== action.id);
    }
    default: {
      return state;
    }
  }
};
