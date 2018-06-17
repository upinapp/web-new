import { fromJS } from 'immutable';

// Initial routing state
const myAppsInitialState = fromJS({
  list: [],
  selected: null,
  timezones: [],
});

export const ADD_NEW_APP = 'ADD_NEW_APP';
export const UPDATE_APP = 'UPDATE_APP';
export const SET_APP_LIST = 'SET_APP_LIST';
export const SET_SELECTED_APP = 'SET_SELECTED_APP';
export const SET_TIMEZONES = 'SET_TIMEZONES';

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
    case SET_TIMEZONES:
      return state.merge({
        timezones: action.payload
      });
    case UPDATE_APP: {
      const stateObject = state.toJS();
      const list = stateObject.list;
      const index = stateObject.list.findIndex((e) => e.id === action.payload.id);
      list.splice(index, 1, action.payload);

      return state.merge({
        list: list
      });
    }
    default:
      return state;
  }
}
