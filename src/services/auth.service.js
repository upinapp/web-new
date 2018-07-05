import { API } from '../configs/api.confing';
import { SET_USER } from '../redusers';
import { store } from '../utils/store.config';
import { HttpService } from './http.service';

export class AuthService {
  static async signInUser(email, password) {
    const res = await HttpService.post(API.login, {
      email: email,
      password: password
    });

    const data = await res.json();

    if (res.ok) {
      this.saveUserToStore(data);
    }

    return data;
  }

  static async signInWithGoogle(accessToken, tokenId) {
    const res = await HttpService.post(API.google, {
      idToken: tokenId,
      accessToken: accessToken
    });

    const data = await res.json();

    if (res.ok) {
      this.saveUserToStore(data);
    }

    return data;
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

  static async restorePasswordRequest(email) {
    return await HttpService.post(API.restorePasswordRequest, { email });
  }

  static async restorePasswordConfirm(email, code, password) {
    const res = await HttpService.post(API.restorePasswordConfirm, {
      email: email,
      code: code,
      password: password,
    });

    if (res.ok) {
      await this.signInUser(email, password);
    }

    return res;
  }

  static saveUserToStore(data) {
    const { profile, accessToken } = data;

    localStorage.setItem('accessToken', accessToken);

    store.dispatch({
      type: SET_USER, payload: {
        email: profile.email,
        name: profile.name,
        id: profile.id,
        accessToken: accessToken
      }
    });
  }
}
