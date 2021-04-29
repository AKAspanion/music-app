import { T_ADD_SONGS, T_REMOVE_SONGS } from '../types';

export const songReducer = (state = [], action: any) => {
  switch (action.type) {
    case T_ADD_SONGS: {
      return [...state, ...action.songs].filter(
        (song, index, self) =>
          self.findIndex(s => s.name === song.name) === index,
      );
    }
    case T_REMOVE_SONGS: {
      return state.filter((_, index) => index !== action.index);
    }
    default: {
      return state;
    }
  }
};
