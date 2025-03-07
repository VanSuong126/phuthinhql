import {Axios} from '../configApi';
import {POST} from '~constants';

export const createPaymentLinkMomo = payload => {
  console.log('Call api get token');
  return Axios(POST, `/api/ThanhToanMoMo/TaoLinkThanhToan`, payload);
};

export const createPaymentLinkVnpay = payload => {
  console.log('Call api get token');
  return Axios(POST, `/api/ThanhToanVnpay/TaoLinkThanhToan`, payload);
};
