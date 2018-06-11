import { API } from '../configs/api.confing';
import { SET_USER, SET_ACCESS_TOKEN } from '../redusers';
import { store } from '../utils/store.config';
import { HttpService } from './http.service';

export class AuthService {
  static async signInUser(email, password) {
    const res = await HttpService.post(API.login, {
      email: email,
      password: password
    });

    if (res.ok) {
      this.saveUserToStore(await res.json());
    }

    return res;
  }

  static async signUpUser(email, password, name) {
    const res = await HttpService.post(API.registration, {
      email: email,
      name: name,
      password: password
    });

    if (res.ok) {
      this.signInUser(email, password);
    }

    return res;
  }

  static saveUserToStore(data) {
    const { profile, accessToken } = data;
    localStorage.setItem('accessToken', accessToken);
    store.dispatch({
      type: SET_ACCESS_TOKEN,
      payload: accessToken
    });
    store.dispatch({
      type: SET_USER, payload: {
        email: profile.email,
        name: profile.name,
        id: profile.id,
      }
    });
  }
}
