import {call, takeLatest, takeEvery, put} from 'redux-saga/effects';
import {managerApi} from '~services';
import {managerTypes} from '~redux/reducers';
import {ExtensionProductImageUpload} from '../../../constants';
import {managerActions} from '../../reducers';

// lấy danh sách người mua
const getListBuyer = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListBuyer');
  try {
    const variables = yield {
      loai: params?.loai,
      idcuahang: params?.idcuahang,
      idvaitro: params?.idvaitro,
      sotrang: params?.sotrang,
      soitem: params?.soitem,
      chuoitimkiem: params?.chuoitimkiem,
    };
    const res = yield call(managerApi?.getListBuyer, variables);
    if (res.success) {
      const result = res?.data;
      if (result[0]?.success == '00') {
        onError();
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
//Update số lượng sản phẩm
const entryProductInventory = function* ({
  payload: {params, onSuccess, onError},
}) {
  try {
    const variables = yield {
      soLuong: params?.soLuong,
      idSanPham: params?.idSanPham,
      userId: params?.userId,
    };

    const res = yield call(managerApi?.entryProductInventory, variables);
    if (res.success) {
      const result = res?.data;
      if (result.statusCodes !== 200) {
        yield onError({message: result.message});
      }
      // yield put(reportActions.setReportDate(result?.metadata || result));
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
// thêm người mua
const addBuyer = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga addBuyer');
  try {
    const variables = yield {
      danhxung: params?.danhxung,
      ho: params?.ho,
      ten: params?.ten,
      dienthoai: params?.dienthoai,
      diachi: params?.diachi,
      thanhpho: params?.thanhpho,
      mabang: params?.mabang,
      maquocgia: params?.maquocgia,
      tenquocgia: params?.tenquocgia,
      tenbang: params?.tenbang,
      tenquan: params?.tenquan,
      email: params?.email,
      ngaysinh: params?.ngaysinh,
      gioitinh: params?.gioitinh,
      ghichu: params?.ghichu,
      dsmoiquanhe: params?.dsmoiquanhe,
    };
    const res = yield call(managerApi?.addBuyer, variables);
    if (res.success) {
      const result = res?.data[0];
      if (result?.success == '01') {
        onSuccess(result);
      } else if (result?.success == '02') {
        yield onSuccess(result);
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
// Lấy danh sách mối quan hệ người mua
const getRelationBuyer = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getRelationBuyer');
  try {
    const variables = yield {
      idkhachhang: params?.idkhachhang,
    };
    const res = yield call(managerApi?.getRelationBuyer, variables);
    if (res.success) {
      const result = res?.data;
      if (result.length > 0 && result[0]?.success === '01') onSuccess(result);
      else {
        onError();
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};
// cập nhật thông tin người mua
const updateBuyer = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga updateBuyer');
  try {
    const variables = yield {
      loai: params?.loai,
      idkhachhang: params?.idkhachhang,
      danhxung: params?.danhxung,
      ho: params?.ho,
      ten: params?.ten,
      dienthoai: params?.dienthoai,
      diachi: params?.diachi,
      thanhpho: params?.thanhpho,
      mabang: params?.mabang,
      maquocgia: params?.maquocgia,
      tenquocgia: params?.tenquocgia,
      tenbang: params?.tenbang,
      tenquan: params?.tenquan,
      email: params?.email,
      ngaysinh: params?.ngaysinh,
      gioitinh: params?.gioitinh,
      ghichu: params?.ghichu,
      dsmoiquanhe: params?.dsmoiquanhe,
      idmoiquanhe: params?.idmoiquanhe,
    };
    const res = yield call(managerApi?.updateBuyer, variables);
    if (res.success) {
      const result = res?.data[0];
      if (result?.success == '01') {
        onSuccess(result);
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

// lấy danh sách nhân viên
const getListStaff = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListStaff');
  try {
    const variables = yield {
      idcuahang: params?.idcuahang,
    };
    const res = yield call(managerApi?.getListStaff, variables);
    if (res.success) {
      const result = res?.data;
      if (result.statusCodes === 200) {
        onSuccess(result?.metadata || []);
      } else {
        yield onError({message: result.message});
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const addStaff = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga addStaff');
  try {
    const variables = yield {
      idNguoiTao: params?.idNguoiTao,
      ho: params?.ho,
      ten: params?.ten,
      taiKhoan: params?.taiKhoan,
      soDienThoai: params?.soDienThoai,
      idCuaHang: params?.idCuaHang,
      ngaySinhNhat: params?.ngaySinhNhat,
      email: params?.email,
      cmnd: params?.cmnd,
      idvaitro: params?.idvaitro,
    };

    const res = yield call(managerApi?.addStaff, variables);

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

const updateInforStaff = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga addStaff');
  try {
    const variables = yield {
      idNguoiDung: params.idNguoiDung,
      ho: params?.ho,
      ten: params?.ten,
      taiKhoan: params?.taiKhoan,
      soDienThoai: params?.soDienThoai,
      idCuaHang: params?.idCuaHang,
      ngaySinhNhat: params?.ngaySinhNhat,
      email: params?.email,
      cmnd: params?.cmnd,
      idvaitro: params?.idvaitro,
    };
    console.log(variables);

    const res = yield call(managerApi?.updateInforStaff, variables);

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

const changePass = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga changePass');
  try {
    const variables = yield {
      taiKhoanReset: params?.taiKhoanReset,
      idNguoiTao: params?.idNguoiTao,
      isAutoSendEmail: params?.isAutoSendEmail,
    };

    const res = yield call(managerApi?.changePass, variables);

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

// cập nhật danh sách nhân viên
const updateStaff = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga updateStaff');
  try {
    let variables = {};

    if (params?.loai === 91) {
      variables = {
        loai: params?.loai,
        matkhaumoi: params?.matkhaumoi,
        idnguoidung: params?.idnguoidung,
      };
    } else if (params?.loai === 8) {
      variables = {
        loai: params?.loai,
        idnguoidung: params?.idnguoidung,
        islock: params?.islock,
      };
    } else {
      variables = {
        loai: params?.loai,
        ho: params?.ho,
        ten: params?.ten,
        taikhoan: params?.taikhoan,
        dienthoai: params?.dienthoai,
        email: params?.email,
        cmnd: params?.cmnd,
        ngaysinhnhat: params?.ngaysinhnhat,
        idvaitro: params?.idvaitro,
        idcuahang: params?.idcuahang,
        idnguoidung: params?.idnguoidung,
      };
    }

    const res = yield call(managerApi?.updateStaff, variables);

    if (res.success) {
      const result = res?.data;

      if (result[0]?.success === '01') {
        onSuccess(result);
      } else {
        const err = result[0]?.msgErr;
        onError(err);
      }
    } else {
      // Thông báo lỗi từ API trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

// Lấy danh sách sản phẩm cho chức năng quản lý
const getListProductManager = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga getListProductManager');
  try {
    const variables = yield {
      loai: params?.loai,
      idcuahang: params?.idcuahang,
      idvaitro: params?.idvaitro,
      sotrang: params?.sotrang,
      soitem: params?.soitem,
      timkiem: params?.timkiem,
      soluongsanpham: params?.soluongsanpham,
    };
    const res = yield call(managerApi?.getListProductManager, variables);
    if (res.success) {
      const result = res?.data;
      if (result.length > 0 && result[0]?.success !== '00') {
        onSuccess(result);
      } else {
        yield onError();
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError();
  }
};

// Lấy danh sách đơn vị tính của sản phẩm
const getUnitProduct = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getUnitProduct');
  try {
    const variables = yield {
      loai: params?.loai,
    };
    const res = yield call(managerApi?.getUnitProduct, variables);
    if (res.success) {
      const result = res?.data;
      if (result.length > 0) {
        yield put(managerActions.setUnitProduct(result));
        yield onSuccess();
      } else {
        yield onError({message: res?.data?.message});
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

// Lấy danh sách thời gian bảo hành sản phẩm
const getGuaranteeProduct = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga getGuaranteeProduct');
  try {
    const variables = yield {
      loai: params?.loai,
    };
    const res = yield call(managerApi?.getGuaranteeProduct, variables);
    if (res.success) {
      const result = res?.data;
      if (result.length > 0) {
        yield put(managerActions?.setGuaranteeProduct(result));
        yield onSuccess();
      } else {
        yield onError({message: res?.data?.message});
      }
    } else {
      // thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const addStore = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga addStore');
  try {
    const formData = new FormData();
    formData.append('capDoCuaHang', params?.capDoCuaHang);
    formData.append('idCuaHangCha', params?.idCuaHangCha);
    formData.append('maCuaHang', params?.maCuaHang);
    formData.append('tenCuaHang', params?.tenCuaHang);
    formData.append('diaChiCuaHang', params?.diaChiCuaHang);
    formData.append('dienThoaiCuaHang', params?.dienThoaiCuaHang);
    formData.append('diaChiWebCuaHang', params?.diaChiWebCuaHang);
    formData.append('emailCuaHang', params?.emailCuaHang);
    formData.append('tenNguoiDaiDienCuaHang', params?.tenNguoiDaiDienCuaHang);
    formData.append('maQuocGia', params?.maQuocGia);
    formData.append('maBang', params?.maBang);
    formData.append('thanhPho', params?.thanhPho);
    formData.append('tenQuocGia', params?.tenQuocGia);
    formData.append('tenBang', params?.tenBang);
    formData.append('tenQuan', params?.tenQuan);
    formData.append('fileType', params?.fileType);

    // Kiểm tra và thêm ảnh (nếu có)
    if (params?.image) {
      formData.append('image', {
        uri: params.image,
        type: params.fileType || 'image/jpeg',
        name: params?.tenCuaHang,
      });
    }

    // Gọi API với formData thay vì object variables
    const res = yield call(managerApi?.addStore, formData);

    if (res.success) {
      const result = res?.data;
      onSuccess(result);
    } else {
      // Thông báo lỗi từ API trả về
      onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};

const updateStore = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga updateStore');
  try {
    const formData = new FormData();
    formData.append('capDoCuaHang', params?.capDoCuaHang);
    formData.append('idCuaHangCha', params?.idCuaHangCha);
    formData.append('maCuaHang', params?.maCuaHang);
    formData.append('tenCuaHang', params?.tenCuaHang);
    formData.append('diaChiCuaHang', params?.diaChiCuaHang);
    formData.append('dienThoaiCuaHang', params?.dienThoaiCuaHang);
    formData.append('diaChiWebCuaHang', params?.diaChiWebCuaHang);
    formData.append('emailCuaHang', params?.emailCuaHang);
    formData.append('tenNguoiDaiDienCuaHang', params?.tenNguoiDaiDienCuaHang);
    formData.append('maQuocGia', params?.maQuocGia);
    formData.append('maBang', params?.maBang);
    formData.append('thanhPho', params?.thanhPho);
    formData.append('tenQuocGia', params?.tenQuocGia);
    formData.append('tenBang', params?.tenBang);
    formData.append('tenQuan', params?.tenQuan);
    formData.append('idCuaHang', params?.idCuaHang);
    formData.append('fileType', params?.fileType);

    // Kiểm tra và thêm ảnh (nếu có)
    if (params?.image) {
      formData.append('image', {
        uri: params.image,
        type: params.fileType,
        name: params?.tenCuaHang,
      });
    } else {
      formData.append('image', params?.image);
    }
    console.log(formData);

    // Gọi API với formData thay vì object variables
    const res = yield call(managerApi?.updateStore, formData);

    if (res.success) {
      const result = res?.data;
      onSuccess(result);
    } else {
      // Thông báo lỗi từ API trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
};
const deleteStore = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga deleteStore');
  try {
    const variables = yield {id: params?.id};
    const res = yield call(managerApi?.deleteStore, variables);

    if (res.success) {
      const result = res?.data;
      if (result.metadata) {
        onSuccess(result);
      } else {
        onError(result);
      }
    } else {
      //thông báo lỗi từ api trả về
      onError(res);
    }
  } catch (err) {
    yield onError(err);
  }
};

// Xoa sản phẩm trong chức năng quản lý
const deleteProductManager = function* ({
  payload: {params, onSuccess, onError},
}) {
  yield console.log('call saga deleteProductManager');
  try {
    const variables = yield {
      idsanpham: params?.idsanpham,
    };
    const res = yield call(managerApi?.deleteProductManager, variables);
    if (res.success) {
      const result = res?.data[0];

      if (result?.success === '01' || result?.success === '00') onSuccess();
      else {
        yield onError({message: result?.msgErr});
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError('Lỗi chưa xác định');
  }
};

// get data time sheet
const getTimeSheet = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getTimeSheet');
  try {
    const variables = yield {
      idnguoidung: params?.idnguoidung,
      thang: params?.thang,
      nam: params?.nam,
    };
    const res = yield call(managerApi?.getTimeSheet, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success == '01') onSuccess(result?.data);
      else {
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

// get data time sheet
const getStatementChecks = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getStatementChecks');
  try {
    const variables = yield {
      thang: params?.thang,
      nam: params?.nam,
    };
    const res = yield call(managerApi?.getStatementChecks, variables);
    if (res.success) {
      const result = res?.data;
      if (result?.success === '01') onSuccess(result?.data);
      else {
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

function* managerPointChecks({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga managerPointChecks');
  try {
    const variables = yield {
      loai: params?.loai,
      IDDiaDiem: params?.IDDiaDiem,
      tendiadiem: params?.tendiadiem,
      diachi: params?.diachi,
      macheck: params?.macheck,
      latitude: params?.latitude.toString(),
      longitude: params?.longitude.toString(),
    };
    const res = yield call(managerApi?.managerPointChecks, variables);

    if (res.success) {
      const result = res?.data;
      if (result[0].success == '01') {
        if (onSuccess) onSuccess(result);
      } else if (result[0].success == '02') {
        yield onError(result[0]?.message);
      } else {
        yield onError(result[0]?.message);
      }
    } else {
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
}

function* getListPointCheck({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga getListPointCheck');
  const variables = yield {
    loai: params?.loai,
  };
  const res = yield call(managerApi?.getListPointCheck, variables);
  try {
    if (res.success) {
      if (onSuccess) onSuccess(res?.data);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
}

const createListLabel = function* ({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga createListLabel');
  try {
    const variables = yield {
      idNhanVien: params?.idNhanVien,
      idCuaHang: params?.idCuaHang,
      danhSachInNhan: params?.danhSachInNhan,
    };

    const res = yield call(managerApi?.createListLabel, variables);

    if (res.success) {
      const result = res?.data;
      if (result.statusCodes !== 200) {
        yield onError(result);
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

function* addInforProduct({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga addInforProduct');
  const variables = yield {
    tensanpham: params?.tensanpham,
    soluong: params?.soluong,
    trigia: params?.trigia,
    giaban: params?.giaban,
    giatritiente: params?.giatritiente,
    giamgia: params?.giamgia,
    mota: params?.mota ?? '',
    motangan: params?.motangan ?? '',
    iddonvitinh: params?.iddonvitinh,
    idcuahang: params?.idcuahang,
    khoiluong: params?.khoiluong,
    dai: params?.dai,
    rong: params?.rong,
    cao: params?.cao,
    sanphamtructuyen: params?.sanphamtructuyen,
    thoigianbaohanh: params?.thoigianbaohanh,
    idnguoidung: params?.idnguoidung,
  };
  const res = yield call(managerApi?.addInforProduct, variables);
  try {
    if (res.success) {
      if (onSuccess) onSuccess(res?.data);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
}

function* updateInforProduct({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga updateInforProduct');
  const variables = yield {
    idSanPham: params?.idSanPham,
    tensanpham: params?.tensanpham,
    soluong: params?.soluong,
    trigia: params?.trigia,
    giaban: params?.giaban,
    giatritiente: params?.giatritiente,
    giamgia: params?.giamgia,
    mota: params?.mota ?? '',
    motangan: params?.motangan ?? '',
    iddonvitinh: params?.iddonvitinh,
    idcuahang: params?.idcuahang,
    khoiluong: params?.khoiluong,
    dai: params?.dai,
    rong: params?.rong,
    cao: params?.cao,
    sanphamtructuyen: params?.sanphamtructuyen,
    thoigianbaohanh: params?.thoigianbaohanh,
    idnguoidung: params?.idnguoidung,
  };

  const res = yield call(managerApi?.updateInforProduct, variables);

  try {
    if (res.success) {
      const result = res?.data;

      if (result?.statusCodes === 200) {
        onSuccess(result?.metadata);
      } else {
        yield onError({message: result.message});
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
}

function* updateProductGroup({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga updateProductGroup');
  const variables = yield {
    idSanPham: params?.idSanPham,
    idsNhomSanPham: params?.idsNhomSanPham,
  };
  const res = yield call(managerApi?.updateProductGroup, variables);

  try {
    if (res.success) {
      if (onSuccess) onSuccess(res?.data);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
}

function* pushProductLikes({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga pushProductLikes');
  const variables = yield {
    idSanPham: params?.idSanPham,
    idNguoidung: params?.idNguoidung,
    soLuot: params?.soLuot,
    ngayKetThuc: params?.ngayKetThuc,
    ngayBatDau: params?.ngayBatDau,
  };
  const res = yield call(managerApi?.pushProductLikes, variables);

  try {
    if (res.success) {
      const result = res?.data;
      if (result.statusCodes === 200) {
        onSuccess(result?.metadata || []);
      } else {
        yield onError({message: result.message});
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
}

function* updateImageProduct({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga updateImageProduct');

  const formData = new FormData();
  formData.append('folder', 'products');
  formData.append('productId', params?.productId);
  formData.append('shortDescription', params?.shortDescription);

  if (params?.images.length > 0) {
    params.images.forEach(item => {
      if (item?.file) {
        const fileObject = {
          uri: item.file.uri,
          type: item.file.type,
          name: item.file.name,
        };
        formData.append('filesUpdated', fileObject, item.file.name);
      }
    });
  } else {
    formData.append('filesUpdated', '');
  }

  const res = yield call(managerApi?.updateImageProduct, formData);

  try {
    if (res.success) {
      if (onSuccess) onSuccess(res?.data);
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
}

function* blockCustomer({payload: {params, onSuccess, onError}}) {
  yield console.log('call saga blockCustomer');
  const variables = yield {
    idKhachHang: params?.idKhachHang,
    isLock: params?.isLock,
  };

  const res = yield call(managerApi?.blockCustomer, variables);

  try {
    if (res.success) {
      const result = res?.data;
      if (result?.statusCodes === 200) {
        onSuccess(result?.metadata);
      } else {
        yield onError({message: result.message});
      }
    } else {
      //thông báo lỗi từ api trả về
      yield onError(res?.error);
    }
  } catch (err) {
    yield onError(err);
  }
}

const watcher = function* () {
  yield takeLatest(managerTypes.GET_LIST_BUYER, getListBuyer);
  yield takeLatest(managerTypes.ADD_BUYER, addBuyer);
  yield takeLatest(managerTypes.PRODUCT_INVENTORY_ENTRY, entryProductInventory);
  yield takeLatest(managerTypes.GET_RELATION_BUYER, getRelationBuyer);
  yield takeLatest(managerTypes.UPDATE_BUYER, updateBuyer);
  yield takeLatest(managerTypes.GET_LIST_STAFF, getListStaff);
  yield takeLatest(managerTypes.ADD_STAFF, addStaff);
  yield takeLatest(managerTypes.UPDATE_INFOR_STAFF, updateInforStaff);
  yield takeLatest(managerTypes.CHANGE_PASS, changePass);
  yield takeLatest(managerTypes.UPDATE_STAFF, updateStaff);
  yield takeLatest(
    managerTypes.GET_LIST_PRODUCT_MANAGER,
    getListProductManager,
  );
  yield takeLatest(managerTypes.GET_UNIT_PRODUCT, getUnitProduct);
  yield takeLatest(managerTypes.GET_GUARANTEE_PRODUCT, getGuaranteeProduct);
  yield takeLatest(managerTypes.ADD_STORE, addStore);
  yield takeLatest(managerTypes.UPDATE_STORE, updateStore);
  yield takeLatest(managerTypes.DELETE_STORE, deleteStore);
  yield takeLatest(managerTypes.DELETE_PRODUCT_MANAGER, deleteProductManager);
  yield takeLatest(managerTypes.GET_TIME_SHEET, getTimeSheet);
  yield takeLatest(managerTypes.GET_STATEMENT_CHECKS, getStatementChecks);
  yield takeLatest(managerTypes.GET_LIST_POINT_CHECK, getListPointCheck);
  yield takeLatest(managerTypes.MANAGER_POINT_CHECKS, managerPointChecks);
  yield takeLatest(managerTypes.CREATE_LIST_LABEL, createListLabel);
  yield takeLatest(managerTypes.ADD_INFOR_PRODUCT, addInforProduct);
  yield takeLatest(managerTypes.UPDATE_INFOR_PRODUCT, updateInforProduct);
  yield takeLatest(managerTypes.UPDATE_PRODUCT_GROUP, updateProductGroup);
  yield takeLatest(managerTypes.UPDATE_IMAGE_PRODUCT, updateImageProduct);
  yield takeLatest(managerTypes.PUSH_PRODUCT_LIKES, pushProductLikes);
  yield takeLatest(managerTypes.BLOCK_CUSTOMER, blockCustomer);
};
export default watcher();
