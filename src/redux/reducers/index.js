import {combineReducers} from 'redux';

import user, {
  actions as userActions,
  selectors as userSelectors,
  types as userTypes,
} from './user';

import report, {
  actions as reportActions,
  selectors as reportSelectors,
  types as reportTypes,
} from './report';

import common, {
  actions as commonActions,
  selectors as commonSelectors,
  types as commonTypes,
} from './common';

import manager, {
  actions as managerActions,
  selectors as managerSelectors,
  types as managerTypes,
} from './manager';

import payment, {
  actions as paymentActions,
  types as paymentTypes,
} from './payment';

import sales, {
  actions as salesActions,
  selectors as salesSelectors,
  types as salesTypes,
} from './sales';

import notifi, {actions as notifiActions, types as notifiTypes} from './notifi';

const rootReducer = combineReducers({
  user,
  report,
  common,
  manager,
  payment,
  sales,
  notifi,
});

export {userActions, userSelectors, userTypes};
export {commonActions, commonSelectors, commonTypes};
export {reportActions, reportSelectors, reportTypes};
export {managerActions, managerSelectors, managerTypes};
export {paymentActions, paymentTypes};
export {salesTypes, salesActions, salesSelectors};
export {notifiActions, notifiTypes, notifi};

export default rootReducer;
