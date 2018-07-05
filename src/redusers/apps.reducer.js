// Initial routing state
const myAppsInitialState = {
  list: [],
  selected: null,
  timezones: [],
};

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
      return Object.assign({}, state, {
        list: action.payload
      });
    case ADD_NEW_APP:
      return Object.assign({}, state, {
        list: [...state.list, action.payload]
      });
    case SET_SELECTED_APP:
      return Object.assign({}, state, {
        selected: action.payload
      });
    case SET_TIMEZONES:
      return Object.assign({}, state, {
        timezones: action.payload
      });
    case UPDATE_APP: {
      const list = [...state.list];
      const index = state.list.findIndex((e) => e.id === action.payload.id);
      list.splice(index, 1, action.payload);

      return Object.assign({}, state, {
        list: list
      });
    }
    default:
      return state;
  }
}
