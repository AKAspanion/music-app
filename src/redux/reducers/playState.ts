import { T_PLAY_SONG, T_PAUSE_SONG, T_RESUME_SONG } from '../types';

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
