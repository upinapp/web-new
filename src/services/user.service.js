import { HttpService } from './http.service';
import { SET_APP_LIST, SET_USER } from '../redusers';
import { store } from '../utils';
import { API } from '../configs/api.confing';

export class UserService {
  static async getUserApplications(page = 1, count = 10) {
    const res = await HttpService.get(`${API.userApps}?page=${page}&per-page=${count}`);

    if (res.ok) {
      const data = await res.json();
      store.dispatch({ type: SET_APP_LIST, payload: data.applications });
    }

    return res;
  }

  static async getUser() {
    const res = await HttpService.get(API.getUserProfile);
    const user = {
      email: null,
      id: null,
      name: null,
      accessToken: null
    };

    if (res.ok) {
      const profile = (await res.json()).profile;
      user.email = profile.email;
      user.id = profile.id;
      user.name = profile.name;
      user.accessToken = localStorage.getItem('accessToken');
    }

    store.dispatch({ type: SET_USER, payload: user });

    return user;
  }
}
