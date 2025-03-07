import LocalDB from '~data/asyncStorage';

// create endpoint api
const apiOrder = `/api/Order/`;
const apiReport = `/api/v2/Report/`;
const apiProductWarehouse = `/api/v2/ProductWarehouse/`;
const apiCommon = `/api/Common/`;
const apiUploadImage = `/api/v2/`;
const apiCommonV2 = `/api/v2/Common/`;
const apiZalo = `/api/ZaloOA/`;
const apiCheck = `/api/Check/`;
const apiAuth = `/api/v2/Auth/Employee/`;
const apiNotifi = `/api/v2/PushNotificationV2/`;
const apiEmployee = `/api/v2/Employee/`;
const apiDraftOrder = `/api/v2/DraftOrder/`;
const apiPrintLabel = `/api/v2/Printer/Label/`;
const apiStore = `/api/v2/Store/`;
const apiAdmin = `/api/v2/Employee/`;
const apiGroup = `/api/v2/nhomSanPham/`;
const apiCustomer = `/api/v2/customer/`;

const postUrl = {
  loginUser: `${apiAuth}Login`,
  forgotPassword: `${apiAuth}ForgotPassword`,
  changePassword: `${apiAuth}ChangePassword`,
  createUserAdmin: `${apiAdmin}ThemNhanVien`,
  findOrder: `${apiOrder}TimKiemDonHang`,
  findProduct: `${apiCommon}GetSanPham`,
  findCustomer: `${apiCommon}GetThongTinKhachHang`,
  getListDiscount: `${apiCommon}GetSanPham`,
  deleteDiscount: `${apiCommon}GetSanPham`,
  createDiscount: `${apiCommon}GetSanPham`,
  getTypeDiscount: `${apiCommon}GetThongTinCuaHang`,
  getListOrderZaloOA: `${apiCommon}GetThongTinDonHang`,
  getFormMails: `${apiCommon}GetThongTinCuaHang`,

  blockCustomer: `${apiCustomer}status`,
  addStore: `${apiStore}Create`,
  updateStore: `${apiStore}Update`,
  deleteStore: `${apiStore}Delete`,
  sendNotifiToCustomer: `${apiNotifi}GuiThongBaoDenKhachHangQuaAppToken`,
  getStoreInformation: `${apiCommon}GetThongTinCuaHang`,
  getInformationUser: `${apiCommon}GetThongTinKhachHang`,
  getReportDate: `${apiReport}BaoCaoDoanhThuTheoNgay`,
  getReportFee: `${apiReport}BaoCaoChiPhi`,
  getReportFeeByDate: `${apiReport}BaoCaoChiPhiCuaHangTheoNgay`,
  getReportWareHouseByDate: `${apiReport}BaoCaoKhoHangTheoNgay`,
  getReportWareHouseDetailByTop: `${apiReport}BaoCaoKhoHangTheoNgayChiTietTheoTop`,
  getReportRevenueByBirthday: `${apiReport}BaoCaoDoanhThuKhachHangCoSinhNhatTrongKhoangThoiGian`,
  getReportFavoriteProduct: `${apiReport}BaoCaoSanPhamYeuThich`,
  getReportRevenueCustomerUsed: `${apiReport}BaoCaoDoanhThuKhachHangSuDungUngDung`,
  getReportOrderByDate: `${apiReport}BaoCaoDonHangTheoNgay`,
  getReportOrderTransportByDate: `${apiReport}BaoCaoChiTietDonHangVanChuyenTheoNgay`,
  getReportOrderAdressByDate: `${apiReport}BaoCaoChiTietDonHangDiaChiTheoNgay`,
  getReportCompare: `${apiReport}BaoCaoThamChieu`,
  getCustomerHasEmail: `${apiReport}BaoCaoDoanhThuKhachHangCoEmail`,
  getListStore: `${apiCommon}GetThongTinCuaHang`,
  getInforStore: `${apiCommon}GetThongTinCuaHang`,
  getListRole: `${apiCommon}GetThongTinCuaHang`,
  getListCustomer: `${apiCommon}GetThongTinKhachHang`,
  getListProduct: `${apiCommon}GetSanPham`,
  getListGroupProduct: `${apiGroup}layTacCa`,
  getExtraService: `${apiOrder}GetDanhSachDichVuCongThem`,
  getListCountries: `${apiCommon}GetThongTinDiaChinh`,
  getListCities: `${apiCommon}GetThongTinDiaChinh`,
  getListZipCode: `${apiCommon}GetThongTinDiaChinh`,
  getTransporter: `${apiCommon}GetThongTinCuaHang`,
  checkDiscountCode: `${apiCommon}GetSanPham`,
  getFeeShip: `${apiCommon}TinhCuocVanChuyen`,
  createOrder: `${apiCommon}TaoDonHang`,
  getListOrder: `${apiCommon}GetThongTinDonHang`,
  getDetailOrder: `${apiCommon}GetThongTinDonHang`,
  cancelOrder: `${apiCommon}XuLyDonHang`,
  confirmOrderOnline: `${apiCommon}XuLyDonHang`,
  updateOrder: `${apiCommon}CapNhatDonHang`,
  shipOrder: `${apiOrder}GuiDonVanChuyen`,
  updateStatusOrder: `${apiCommon}XuLyDonHang`,
  printLabel: `${apiOrder}LayThongTinNhan`,
  getListBuyer: `${apiCommonV2}GetThongTinKhachHang`,
  addBuyer: `${apiCommon}ThemMoiKhachHang`,
  entryProductInventory: `${apiProductWarehouse}ImportAmountProduct`,
  updateProductGroup: `${apiProductWarehouse}UpdateProductGroup`,
  addInforProduct: `${apiProductWarehouse}them-thong-tin-san-pham`,
  updateInforProduct: `${apiProductWarehouse}cap-nhat-thong-tin-san-pham`,
  pushProductLikes: `${apiProductWarehouse}day-luot-thich-san-pham`,
  updateBuyer: `${apiCommon}CapNhatKhachHang`,
  // getListStaff: `${apiCommon}GetThongTinKhachHang`,
  getListStaff: `${apiEmployee}GetDanhSachNhanVien`,
  addStaff: `${apiEmployee}ThemNhanVien`,
  updateInforStaff: `${apiEmployee}CapNhatThongTinNhanVien`,
  changePass: `${apiEmployee}DatLaiMatKhau`,
  updateStaff: `${apiCommon}GetThongTinKhachHang`,
  getListProductManager: `${apiCommon}GetSanPham`,
  getUnitProduct: `${apiCommon}GetThongTinCuaHang`,
  getGuaranteeProduct: `${apiCommon}GetThongTinCuaHang`,
  updateImageProduct: `${apiUploadImage}ProductImage/Metadata/Update`,
  deleteProductManager: `${apiCommon}DeleteSanPham`,
  sendMailBooking: `${apiCommonV2}GuiEmail`,
  getPaymentMethod: `${apiCommon}GetThongTinCuaHang`,
  getReceivingMethod: `${apiCommon}GetThongTinCuaHang`,
  updateAddressOrder: `${apiOrder}CapNhatDiaChiGiaoHang`,
  cancelOrderDelivery: `${apiOrder}HuyDonGHTK`,
  pushNotify: `${apiCommon}GuiThongBao`,
  viewNumerologies: `${apiCommon}XemTuVi`,
  getNumerologies: `${apiCommon}GetTuVi`,
  historyNumerologies: `${apiCommon}LichSuXemTuVi`,
  getDestiny: `${apiCommon}XemCungMenh`,
  updateNumerologies: `${apiCommon}UpdateTuVi`,
  checkAccount: `${apiCommon}KiemTraTaiKhoan`,
  managerUserNumerologies: `${apiCommon}QuanLyUserNumerologies`,
  getListTempalteZaloOA: `${apiZalo}GetListTemplateZaloOA`,
  sendMessageZaloOA: `${apiZalo}SendMessageZaloOA`,
  sendMessageZaloOAMulti: `${apiZalo}SendMessageZaloOAMulti`,
  getRelationBuyer: `${apiCommon}GetMoiQuanHeKhachHang`,
  getTimeSheet: `${apiCheck}LichSuCheckInCheckOut`,
  getStatementChecks: `${apiCheck}ThongKeChamCong`,
  managerPointChecks: `${apiCheck}QuanLyDiaDiemCheck`,
  getListPointCheck: `${apiCheck}GetDanhSachDiaDiemCheck`,
  checkQR: `${apiCheck}CheckViTri`,
  confirmCheck: `${apiCheck}CheckInCheckOut`,
  updateProductAmountLink: `${apiCommonV2}NhapKhoSanPham`,
  createDraftOrder: `${apiDraftOrder}Create`,
  updateDraftOrder: `${apiDraftOrder}Update`,
  deleteDraftOrder: `${apiDraftOrder}Delete`,
  getDraftOrders: `${apiDraftOrder}GetByStoreIdAndEmployeeId`,
  createListLabel: `${apiPrintLabel}Create`,
  getTypeCost: `${apiCommon}GetThongTinCuaHang`,
  saveCost: `${apiCommonV2}BaoCaoThuChi`,
  getListCost: `${apiCommonV2}BaoCaoThuChi`,
};
const urlApp = {
  postUrl,
};

export default urlApp;

//API STATUS
export const SUCCESS = 200;
export const SUCCESS_POST = 201;
export const NO_CONTENT = 204;
export const INVALID_DATA = 202;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const NOT_FOUND = 404;
export const INTERNAL_SERVER_ERROR = 500;

export const TIME_OUT = 20000;
// export const TIME_OUT = 5000;
export const LIMIT_IMAGE_SIZE_UPLOAD = 1000000; // 1MB

export const limitSizeImage = 12 * 1024 * 1024; // 12mb
export const limitItems = 20;
// HTTP METHODS
export const POST = 'post';
export const GET = 'get';
export const PUT = 'put';
export const DELETE = 'delete';
export const errorStatusServer = [
  {code: 200, message: 'Success', i18: 'success'},
  {code: 201, message: 'Created', i18: 'created'},
  {code: 400, message: 'Bad Request', i18: 'badRequest'},
  {code: 401, message: 'Unauthorized', i18: 'unauthorized'},
  {code: 403, message: 'Forbidden', i18: 'forbidden'},
  {code: 404, message: 'Not Found', i18: 'notFound'},
  {code: 408, message: 'Time out', i18: 'timeOut'},
  {code: 499, message: 'Not found data', i18: 'notFoundData'},
  {code: 500, message: 'Internal Server Error', i18: 'internalServerError'},
  {code: 1000, message: 'Error Already Exists', i18: 'exists'},
  {code: 1001, message: 'Error Not Exists', i18: 'notExistsAccount'},
  {code: 1002, message: 'Error Account Wrong', i18: 'accountWrong'},
  {code: 1003, message: 'Error Password Wrong', i18: 'passwordWrong'},
  {code: 1004, message: 'Role Id Wrong', i18: 'roleWrong'},
  {code: 1005, message: 'Store Id Wrong', i18: 'storeWrong'},
  {code: 1006, message: 'Token Wrong', i18: 'tokenWrong'},
  {code: 1007, message: 'Refresh token Wrong', i18: 'refreshTokenWrong'},
  {code: 1008, message: 'Decode Wrong', i18: 'decodeWrong'},
  {code: 1009, message: 'Order Fail', i18: 'orderFail'},
  {code: 1010, message: 'Product Not Found', i18: 'productNotFound'},
  {code: 1011, message: 'Product Not Enough', i18: 'productNotEnough'},
  {code: 1012, message: 'Extra service Not Found', i18: 'extraServiceNotFound'},
  {
    code: 1013,
    message: 'Extra service detail Not Found',
    i18: 'extraServiceDetailNotFound',
  },
  {code: 1014, message: 'Customer Not Found', i18: 'customerNotFound'},
  {code: 1015, message: 'Customer Create Fail', i18: 'customerCreateFail'},
  {
    code: 1016,
    message: 'Customer Duplicate Key Or Unique Key Violation',
    i18: 'customerDuplicate',
  },
  {
    code: 1017,
    message: 'Get ZThongSoKetNoi Fail',
    i18: 'paramSystemConnectNotFound',
  },
  {
    code: 1018,
    message: 'Create Draft Order Failed',
    i18: 'createDraftOrderFailed',
  },
  {
    code: 1019,
    message: 'Update Draft Order Failed',
    i18: 'updateDraftOrderFailed',
  },
  {
    code: 1020,
    message: 'Delete Draft Order Failed',
    i18: 'deleteDraftOrderFailed',
  },
  {code: 1021, message: 'Get Draft Order Failed', i18: 'getDraftOrderFailed'},
  {code: 1022, message: 'Draft Order Already Exist', i18: 'draftOrderExist'},
  {code: 1023, message: 'Employee Not Found', i18: 'employeeNotFound'},
  {code: 1024, message: 'Store Not Found', i18: 'storeNotFound'},
  {code: 1025, message: 'Delete File Failed', i18: 'deleteFileFailed'},
  {code: 1026, message: 'Update File Failed', i18: 'updateFileFailed'},
  {code: 1027, message: 'File Size Too Large', i18: 'fileSizeTooLarge'},
  {
    code: 1028,
    message: 'Phone Number Already Exists',
    i18: 'phoneNumberAlreadyExists',
  },
  {
    code: 1029,
    message: 'Account Already Exists',
    i18: 'AccountAlreadyExists',
  },
  {
    code: 1030,
    message: 'Email Already Exists',
    i18: 'emailAlreadyExists',
  },
  {
    code: 1031,
    message: 'You do not have permission to do this',
    i18: 'doNotHavePermission',
  },
  {
    code: 1036,
    message: 'Exist User In Store',
    i18: 'existUserInStore',
  },
  {
    code: 1040,
    message: 'Invalid Input',
    i18: 'invalidInput',
  },
];

export const ExtensionProductImageUpload = 'JPEG';

export const listRole = async () => {
  const dataUser = await LocalDB.getUserData();
  const roleUser = dataUser?.UserInfo?.IDVaiTro;
  const order = [1, 6, 31];
  const product = [1, 6, 7];
  const report = [1, 6];
  const sale = [30, 31, 32];

  const roles = [];

  if (order.includes(roleUser)) {
    roles.push('order');
  }
  if (product.includes(roleUser)) {
    roles.push('product');
  }
  if (report.includes(roleUser)) {
    roles.push('report');
  }
  if (sale.includes(roleUser)) {
    roles.push('sale');
  }
  return roles;
};
