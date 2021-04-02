import {
  T_ADD_SONGS,
  T_PLAY_SONG,
  T_PAUSE_SONG,
  T_RESUME_SONG,
} from '../types';

export const ADD_SONGS = (songs: any) => ({
  type: T_ADD_SONGS,
  songs,
});

export const PLAY_SONG = (index: number) => ({
  type: T_PLAY_SONG,
  index,
});

export const PAUSE_SONG = () => ({
  type: T_PAUSE_SONG,
});

export const RESUME_SONG = () => ({
  type: T_RESUME_SONG,
});
