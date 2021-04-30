import {
  T_SET_GRID,
  T_SET_THEME,
  T_SET_REPEAT,
  T_SET_VISUALIZER,
} from '../types';

export const settingsReducer = (
  state = {
    visualizer: true,
    repeat: 'all',
    light: true,
    grid: true,
  },
  action: any,
) => {
  switch (action.type) {
    case T_SET_GRID:
      return { ...state, grid: action.value };
    case T_SET_REPEAT:
      return { ...state, repeat: action.value };
    case T_SET_THEME:
      return { ...state, light: action.value };
    case T_SET_VISUALIZER:
      return { ...state, visualizer: action.value };
    default:
      return { ...state };
  }
};
