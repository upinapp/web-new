export const APP_LOADING = 'APP_LOADING';

/**
 * Merge route into the global application state
 */
export function loadingReducer(state = false, action) {
  switch (action.type) {
    case APP_LOADING:
      return action.payload;
    default:
      return state;
  }
}
