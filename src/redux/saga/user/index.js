import {call, takeLatest, put} from 'redux-saga/effects';
import {userTypes, userActions} from '~redux/reducers';
import {loginApi} from '~services';
import LocalDB from '~data/asyncStorage';

const userLogin = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga login');
  try {
    yield LocalDB.logOut();
    const variables = yield params;
    const res = yield call(loginApi?.userLogin, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.statusCodes === 200) {
        onSuccess(result?.metadata);
      } else {
        yield onError(result);
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError();
    console.log({err});
  }
};

const refreshToken = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga refreshToken');
  try {
    const variables = yield {
      loai: 1,
      taikhoan: params?.taikhoan,
      matkhau: params?.matkhau,
      token: params?.token,
      chude: params?.chude,
    };
    const res = yield call(loginApi?.userLogin, variables);
    if (res.success) {
      const result = res?.data[0];
      if (result?.Token != '') {
        yield put(userActions.setUserData(result));
        yield onSuccess(result);
      } else {
        yield onError();
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError();
    console.log({err});
  }
};

function* checkDistance({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga checkDistanceSaga');
  try {
    const variables = yield {
      stringCheck: params?.stringCheck,
      latitude: params?.latitude,
      longitude: params?.longitude,
    };
    const res = yield call(loginApi?.checkQR, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success === '01') {
        yield onSuccess(result?.data);
      } else {
        yield onError(result?.message);
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
}

function* confirmCheck({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga confirmCheck');
  try {
    const variables = {
      IDNguoiDung: params?.IDNguoiDung,
      IDThietBi: params?.IDThietBi,
      NenTangThietBi: params?.NenTangThietBi,
      ChuoiCheck: params?.ChuoiCheck,
      LoaiCheck: params?.LoaiCheck,
      NgayGioCheck: params?.NgayGioCheck,
      Lati: params?.Lati,
      Longi: params?.Longi,
    };
    const res = yield call(loginApi?.confirmCheck, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success === '01') {
        yield onSuccess(result?.message);
      } else {
        yield onError(result?.message);
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (error) {
    console.log({err});
    yield onError();
  }
}

const userLogout = function* ({payload: {onSuccess, onError}}) {
  try {
    yield put(userActions.setEmptyProfile());
    yield onSuccess();
  } catch (err) {
    yield onError();
  }
};

// Quên mật khẩu
const forgotPassword = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga forgotPassword');
  try {
    const variables = yield {
      taiKhoan: params?.taiKhoan,
    };

    const res = yield call(loginApi?.forgotPassword, variables);
    console.log(res);

    if (res.success) {
      const result = res?.data;
      if (result.metadata) {
        onSuccess(result?.metadata || []);
      } else {
        onError(result);
      }
    } else {
      //thông báo lỗi từ api trả về
      onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};
// Đổi mật khẩu
const changePassword = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga changePassword');
  try {
    const variables = yield {
      userId: params?.userId,
      oldPassword: params?.oldPassword,
      newPassword: params?.newPassword,
    };

    const res = yield call(loginApi?.changePassword, variables);
    console.log(res);

    if (res.success) {
      const result = res?.data;
      if (result.metadata) {
        onSuccess(result?.metadata || []);
      } else {
        onError(result);
      }
    } else {
      //thông báo lỗi từ api trả về
      onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const createUserAdmin = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga createUserAdmin');
  try {
    const variables = yield {
      ho: params?.ho,
      ten: params?.ten,
      taiKhoan: params?.taiKhoan,
      matKhau: params?.matKhau,
      email: params?.email,
      idvaitro: params?.idvaitro,
    };

    const res = yield call(loginApi?.createUserAdmin, variables);

    if (res.success) {
      const result = res?.data;
      if (result.metadata) {
        onSuccess(result?.metadata || []);
      } else {
        onError(result);
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
  yield takeLatest(userTypes.USER_LOGIN, userLogin);
  yield takeLatest(userTypes.USER_LOGOUT, userLogout);
  yield takeLatest(userTypes.REFRESH_TOKEN, refreshToken);
  yield takeLatest(userTypes.CHECK_DISTANCE, checkDistance);
  yield takeLatest(userTypes.CONFIRM_CHECK, confirmCheck);
  yield takeLatest(userTypes.FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(userTypes.CHANGE_PASSWORD, changePassword);
  yield takeLatest(userTypes.CREATE_USER_ADMIN, createUserAdmin);
};
export default watcher();
