import {Axios} from '../configApi';
import {POST, DELETE} from '~constants';
import urlApp from '~constants';

//AUTH API
export const userSignUp = payload => {
  return Axios(POST, '/v1/users/sign_up', payload);
};
export const userLogin = payload => {
  console.log('Call api login');
  return Axios(POST, urlApp?.postUrl?.loginUser, payload);
};

export const userLogout = payload => {
  return Axios(DELETE, '/logout', payload);
};

export const userDelete = payload => {
  return Axios(DELETE, '/deleteAccount', payload);
};
export const checkAccount = payload => {
  console.log('Call api checkAccount');
  return Axios(POST, urlApp?.postUrl?.checkAccount, payload);
};
export const managerUserNumerologies = payload => {
  console.log('Call api managerUserNumerologies');
  return Axios(POST, urlApp?.postUrl?.managerUserNumerologies, payload);
};
export const checkQR = payload => {
  console.log('Call api checkQR');
  return Axios(POST, urlApp?.postUrl?.checkQR, payload);
};

export const confirmCheck = payload => {
  console.log('Call api CheckInCheckOut');
  return Axios(POST, urlApp?.postUrl?.confirmCheck, payload);
};
export const forgotPassword = payload => {
  console.log('Call api forgotPassword:::', payload);
  return Axios(POST, urlApp?.postUrl?.forgotPassword, payload);
};
export const changePassword = payload => {
  console.log('Call api changePassword:::', payload);
  return Axios(POST, urlApp?.postUrl?.changePassword, payload, true);
};
export const createUserAdmin = payload => {
  console.log('Call api createUserAdmin:::', payload);
  return Axios(POST, urlApp?.postUrl?.createUserAdmin, payload);
};
