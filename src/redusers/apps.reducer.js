import { fromJS } from 'immutable';

// Initial routing state
const myAppsInitialState = fromJS({
  list: [],
  selected: null
});

export const ADD_NEW_APP = 'ADD_NEW_APP';
export const SET_APP_LIST = 'SET_APP_LIST';
export const SET_SELECTED_APP = 'SET_SELECTED_APP';

/**
 * Merge route into the global application state
 */
export function myAppsReducer(state = myAppsInitialState, action) {
  switch (action.type) {
    case SET_APP_LIST:
      return state.merge({
        list: action.payload
      });
    case ADD_NEW_APP:
      return state.merge({
        list: [...state.get('list'), action.payload]
      });
    case SET_SELECTED_APP:
      return state.merge({
        selected: action.payload
      });
    default:
      return state;
  }
}
