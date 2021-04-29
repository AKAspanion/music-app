import {
  T_ADD_SONGS,
  T_PLAY_SONG,
  T_PAUSE_SONG,
  T_RESUME_SONG,
  T_REMOVE_SONGS,
  T_SET_GRID,
  T_SET_THEME,
  T_SET_VISUALIZER,
} from '../types';

export const ADD_SONGS = (songs: any) => ({
  type: T_ADD_SONGS,
  songs,
});

export const DELETE_SONG = (index: any) => ({
  type: T_REMOVE_SONGS,
  index,
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

export const SET_GRID = (value: boolean) => ({
  type: T_SET_GRID,
  value,
});

export const SET_VISUALIZER = (value: boolean) => ({
  type: T_SET_VISUALIZER,
  value,
});

export const SET_THEME = (value: boolean) => ({
  type: T_SET_THEME,
  value,
});
