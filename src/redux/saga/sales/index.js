import {call, takeLatest, takeEvery} from 'redux-saga/effects';
import {salesApi} from '~services';
import {salesTypes, salesActions} from '~redux/reducers';

const createDraftOrder = function* ({
    payload: {params, onSuccess, onError},
  }) {
    yield console.log('call saga createDraftOrder');
    try {
      const variables = yield {
        IdNguoiTaoDon: params?.IdNguoiTaoDon,
        IdCuaHang: params?.IdCuaHang,
        NoiDung: params?.NoiDung,
      };
  
      const res = yield call(salesApi?.createDraftOrder, variables);
  
      if (res.success) {
        const result = res?.data;
        if (result.statusCodes !== 200) {
            yield onError(result);
        }
        else
        {  
          yield onSuccess(result);
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

  const deleteDraftOrder = function* ({
    payload: {params, onSuccess, onError},
  }) {
    yield console.log('call saga deleteDraftOrder');
    try {
      const variables = yield {
        IdDonHangNhap: params?.IdDonHangNhap,
      };
  
      const res = yield call(salesApi?.deleteDraftOrder, variables);
  
      if (res.success) {
        const result = res?.data;
        if (result.statusCodes !== 200) {
            yield onError(result);
        }
        else
        {  
          yield onSuccess(result);
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

  const updateDraftOrder = function* ({
    payload: {params, onSuccess, onError},
  }) {
    yield console.log('call saga updateDraftOrder');
    try {
      const variables = yield {
        IdDonHangNhap: params?.IdDonHangNhap,
        IdNguoiTaoDon: params?.IdNguoiTaoDon,
        IdCuaHang: params?.IdCuaHang,
        NoiDung: params?.NoiDung,
      };
  
      const res = yield call(salesApi?.updateDraftOrder, variables);
  
      if (res.success) {
        const result = res?.data;
        if (result.statusCodes !== 200) {
            yield onError(result);
        }
        else
        {  
          yield onSuccess(result);
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

  const getDraftOrders = function* ({
    payload: {params, onSuccess, onError},
  }) {
    yield console.log('call saga getDraftOrders');
    try {
      const variables = yield {
        storeId: params?.storeId,
        employeeId: params?.employeeId,
      };
  
      const res = yield call(salesApi?.getDraftOrders, variables);
  
      if (res.success) {
        const result = res?.data;
        if (result.statusCodes !== 200) {
            yield onError(result);
        }
        else
        {  
          yield onSuccess(result);
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


const watcher = function* () {
    yield takeLatest(salesTypes.CREATE_DRAFT_ORDER, createDraftOrder);
    yield takeLatest(salesTypes.UPDATE_DRAFT_ORDER, updateDraftOrder);
    yield takeEvery(salesTypes.DELETE_DRAFT_ORDER, deleteDraftOrder);
    yield takeLatest(salesTypes.GET_DRAFT_ORDERS, getDraftOrders);
};
export default watcher();
