import {createAction, handleActions} from 'redux-actions';

export const types = {
  GET_LIST_TEMPLATE_ZALO_OA: 'GET_LIST_TEMPLATE_ZALO_OA',
  SEND_MESSAGE_ZALO_OA: 'SEND_MESSAGE_ZALO_OA',
  SEND_MESSAGE_ZALO_OA_MULTI: 'SEND_MESSAGE_ZALO_OA_MULTI',
  SEND_NOTIFI_TO_CUSTOMER: 'SEND_NOTIFI_TO_CUSTOMER',
};

export const actions = {
  getListTempalteZaloOA: createAction(types.GET_LIST_TEMPLATE_ZALO_OA),
  sendMessageZaloOA: createAction(types.SEND_MESSAGE_ZALO_OA),
  sendMessageZaloOAMulti: createAction(types.SEND_MESSAGE_ZALO_OA_MULTI),
  sendNotifiToCustomer: createAction(types.SEND_NOTIFI_TO_CUSTOMER),
};

const defaultState = {};

export default handleActions({}, defaultState);
