import { push } from 'react-router-redux';

import { SHOW_GLOBAL_ERROR } from '../redusers';
import { store } from '../utils';

export class HttpErrorService {
  static handle(error) {
    switch (error.status) {
      case 401:
        localStorage.removeItem('accessToken');
        store.dispatch({type: SHOW_GLOBAL_ERROR, payload: 'Пожалуйста авторизуйтесь'});
        store.dispatch(push('/auth'));
        break;
      default:
    }
  }
}
