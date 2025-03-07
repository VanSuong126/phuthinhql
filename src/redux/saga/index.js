import {all} from 'redux-saga/effects';

import report from './report';
import user from './user';
import common from './common';
import manager from './manager';
import payment from './payment';
import sales from './sales';
import notifi from './notifi';
export default function* rootSaga() {
  yield all([
    ...user,
    ...report,
    ...common,
    ...manager,
    ...payment,
    ...sales,
    ...notifi,
  ]);
}
