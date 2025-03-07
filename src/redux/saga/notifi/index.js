import {call, takeLatest} from 'redux-saga/effects';
import {notifiApi} from '~services';
import {notifiTypes} from '~redux/reducers';

const getListTempalteZaloOA = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga getListTempalteZaloOA');
  try {
    const variables = yield {
      loai: params?.loai,
    };
    const res = yield call(notifiApi?.getListTempalteZaloOA, variables);
    if (res.success) {
      const result = res?.data;
      const changeResult = result.map((item, index) => ({
        ...item,
        label: item.template_name,
      }));

      if (result.length > 0) {
        onSuccess(changeResult);
      } else {
        yield onError();
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const sendMessageZaloOA = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga sendMessageZaloOA');
  try {
    const variables = yield {
      loai: params?.loai,
      template_id: params?.template_id,
      phone: params?.phone,
      order_code: params?.order_code,
      tracking_id: params?.tracking_id,
      creator_id: params?.creator_id,
    };

    res = yield call(notifiApi?.sendMessageZaloOA, variables);
    if (res.success) {
      const result = res?.data;
      if (result.length > 0) {
        onSuccess(result);
      } else {
        yield onError();
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};
const sendMessageZaloOAMulti = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga sendMessageZaloOAMulti');
  try {
    const variables = yield {
      loai: params?.loai,
      template_id: params?.template_id,
      listdonhang: params?.listdonhang,
      creator_id: params?.creator_id,
    };

    res = yield call(notifiApi?.sendMessageZaloOAMulti, variables);

    if (res.success) {
      const result = res?.data;

      if (result[0].success === '01') {
        yield onSuccess(result);
      } else {
        yield onError(res?.data);
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const sendNotifiToCustomer = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga sendNotifiToCustomer');
  try {
    const variables = yield {
      title: params?.title,
      body: params?.body,
      idsKhachHang: params?.idsKhachHang,
    };

    res = yield call(notifiApi?.sendNotifiToCustomer, variables);
    if (res.success === true) {
      const result = res.data;
      if (result.statusCodes === 200) {
        onSuccess(result);
      } else {
        //thông báo lỗi từ api trả về
        yield onError(res?.error);
      }
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const watcher = function* () {
  yield takeLatest(
    notifiTypes.GET_LIST_TEMPLATE_ZALO_OA,
    getListTempalteZaloOA,
  );
  yield takeLatest(notifiTypes.SEND_MESSAGE_ZALO_OA, sendMessageZaloOA);
  yield takeLatest(
    notifiTypes.SEND_MESSAGE_ZALO_OA_MULTI,
    sendMessageZaloOAMulti,
  );
  yield takeLatest(notifiTypes.SEND_NOTIFI_TO_CUSTOMER, sendNotifiToCustomer);
};
export default watcher();
