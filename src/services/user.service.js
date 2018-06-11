import { HttpService } from './http.service';
import { SET_APP_LIST } from '../redusers';
import { store } from '../utils/store.config';
import { API } from '../configs/api.confing';

export class UserService {
  static async getUserApplications() {
    const res = await HttpService.get(API.userApps);

    if (res.ok) {
      const data = await res.json();
      store.dispatch({type: SET_APP_LIST, payload: data.applications });
    }

    return res;
  }
}
