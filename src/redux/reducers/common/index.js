import {createAction, handleActions} from 'redux-actions';
export const types = {
  FIND_ORDER: 'FIND_ORDER',
  FIND_PRODUCT: 'FIND_PRODUCT',
  FIND_CUSTOMER: 'FIND_CUSTOMER',
  GET_LIST_COUNTRIES: 'GET_LIST_COUNTRIES',
  GET_LIST_CITIES: 'GET_LIST_CITIES',
  GET_LIST_ZIPCODE: 'GET_LIST_ZIPCODE',
  SET_LIST_COUNTRIES: 'SET_LIST_COUNTRIES',
  SET_LIST_CITIES: 'SET_LIST_CITIES',
  SET_LIST_ZIPCODE: 'SET_LIST_ZIPCODE',
  CHECK_DISCOUNT_CODE: 'CHECK_DISCOUNT_CODE',
  SET_LIST_DISCOUNT: 'SET_LIST_DISCOUNT',

  TOGGLE_LOADING: 'TOGGLE_LOADING',
  GET_LIST_STORE: 'GET_LIST_STORE',
  GET_INFOR_STORE: 'GET_INFOR_STORE',
  GET_LIST_ROLE: 'GET_LIST_ROLE',
  GET_LIST_PRODUCT: 'GET_LIST_PRODUCT',
  GET_EXTRA_SERVICE: 'GET_EXTRA_SERVICE',
  GET_LIST_CUSTOMER: 'GET_LIST_CUSTOMER',

  GET_LIST_DISCOUNT: 'GET_LIST_DISCOUNT',
  DELETE_DISCOUNT: 'DELETE_DISCOUNT',
  CREATE_DISCOUNT: 'CREATE_DISCOUNT',
  GET_TYPE_DISCOUNT: 'GET_TYPE_DISCOUNT',

  GET_FEE_SHIP: 'GET_FEE_SHIP',
  CREATE_ORDER: 'CREATE_ORDER',
  GET_LIST_ORDER: 'GET_LIST_ORDER',
  GET_LIST_ORDER_ZALOOA: 'GET_LIST_ORDER_ZALOOA',

  GET_DETAIL_ORDER: 'GET_DETAIL_ORDER',
  CANCEL_ORDER: 'CANCEL_ORDER',
  CONFIRM_ORDER_ONLINE: 'CONFIRM_ORDER_ONLINE',
  UPDATE_ORDER: 'UPDATE_ORDER',
  SHIP_ORDER: 'SHIP_ORDER',
  UPDATE_STATTUS_ORDER: 'UPDATE_STATTUS_ORDER',
  PRINT_LABEL: 'PRINT_LABEL',
  SEND_MAIL_BOOKING: 'SEND_MAIL_BOOKING',
  GET_PAYMENT_METHOD: 'GET_PAYMENT_METHOD',
  SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
  GET_RECEIVING_METHOD: 'GET_RECEIVING_METHOD',
  SET_RECEIVING_METHOD: 'SET_RECEIVING_METHOD',
  GET_TRANSPORTER: 'GET_TRANSPORTER',
  SET_TRANSPORTER: 'SET_TRANSPORTER',

  UPDATE_ADDRESS_ORDER: 'UPDATE_ADDRESS_ORDER',
  CANCEL_ORDER_DELIVERY: 'CANCEL_ORDER_DELIVERY',

  SET_LIST_STORE: 'SET_LIST_STORE',
  SET_INFOR_STORE: 'SET_INFOR_STORE',
  SET_LIST_PRODUCT: 'SET_LIST_PRODUCT',
  SELECT_LIST_PRODUCT: 'SELECT_LIST_PRODUCT',
  SET_LIST_CUSTOMER: 'SET_LIST_CUSTOMER',

  PUSH_NOTIFY: 'PUSH_NOTIFY',
  VIEW_NUMEROLOGIES: 'VIEW_NUMEROLOGIES',
  GET_NUMEROLOGIES: 'GET_NUMEROLOGIES',
  UPDATE_NUMEROLOGIES: 'UPDATE_NUMEROLOGIES',
  HISTORY_NUMEROLOGIES: 'HISTORY_NUMEROLOGIES',
  GET_DESTINY: 'GET_DESTINY',
  GET_TYPE_COST: 'GET_TYPE_COST',
  SAVE_COST: 'SAVE_COST',
  GET_LIST_COST: 'GET_LIST_COST',
  GET_FORM_MAILS: 'GET_FORM_MAILS',
  GET_LIST_GROUP_PRODUCT: 'GET_LIST_GROUP_PRODUCT',
};

export const actions = {
  findOrder: createAction(types.FIND_ORDER),
  findProduct: createAction(types.FIND_PRODUCT),
  findCustomer: createAction(types.FIND_CUSTOMER),
  getListCountries: createAction(types.GET_LIST_COUNTRIES),
  setListCountries: createAction(types.SET_LIST_COUNTRIES),
  getListCities: createAction(types.GET_LIST_CITIES),
  getListZipCode: createAction(types.GET_LIST_ZIPCODE),
  setListCities: createAction(types.SET_LIST_CITIES),
  setListZipCode: createAction(types.SET_LIST_ZIPCODE),
  getPaymentMethod: createAction(types.GET_PAYMENT_METHOD),
  setPaymentMethod: createAction(types.SET_PAYMENT_METHOD),
  getReceivingMethod: createAction(types.GET_RECEIVING_METHOD),
  setReceivingMethod: createAction(types.SET_RECEIVING_METHOD),
  getTransporter: createAction(types.GET_TRANSPORTER),
  setTransporter: createAction(types.SET_TRANSPORTER),
  getFeeShip: createAction(types.GET_FEE_SHIP),
  checkDiscountCode: createAction(types.CHECK_DISCOUNT_CODE),
  setListDiscount: createAction(types.SET_LIST_DISCOUNT),

  toggleLoading: createAction(types.TOGGLE_LOADING),
  getListStore: createAction(types.GET_LIST_STORE),
  setListStore: createAction(types.SET_LIST_STORE),
  getInforStore: createAction(types.GET_INFOR_STORE),
  setInforStore: createAction(types.SET_INFOR_STORE),
  getListRole: createAction(types.GET_LIST_ROLE),
  getListProduct: createAction(types.GET_LIST_PRODUCT),
  getExtraService: createAction(types.GET_EXTRA_SERVICE),
  getListCustomer: createAction(types.GET_LIST_CUSTOMER),

  getListDiscount: createAction(types.GET_LIST_DISCOUNT),
  deleteDiscount: createAction(types.DELETE_DISCOUNT),
  createDiscount: createAction(types.CREATE_DISCOUNT),
  getTypeDiscount: createAction(types.GET_TYPE_DISCOUNT),

  createOrder: createAction(types.CREATE_ORDER),
  getListOrder: createAction(types.GET_LIST_ORDER),
  getListOrderZaloOA: createAction(types.GET_LIST_ORDER_ZALOOA),
  getDetailOrder: createAction(types.GET_DETAIL_ORDER),
  cancelOrder: createAction(types.CANCEL_ORDER),
  confirmOrderOnline: createAction(types.CONFIRM_ORDER_ONLINE),
  updateOrder: createAction(types.UPDATE_ORDER),
  shipOrder: createAction(types.SHIP_ORDER),
  updateStatusOrder: createAction(types.UPDATE_STATTUS_ORDER),
  printLabel: createAction(types.PRINT_LABEL),
  sendMailBooking: createAction(types.SEND_MAIL_BOOKING),

  updateAddressOrder: createAction(types.UPDATE_ADDRESS_ORDER),
  cancelOrderDelivery: createAction(types.CANCEL_ORDER_DELIVERY),

  setListProduct: createAction(types.SET_LIST_PRODUCT),
  selectListProduct: createAction(types.SELECT_LIST_PRODUCT),
  setListCustomer: createAction(types.SET_LIST_CUSTOMER),

  pushNotify: createAction(types.PUSH_NOTIFY),
  viewNumerologies: createAction(types.VIEW_NUMEROLOGIES),
  getNumerologies: createAction(types.GET_NUMEROLOGIES),
  updateNumerologies: createAction(types.UPDATE_NUMEROLOGIES),
  historyNumerologies: createAction(types.HISTORY_NUMEROLOGIES),
  getDestiny: createAction(types.GET_DESTINY),
  getTypeCost: createAction(types.GET_TYPE_COST),
  saveCost: createAction(types.SAVE_COST),
  getListCost: createAction(types.GET_LIST_COST),
  getFormMails: createAction(types.GET_FORM_MAILS),
  getListGroupProduct: createAction(types.GET_LIST_GROUP_PRODUCT),
};
export const selectors = {
  getLoading: state => state.common.isLoading,
  selectListProduct: state => state.common.dataProduct,
  selectListCustomer: state => state.common.dataCustomer,
  selectListCountries: state => state.common.dataCountries,
  selectListCities: state => state.common.dataCities,
  selectListZipCode: state => state.common.dataZipCode,
  selectPaymentMethod: state => state.common.dataPayment,
  selectReceivingMethod: state => state.common.dataReceiving,
  selectTransporter: state => state.common.dataTransporter,
  selectListDiscount: state => state.common.dataDiscount,
  selectorListStore: state => state.common.dataListStore,
  selectorInforStore: state => state.common.dataInforStore,
};
const defaultState = {
  isLoading: false,
  dataProduct: null,
  dataCustomer: null,
  dataCountries: [],
  dataCities: [],
  dataZipCode: [],
  dataPayment: [],
  dataReceiving: [],
  dataTransporter: [],
  dataDiscount: [],
  dataListStore: [],
  dataInforStore: [],
};

export default handleActions(
  {
    [types.TOGGLE_LOADING]: (state, {payload}) => {
      return {...state, isLoading: payload};
    },
    [types.SET_LIST_PRODUCT]: (state, {payload}) => {
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
    [types.SET_LIST_CUSTOMER]: (state, {payload}) => {
      return {...state, dataCustomer: payload};
    },
    [types.SET_LIST_COUNTRIES]: (state, {payload}) => {
      return {...state, dataCountries: payload};
    },
    [types.SET_LIST_CITIES]: (state, {payload}) => {
      return {...state, dataCities: payload};
    },
    [types.SET_LIST_ZIPCODE]: (state, {payload}) => {
      return {...state, dataZipCode: payload};
    },
    [types.SET_PAYMENT_METHOD]: (state, {payload}) => {
      return {...state, dataPayment: payload};
    },
    [types.SET_RECEIVING_METHOD]: (state, {payload}) => {
      return {...state, dataReceiving: payload};
    },
    [types.SET_TRANSPORTER]: (state, {payload}) => {
      return {...state, dataTransporter: payload};
    },
    [types.SET_LIST_DISCOUNT]: (state, {payload}) => {
      return {...state, dataDiscount: payload};
    },
    [types.SET_LIST_STORE]: (state, {payload}) => {
      const allStore = [
        {
          IDCuaHang: payload.length,
          TenCuaHang: 'selectAllBranch',
          value: 'all',
          label: 'selectAllBranch',
        },
        ...payload,
      ];
      return {...state, dataListStore: allStore};
    },
    [types.SET_INFOR_STORE]: (state, {payload}) => {
      return {...state, dataInforStore: payload};
    },
  },
  defaultState,
);
