import {Axios} from '../configApi';
import {POST} from '~constants';
import urlApp from '~constants';

export const findOrder = payload => {
  console.log('Call api findOrder');
  return Axios(POST, urlApp?.postUrl?.findOrder, payload);
};

export const findProduct = payload => {
  console.log('Call api findProduct');
  return Axios(POST, urlApp?.postUrl?.findProduct, payload);
};

export const findCustomer = payload => {
  console.log('Call api findCustomer');
  return Axios(POST, urlApp?.postUrl?.findCustomer, payload);
};

export const getListStore = payload => {
  console.log('Call api getListStore');
  return Axios(POST, urlApp?.postUrl?.getListStore, payload);
};

export const getInforStore = payload => {
  console.log('Call api getInforStore');
  return Axios(POST, urlApp?.postUrl?.getInforStore, payload);
};

export const getListDiscount = payload => {
  console.log('Call api getListDiscount');
  return Axios(POST, urlApp?.postUrl?.getListDiscount, payload);
};

export const deleteDiscount = payload => {
  console.log('Call api deleteDiscount');
  return Axios(POST, urlApp?.postUrl?.deleteDiscount, payload);
};

export const createDiscount = payload => {
  console.log('Call api createDiscount');
  return Axios(POST, urlApp?.postUrl?.createDiscount, payload);
};

export const getTypeDiscount = payload => {
  console.log('Call api getTypeDiscount');
  return Axios(POST, urlApp?.postUrl?.getTypeDiscount, payload);
};

export const getListRole = payload => {
  console.log('Call api getListRole');
  return Axios(POST, urlApp?.postUrl?.getListRole, payload);
};
export const getListCustomer = payload => {
  console.log('Call api getListCustomer');
  return Axios(POST, urlApp?.postUrl?.getListCustomer, payload);
};
export const getListProduct = payload => {
  console.log('Call api getListProduct');
  return Axios(POST, urlApp?.postUrl?.getListProduct, payload);
};
export const getListGroupProduct = payload => {
  console.log('Call api getListGroupProduct');
  return Axios(POST, urlApp?.postUrl?.getListGroupProduct, payload);
};
export const getListCountries = payload => {
  console.log('Call api getListCountries');
  return Axios(POST, urlApp?.postUrl?.getListCountries, payload);
};
export const getListCities = payload => {
  console.log('Call api getListCities');
  return Axios(POST, urlApp?.postUrl?.getListCities, payload);
};
export const getListZipCode = payload => {
  console.log('Call api getListZipCode');
  return Axios(POST, urlApp?.postUrl?.getListZipCode, payload);
};
export const getTransporter = payload => {
  console.log('Call api getTransporter');
  return Axios(POST, urlApp?.postUrl?.getTransporter, payload);
};
export const checkDiscountCode = payload => {
  console.log('Call api checkDiscountCode');
  return Axios(POST, urlApp?.postUrl?.checkDiscountCode, payload);
};
export const getFeeShip = payload => {
  console.log('Call api getFeeShip');
  return Axios(POST, urlApp?.postUrl?.getFeeShip, payload);
};
export const createOrder = payload => {
  console.log('Call api checkDiscountCode');
  return Axios(POST, urlApp?.postUrl?.createOrder, payload);
};
export const getListOrder = payload => {
  console.log('Call api getListOrder');
  return Axios(POST, urlApp?.postUrl?.getListOrder, payload);
};
export const getListOrderZaloOA = payload => {
  console.log('Call api getListOrderZaloOA');
  return Axios(POST, urlApp?.postUrl?.getListOrderZaloOA, payload);
};
export const getDetailOrder = payload => {
  console.log('Call api getDetailOrder');
  return Axios(POST, urlApp?.postUrl?.getDetailOrder, payload);
};
export const cancelOrder = payload => {
  console.log('Call api cancelOrder');
  return Axios(POST, urlApp?.postUrl?.cancelOrder, payload);
};
export const confirmOrderOnline = payload => {
  console.log('Call api confirmOrderOnline');
  return Axios(POST, urlApp?.postUrl?.confirmOrderOnline, payload);
};
export const updateOrder = payload => {
  console.log('Call api updateOrder');
  return Axios(POST, urlApp?.postUrl?.updateOrder, payload);
};
export const shipOrder = payload => {
  console.log('Call api shipOrder');
  return Axios(POST, urlApp?.postUrl?.shipOrder, payload);
};
export const updateStatusOrder = payload => {
  console.log('Call api updateStatusOrder');
  return Axios(POST, urlApp?.postUrl?.updateStatusOrder, payload);
};
export const printLabel = payload => {
  console.log('Call api printLabel');
  return Axios(POST, urlApp?.postUrl?.printLabel, payload);
};
export const sendMailBooking = payload => {
  console.log('Call api sendMailBooking');
  return Axios(POST, urlApp?.postUrl?.sendMailBooking, payload);
};
export const getPaymentMethod = payload => {
  console.log('Call api getPaymentMethod');
  return Axios(POST, urlApp?.postUrl?.getPaymentMethod, payload);
};
export const getReceivingMethod = payload => {
  console.log('Call api getReceivingMethod');
  return Axios(POST, urlApp?.postUrl?.getReceivingMethod, payload);
};

export const updateAddressOrder = payload => {
  console.log('Call api updateAddressOrder');
  return Axios(POST, urlApp?.postUrl?.updateAddressOrder, payload);
};
export const cancelOrderDelivery = payload => {
  console.log('Call api cancelOrderDelivery');
  return Axios(POST, urlApp?.postUrl?.cancelOrderDelivery, payload);
};
export const getExtraService = payload => {
  console.log('Call api getExtraService');
  return Axios(POST, urlApp?.postUrl?.getExtraService, payload);
};

export const pushNotify = payload => {
  console.log('Call api pushNotify');
  return Axios(POST, urlApp?.postUrl?.pushNotify, payload);
};
export const viewNumerologies = payload => {
  console.log('Call api viewNumerologies');
  return Axios(POST, urlApp?.postUrl?.viewNumerologies, payload);
};
export const getNumerologies = payload => {
  console.log('Call api getNumerologies');
  return Axios(POST, urlApp?.postUrl?.getNumerologies, payload);
};
export const historyNumerologies = payload => {
  console.log('Call api historyNumerologies');
  return Axios(POST, urlApp?.postUrl?.historyNumerologies, payload);
};

export const getDestiny = payload => {
  console.log('Call api getDestiny');
  return Axios(POST, urlApp?.postUrl?.getDestiny, payload);
};
export const updateNumerologies = payload => {
  console.log('Call api updateNumerologies');
  return Axios(POST, urlApp?.postUrl?.updateNumerologies, payload);
};
export const getTypeCost = payload => {
  console.log('Call api getTypeCost');
  return Axios(POST, urlApp?.postUrl?.getTypeCost, payload);
};
export const saveCost = payload => {
  console.log('Call api saveCost');
  return Axios(POST, urlApp?.postUrl?.saveCost, payload);
};

export const getListCost = payload => {
  console.log('Call api getListCost');
  return Axios(POST, urlApp?.postUrl?.getListCost, payload);
};

export const getFormMails = payload => {
  console.log('Call api getFormMails');
  return Axios(POST, urlApp?.postUrl?.getFormMails, payload);
};
