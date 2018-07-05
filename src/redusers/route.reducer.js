import { LOCATION_CHANGE } from 'react-router-redux';

/**
 * routeReducer
 *
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = {
  location: null,
};

/**
 * Merge route into the global application state
 */
export function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return Object.assign({}, {
        location: action.payload,
      });
    default:
      return state;
  }
}
