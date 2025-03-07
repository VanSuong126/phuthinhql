import {call, takeLatest, takeEvery, put} from 'redux-saga/effects';
import {commonApi} from '~services';
import {commonTypes, commonActions} from '~redux/reducers';

const getListStore = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListStore');
  try {
    const variables = yield {
      loai: params?.loai,
      idcuahang: params?.idcuahang,
      idvaitro: params?.idvaitro,
    };
    const res = yield call(commonApi?.getListStore, variables);

    if (res.success) {
      const result = res?.data;
      if (result.length > 0) {
        onSuccess();
        yield put(commonActions.setListStore(result));
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
const getInforStore = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListStore');
  try {
    const variables = yield {
      loai: params?.loai,
    };

    const res = yield call(commonApi?.getInforStore, variables);
    if (res.success) {
      const result = res?.data;
      if (result.length > 0) {
        onSuccess();
        yield put(commonActions.setInforStore(result));
      } else {
        yield onError(result);
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
const getListRole = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListRole');
  try {
    const variables = yield {
      loai: params?.loai,
      idvaitro: params?.idvaitro,
    };
    const res = yield call(commonApi?.getListRole, variables);
    if (res.success) {
      const result = res?.data;
      if (result[0]?.success === '00') {
        yield onError();
      } else {
        onSuccess(result);
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

const getListCustomer = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListCustomer');
  try {
    const variables = yield {
      loai: params?.loai,
      chuoitimkiem: params?.chuoitimkiem,
    };
    const res = yield call(commonApi?.getListCustomer, variables);
    if (res.success) {
      const result = res?.data;
      if (result[0]?.success == '00') {
        yield onError({message: 'notFoundCustomer'});
      } else {
        yield put(commonActions.setListCustomer(result));
        yield onSuccess();
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

const getListProduct = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListProduct');
  try {
    const variables = yield {
      loai: params?.loai,
      sotrang: params?.sotrang,
      soitem: params?.soitem,
      idcuahang: params?.idcuahang,
      idvaitro: params?.idvaitro,
      keyword: params?.keyword,
    };
    const res = yield call(commonApi?.getListProduct, variables);
    if (res.success) {
      const result = res?.data;
      if (result[0]?.success === '00') {
        yield onError({message: 'notFoundProduct'});
      } else {
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
// get Natio
const getListCountries = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListCountries');
  try {
    const variables = yield {
      loai: params?.loai,
    };
    const res = yield call(commonApi?.getListCountries, variables);
    if (res.success) {
      const result = res?.data?.content;
      yield put(commonActions.setListCountries(result));
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

const getListCities = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListCities');
  try {
    const variables = yield {
      loai: params?.loai,
      CountryCode: params.CountryCode,
    };
    const res = yield call(commonApi?.getListCities, variables);
    if (res.success) {
      const result = res?.data?.content;
      yield put(commonActions.setListCities(result));
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

const getListZipCode = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListZipCode');
  try {
    const variables = yield {
      loai: params?.loai,
      CountryCode: params?.CountryCode,
      StateCode: params?.StateCode,
    };
    const res = yield call(commonApi?.getListZipCode, variables);
    if (res.success) {
      const result = res?.data?.content;
      yield put(commonActions.setListZipCode(result));
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

const getTransporter = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getTransporter');
  try {
    const variables = yield {
      loai: params?.loai,
      mabanghotro: params?.mabanghotro,
    };
    const res = yield call(commonApi?.getTransporter, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.length > 0 && result[0]?.success === '01') {
        yield put(commonActions.setTransporter(result));
        yield onSuccess();
      } else {
        yield onError({message: result[0]?.msgErr});
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

const checkDiscountCode = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga checkDiscountCode');
  try {
    const variables = yield {
      loai: params?.loai,
      magiamgias: params?.magiamgias,
    };
    const res = yield call(commonApi?.checkDiscountCode, variables);
    if (res.success) {
      const result = res?.data[0];
      if (result?.success == '01') {
        yield onSuccess(result);
      } else {
        const err = 'Mã khuyến mãi không chính xác!';
        yield onError(err);
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const getFeeShip = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getFeeShip');
  try {
    const variables = yield {
      matinhgui: params?.matinhgui,
      tinhgui: params?.tinhgui,
      quangui: params?.quangui,
      matinhnhan: params?.matinhnhan,
      tinhnhan: params?.tinhnhan,
      quannhan: params?.quannhan,
      diachinhan: params?.diachinhan,
      trongluong: params?.trongluong,
      trigia: params?.trigia,
      manhavanchuyen: params?.manhavanchuyen,
      chuyenphatnhanh: params?.chuyenphatnhanh,
      giatoithieunoitinh: params?.giatoithieunoitinh,
      giatoithieulientinh: params?.giatoithieulientinh,
    };
    const res = yield call(commonApi?.getFeeShip, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success == '01') {
        yield onSuccess(result);
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

const createOrder = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga createOrder');
  let Ho = '';
  let Ten = '';
  try {
    if (params?.ten === undefined) {
      const lastSpaceIndex = params?.tenkhachhang.lastIndexOf(' ');
      Ho = params?.tenkhachhang.slice(0, lastSpaceIndex);
      Ten = params?.tenkhachhang.slice(lastSpaceIndex + 1);
    }
    const variables = yield {
      donhanglienhe: params?.donhanglienhe,
      loaidonhang: params.loaidonhang,
      dienthoai: params?.dienthoai,
      dienthoainhan: params?.dienthoainhan,
      email: params?.email,
      tenkhachhang: params?.tenkhachhang,
      maquocgia: params?.maquocgia,
      mabang: params?.mabang,
      tenbang: params?.tenbang,
      tenquan: params?.tenquan,
      tenquocgia: params?.tenquocgia,
      zipcode: params?.zipcode,
      thanhpho: params?.thanhpho,
      diachi: params?.diachi,
      hinhthucnhanhang: params?.hinhthucnhanhang,
      manhavanchuyen: params?.manhavanchuyen,
      hinhthucthanhtoan: params?.hinhthucthanhtoan,
      dichvucongthem: params?.dichvucongthem,
      ghichu: params?.ghichu,
      ghichudichvucongthem: params?.ghichudichvucongthem,
      sanphamdachon: params?.sanphamdachon,
      ngaysinh: params?.ngaysinh,
      nhantaicuahang: params?.nhantaicuahang,
      phiship: params?.phiship,
      magiamgia: params?.magiamgia,
      sotiengiam: params?.sotiengiam,
      magiamgias: params?.magiamgias,
      sotiengiamtrensanpham: params?.sotiengiamtrensanpham,
      idnguoithuchien: params?.idnguoithuchien,
      ho: params?.ho === undefined ? Ho : params?.ho,
      ten: params?.ten === undefined ? Ten : params?.ten,
      vat: params?.vat,
      ngaydathang: params?.ngaydathang,
    };
    const res = yield call(commonApi?.createOrder, variables);
    if (res.success) {
      const result = res?.data;
      yield onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const getListOrder = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListOrder');
  try {
    const {
      loai,
      type,
      iddonhang,
      laynhieudon,
      tungay,
      denngay,
      idcuahang,
      maloaitinzalo,
      trangthaiyeucau,
    } = params;
    let variables = {
      loai,
      maloaitinzalo,
      trangthaiyeucau,
      laynhieudon,
      tungay,
      denngay,
      idcuahang,
      iddonhang,
    };
    const res = yield call(commonApi.getListOrder, variables);
    if (res.success) {
      const result = res.data?.DonHang;
      if (result) {
        yield onSuccess(result);
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

const getListOrderZaloOA = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListOrderZaloOA');
  try {
    let variables = {
      loai: params?.loai,
      maloaitinzalo: params?.maloaitinzalo,
      tungay: params?.tungay,
      denngay: params?.denngay,
      idcuahang: params?.idcuahang,
    };

    const res = yield call(commonApi.getListOrderZaloOA, variables);
    if (res.success) {
      const result = res.data?.DonHang;

      if (result) {
        const addCheckIntoData = result.map(item => ({
          ...item,
          isCheck: false,
        }));
        yield onSuccess(addCheckIntoData);
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

const getDetailOrder = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getDetailOrder');
  try {
    const variables = yield {
      loai: params?.loai,
      idcuahang: params?.idcuahang,
      madonhang: params?.madonhang,
      iddonhang: params?.iddonhang,
      tungay: params?.tungay,
      denngay: params?.denngay,
    };
    const res = yield call(commonApi?.getDetailOrder, variables);
    if (res.success) {
      const result = res?.data;
      if (result.DonHang.length > 0) {
        yield onSuccess(result);
      } else {
        const error = {statusCodes: 499, message: 'noData'};
        yield onError(error);
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const cancelOrder = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga cancelOrder');
  try {
    const variables = yield {
      loai: params?.loai,
      iddonhang: params?.iddonhang,
      IDNguoiThucHien: params?.IDNguoiThucHien,
    };
    const res = yield call(commonApi?.cancelOrder, variables);
    if (res.success) {
      const result = res?.data;
      if (result[0]?.success == '01') {
        const mes = 'Đã huỷ thành công đơn hàng';
        yield onSuccess(mes);
      } else {
        const err = 'Có lỗi chưa huỷ được đơn hàng';
        yield onError(err);
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};
const confirmOrderOnline = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga confirmOrderOnline');
  try {
    const variables = yield {
      loai: params?.loai,
      iddonhang: params?.iddonhang,
      IDNguoiThucHien: params?.IDNguoiThucHien,
    };
    const res = yield call(commonApi?.confirmOrderOnline, variables);
    if (res.success) {
      const result = res?.data;
      if (result[0]?.success == '01') {
        const mes = 'Xác nhận thành công đơn hàng';
        yield onSuccess(mes);
      } else {
        const err = 'Có lỗi chưa xác nhận được đơn hàng';
        yield onError(err);
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const updateOrder = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga updateOrder');
  try {
    const variables = yield {
      dienthoai: params?.dienthoai,
      dienthoainhan: params?.dienthoainhan,
      email: params?.email,
      tenkhachhang: params?.tenkhachhang,
      maquocgia: params?.maquocgia,
      mabang: params?.mabang,
      tenbang: params?.tenbang,
      tenquan: params?.tenquan,
      tenquocgia: params?.tenquocgia,
      zipcode: params?.zipcode,
      thanhpho: params?.thanhpho,
      diachi: params?.diachi,
      hinhthucnhanhang: params?.hinhthucnhanhang,
      manhavanchuyen: params?.manhavanchuyen,
      hinhthucthanhtoan: params?.hinhthucthanhtoan,
      dichvucongthem: params?.dichvucongthem,
      ghichu: params?.ghichu,
      ghichudichvucongthem: params?.ghichudichvucongthem,
      sanphamdachon: params?.sanphamdachon,
      ngaysinh: params?.ngaysinh,
      nhantaicuahang: params?.nhantaicuahang,
      phiship: params?.phiship,
      magiamgia: params?.magiamgia,
      sotiengiam: params?.sotiengiam,
      magiamgias: params?.magiamgias,
      sotiengiamtrensanpham: params?.sotiengiamtrensanpham,
      idnguoithuchien: params?.idnguoithuchien,
      ho: params?.ho,
      ten: params?.ten,
      vat: params?.vat,
      madonchung: params?.madonchung,
      ngaydathang: params?.ngaydathang,
    };
    const res = yield call(commonApi?.updateOrder, variables);
    if (res.success) {
      const result = res?.data;
      yield onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const shipOrder = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga shipOrder');
  try {
    const variables = yield {
      iddonhang: params?.iddonhang,
      manhavanchuyen: params?.manhavanchuyen,
      mienship: params?.mienship,
      tienthuho: params?.tienthuho,
      ngaygiaohang: params?.ngaygiaohang,
      ghichu: params?.ghichu,
      trigiakhaigia: params?.trigiakhaigia,
      idcuahang: params?.idcuahang,
      idnguoidung: params?.idnguoidung,
      sanpham: params?.sanpham,
      devo: params?.devo,
      khoiluong: params?.khoiluong,
      diachicap4: params?.diachicap4,
      phishipthuc: params?.phishipthuc,
    };
    const res = yield call(commonApi?.shipOrder, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success == '00') {
        yield onError(result?.message);
      } else {
        if (result?.data?.success == true) {
          yield onSuccess(result?.data);
        } else if (result?.success === '01') {
          yield onSuccess(result?.message);
        } else {
          yield onError(result?.message);
        }
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const updateStatusOrder = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga updateStatusOrder');
  try {
    const variables = yield {
      loai: params?.loai,
      CodeTrangThai: params?.CodeTrangThai,
      IdDonHang: params?.IdDonHang,
      IdNguoiThucHien: params?.IdNguoiThucHien,
      IdNguoiPheDuyet: params?.IdNguoiPheDuyet,
      GhiChu: params?.GhiChu,
      lstIdDonHang: params?.lstIdDonHang,
    };
    const res = yield call(commonApi?.updateStatusOrder, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.[0]?.success === '01') {
        yield onSuccess();
      } else {
        yield onError(result?.Error);
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const printLabel = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga printLabel');
  try {
    const variables = yield {
      madonhang: params?.madonhang,
    };
    const res = yield call(commonApi?.printLabel, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success === '01') onSuccess(result?.data);
      else {
        yield onError(result?.message);
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};
const sendMailBooking = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga sendMailBooking');
  try {
    const variables = yield {
      to: params?.to,
      title: params?.title,
      body: params?.body,
    };
    const res = yield call(commonApi?.sendMailBooking, variables);

    if (res.success) {
      const result = res?.data;
      if (result?.success == '01') {
        yield onSuccess();
      } else {
        yield onError(res?.error);
      }
    } else {
      //thể báo lỗi này api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const getPaymentMethod = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getPaymentMethod');
  try {
    const variables = yield {
      loai: params?.loai,
    };
    const res = yield call(commonApi?.getPaymentMethod, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.length > 0) {
        yield put(commonActions.setPaymentMethod(result));
        yield onSuccess();
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

const getReceivingMethod = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getReceivingMethod');
  try {
    const variables = yield {
      loai: params?.loai,
    };
    const res = yield call(commonApi?.getReceivingMethod, variables);
    if (res.success) {
      const result = res?.data;
      if (result.length > 0) {
        yield put(commonActions.setReceivingMethod(result));
        yield onSuccess();
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
// Tìm kiếm đơn hàng
const findOrder = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga findOrder');
  try {
    const variables = yield {
      loai: params?.loai,
      idnguoidung: params?.idnguoidung,
      idcuahang: params?.idcuahang,
      tungay: params?.tungay,
      denngay: params?.denngay,
      chuoitimkiem: params?.chuoitimkiem,
    };
    const res = yield call(commonApi?.findOrder, variables);
    if (res.success) {
      const result = res?.data;
      if (result.success == '01') {
        yield onSuccess(result?.data);
      } else {
        yield onError({message: result?.message});
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};
// Tìm sản phẩm
const findProduct = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga findProduct');
  try {
    const variables = yield {
      loai: params?.loai,
      idcuahang: params?.idcuahang,
      idvaitro: params?.idvaitro,
      sotrang: params?.sotrang,
      soitem: params?.soitem,
      keyword: params?.keyword,
    };
    const res = yield call(commonApi?.findProduct, variables);
    if (res.success) {
      const result = res?.data;
      if (result[0].success == '00') {
        onError({message: 'Không tìm thấy sản phẩm'});
      } else if (result.length > 0) onSuccess(result);
      else {
        onError({message: res?.data?.message});
      }
    } else {
      //thể báo lỗi này api trả về
      onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};
//Tìm kiếm khách hàng
const findCustomer = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga findCustomer');
  try {
    const variables = yield {
      loai: params?.loai,
      idcuahang: params?.idcuahang,
      idvaitro: params?.idvaitro,
      sotrang: params?.sotrang,
      soitem: params?.soitem,
      chuoitimkiem: params?.chuoitimkiem,
    };
    const res = yield call(commonApi?.findCustomer, variables);
    if (res.success) {
      const result = res?.data;
      if (result[0]?.success == '00') {
        onError({message: 'notFoundCustomer'});
      } else {
        onSuccess(result);
      }
    } else {
      //thông báo lỗi từ api trả về
      onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

// cập nhật địa chỉ đơn hàng
const updateAddressOrder = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga updateAddressOrder');
  try {
    const variables = yield {
      madonhang: params?.madonhang,
      hotennguoinhan: params?.hotennguoinhan,
      dienthoainhan: params?.dienthoainhan,
      diachinhan: params?.diachinhan,
      thanhphonhan: params?.thanhphonhan,
      mabangnhan: params?.mabangnhan,
      tenquocgianhan: params?.tenquocgianhan,
      maquocgianhan: params?.maquocgianhan,
      tenbangnhan: params?.tenbangnhan,
      tenquannhan: params?.tenquannhan,
    };
    const res = yield call(commonApi?.updateAddressOrder, variables);
    if (res.success) {
      const result = res?.data;
      if (result.success == '01') {
        onSuccess(result?.message);
      } else {
        onError(result.message);
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const cancelOrderDelivery = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga cancelOrderDelivery');
  try {
    const variables = yield {
      mavandon: params?.mavandon,
    };
    const res = yield call(commonApi?.cancelOrderDelivery, variables);
    if (res?.success) {
      const result = res?.data;
      if (result?.success == '01') {
        yield onSuccess({message: res?.message});
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

// Lấy danh sách dịch vụ cộng thêm
const getExtraService = function* ({payload: {params, onSuccess, onError}}) {
  try {
    const variables = yield {
      loai: params?.loai,
    };
    const res = yield call(commonApi.getExtraService, variables);
    if (res.success) {
      const result = res?.data?.DanhSachDichVuCongThem;
      yield onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError();
  }
};

// Push Notification
const pushNotify = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga pushNotify');
  try {
    const variables = yield {
      to: params?.to,
      title: params?.title,
      body: params?.body,
    };
    const res = yield call(commonApi?.pushNotify, variables);
    if (res.success) {
      const result = res?.data;
      if (result.success == '01') {
        yield onSuccess();
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
};
// Xem phong thủy
const viewNumerologies = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga viewNumerologies');
  try {
    const variables = yield {
      fullname: params?.fullname,
      gender: params?.gender,
      dayofbirth: params?.dayofbirth,
      monthofbirth: params?.monthofbirth,
      yearofbirth: params?.yearofbirth,
      phonenumber: params?.phonenumber,
      email: params?.email,
      destiny: params?.destiny,
    };
    const res = yield call(commonApi?.viewNumerologies, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success === '01') {
        yield onSuccess(result?.data);
      } else {
        yield onError(result?.message);
      }
    } else {
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

// Lấy thông tin xem phong thủy trước đó
const getNumerologies = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getNumerologies');
  try {
    const variables = yield {
      igencode: params?.igencode,
      ngaythexuat: params?.ngaythexuat,
    };
    const res = yield call(commonApi?.getNumerologies, variables);
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
};

const historyNumerologies = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga historyNumerologies');
  try {
    const variables = yield {
      chuoitimkiem: params?.chuoitimkiem,
    };
    const res = yield call(commonApi?.historyNumerologies, variables);
    if (res.success) {
      const result = res?.data;
      if (result[0]['success'] === '01') {
        yield onSuccess(result);
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

// Xem cung menh
const getDestiny = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getDestiny');
  try {
    const variables = yield {
      fullname: params?.fullname === '' ? undefined : params?.fullname,
      gender: params?.gender,
      dayofbirth: params?.dayofbirth,
      monthofbirth: params?.monthofbirth,
      yearofbirth: params?.yearofbirth,
    };
    const res = yield call(commonApi?.getDestiny, variables);
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
};

// update lại dữ liệu Numerologies cũ
const updateNumerologies = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga updateNumerologies');
  try {
    const variables = yield {
      igencode: params?.igencode,
      ngaythexuat: params?.ngaythexuat,
    };
    const res = yield call(commonApi?.updateNumerologies, variables);
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
};

const getListDiscount = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListDiscount');
  try {
    const variables = yield {
      loai: params?.loai,
    };
    const res = yield call(commonApi?.getListDiscount, variables);
    if (res.success) {
      const result = res?.data;
      yield onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const deleteDiscount = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga deleteDiscount');
  try {
    const variables = yield {
      loai: params?.loai,
      magiamgias: params?.magiamgias,
    };
    const res = yield call(commonApi?.deleteDiscount, variables);
    if (res.success) {
      const result = res?.data;
      if (result.success) {
        onSuccess(result);
      } else {
        yield onError({message: res?.error});
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const createDiscount = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga createDiscount');
  try {
    const variables = yield {
      loai: params?.loai,
      soluongma: params?.soluongma,
      magiamgias: params?.magiamgias,
      loaigiamgia: params?.loaigiamgia,
      sotiengiamgia: params?.sotiengiamgia,
      tylegiamgia: params?.tylegiamgia,
      tungay: params?.tungay,
      denngay: params?.denngay,
      solansudung: params?.solansudung,
      noibo: params?.noibo,
    };

    const res = yield call(commonApi?.createDiscount, variables);

    if (res.success) {
      const result = res?.data;
      onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const getTypeDiscount = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getTypeDiscount');
  try {
    const variables = yield {
      loai: params?.loai,
    };

    const res = yield call(commonApi?.getTypeDiscount, variables);

    if (res.success) {
      const result = res?.data;
      onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};
const getTypeCost = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getTypeCost');
  try {
    const variables = yield {
      loai: params?.loai,
    };

    const res = yield call(commonApi?.getTypeCost, variables);
    if (res.success) {
      const result = res?.data;
      onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};
const saveCost = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga saveCost');
  try {
    const variables = yield {
      loai: params?.loai,
      ngayphatsinh: params?.ngayphatsinh,
      sotien: params?.sotien,
      ghichu: params?.ghichu,
      idloaichiphi: params?.idloaichiphi,
      idnguoinhap: params?.idnguoinhap,
    };
    const res = yield call(commonApi?.saveCost, variables);
    if (res.success) {
      const result = res?.data[0];
      onSuccess(result);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const getListCost = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListCost');
  try {
    const variables = yield {
      loai: params?.loai,
      tungay: params?.tungay,
      denngay: params?.denngay,
    };

    const res = yield call(commonApi?.getListCost, variables);

    if (res.success) {
      const result = res?.data;
      if (result[0]?.success === '00') {
        yield onError();
      } else {
        onSuccess(result);
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const getFormMails = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListCost');
  try {
    const variables = yield {
      loai: params?.loai,
    };

    const res = yield call(commonApi?.getFormMails, variables);

    if (res.success) {
      const result = res?.data;
      if (result[0]?.success === '00') {
        yield onError();
      } else {
        onSuccess(result);
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const getListGroupProduct = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga getListGroupProduct');
  try {
    const res = yield call(commonApi?.getListGroupProduct, {});

    if (res.success) {
      const result = res?.data;

      if (result?.statusCodes !== 200) {
        yield onError(result);
      } else {
        onSuccess(result?.metadata);
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
  yield takeLatest(commonTypes.FIND_ORDER, findOrder);
  yield takeLatest(commonTypes.FIND_PRODUCT, findProduct);
  yield takeLatest(commonTypes.FIND_CUSTOMER, findCustomer);
  yield takeLatest(commonTypes.GET_LIST_STORE, getListStore);
  yield takeLatest(commonTypes.GET_INFOR_STORE, getInforStore);
  yield takeLatest(commonTypes.GET_LIST_ROLE, getListRole);
  yield takeLatest(commonTypes.GET_LIST_CUSTOMER, getListCustomer);
  yield takeLatest(commonTypes.GET_LIST_PRODUCT, getListProduct);
  yield takeLatest(commonTypes.GET_EXTRA_SERVICE, getExtraService);
  yield takeLatest(commonTypes.GET_LIST_ZIPCODE, getListZipCode);
  yield takeLatest(commonTypes.GET_LIST_COUNTRIES, getListCountries);
  yield takeLatest(commonTypes.GET_LIST_CITIES, getListCities);
  yield takeLatest(commonTypes.GET_TRANSPORTER, getTransporter);
  yield takeEvery(commonTypes.CHECK_DISCOUNT_CODE, checkDiscountCode);
  yield takeLatest(commonTypes.GET_FEE_SHIP, getFeeShip);
  yield takeLatest(commonTypes.CREATE_ORDER, createOrder);
  yield takeLatest(commonTypes.GET_LIST_ORDER, getListOrder);
  yield takeLatest(commonTypes.GET_LIST_ORDER_ZALOOA, getListOrderZaloOA);
  yield takeLatest(commonTypes.GET_DETAIL_ORDER, getDetailOrder);
  yield takeLatest(commonTypes.CANCEL_ORDER, cancelOrder);
  yield takeLatest(commonTypes.CONFIRM_ORDER_ONLINE, confirmOrderOnline);
  yield takeLatest(commonTypes.UPDATE_ORDER, updateOrder);
  yield takeLatest(commonTypes.SHIP_ORDER, shipOrder);
  yield takeLatest(commonTypes.UPDATE_STATTUS_ORDER, updateStatusOrder);
  yield takeLatest(commonTypes.PRINT_LABEL, printLabel);
  yield takeLatest(commonTypes.SEND_MAIL_BOOKING, sendMailBooking);
  yield takeLatest(commonTypes.GET_PAYMENT_METHOD, getPaymentMethod);
  yield takeLatest(commonTypes.GET_RECEIVING_METHOD, getReceivingMethod);

  yield takeLatest(commonTypes.UPDATE_ADDRESS_ORDER, updateAddressOrder);
  yield takeLatest(commonTypes.CANCEL_ORDER_DELIVERY, cancelOrderDelivery);
  yield takeLatest(commonTypes.PUSH_NOTIFY, pushNotify);
  yield takeLatest(commonTypes.VIEW_NUMEROLOGIES, viewNumerologies);
  yield takeLatest(commonTypes.GET_NUMEROLOGIES, getNumerologies);
  yield takeLatest(commonTypes.UPDATE_NUMEROLOGIES, updateNumerologies);
  yield takeLatest(commonTypes.HISTORY_NUMEROLOGIES, historyNumerologies);
  yield takeLatest(commonTypes.GET_DESTINY, getDestiny);
  yield takeLatest(commonTypes.GET_LIST_DISCOUNT, getListDiscount);
  yield takeLatest(commonTypes.DELETE_DISCOUNT, deleteDiscount);
  yield takeLatest(commonTypes.CREATE_DISCOUNT, createDiscount);
  yield takeLatest(commonTypes.GET_TYPE_DISCOUNT, getTypeDiscount);
  yield takeLatest(commonTypes.GET_TYPE_COST, getTypeCost);
  yield takeLatest(commonTypes.SAVE_COST, saveCost);
  yield takeLatest(commonTypes.GET_LIST_COST, getListCost);
  yield takeLatest(commonTypes.GET_FORM_MAILS, getFormMails);
  yield takeLatest(commonTypes.GET_LIST_GROUP_PRODUCT, getListGroupProduct);
};
export default watcher();
