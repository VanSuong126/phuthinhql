import {createAction, handleActions} from 'redux-actions';
import {blockCustomer} from '../../../services/api/managerApi';

export const types = {
  GET_LIST_BUYER: 'GET_LIST_BUYER',
  SET_DATA_BUYER: 'SET_DATA_BUYER',
  GET_DATA_BUYER: 'GET_DATA_BUYER',
  ADD_BUYER: 'ADD_BUYER',
  PRODUCT_INVENTORY_ENTRY: 'PRODUCT_INVENTORY_ENTRY',
  GET_RELATION_BUYER: 'GET_RELATION_BUYER',
  UPDATE_BUYER: 'UPDATE_BUYER',
  GET_LIST_STAFF: 'GET_LIST_STAFF',
  ADD_STAFF: 'ADD_STAFF',
  UPDATE_INFOR_STAFF: 'UPDATE_INFOR_STAFF',
  CHANGE_PASS: 'CHANGE_PASS',
  UPDATE_STAFF: 'UPDATE_STAFF',
  GET_TYPE_PROMOTION: 'GET_TYPE_PROMOTION',
  SET_LIST_PRODUCT_MANAGER: 'SET_LIST_PRODUCT_MANAGER',
  GET_LIST_PRODUCT_MANAGER: 'GET_LIST_PRODUCT_MANAGER',
  GET_DATA_PRODUCT: 'GET_DATA_PRODUCT',
  GET_UNIT_PRODUCT: 'GET_UNIT_PRODUCT',
  SET_UNIT_PRODUCT: 'SET_UNIT_PRODUCT',
  GET_GUARANTEE_PRODUCT: 'GET_GUARANTEE_PRODUCT',
  SET_GUARANTEE_PRODUCT: 'SET_GUARANTEE_PRODUCT',
  FIND_PRODUCT_MANAGER: 'FIND_PRODUCT_MANAGER',
  ADD_STORE: 'ADD_STORE',
  UPDATE_STORE: 'UPDATE_STORE',
  DELETE_STORE: 'DELETE_STORE',
  ADD_PRODUCT_MANAGER: 'ADD_PRODUCT_MANAGER',
  DELETE_PRODUCT_MANAGER: 'DELETE_PRODUCT_MANAGER',
  GET_TIME_SHEET: 'GET_TIME_SHEET',
  GET_STATEMENT_CHECKS: 'GET_STATEMENT_CHECKS',
  MANAGER_POINT_CHECKS: 'MANAGER_POINT_CHECKS',
  GET_LIST_POINT_CHECK: 'GET_LIST_POINT_CHECK',
  UPDATE_PRODUCT_AMOUNT_TYPE: 'UPDATE_PRODUCT_AMOUNT_TYPE',
  SET_LIST_ORDER_SCAN: 'SET_LIST_ORDER_SCAN',
  CREATE_LIST_LABEL: 'CREATE_LIST_LABEL',
  GET_MANAGER_COST: 'GET_MANAGER_COST',
  UPDATE_PRODUCT_GROUP: 'UPDATE_PRODUCT_GROUP',
  UPDATE_IMAGE_PRODUCT: 'UPDATE_IMAGE_PRODUCT',
  ADD_INFOR_PRODUCT: 'ADD_INFOR_PRODUCT',
  UPDATE_INFOR_PRODUCT: 'UPDATE_INFOR_PRODUCT',
  PUSH_PRODUCT_LIKES: 'PUSH_PRODUCT_LIKES',
  BLOCK_CUSTOMER: 'BLOCK_CUSTOMER',
};

export const actions = {
  getListBuyer: createAction(types.GET_LIST_BUYER),
  setDataBuyer: createAction(types.SET_DATA_BUYER),
  getDataBuyer: createAction(types.GET_DATA_BUYER),
  addBuyer: createAction(types.ADD_BUYER),
  entryProductInventory: createAction(types.PRODUCT_INVENTORY_ENTRY),
  getRelationBuyer: createAction(types.GET_RELATION_BUYER),
  updateBuyer: createAction(types.UPDATE_BUYER),
  getListStaff: createAction(types.GET_LIST_STAFF),
  addStaff: createAction(types.ADD_STAFF),
  updateInforStaff: createAction(types.UPDATE_INFOR_STAFF),
  changePass: createAction(types.CHANGE_PASS),
  updateStaff: createAction(types.UPDATE_STAFF),
  setListProductManager: createAction(types.SET_LIST_PRODUCT_MANAGER),
  getListProductManager: createAction(types.GET_LIST_PRODUCT_MANAGER),
  getDataProduct: createAction(types.GET_DATA_PRODUCT),
  getUnitProduct: createAction(types.GET_UNIT_PRODUCT),
  setUnitProduct: createAction(types.SET_UNIT_PRODUCT),
  actionUpdateProductAmount: createAction(types.UPDATE_PRODUCT_AMOUNT_TYPE),
  getGuaranteeProduct: createAction(types.GET_GUARANTEE_PRODUCT),
  setGuaranteeProduct: createAction(types.SET_GUARANTEE_PRODUCT),
  findProductManager: createAction(types.FIND_PRODUCT_MANAGER),
  addStore: createAction(types.ADD_STORE),
  updateStore: createAction(types.UPDATE_STORE),
  deleteStore: createAction(types.DELETE_STORE),
  blockCustomer: createAction(types.BLOCK_CUSTOMER),

  deleteProductManager: createAction(types.DELETE_PRODUCT_MANAGER),
  getTimeSheet: createAction(types.GET_TIME_SHEET),
  getStatementChecks: createAction(types.GET_STATEMENT_CHECKS),
  managerPointChecks: createAction(types.MANAGER_POINT_CHECKS),
  getListPointCheck: createAction(types.GET_LIST_POINT_CHECK),
  setListOrderScan: createAction(types.SET_LIST_ORDER_SCAN),
  createListLabel: createAction(types.CREATE_LIST_LABEL),
  updateProductGroup: createAction(types.UPDATE_PRODUCT_GROUP),
  updateImageProduct: createAction(types.UPDATE_IMAGE_PRODUCT),
  addInforProduct: createAction(types.ADD_INFOR_PRODUCT),
  updateInforProduct: createAction(types.UPDATE_INFOR_PRODUCT),
  pushProductLikes: createAction(types.PUSH_PRODUCT_LIKES),
};

const defaultState = {
  dataBuyer: null,
  dataProduct: null,
  listOrderScan: null,
  dataUnit: null,
  dataGuarantee: null,
};
export const selectors = {
  getDataProduct: state => state.manager.dataProduct,
  getDataBuyer: state => state.manager.dataBuyer,
  selectListOrderScan: state => state.manager.listOrderScan,
  setDataUnit: state => state.manager.dataUnit,
  setDataGuarantee: state => state.manager.dataGuarantee,
};

export default handleActions(
  {
    [types.SET_DATA_BUYER]: (state, {payload}) => {
      if (payload.reset === true) {
        return {...state, dataBuyer: null};
      } else {
        if (state.dataBuyer) {
          // Nếu dataBuyer đã có dữ liệu, thêm dữ liệu mới vào mảng hiện có
          const newDataBuyer = [...state.dataBuyer, ...payload];
          return {...state, dataBuyer: newDataBuyer};
        } else {
          // Nếu dataBuyer chưa có dữ liệu, gán dữ liệu mới
          return {...state, dataBuyer: payload};
        }
      }
    },
    [types.SET_LIST_PRODUCT_MANAGER]: (state, {payload}) => {
      if (payload.reset === true) {
        return {...state, dataProduct: null};
      } else {
        if (state.dataProduct) {
          // Nếu dataProduct đã có dữ liệu, thêm dữ liệu mới vào mảng hiện có
          const newDataProduct = [...state.dataProduct, ...payload];
          return {...state, dataProduct: newDataProduct};
        } else {
          // Nếu dataProduct chưa có dữ liệu, gán dữ liệu mới
          return {...state, dataProduct: payload};
        }
      }
    },
    [types.SET_LIST_ORDER_SCAN]: (state, {payload}) => {
      return {...state, listOrderScan: payload};
    },
    [types.SET_UNIT_PRODUCT]: (state, {payload}) => {
      return {...state, dataUnit: payload};
    },
    [types.SET_GUARANTEE_PRODUCT]: (state, {payload}) => {
      return {...state, dataGuarantee: payload};
    },
  },
  defaultState,
);
