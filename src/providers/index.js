import Toast from 'react-native-toast-message';
import {
  commonActions,
  managerActions,
  paymentActions,
  reportActions,
  userActions,
  notifiActions,
  salesActions,
} from '~redux/reducers';
import LocalDB from '~data/asyncStorage';
import {handleErrorResponse} from '~helper/utils';

const fetchData = async (
  dispatch,
  actionType,
  params = {},
  callback = () => {},
) => {
  let dataUser = null;

  // Hàm khởi tạo dữ liệu người dùng
  const initializeUserData = async () => {
    try {
      dataUser = await LocalDB.getUserData();
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng: ', error);
    }
  };

  // Gọi hàm khởi tạo dữ liệu
  await initializeUserData();

  await dispatch(commonActions.toggleLoading(true));
  // Tạo payload chung
  const payload = {
    params: {
      ...params,
    },
    onSuccess: async data => {
      callback({success: true, data: data});
      await dispatch(commonActions.toggleLoading(false));
    },
    onError: async error => {
      callback({success: false});
      error?.message &&
        Toast.show({
          type: 'error',
          props: handleErrorResponse(error, error?.message || ''),
        });
      await dispatch(commonActions.toggleLoading(false));
    },
  };

  // Xử lý hành động dựa trên actionType
  switch (actionType) {
    // sell action
    case 'getListCountries':
      payload.params.loai = 'quocgia';
      dispatch(commonActions.getListCountries(payload));
      break;
    case 'getListCities':
      payload.params.loai = 'bang';
      dispatch(commonActions.getListCities(payload));
      break;
    case 'getListZipCode':
      payload.params.loai = 'zipcode';
      dispatch(commonActions.getListZipCode(payload));
      break;
    case 'findProduct':
      payload.params = {
        ...payload.params,
        loai: 5,
        sotrang: 1,
        soitem: 1,
        idcuahang: dataUser?.UserInfo?.IDCuaHang,
        idvaitro: dataUser?.UserInfo?.IDVaiTro,
      };
      dispatch(commonActions.findProduct(payload));
      break;
    case 'findOrder':
      payload.params = {
        ...payload.params,
        idnguoidung: dataUser?.UserInfo?.IDNguoiDung,
        idcuahang: dataUser?.UserInfo?.IDCuaHang,
      };
      dispatch(commonActions.findOrder(payload));
      break;
    case 'findCustomerManager':
      payload.params = {
        ...payload.params,
        loai: 4,
        idnguoidung: dataUser?.UserInfo?.IDNguoiDung,
        idcuahang: dataUser?.UserInfo?.IDCuaHang,
        sotrang: params.numberPage || 1,
        soitem: params.numberItem || 1,
      };
      dispatch(commonActions.findCustomer(payload));
      break;
    case 'findCustomerSell':
      payload.params = {
        ...payload.params,
        loai: 23,
      };
      dispatch(commonActions.findCustomer(payload));
      break;
    case 'getDataWareHouse':
      payload.params = {
        ...payload.params,
        idcuahang: dataUser?.UserInfo?.IDCuaHang,
        idvaitro: dataUser?.UserInfo?.IDVaiTro,
        sotrang: params.numberPage,
        soitem: 10,
      };
      dispatch(commonActions.getListProduct(payload));
      break;
    case 'getProductManager':
      payload.params = {
        ...payload.params,
        idcuahang: dataUser?.UserInfo?.IDCuaHang,
        idvaitro: dataUser?.UserInfo?.IDVaiTro,
        sotrang: params.numberPage,
        soitem: 10,
      };
      dispatch(managerActions.getListProductManager(payload));
      break;
    case 'getRelationBuyer':
      dispatch(managerActions.getRelationBuyer(payload));
      break;
    case 'getExtraService':
      payload.params = {
        ...payload.params,
      };
      dispatch(commonActions.getExtraService(payload));
      break;
    case 'addBuyer':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.addBuyer(payload));
      break;
    case 'entryProductInventory':
      payload.params = {
        ...payload.params,
        userId: dataUser?.UserInfo?.IDNguoiDung,
      };
      dispatch(managerActions.entryProductInventory(payload));
      break;
    case 'updateBuyer':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.updateBuyer(payload));
      break;
    case 'deleteRelationBuyer':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.updateBuyer(payload));
      break;
    case 'getRelationBuyer':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.getRelationBuyer(payload));
      break;
    case 'getPaymentMethod':
      payload.params = {
        ...payload.params,
      };
      dispatch(commonActions.getPaymentMethod(payload));
      break;
    case 'getReceivingMethod':
      payload.params = {
        ...payload.params,
      };
      dispatch(commonActions.getReceivingMethod(payload));
      break;
    case 'getTransporter':
      payload.params = {
        ...payload.params,
      };
      dispatch(commonActions.getTransporter(payload));
      break;
    case 'getFeeShip':
      payload.params = {
        ...payload.params,
      };
      dispatch(commonActions.getFeeShip(payload));
      break;
    case 'checkDiscountCode':
      payload.params = {
        ...payload.params,
      };
      dispatch(commonActions.checkDiscountCode(payload));
      break;
    case 'createOrder':
      payload.params = {
        ...payload.params,
        donhanglienhe: 2,
        idnguoithuchien: dataUser?.UserInfo?.IDNguoiDung,
        ghichudichvucongthem: '',
      };
      dispatch(commonActions.createOrder(payload));
      break;
    case 'updateOrder':
      payload.params = {
        ...payload.params,
        donhanglienhe: 2,
        idnguoithuchien: dataUser?.UserInfo?.IDNguoiDung,
        ghichudichvucongthem: '',
      };
      dispatch(commonActions.updateOrder(payload));
      break;
    // payment action
    case 'createPaymentLinkMomo':
      payload.params = {
        ...payload.params,
      };
      dispatch(paymentActions.createPaymentLinkMomo(payload));
      break;
    case 'createPaymentLinkVnpay':
      payload.params = {
        ...payload.params,
      };
      dispatch(paymentActions.createPaymentLinkVnpay(payload));
      break;
    // print
    case 'getDetailOrder':
      payload.params = {
        ...payload.params,
        idcuahang: dataUser?.UserInfo?.IDCuaHang,
      };
      dispatch(commonActions.getDetailOrder(payload));
      break;
    case 'printLabel':
      payload.params = {
        ...payload.params,
      };
      dispatch(commonActions.printLabel(payload));
      break;
    // Checkin
    case 'managerPointChecks':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.managerPointChecks(payload));
      break;
    case 'getListPointCheck':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.getListPointCheck(payload));
      break;
    case 'getStatementChecks':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.getStatementChecks(payload));
      break;
    case 'getTimeSheet':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.getTimeSheet(payload));
      break;
    case 'checkDistance':
      payload.params = {
        ...payload.params,
      };
      dispatch(userActions.checkDistance(payload));
      break;
    case 'confirmCheck':
      payload.params = {
        ...payload.params,
      };
      dispatch(userActions.confirmCheck(payload));
      break;
    // manage action
    case 'getListBuyer':
      payload.params = {
        ...payload.params,
        idcuahang: dataUser?.UserInfo?.IDCuaHang,
        idvaitro: dataUser?.UserInfo?.IDVaiTro,
      };
      dispatch(managerActions.getListBuyer(payload));
      break;
    case 'getRelationBuyer':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.getRelationBuyer(payload));
      break;
    case 'updateBuyer':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.updateBuyer(payload));
      break;
    case 'updateStatusOrder':
      payload.params = {
        ...payload.params,
        IdNguoiPheDuyet: dataUser?.UserInfo?.IDNguoiDung,
        IdNguoiThucHien: dataUser?.UserInfo?.IDNguoiDung,
      };
      dispatch(commonActions.updateStatusOrder(payload));
      break;
    case 'updateAddressOrder':
      payload.params = {
        ...payload.params,
      };
      dispatch(commonActions.updateAddressOrder(payload));
      break;
    case 'shipOrder':
      payload.params = {
        ...payload.params,
        idnguoidung: dataUser?.UserInfo?.IDNguoiDung,
        idcuahang: dataUser?.UserInfo?.IDCuaHang,
      };
      dispatch(commonActions.shipOrder(payload));
      break;
    case 'getUnitProduct':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.getUnitProduct(payload));
      break;
    case 'getGuaranteeProduct':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.getGuaranteeProduct(payload));
      break;
    case 'createDraftOrder':
      payload.params = {
        ...payload.params,
        IdNguoiTaoDon: dataUser?.UserInfo?.IDNguoiDung,
        IdCuaHang: dataUser?.UserInfo?.IDCuaHang,
      };
      dispatch(salesActions.createDraftOrder(payload));
      break;
    case 'updateDraftOrder':
      payload.params = {
        ...payload.params,
        IdNguoiTaoDon: dataUser?.UserInfo?.IDNguoiDung,
        IdCuaHang: dataUser?.UserInfo?.IDCuaHang,
      };
      dispatch(salesActions.updateDraftOrder(payload));
      break;
    case 'deleteDraftOrder':
      payload.params = {
        ...payload.params,
      };
      dispatch(salesActions.deleteDraftOrder(payload));
      break;
    case 'getDraftOrders':
      payload.params = {
        ...payload.params,
        employeeId: dataUser?.UserInfo?.IDNguoiDung,
        storeId: dataUser?.UserInfo?.IDCuaHang,
      };
      dispatch(salesActions.getDraftOrders(payload));
      break;
    case 'createListLabel':
      payload.params = {
        ...payload.params,
        idNhanVien: dataUser?.UserInfo?.IDNguoiDung,
        idCuaHang: dataUser?.UserInfo?.IDCuaHang,
      };
      dispatch(managerActions.createListLabel(payload));
      break;
    // report action
    case 'getReportDate':
      payload.params = {
        idNguoiDung: dataUser?.UserInfo?.IDNguoiDung,
        tuNgay: params?.tuNgay,
        denNgay: params?.denNgay,
        storeId:
          dataUser?.UserInfo?.IDVaiTro !== 1 &&
          dataUser?.UserInfo?.IDVaiTro !== 6
            ? dataUser?.UserInfo?.IDCuaHang
            : params?.storeId,
      };
      dispatch(reportActions.getReportDate(payload));
      break;
    case 'getReportFeeByDate':
      payload.params = {
        idNguoiDung: dataUser?.UserInfo?.IDNguoiDung,
        tuNgay: params?.tuNgay,
        denNgay: params?.denNgay,
        storeId:
          dataUser?.UserInfo?.IDVaiTro !== 1 &&
          dataUser?.UserInfo?.IDVaiTro !== 6
            ? dataUser?.UserInfo?.IDCuaHang
            : params?.storeId,
      };
      dispatch(reportActions.getReportFeeByDate(payload));
      break;
    case 'getReportWareHouseByDate':
      // dataUser?.UserInfo?.IDCuaHang
      payload.params = {
        idNguoiDung: dataUser?.UserInfo?.IDNguoiDung,
        tuNgay: params?.tuNgay,
        denNgay: params?.denNgay,
        storeId:
          dataUser?.UserInfo?.IDVaiTro !== 1 &&
          dataUser?.UserInfo?.IDVaiTro !== 6
            ? dataUser?.UserInfo?.IDCuaHang
            : params?.storeId,
      };

      dispatch(reportActions.getReportWareHouseByDate(payload));
      break;
    case 'getReportWareHouseDetailByTop':
      payload.params = {
        idNguoiDung: dataUser?.UserInfo?.IDNguoiDung,
        tuNgay: params?.tuNgay,
        denNgay: params?.denNgay,
        storeId:
          dataUser?.UserInfo?.IDVaiTro !== 1 &&
          dataUser?.UserInfo?.IDVaiTro !== 6
            ? dataUser?.UserInfo?.IDCuaHang
            : params?.storeId,
        top: params?.top,
      };
      dispatch(reportActions.getReportWareHouseDetailByTop(payload));
      break;
    case 'getReportRevenueByBirthday':
      payload.params = {
        idNguoiDung: dataUser?.UserInfo?.IDNguoiDung,
        top: params?.top,
        tuNgay: params?.tuNgay,
        denNgay: params?.denNgay,
        storeId: params?.storeId,
      };

      dispatch(reportActions.getReportRevenueByBirthday(payload));
      break;
    case 'getReportFavoriteProduct':
      payload.params = {
        idNguoiDung: dataUser?.UserInfo?.IDNguoiDung,
        tuNgay: params?.tuNgay,
        denNgay: params?.denNgay,
        storeId:
          dataUser?.UserInfo?.IDVaiTro !== 1 &&
          dataUser?.UserInfo?.IDVaiTro !== 6
            ? dataUser?.UserInfo?.IDCuaHang
            : params?.storeId,
        top: params?.top,
      };

      dispatch(reportActions.getReportFavoriteProduct(payload));
      break;
    case 'getReportOrderByDate':
      payload.params = {
        idNguoiDung: dataUser?.UserInfo?.IdNhanVien,
        tuNgay: params?.tuNgay,
        denNgay: params?.denNgay,
        storeId:
          dataUser?.UserInfo?.IDVaiTro !== 1 &&
          dataUser?.UserInfo?.IDVaiTro !== 6
            ? dataUser?.UserInfo?.IDCuaHang
            : params?.storeId,
      };
      dispatch(reportActions.getReportOrderByDate(payload));
      break;
    case 'getReportOrderTransportByDate':
      payload.params = {
        idNguoiDung: dataUser?.UserInfo?.IdNhanVien,
        tuNgay: params?.tuNgay,
        denNgay: params?.denNgay,
        storeId:
          dataUser?.UserInfo?.IDVaiTro !== 1 &&
          dataUser?.UserInfo?.IDVaiTro !== 6
            ? dataUser?.UserInfo?.IDCuaHang
            : params?.storeId,
        top: params?.top,
      };
      dispatch(reportActions.getReportOrderTransportByDate(payload));
      break;
    case 'getReportOrderAdressByDate':
      payload.params = {
        idNguoiDung: dataUser?.UserInfo?.IdNhanVien,
        tuNgay: params?.tuNgay,
        denNgay: params?.denNgay,
        storeId:
          dataUser?.UserInfo?.IDVaiTro !== 1 &&
          dataUser?.UserInfo?.IDVaiTro !== 6
            ? dataUser?.UserInfo?.IDCuaHang
            : params?.storeId,
        top: params?.top,
        quocGia: params?.quocGia,
        quanHuyen: params?.quanHuyen,
        trangThai: params?.trangThai,
        tinhThanh: params?.tinhThanh,
      };
      dispatch(reportActions.getReportOrderAdressByDate(payload));
      break;
    case 'getReportCompare':
      payload.params = {
        ...payload.params,
        idsCuaHang: `${dataUser?.UserInfo?.IDCuaHang}`,
      };
      dispatch(reportActions.getReportCompare(payload));
      break;
    case 'getListStore':
      payload.params = {
        loai: 21,
        idcuahang: dataUser?.UserInfo?.IDCuaHang,
        idvaitro: dataUser?.UserInfo?.IDVaiTro,
      };
      dispatch(commonActions.getListStore(payload));
      break;
    case 'getReportRevenueCustomerUsed':
      dispatch(reportActions.getReportRevenueCustomerUsed(payload));
      break;
    case 'getCustomerHasEmail':
      dispatch(reportActions.getCustomerHasEmail(payload));
      break;
    case 'sendNotifiToCustomer':
      payload.params = {
        title: params?.title,
        body: params?.body,
        idsKhachHang: params?.idsKhachHang,
      };
      dispatch(notifiActions.sendNotifiToCustomer(payload));
      break;
    case 'getListDiscount':
      payload.params = {
        loai: 61,
      };
      dispatch(commonActions.getListDiscount(payload));
      break;
    case 'deleteDiscount':
      payload.params = {
        loai: 71,
        magiamgias: params?.magiamgias,
      };
      dispatch(commonActions.deleteDiscount(payload));
      break;
    case 'getTypeDiscount':
      payload.params = {
        loai: 6,
      };
      dispatch(commonActions.getTypeDiscount(payload));
      break;
    case 'createDiscount':
      payload.params = {
        loai: 7,
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
      dispatch(commonActions.createDiscount(payload));
      break;
    case 'getListTempalteZaloOA':
      payload.params = {
        ...payload.params,
      };
      dispatch(notifiActions.getListTempalteZaloOA(payload));
      break;
    case 'getListOrderZaloOA':
      payload.params = {
        loai: params?.loai,
        maloaitinzalo: params?.maloaitinzalo,
        tungay: params?.tungay,
        denngay: params?.denngay,
        idcuahang: dataUser?.UserInfo?.IDCuaHang,
      };
      dispatch(commonActions.getListOrderZaloOA(payload));
      break;
    case 'getListOrder':
      payload.params = {
        ...payload.params,
        idcuahang: dataUser?.UserInfo?.IDCuaHang,
        idnguoidung: dataUser?.UserInfo?.IDNguoiDung,
      };
      dispatch(commonActions.getListOrder(payload));
      break;
    case 'sendMessageZaloOAMulti':
      payload.params = {
        loai: params?.loai,
        template_id: params?.template_id,
        listdonhang: params?.listdonhang,
        creator_id: dataUser?.UserInfo?.IDNguoiDung,
      };

      dispatch(notifiActions.sendMessageZaloOAMulti(payload));
      break;
    case 'sendMessageZaloOA':
      payload.params = {
        ...payload.params,
        creator_id: dataUser?.UserInfo?.IDNguoiDung,
      };
      dispatch(notifiActions.sendMessageZaloOA(payload));
      break;
    case 'postProductAmountApi':
      payload.params = {
        ...payload.params,
        idnguoidung: dataUser?.UserInfo?.IDNguoiDung,
      };
      dispatch(managerActions.actionUpdateProductAmount(payload));
      break;
    case 'getListStaff':
      payload.params = {
        idcuahang: dataUser?.UserInfo?.IDCuaHang,
      };
      dispatch(managerActions.getListStaff(payload));
      break;
    case 'changePass':
      payload.params = {
        taiKhoanReset: params?.taiKhoanReset,
        isAutoSendEmail: params?.isAutoSendEmail,
        idNguoiTao: dataUser?.UserInfo?.IdNhanVien,
      };
      dispatch(managerActions.changePass(payload));
      break;
    case 'forgotPassword':
      payload.params = {
        ...payload.params,
      };
      dispatch(userActions.forgotPassword(payload));
      break;
    case 'changePassword':
      payload.params = {
        ...payload.params,
        userId: dataUser?.UserInfo?.IDNguoiDung,
      };
      dispatch(userActions.changePassword(payload));
      break;
    case 'createUserAdmin':
      payload.params = {
        ...payload.params,
      };
      dispatch(userActions.createUserAdmin(payload));
      break;
    case 'addStaff':
      payload.params = {
        idNguoiTao: dataUser?.UserInfo?.IdNhanVien,
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
      dispatch(managerActions.addStaff(payload));
      break;
    case 'updateInforStaff':
      payload.params = {
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
      dispatch(managerActions.updateInforStaff(payload));
      break;
    case 'updateStaff':
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
      dispatch(managerActions.updateStaff(payload));
      break;
    case 'getListRole':
      payload.params = {
        loai: 4,
        idvaitro: dataUser?.UserInfo?.IDVaiTro,
      };
      dispatch(commonActions.getListRole(payload));
      break;
    case 'deleteProductManager':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.deleteProductManager(payload));
      break;
    case 'addProductManager':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.addProductManager(payload));
      break;
    case 'sendMailBooking':
      payload.params = {
        to: params?.to,
        title: params?.title,
        body: params?.body,
      };
      dispatch(commonActions.sendMailBooking(payload));
      break;
    case 'getInforStore':
      payload.params = {
        loai: params?.loai,
      };
      dispatch(commonActions.getInforStore(payload));
      break;
    case 'addStore':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.addStore(payload));
      break;
    case 'updateStore':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.updateStore(payload));
      break;
    case 'deleteStore':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.deleteStore(payload));
      break;
    // Cost
    case 'getTypeCost':
      payload.params = {
        ...payload.params,
      };
      dispatch(commonActions.getTypeCost(payload));
      break;
    case 'saveCost':
      payload.params = {
        ...payload.params,
        idnguoinhap: dataUser?.UserInfo?.IDNguoiDung,
      };
      dispatch(commonActions.saveCost(payload));
      break;
    case 'getListCost':
      payload.params = {
        ...payload.params,
      };
      dispatch(commonActions.getListCost(payload));
      break;
    case 'getFormMails':
      payload.params = {
        ...payload.params,
      };
      dispatch(commonActions.getFormMails(payload));
      break;
    case 'getListGroupProduct':
      payload.params = {
        ...payload.params,
      };
      dispatch(commonActions.getListGroupProduct(payload));
      break;
    case 'updateProductGroup':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.updateProductGroup(payload));
      break;
    case 'updateImageProduct':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.updateImageProduct(payload));
      break;
    case 'addInforProduct':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.addInforProduct(payload));
      break;
    case 'updateInforProduct':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.updateInforProduct(payload));
      break;
    case 'pushProductLikes':
      payload.params = {
        ...payload.params,
        idNguoidung: dataUser?.UserInfo?.IDNguoiDung,
      };
      dispatch(managerActions.pushProductLikes(payload));
      break;
    case 'blockCustomer':
      payload.params = {
        ...payload.params,
      };
      dispatch(managerActions.blockCustomer(payload));
      break;
    default:
      break;
  }
};

export default fetchData;
