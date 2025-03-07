import {Axios} from '../configApi';
import {POST} from '~constants';
import urlApp from '~constants';

export const createDraftOrder = payload => {
  console.log('Call api createDraftOrder');
  return Axios(POST, urlApp?.postUrl?.createDraftOrder, payload);
};
export const updateDraftOrder = payload => {
  console.log('Call api updateDraftOrder');
  return Axios(POST, urlApp?.postUrl?.updateDraftOrder, payload);
};
export const deleteDraftOrder = payload => {
  console.log('Call api createDraftOrder');
  return Axios(DELETE, urlApp?.postUrl?.deleteDraftOrder, payload);
};
export const getDraftOrders = payload => {
  console.log('Call api getDraftOrders');
  return Axios(POST, urlApp?.postUrl?.getDraftOrders, payload);
};
