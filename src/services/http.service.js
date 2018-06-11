export const Methods = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  OPTIONS: 'OPTIONS',
  DELETE: 'DELETE'
};

export class HttpService {
  static defaultHeaders = {
    'Content-Type': 'application/json; charset=UTF-8'
  };

  static async get(url, search = {}, headers = this.defaultHeaders) {
    return fetch(url, {
      method: Methods.GET,
      headers: headers,
      search: search
    });
  }

  static async post(url, body = {}, headers = this.defaultHeaders) {
    return fetch(url, {
      method: Methods.POST,
      headers: headers,
      body: JSON.stringify(body)
    });
  }
}
