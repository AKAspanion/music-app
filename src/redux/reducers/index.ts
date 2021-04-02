import {
  T_ADD_SONGS,
  T_REMOVE_SONGS,
  T_PLAY_SONG,
  T_PAUSE_SONG,
  T_RESUME_SONG,
} from '../types';

export const songReducer = (state = [], action: any) => {
  switch (action.type) {
    case T_ADD_SONGS: {
      return [...state, ...action.songs].filter(
        (song, index, self) =>
          self.findIndex(s => s.name === song.name) === index,
      );
    }
    case T_REMOVE_SONGS: {
      return state.filter((_, index) => index !== action.id);
    }
    default: {
      return state;
    }
  }
};

export const playStateReducer = (
  state = {
    playing: false,
    index: -1,
  },
  action: any,
) => {
  switch (action.type) {
    case T_PLAY_SONG: {
      return { playing: true, index: action.index };
    }
    case T_PAUSE_SONG: {
      return { ...state, playing: false };
    }
    case T_RESUME_SONG: {
      return { ...state, playing: true };
    }
    default: {
      return state;
    }
  }
};
