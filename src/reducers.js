/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {combineReducers} from 'redux-immutable';
import {routeReducer, dashboardMenuReducer, myAppsReducer, audienceByDateReducer} from './redusers';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    dashboardMenu: dashboardMenuReducer,
    apps: myAppsReducer,
    audienceByDate: audienceByDateReducer,
    ...injectedReducers,
  });
}