import {defineLocale} from 'moment';
import {createAction, handleActions} from 'redux-actions';

export const types = {
  CREATE_PAYMENT_LINK_MOMO: 'CREATE_PAYMENT_LINK_MOMO',
  CREATE_PAYMENT_LINK_VNPAY:'CREATE_PAYMENT_LINK_VNPAY',
};

export const actions = {
  //AUTH
  createPaymentLinkMomo: createAction(types.CREATE_PAYMENT_LINK_MOMO),
  createPaymentLinkVnpay: createAction(types.CREATE_PAYMENT_LINK_VNPAY),
};

const defaultState = {
  linkMomo: null,
  linkVnpay: null,
};

export default handleActions(
  {
    [types.CREATE_PAYMENT_LINK_MOMO]: (state, {payload}) => {
      return {...state, linkMomo: payload};
    },
    [types.CREATE_PAYMENT_LINK_VNPAY]: (state, {payload}) => {
      return {...state, linkVnpay: payload};
    },
  },
  defaultState,
);
