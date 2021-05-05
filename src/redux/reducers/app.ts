import { T_SET_VIEW } from '../types';

export const appReducer = (
  state = {
    view: 'home',
  },
  action: any,
) => {
  switch (action.type) {
    case T_SET_VIEW:
      return { ...state, view: action.value };
    default: {
      return state;
    }
  }
};
