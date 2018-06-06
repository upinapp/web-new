import {fromJS} from 'immutable';
import {ADD_NEW_APP} from './appsReducer';

// Initial routing state
const userInitialState = fromJS({
  email: null,
  id: null,
  name: null
});

export const SET_USER = 'SET_USER';

/**
 * Merge route into the global application state
 */
export function userReducer(state = userInitialState, action) {
  switch (action.type) {
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