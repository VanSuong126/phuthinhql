import {Axios} from '../configApi';
import {POST} from '~constants';
import urlApp from '~constants';

export const getListTempalteZaloOA = payload => {
  console.log('Call api getListTempalteZaloOA');
  return Axios(POST, urlApp?.postUrl?.getListTempalteZaloOA, payload);
};
export const sendMessageZaloOA = payload => {
  console.log('Call api sendMessageZaloOA');
  return Axios(POST, urlApp?.postUrl?.sendMessageZaloOA, payload);
};
export const sendMessageZaloOAMulti = payload => {
  console.log('Call api sendMessageZaloOAMulti');
  return Axios(POST, urlApp?.postUrl?.sendMessageZaloOAMulti, payload);
};
export const sendNotifiToCustomer = payload => {
  console.log('Call api sendNotifiToCustomer');
  return Axios(POST, urlApp?.postUrl?.sendNotifiToCustomer, payload);
};
