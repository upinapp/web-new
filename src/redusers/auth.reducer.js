import { fromJS } from 'immutable';
import { ADD_NEW_APP } from './apps.reducer';

// Initial routing state
const userInitialState = fromJS({
  email: null,
  id: null,
  name: null,
  accessToken: localStorage.getItem('accessToken')
});

export const SET_USER = 'SET_USER';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

/**
 * Merge route into the global application state
 */
export function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return state.merge({
        accessToken: action.payload
      });
    case SET_USER:
      return state.merge({
        email: action.payload.email,
        id: action.payload.id,
        name: action.payload.name
      });
    default:
      return state;
  }
}
