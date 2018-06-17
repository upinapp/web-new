import { HttpService } from './http.service';
import { SET_APP_LIST, SET_USER } from '../redusers';
import { store } from '../utils';
import { API } from '../configs/api.confing';

export class UserService {
  static async getUserApplications(page = 1, count = 100) {
    const res = await HttpService.get(`${API.userAppsList}?page=${page}&per-page=${count}`);

    if (res.ok) {
      const data = await res.json();
      data.applications.forEach((app) => {
        app.statusIntegration = {
          'iOS': 'undefined',
          'Android': 'pending',
          'Unity': 'success',
          'Xamarin': 'error',
        };
        return app;
      });
      store.dispatch({ type: SET_APP_LIST, payload: data.applications });
    }

    return res;
  }

  static async createNewApplication(name, timezone) {
    const res = await HttpService.post(`${API.createUserApp}`, { name, timezone });

    if (!res.ok) {
      // TODO: Global error
    }

    return res;
  }

  static async updateApplication(id, name, timezone) {
    const res = await HttpService.post(`${API.updateUserApp}/${id}`, { name, timezone });

    if (!res.ok) {
      // TODO: Global error
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

  static async getTimezones() {
    const res = await HttpService.get(API.getTimezones);

    if (!res.ok) {
      // TODO: Global error
    }

    return res;
  }
}
