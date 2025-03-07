import {Axios} from '../configApi';
import {POST} from '~constants';
import urlApp from '~constants';

//AUTH API

export const getReportDate = payload => {
  console.log('Call api get getReportDate');
  return Axios(POST, urlApp?.postUrl?.getReportDate, payload);
};

export const getReportFee = payload => {
  console.log('Call api get getReportFee');
  return Axios(POST, urlApp?.postUrl?.getReportFee, payload);
};

export const getReportFeeByDate = payload => {
  console.log('Call api get getReportFee');
  return Axios(POST, urlApp?.postUrl?.getReportFeeByDate, payload);
};

export const getReportWareHouseByDate = payload => {
  console.log('Call api get getReportWareHouseByDate');
  return Axios(POST, urlApp?.postUrl?.getReportWareHouseByDate, payload);
};

export const getReportWareHouseDetailByTop = payload => {
  console.log('Call api get getReportWareHouseDetailByTop');
  return Axios(POST, urlApp?.postUrl?.getReportWareHouseDetailByTop, payload);
};

export const getReportRevenueByBirthday = payload => {
  console.log('Call api get getReportRevenueByBirthday');
  return Axios(POST, urlApp?.postUrl?.getReportRevenueByBirthday, payload);
};

export const getReportFavoriteProduct = payload => {
  console.log('Call api get getReportFavoriteProduct');
  return Axios(POST, urlApp?.postUrl?.getReportFavoriteProduct, payload);
};

export const getReportRevenueCustomerUsed = payload => {
  console.log('Call api get getReportRevenueCustomerUsed');
  return Axios(POST, urlApp?.postUrl?.getReportRevenueCustomerUsed, payload);
};

export const getReportOrderByDate = payload => {
  console.log('Call api get getReportOrderByDate');
  return Axios(POST, urlApp?.postUrl?.getReportOrderByDate, payload);
};
export const getReportOrderTransportByDate = payload => {
  console.log('Call api get getReportOrderTransportByDate');
  return Axios(POST, urlApp?.postUrl?.getReportOrderTransportByDate, payload);
};
export const getReportOrderAdressByDate = payload => {
  console.log('Call api get getReportOrderAdressByDate');
  return Axios(POST, urlApp?.postUrl?.getReportOrderAdressByDate, payload);
};

export const getReportCompare = payload => {
  console.log('Call api get getReportCompare');
  return Axios(POST, urlApp?.postUrl?.getReportCompare, payload);
};

export const getCustomerHasEmail = payload => {
  console.log('Call api get getCustomerHasEmail');
  return Axios(POST, urlApp?.postUrl?.getCustomerHasEmail, payload);
};
