// Initial routing state
const userInitialState = {
  email: null,
  id: null,
  name: null,
  accessToken: window.localStorage.getItem('accessToken')
};

export const SET_USER = 'SET_USER';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

/**
 * Merge route into the global application state
 */
export function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.payload
      });
    case SET_USER:
      return Object.assign({}, state, {
        email: action.payload.email,
        id: action.payload.id,
        name: action.payload.name,
        accessToken: action.payload.accessToken
      });
    default:
      return state;
  }
}
