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

    let answer = await res.json();

    if (res.ok) {
      this.saveUserToStore(answer);
    }

    return answer;
  }

  static async signInWithGoogle(accessToken, tokenId) {
    const res = await HttpService.post(API.google, {
      idToken: tokenId,
      accessToken: accessToken
    });
    let answer = await res.json();
    if (res.ok) {
      this.saveUserToStore(answer);
    }
    return answer;
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
    const res = await HttpService.post(API.restorePasswordRequest, {
      email: email,
    });
    return res;
  }

  static async restorePasswordConfirm(email, code, password) {
    const res = await HttpService.post(API.restorePasswordConfirm, {
      email: email,
      code: code,
      password: password,
    });

    if (res.ok) {
      const signInRes = await this.signInUser(email, password);
      if (signInRes) {
        return res;
      }
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
