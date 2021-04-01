export const ADD_SONGS = 'ADD_SONGS';
export const REMOVE_SONGS = 'REMOVE_SONGS';

export const addSongs = (songs: any) => ({
  type: ADD_SONGS,
  songs,
});
