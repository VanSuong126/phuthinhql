import {call, takeLatest, put} from 'redux-saga/effects';
import {paymentTypes} from '~redux/reducers';
import {paymentApi} from '~services';

// Tạo link thanh toán Momo
const createPaymentLinkMomo = function* ({
  payload: {params, onSuccess, onSuccessWeb, onError},
}) {
  yield console.log('call saga createPaymentLinkMomo');
  try {
    const variables = yield {
      MaDoiTac: params?.MaDoiTac,
      orderId: params?.orderId,
      orderInfo: params?.orderInfo,
      amount: params?.amount,
      requestType: params?.requestType,
      extraData: params?.extraData,
      storeId: params?.storeId,
      orderGroupId: params?.orderGroupId,
      autoCapture: params?.autoCapture,
      lang: params?.lang,
    };
    const res = yield call(paymentApi?.createPaymentLinkMomo, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success === '01') {
        onSuccess(result?.results);
      } else {
        yield onError();
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

// Tạo link thanh toán Vnpay
const createPaymentLinkVnpay = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga createPaymentLinkVnpay');
  try {
    const variables = yield {
      MaDoiTac:params?.MaDoiTac,
      vnp_Amount:params?.vnp_Amount,
      vnp_CurrCode:params?.vnp_CurrCode,
      vnp_Locale:params?.vnp_Locale,
      vnp_OrderInfo:params?.vnp_OrderInfo,
      vnp_OrderType:params?.vnp_OrderType,
      vnp_TxnRef:params?.vnp_TxnRef,
    };
    const res = yield call(paymentApi?.createPaymentLinkVnpay, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success === '01') {
        onSuccess(result?.link);
      } else {
        yield onError();
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const watcher = function* () {
  yield takeLatest(
    paymentTypes.CREATE_PAYMENT_LINK_MOMO,
    createPaymentLinkMomo,
  );
  yield takeLatest(
    paymentTypes.CREATE_PAYMENT_LINK_VNPAY,
    createPaymentLinkVnpay,
  );
};
export default watcher();
