// Initial routing state
const initialState = {
  type: '',
  text: ''
};

export const SHOW_GLOBAL_ERROR = 'SHOW_GLOBAL_ERROR';
export const SHOW_GLOBAL_INFO = 'SHOW_GLOBAL_INFO';
export const SHOW_GLOBAL_SUCCESS = 'SHOW_GLOBAL_SUCCESS';
export const SHOW_GLOBAL_WARNING = 'SHOW_GLOBAL_WARNING';
export const HIDE_GLOBAL_NOTIFICATION = 'HIDE_GLOBAL_NOTIFICATION';

/**
 * Merge route into the global application state
 */
export function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_GLOBAL_ERROR:
      return Object.assign({}, state, {
        type: 'error',
        text: action.payload
      });
    case SHOW_GLOBAL_INFO:
      return Object.assign({}, state, {
        type: 'info',
        text: action.payload
      });
    case SHOW_GLOBAL_SUCCESS:
      return Object.assign({}, state, {
        type: 'success',
        text: action.payload
      });
    case SHOW_GLOBAL_WARNING:
      return Object.assign({}, state, {
        type: 'warning',
        text: action.payload
      });
    case HIDE_GLOBAL_NOTIFICATION:
      return Object.assign({}, state, {
        type: '',
        text: ''
      });
    default:
      return state;
  }
}
