import {call, takeLatest, put} from 'redux-saga/effects';
import {reportApi} from '~services';
import {reportTypes, reportActions} from '~redux/reducers';

const getReportDate = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getReportDate');
  try {
    const variables = yield {
      idNguoiDung: params?.idNguoiDung,
      tuNgay: params?.tuNgay,
      denNgay: params?.denNgay,
      storeId: params?.storeId,
    };
    const res = yield call(reportApi?.getReportDate, variables);

    if (res.success) {
      const result = res?.data;
      if (result.statusCodes !== 200) {
        onError(result);
        return;
      }
      const allEmpty = result?.metadata.every(
        branch => branch.danhSachChiTietDoanhThu.length === 0,
      );
      yield put(reportActions.setReportDate(result?.metadata || result));
      yield onSuccess(allEmpty);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const getReportWareHouseByDate = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga getReportWareHouseByDate');
  try {
    const variables = yield {
      idNguoiDung: params?.idNguoiDung,
      tuNgay: params?.tuNgay,
      denNgay: params?.denNgay,
      storeId: params?.storeId,
    };

    const res = yield call(reportApi?.getReportWareHouseByDate, variables);

    if (res.success) {
      const result = res?.data;
      if (result.statusCodes !== 200) {
        onError(result);
        return;
      }
      yield put(
        reportActions.setReportWareHouseByDate(result?.metadata || result),
      );
      yield onSuccess();
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const getReportWareHouseDetailByTop = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga getReportWareHouseDetailByTop');
  try {
    const variables = yield {
      idNguoiDung: params?.idNguoiDung,
      tuNgay: params?.tuNgay,
      denNgay: params?.denNgay,
      storeId: params?.storeId,
      top: params?.top,
    };
    console.log(variables);

    const res = yield call(reportApi?.getReportWareHouseDetailByTop, variables);

    if (res.success) {
      const result = res?.data;
      if (result.statusCodes !== 200) {
        yield onError({message: result.message});
      }
      yield put(
        reportActions.setReportWareHouseDetailByTop(result?.metadata || result),
      );
      yield onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const getReportRevenueByBirthday = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga getReportRevenueByBirthday');
  try {
    const variables = yield {
      idNguoiDung: params?.idNguoiDung,
      top: params?.top,
      tuNgay: params?.tuNgay,
      denNgay: params?.denNgay,
      storeId: params?.storeId,
    };

    const res = yield call(reportApi?.getReportRevenueByBirthday, variables);

    if (res.success) {
      const result = res?.data;

      if (result.statusCodes !== 200) {
        yield onError({message: result.message});
      }
      yield put(
        reportActions.setReportRevenueByBirthday(result?.metadata || result),
      );
      yield onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const getReportFavoriteProduct = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga getReportFavoriteProduct');
  try {
    const variables = yield {
      idNguoiDung: params?.idNguoiDung,
      tuNgay: params?.tuNgay,
      denNgay: params?.denNgay,
      storeId: params?.storeId,
      top: params?.top,
    };

    const res = yield call(reportApi?.getReportFavoriteProduct, variables);
    if (res.success) {
      const result = res?.data;

      if (result.statusCodes !== 200) {
        yield onError({message: result.message});
      }
      yield put(
        reportActions.setReportFavoriteProduct(result?.metadata || result),
      );
      yield onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const getReportRevenueCustomerUsed = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga getReportRevenueCustomerUsed');
  try {
    // Gọi API với params nếu cần
    const res = yield call(reportApi?.getReportRevenueCustomerUsed, params);
    if (res.success === true) {
      const result = res.data;
      if (result?.statusCodes === 200) {
        yield onSuccess(result.metadata);
      } else {
        yield onError({message: result.message});
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError();
  }
};

const getCustomerHasEmail = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga getCustomerHasEmail');
  try {
    // Gọi API với params nếu cần
    const res = yield call(reportApi?.getCustomerHasEmail, params);
    if (res.success === true) {
      const result = res.data;
      if (result?.statusCodes === 200) {
        yield onSuccess(result.metadata);
      } else {
        yield onError({message: result.message});
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError();
  }
};

const getReportOrderByDate = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga getReportOrderByDate');
  try {
    const variables = yield {
      idNguoiDung: params?.idNguoiDung,
      tuNgay: params?.tuNgay,
      denNgay: params?.denNgay,
      storeId: params?.storeId,
    };

    const res = yield call(reportApi?.getReportOrderByDate, variables);

    if (res.success) {
      const result = res?.data;
      if (result.statusCodes !== 200) {
        onError(result);
        return;
      }

      yield put(reportActions.setReportOrderByDate(result?.metadata || result));
      yield onSuccess();
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};
const getReportOrderTransportByDate = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga getReportOrderTransportByDate');
  try {
    const variables = yield {
      idNguoiDung: params?.idNguoiDung,
      tuNgay: params?.tuNgay,
      denNgay: params?.denNgay,
      storeId: params?.storeId,
      top: params?.top,
    };

    const res = yield call(reportApi?.getReportOrderTransportByDate, variables);

    if (res.success) {
      const result = res?.data;
      if (result.statusCodes !== 200) {
        yield onError({message: result.message});
      }
      yield put(
        reportActions.setReportOrderTransportByDate(result?.metadata || result),
      );
      yield onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const getReportOrderAdressByDate = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga getReportOrderAdressByDate');
  try {
    const variables = yield {
      idNguoiDung: params?.idNguoiDung,
      tuNgay: params?.tuNgay,
      denNgay: params?.denNgay,
      storeId: params?.storeId,
      top: params?.top,
      quocGia: params?.quocGia,
      quanHuyen: params?.quanHuyen,
      trangThai: params?.trangThai,
      tinhThanh: params?.tinhThanh,
    };

    const res = yield call(reportApi?.getReportOrderAdressByDate, variables);

    if (res.success) {
      const result = res?.data;

      if (result.statusCodes !== 200) {
        yield onError({message: result.message});
      }
      yield put(
        reportActions.setReportOrderAdressByDate(result?.metadata || result),
      );
      yield onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield showMessage({
        duration: 3000,
        message: res?.message,
        type: 'danger',
      });
      yield onError();
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const getReportCompare = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getReportCompare');
  try {
    const variables = yield {
      nguon: params?.nguon,
      dich: params?.dich,
      loaiSoLieu: params?.loaiSoLieu,
      idsCuaHang: params?.idsCuaHang,
    };

    const res = yield call(reportApi?.getReportCompare, variables);

    if (res?.success) {
      const result = res?.data;
      if (result?.statusCodes === 200) {
        onSuccess(result?.metadata);
      } else {
        onError(result);
      }
    } else {
      //thông báo lỗi từ api trả về
      yield showMessage({
        duration: 3000,
        message: res?.message,
        type: 'danger',
      });
      yield onError();
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const getReportFee = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga report Fee');
  try {
    const variables = yield {
      Thang: params?.Thang,
      Nam: params?.Nam,
      ListIdCuaHang: params?.ListIdCuaHang,
    };
    const res = yield call(reportApi?.getReportFee, variables);
    if (res.success) {
      const result = res?.data;
      yield put(reportActions.setReportFee(result));
      yield onSuccess();
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    console.log({err});
    yield onError();
  }
};

const getReportFeeByDate = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getReportFeeByDate');
  try {
    const variables = yield {
      idNguoiDung: params?.idNguoiDung,
      tuNgay: params?.tuNgay,
      denNgay: params?.denNgay,
      storeId: params?.storeId,
    };

    const res = yield call(reportApi?.getReportFeeByDate, variables);

    if (res.success) {
      const result = res?.data;
      if (result.statusCodes !== 200) {
        onError(result);
        return;
      }
      const allEmpty = result?.metadata.every(
        branch => branch.danhSachChiTietChiPhi.length === 0,
      );
      yield put(reportActions.setReportFeeByDate(result?.metadata || result));
      yield onSuccess(allEmpty);
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
  yield takeLatest(reportTypes.GET_REPORT_DATE, getReportDate);
  yield takeLatest(reportTypes.GET_REPORT_FEE, getReportFee);
  yield takeLatest(reportTypes.GET_REPORT_FEE_BY_DATE, getReportFeeByDate);
  yield takeLatest(
    reportTypes.GET_REPORT_WAREHOUSE_BY_DATE,
    getReportWareHouseByDate,
  );
  yield takeLatest(
    reportTypes.GET_REPORT_WAREHOUSE_DETAIL_BY_TOP,
    getReportWareHouseDetailByTop,
  );
  yield takeLatest(
    reportTypes.GET_REPORT_REVENUE_BY_BIRTHDAY,
    getReportRevenueByBirthday,
  );
  yield takeLatest(
    reportTypes.GET_REPORT_FAVORITE_PRODUCT,
    getReportFavoriteProduct,
  );
  yield takeLatest(
    reportTypes.GET_REPORT_REVENUE_CUSTOMER_USED,
    getReportRevenueCustomerUsed,
  );
  yield takeLatest(reportTypes.GET_CUSTOMER_HAS_EMAIL, getCustomerHasEmail);
  yield takeLatest(reportTypes.GET_REPORT_ORDER_BY_DATE, getReportOrderByDate);
  yield takeLatest(
    reportTypes.GET_REPORT_ORDER_TRANSPORT_BY_DATE,
    getReportOrderTransportByDate,
  );
  yield takeLatest(
    reportTypes.GET_REPORT_ORDER_ADRESS_BY_DATE,
    getReportOrderAdressByDate,
  );
  yield takeLatest(reportTypes.GET_REPORT_COMPARE, getReportCompare);
};
export default watcher();
