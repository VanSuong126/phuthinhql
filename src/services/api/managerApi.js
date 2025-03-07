import {Axios} from '../configApi';
import urlApp, {POST, DELETE} from '~constants';

export const getListBuyer = payload => {
  console.log('Call api getListBuyer');
  return Axios(POST, urlApp?.postUrl?.getListBuyer, payload);
};
export const addBuyer = payload => {
  console.log('Call api addBuyer');
  return Axios(POST, urlApp?.postUrl?.addBuyer, payload);
};
export const entryProductInventory = payload => {
  console.log('Call api entryProductInventory');
  return Axios(POST, urlApp?.postUrl?.entryProductInventory, payload);
};
export const updateProductGroup = payload => {
  console.log('Call api updateProductGroup');
  return Axios(POST, urlApp?.postUrl?.updateProductGroup, payload);
};
export const addInforProduct = payload => {
  console.log('Call api addInforProduct');
  return Axios(POST, urlApp?.postUrl?.addInforProduct, payload);
};
export const updateInforProduct = payload => {
  console.log('Call api updateInforProduct');
  return Axios(POST, urlApp?.postUrl?.updateInforProduct, payload);
};
export const pushProductLikes = payload => {
  console.log('Call api pushProductLikes');
  return Axios(POST, urlApp?.postUrl?.pushProductLikes, payload);
};
export const getRelationBuyer = payload => {
  console.log('Call api getRelationBuyer');
  return Axios(POST, urlApp?.postUrl?.getRelationBuyer, payload);
};
export const updateBuyer = payload => {
  console.log('Call api updateBuyer');
  return Axios(POST, urlApp?.postUrl?.updateBuyer, payload);
};
export const getListStaff = payload => {
  console.log('Call api getListStaff');
  return Axios(POST, urlApp?.postUrl?.getListStaff, payload);
};

export const addStaff = payload => {
  console.log('Call api addStaff');
  return Axios(POST, urlApp?.postUrl?.addStaff, payload);
};

export const changePass = payload => {
  console.log('Call api changePass');
  return Axios(POST, urlApp?.postUrl?.changePass, payload);
};

export const updateInforStaff = payload => {
  console.log('Call api updateInforStaff');
  return Axios(POST, urlApp?.postUrl?.updateInforStaff, payload);
};

export const updateStaff = payload => {
  console.log('Call api updateStaff');
  return Axios(POST, urlApp?.postUrl?.updateStaff, payload);
};

export const getListProductManager = payload => {
  console.log('Call api getListProductManager');
  return Axios(POST, urlApp?.postUrl?.getListProductManager, payload);
};
export const getUnitProduct = payload => {
  console.log('Call api getUnitProduct');
  return Axios(POST, urlApp?.postUrl?.getUnitProduct, payload);
};
export const getGuaranteeProduct = payload => {
  console.log('Call api getGuaranteeProduct');
  return Axios(POST, urlApp?.postUrl?.getGuaranteeProduct, payload);
};
export const addStore = payload => {
  console.log('Call api addStore');
  return Axios(POST, urlApp?.postUrl?.addStore, payload);
};
export const updateStore = payload => {
  console.log('Call api updateStore');
  return Axios(POST, urlApp?.postUrl?.updateStore, payload);
};
export const deleteStore = payload => {
  console.log('Call api deleteStore');
  return Axios(POST, urlApp?.postUrl?.deleteStore, payload);
};

export const updateImageProduct = payload => {
  console.log('Call api updateImageProduct');
  return Axios(POST, urlApp?.postUrl?.updateImageProduct, payload);
};
export const deleteProductManager = payload => {
  console.log('Call api deleteProductManager');
  return Axios(POST, urlApp?.postUrl?.deleteProductManager, payload);
};

export const getTimeSheet = payload => {
  console.log('Call api getTimeSheet');
  return Axios(POST, urlApp?.postUrl?.getTimeSheet, payload);
};
export const getStatementChecks = payload => {
  console.log('Call api getStatementChecks');
  return Axios(POST, urlApp?.postUrl?.getStatementChecks, payload);
};
export const managerPointChecks = payload => {
  console.log('Call api managerPointChecks');
  return Axios(POST, urlApp?.postUrl?.managerPointChecks, payload);
};
export const getListPointCheck = payload => {
  console.log('Call api getListPointCheck');
  return Axios(POST, urlApp?.postUrl?.getListPointCheck, payload);
};
export const postProductAmountApi = payload => {
  console.log('Call api postProductAmountApi:::', payload);
  return Axios(POST, urlApp?.postUrl?.updateProductAmountLink, payload);
};
export const createListLabel = payload => {
  console.log('Call api createListLabel:::', payload);
  return Axios(POST, urlApp?.postUrl?.createListLabel, payload);
};
export const blockCustomer = payload => {
  console.log(' api blockCustomer:::', payload);
  return Axios(POST, urlApp?.postUrl?.blockCustomer, payload);
};
