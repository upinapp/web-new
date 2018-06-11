import createHistory from 'history/createBrowserHistory';
import configureStore from '../configureStore';

const initialState = {
  loading: false
};

export const history = createHistory();
export const store = configureStore(initialState, history);
