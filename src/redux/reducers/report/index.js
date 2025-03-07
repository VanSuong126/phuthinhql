import {useEffect} from 'react';
import {createAction, handleActions} from 'redux-actions';

export const types = {
  //AUTH
  GET_REPORT_DATE: 'GET_REPORT_DATE',
  GET_REPORT_FEE: 'GET_REPORT_FEE',
  GET_REPORT_FEE_BY_DATE: 'GET_REPORT_FEE_BY_DATE',
  GET_REPORT_REVENUE_CUSTOMER_USED: 'GET_REPORT_REVENUE_CUSTOMER_USED',
  TRACKING_DELIVERY: 'TRACKING_DELIVERY',
  GET_REPORT_WAREHOUSE_BY_DATE: 'GET_REPORT_WAREHOUSE_BY_DATE',
  GET_REPORT_WAREHOUSE_DETAIL_BY_TOP: 'GET_REPORT_WAREHOUSE_DETAIL_BY_TOP',
  GET_REPORT_REVENUE_BY_BIRTHDAY: 'GET_REPORT_REVENUE_BY_BIRTHDAY',
  GET_REPORT_FAVORITE_PRODUCT: 'GET_REPORT_FAVORITE_PRODUCT',
  GET_REPORT_ORDER_BY_DATE: 'GET_REPORT_ORDER_BY_DATE',
  GET_REPORT_ORDER_TRANSPORT_BY_DATE: 'GET_REPORT_ORDER_TRANSPORT_BY_DATE',
  GET_REPORT_ORDER_ADRESS_BY_DATE: 'GET_REPORT_ORDER_ADRESS_BY_DATE',
  GET_REPORT_COMPARE: 'GET_REPORT_COMPARE',
  GET_CUSTOMER_HAS_EMAIL: 'GET_CUSTOMER_HAS_EMAIL',

  SET_REPORT_DATE: 'SET_REPORT_DATE',
  SET_REPORT_FEE: 'SET_REPORT_FEE',
  SET_REPORT_FEE_BY_DATE: 'SET_REPORT_FEE_BY_DATE',
  SET_REPORT_WAREHOUSE_BY_DATE: 'SET_REPORT_WAREHOUSE_BY_DATE',
  SET_REPORT_WAREHOUSE_DETAIL_BY_TOP: 'SET_REPORT_WAREHOUSE_DETAIL_BY_TOP',
  SET_REPORT_REVENUE_BY_BIRTHDAY: 'SET_REPORT_REVENUE_BY_BIRTHDAY',
  SET_REPORT_FAVORITE_PRODUCT: 'SET_REPORT_FAVORITE_PRODUCT',
  SET_REPORT_ORDER_BY_DATE: 'SET_REPORT_ORDER_BY_DATE',
  SET_REPORT_ORDER_TRANSPORT_BY_DATE: 'SET_REPORT_ORDER_TRANSPORT_BY_DATE',
  SET_REPORT_ORDER_ADRESS_BY_DATE: 'SET_REPORT_ORDER_ADRESS_BY_DATE',
  SET_REPORT_ORDER_ADRESS_BY_DATE: 'SET_REPORT_ORDER_ADRESS_BY_DATE',
};

export const actions = {
  //AUTH
  getReportDate: createAction(types.GET_REPORT_DATE),
  getReportFee: createAction(types.GET_REPORT_FEE),
  getReportFeeByDate: createAction(types.GET_REPORT_FEE_BY_DATE),
  getReportRevenueCustomerUsed: createAction(
    types.GET_REPORT_REVENUE_CUSTOMER_USED,
  ),
  getReportWareHouseByDate: createAction(types.GET_REPORT_WAREHOUSE_BY_DATE),
  getReportWareHouseDetailByTop: createAction(
    types.GET_REPORT_WAREHOUSE_DETAIL_BY_TOP,
  ),
  getReportRevenueByBirthday: createAction(
    types.GET_REPORT_REVENUE_BY_BIRTHDAY,
  ),
  getReportFavoriteProduct: createAction(types.GET_REPORT_FAVORITE_PRODUCT),
  getReportOrderByDate: createAction(types.GET_REPORT_ORDER_BY_DATE),
  getReportOrderTransportByDate: createAction(
    types.GET_REPORT_ORDER_TRANSPORT_BY_DATE,
  ),
  getReportOrderAdressByDate: createAction(
    types.GET_REPORT_ORDER_ADRESS_BY_DATE,
  ),
  getReportCompare: createAction(types.GET_REPORT_COMPARE),
  getCustomerHasEmail: createAction(types.GET_CUSTOMER_HAS_EMAIL),

  setReportDate: createAction(types.SET_REPORT_DATE),
  setReportFee: createAction(types.SET_REPORT_FEE),
  setReportFeeByDate: createAction(types.SET_REPORT_FEE_BY_DATE),
  setReportWareHouseByDate: createAction(types.SET_REPORT_WAREHOUSE_BY_DATE),
  setReportWareHouseDetailByTop: createAction(
    types.SET_REPORT_WAREHOUSE_DETAIL_BY_TOP,
  ),
  setReportRevenueByBirthday: createAction(
    types.SET_REPORT_REVENUE_BY_BIRTHDAY,
  ),
  setReportFavoriteProduct: createAction(types.SET_REPORT_FAVORITE_PRODUCT),
  setReportOrderByDate: createAction(types.SET_REPORT_ORDER_BY_DATE),
  setReportOrderTransportByDate: createAction(
    types.SET_REPORT_ORDER_TRANSPORT_BY_DATE,
  ),
  setReportOrderAdressByDate: createAction(
    types.SET_REPORT_ORDER_ADRESS_BY_DATE,
  ),
};
export const selectors = {
  setReportDate: state => state.report.dataReportDate,
  setReportFee: state => state.report.dataReportFee,
  setReportFeeByDate: state => state.report.dataReportFeeByDate,
  setReportWareHouseByDate: state => state.report.dataReportWareHouse,
  setReportWareHouseDetailByTop: state =>
    state.report.dataReportWareHouseDetailByTop,
  setReportRevenueByBirthday: state => state.report.dataReportRevenueByBirthday,
  setReportFavoriteProduct: state => state.report.dataFavoriteProduct,
  setReportOrderByDate: state => state.report.dataReportOrderByDate,
  setReportOrderTransportByDate: state =>
    state.report.dataReportOrderTransportByDate,
  setReportOrderAdressByDate: state => state.report.dataReportOrderAdressByDate,
};
const defaultState = {
  dataReportDate: null,
  dataReportFee: null,
  dataReportFeeByDate: null,
  dataReportWareHouse: null,
  dataReportWareHouseDetailByTop: null,
  dataReportRevenueByBirthday: null,
  dataFavoriteProduct: null,
  dataReportOrderByDate: null,
  dataReportOrderTransportByDate: null,
  dataReportOrderAdressByDate: null,
};

export default handleActions(
  {
    [types.SET_REPORT_DATE]: (state, {payload}) => {
      return {...state, dataReportDate: payload !== undefined ? payload : null};
    },

    [types.SET_REPORT_FEE]: (state, {payload}) => {
      return {...state, dataReportFee: payload !== undefined ? payload : null};
    },
    [types.SET_REPORT_FEE_BY_DATE]: (state, {payload}) => {
      return {
        ...state,
        dataReportFeeByDate: payload !== undefined ? payload : null,
      };
    },
    [types.SET_REPORT_WAREHOUSE_BY_DATE]: (state, {payload}) => {
      return {
        ...state,
        dataReportWareHouse: payload !== undefined ? payload : null,
      };
    },
    [types.SET_REPORT_WAREHOUSE_DETAIL_BY_TOP]: (state, {payload}) => {
      return {
        ...state,
        dataReportWareHouseDetailByTop: payload !== undefined ? payload : null,
      };
    },
    [types.SET_REPORT_REVENUE_BY_BIRTHDAY]: (state, {payload}) => {
      return {
        ...state,
        dataReportRevenueByBirthday: payload !== undefined ? payload : null,
      };
    },
    [types.SET_REPORT_FAVORITE_PRODUCT]: (state, {payload}) => {
      return {
        ...state,
        dataFavoriteProduct: payload !== undefined ? payload : null,
      };
    },
    [types.SET_REPORT_ORDER_BY_DATE]: (state, {payload}) => {
      return {
        ...state,
        dataReportOrderByDate: payload !== undefined ? payload : null,
      };
    },
    [types.SET_REPORT_ORDER_TRANSPORT_BY_DATE]: (state, {payload}) => {
      return {
        ...state,
        dataReportOrderTransportByDate: payload !== undefined ? payload : null,
      };
    },
    [types.SET_REPORT_ORDER_ADRESS_BY_DATE]: (state, {payload}) => {
      return {
        ...state,
        dataReportOrderAdressByDate: payload !== undefined ? payload : null,
      };
    },
  },
  defaultState,
);
