import {createAction, handleActions} from 'redux-actions';

export const types = {
  SET_DATA_SALES: 'SET_DATA_SALES',
  GET_DATA_SALES: 'GET_DATA_SALES',
  SET_DELIVERY_ADDRESS : 'SET_DELIVERY_ADDRESS',
  GET_DELIVERY_ADDRESS :'GET_DELIVERY_ADDRESS',
  CREATE_DRAFT_ORDER: 'CREATE_DRAFT_ORDER',  
  UPDATE_DRAFT_ORDER: 'UPDATE_DRAFT_ORDER',  
  DELETE_DRAFT_ORDER: 'DELETE_DRAFT_ORDER',
  GET_DRAFT_ORDERS: 'GET_DRAFT_ORDERS',
};

export const actions = {
  setDataSales: createAction(types.SET_DATA_SALES),
  getDataSales: createAction(types.GET_DATA_SALES),
  setDeliveryAddress: createAction(types.SET_DELIVERY_ADDRESS),
  getDeliveryAddress: createAction(types.GET_DELIVERY_ADDRESS),
  createDraftOrder: createAction(types.CREATE_DRAFT_ORDER),
  updateDraftOrder: createAction(types.UPDATE_DRAFT_ORDER),
  deleteDraftOrder: createAction(types.DELETE_DRAFT_ORDER),
  getDraftOrders:createAction(types.GET_DRAFT_ORDERS),
};

export const selectors = {
  selectDataSales: state => state.sales.salesData,
  selectDeliveryAddress: state => state.sales.dataDelivery,
};

const defaultState = {
  salesData: null,
  dataDelivery: null,
};

export default handleActions(
  {
    [types.SET_DATA_SALES]: (state, {payload}) => {
      return {...state, salesData: payload}; 
    },
    [types.SET_DELIVERY_ADDRESS]: (state, {payload}) => {
      return {...state, dataDelivery: payload}; 
    },
  },
  defaultState,
);
