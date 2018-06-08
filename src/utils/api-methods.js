import {API} from '../configs/api.confing';
import {SET_USER} from '../redusers/authReducer';
import configureStore from '../configureStore';

const store = configureStore({});

// получение юзера и сохранение его данных в стор
export const signInUser = async (email, password) => {
  let res = await fetch(API.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email': email,
      'password': password
    })
  });
  let bodyRes = await res.json();
  if (await res.ok) {
    saveUserToStore(await bodyRes);
  }
  return await bodyRes.code;
};

function saveUserToStore(data) {
  let { profile, accessToken } = data;
  localStorage.setItem('accessToken', accessToken);
  store.dispatch({type: SET_USER, payload: {
    email: profile.email,
    name: profile.name,
    id: profile.id,
  } });
}

// регистрация юзера
export const signUpUser = async (email, password, name) => {
  let res = await fetch(API.registration, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email': email,
      'password': password,
      'name': name
    })
  });
  if (await res.ok) {
    signInUser(email, password);
  }
  return await (await res.json()).code;
};