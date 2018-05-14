import { fromJS } from 'immutable';

// Initial routing state
const dashboardMenuInitialState = fromJS({
  open: false,
});

export const DASHBOARD_MENU_TOGGLE = 'DASHBOARD_MENU_TOGGLE';

/**
 * Merge route into the global application state
 */
export function dashboardMenuReducer(state = dashboardMenuInitialState, action) {
  switch (action.type) {
    case DASHBOARD_MENU_TOGGLE:
      return state.merge({
        open: action.payload,
      });
    default:
      return state;
  }
}