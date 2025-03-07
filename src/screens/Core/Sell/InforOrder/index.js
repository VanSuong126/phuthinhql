import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

import {
  MyView,
  MyText,
  MySafeAreaView,
  MyAvoidView,
} from '~components/MyStyles';
import {Colors, Sizes, parseSizeHeight, FontStyles} from '~theme';
import Bottom from '~components/Bottom';
import {
  salesActions,
  salesSelectors,
  commonSelectors,
  commonActions,
} from '~redux/reducers';
import HeaderTitle from '~components/headers/HeaderTitle';
import formatPrice from '~helper/formatPrice';
import fetchData from '~providers';
import ModalOrderResult from '~components/modals/ModalOrderResult';
import {PrintInvoice} from '~helper/print';
import ModalConfirm from '~modals/ModalConfirm';
import LocalDB from '~data/asyncStorage';

const Index = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [urlWeb, setUrlWeb] = useState('');

  const [paymentName, setPaymentName] = useState('');
  const [transporterName, setTransporterName] = useState('');
  const [receivingName, setReceivingName] = useState('');
  const [numberProduct, setNumberProduct] = useState(0);
  const [extraServiceOrder, setExtraServiceOrder] = useState(0);
  const [totalExtraServiceAmount, setTotalExtraServiceAmount] = useState(0);
  const [extraServiceProduct, setExtraServiceProduct] = useState(0);

  const [sumAmountProduct, setSumAmountProduct] = useState(0);
  const [visibleModalResult, setVisibleModalResult] = useState(false);
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);

  const [dataOrderResult, setDataOrderResult] = useState();

  const orderData = useSelector(state => salesSelectors.selectDataSales(state));
  const paymentMethod = useSelector(commonSelectors.selectPaymentMethod) || [];
  const receivingMethod =
    useSelector(commonSelectors.selectReceivingMethod) || [];
  const transporter = useSelector(commonSelectors.selectTransporter) || [];

  useEffect(() => {
    LocalDB.getUserData().then(data => setUrlWeb(data?.ViewImageUrl));
    // Lấy tên phương thức thanh toán
    const selectedPayment =
      paymentMethod?.find(
        x => x.IDHinhThucThanhToan === orderData?.hinhthucthanhtoan,
      )?.TenHinhThucThanhToan || '';

    // Lấy tên phương thức nhận hàng
    const selectedReceiving =
      receivingMethod?.find(
        x => x.IDHinhThucNhanHang === orderData?.hinhthucnhanhang,
      )?.TenHinhThucNhanHang || '';

    // Lấy tên nhà vận chuyển
    const selectedTransporter =
      transporter?.find(x => x.MaNhaVanChuyen === orderData?.manhavanchuyen)
        ?.label || '';

    // Tính tổng số lượng sản phẩm
    const numberProduct =
      orderData?.sanphamdachon?.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue?.SoLuongMua || 0),
        0,
      ) || 0;

    // Tính tổng tiền của các sản phẩm
    const totalAmountProduct =
      orderData?.sanphamdachon?.reduce(
        (accumulator, currentValue) =>
          accumulator +
          (currentValue?.SoLuongMua || 0) * (currentValue?.GiaSauGiam || 0),
        0,
      ) || 0;

    // Tính tổng số lượng dịch vụ cộng thêm của đơn hàng
    const sumExtraServiceOrder =
      orderData?.dichvucongthem?.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue?.SoLuong || 0),
        0,
      ) || 0;

    // Tính tổng tiền dịch vụ cộng thêm của đơn hàng
    const totalExtraServiceAmount =
      orderData?.dichvucongthem?.reduce(
        (accumulator, currentValue) =>
          accumulator +
          (currentValue?.SoLuong || 0) * (currentValue?.DonGia || 0),
        0,
      ) || 0;

    // Tính tổng số lượng dịch vụ cộng thêm của sản phẩm
    const sumExtraServiceProduct =
      orderData?.sanphamdachon?.reduce((total, product) => {
        return (
          total +
          (product?.GhiChuTang?.reduce((sum, ghiChu) => {
            return (
              sum +
              (ghiChu?.DichVuCongThem?.reduce(
                (count, service) => count + (service?.SoLuong || 0),
                0,
              ) || 0)
            );
          }, 0) || 0)
        );
      }, 0) || 0;

    // Cập nhật state với dữ liệu đã tính toán
    setPaymentName(selectedPayment);
    setReceivingName(selectedReceiving);
    setTransporterName(selectedTransporter);
    setNumberProduct(numberProduct);
    setExtraServiceOrder(sumExtraServiceOrder);
    setExtraServiceProduct(sumExtraServiceProduct);
    setTotalExtraServiceAmount(totalExtraServiceAmount);
    setSumAmountProduct(totalAmountProduct);
  }, []);

  // handle create order
  const handleCreateOrder = () => {
    const jsonDichvucongthem = JSON.stringify(orderData?.dichvucongthem ?? []);

    const magiamgiaString =
      orderData?.magiamgia
        ?.map(item => {
          const loai = item.LoaiGiamGia;
          const ma = item.MaGiamGia;
          const sotien =
            item.SoTienGiamGia > 0 ? item.SoTienGiamGia : item.TyLeGiamGia;
          return `(${loai})[${ma}]: ${sotien}`;
        })
        .join(', ') ?? '';

    const sanphamdachonMapped = orderData?.sanphamdachon.map(sp => ({
      id: sp.IDSanPham,
      soluongtrukho: -sp.SoLuongMua,
      soluongdachon: sp.SoLuongMua,
      giaban: sp.GiaBan,
      giasaugiam: sp.GiaSauGiam,
      tonggiaban: sp.GiaSauGiam * sp.SoLuongMua,
      thoigianbaohanh: sp.ThoiGianBaoHanh,
      khoiluong: sp.KhoiLuong,
      giamgiatien: sp.GiaBan - sp.GiaSauGiam,
      ghichutang:
        sp.GhiChuTang && sp.GhiChuTang.length > 0
          ? JSON.stringify(sp.GhiChuTang)
          : '',
    }));

    const dataOrderCreate = {
      dienthoai: orderData?.dienthoaiKH,
      dienthoainhan: orderData?.dienthoai,
      email: orderData?.email,
      tenkhachhang: `${orderData?.ho} ${orderData?.ten}`,
      maquocgia: orderData?.maquocgia,
      mabang: orderData?.mabang,
      tenbang: orderData?.tenbang,
      tenquan: orderData?.tenquan,
      tenquocgia: orderData?.tenquocgia,
      zipcode: orderData?.thanhpho,
      thanhpho: orderData?.thanhpho,
      diachi: orderData?.diachi,
      hinhthucnhanhang: orderData?.hinhthucnhanhang,
      hinhthucthanhtoan: orderData?.hinhthucthanhtoan,
      dichvucongthem: jsonDichvucongthem,
      sanphamdachon: sanphamdachonMapped,
      ngaysinh: orderData?.ngaysinh,
      nhantaicuahang: orderData?.hinhthucnhanhang === 3 ? 1 : 0,
      manhavanchuyen: orderData?.manhavanchuyen,
      phiship: orderData?.phiship,
      magiamgia: magiamgiaString,
      sotiengiam: orderData?.sotiengiam,
      magiamgias: '',
      sotiengiamtrensanpham: orderData?.sotiengiamtrensanpham,
      ho: orderData?.ho,
      ten: orderData?.ten,
      vat: orderData?.vat,
      ghichu: orderData?.ghichudonhang,
      ngaydathang: orderData?.ngaydathang,
      loaidonhang: 'App PKN4ID',
      ...(orderData?.madonchung ? {madonchung: orderData.madonchung} : {}),
    };

    const nameApi = orderData.madonchung ? 'updateOrder' : 'createOrder';
    fetchData(dispatch, nameApi, dataOrderCreate, res => {
      if (res.success) {
        if (orderData?.IdDonHangNhap) {
          fetchData(dispatch, 'deleteDraftOrder', {
            IdDonHangNhap: orderData?.IdDonHangNhap,
          });
        }
        if (!orderData?.madonchung) {
          const dataSend = res?.data?.DonHang[0];
          getListTempalteZaloOA(dataSend);
          if (dataSend?.Email) sendMailBooking(dataSend);
        }
        setDataOrderResult(res?.data);
        setVisibleModalResult(true);
      } else {
        setVisibleModalResult(true);
      }
    });
  };

  const sendMailBooking = async data => {
    const params = {
      to: data?.Email,
      title: `(${data?.MaDonHang}) Xác nhận đơn hàng`,
      body: `<div>
          <div style="border-radius: 10px; text-align: center; font-size: 20px; box-shadow: 3px 0px 5px 2px #999999; padding: 10px; width: 80%; margin: 0 auto; border: 1px solid #ccc">
           <div style="width: 150px; margin: 0 auto; padding-bottom: 20px;">
             <img src="https://uat.phuckhanggem.com/_imageslibrary/logo.png" style="width: 100%; object-fit: cover" />
           </div>
           <div style="font-weight: bold">Xác nhận đơn hàng ${data?.MaDonHang} thành công.</div>
           <div>Sử dụng mã <b>${data?.MaDonHang}</b> để tra cứu thông tin đơn hàng trên website</div>
           <div style="margin: 20px">
              <a href='${urlWeb}/Home/Recruitment?madonhang=${data?.MaDonHang}' style='background: #f6821f; text-decoration: none; padding: 12px; font-size: 15px; font-weight: bold; border-radius: 5px;'>Tra cứu đơn hàng</a>
            </div>
           <div style="font-style: italic; margin-top: 50px; font-size: 15px">Đây là thư gửi tự động. Vui lòng không trả lời. Cảm ơn./.</div>
           </div>
          </div>`,
    };
    fetchData(dispatch, 'sendMailBooking', params, res => {
      if (res?.success) {
      } else {
      }
    });
  };
  // get Template id
  const getListTempalteZaloOA = async param => {
    fetchData(dispatch, 'getListTempalteZaloOA', {loai: 1}, res => {
      if (res?.success) {
        const template_idA01 = res?.data.find(
          item => item.id === 'A02',
        )?.template_id;
        sendMessageZaloOA({
          template_id: template_idA01,
          phone: param?.DienThoaiKhachHang,
          order_code: param?.MaDonHang,
        });
      } else {
        console.log('error getListTempalteZaloOA');
      }
    });
  };

  const sendMessageZaloOA = async data => {
    const params = {
      loai: 'A02',
      template_id: data?.template_id,
      phone: data?.phone,
      order_code: data?.order_code,
      tracking_id: data?.order_code + '_A02',
    };
    fetchData(dispatch, 'sendMessageZaloOA', params, res => {
      if (res?.success) {
      } else {
        console.log('error sendMessageZaloOA');
      }
    });
  };

  const handleCleanData = () => {
    dispatch(salesActions.setDataSales(null));
    dispatch(salesActions.setDeliveryAddress(null));
    dispatch(commonActions.setListProduct({reset: true}));
    dispatch(commonActions.setListDiscount([]));
  };

  const hanldePressResult = action => {
    switch (action.action) {
      case 'Complete':
        handleCleanData();
        setVisibleModalResult(false);
        navigation.navigate('Home');
        break;
      case 'PrintOrderBill':
        PrintInvoice({data: dataOrderResult});
        break;
      case 'CreateNewOrder':
        handleCleanData();
        setVisibleModalResult(false);
        navigation.navigate('tao-don-hang');
        break;
      case 'TryAgain':
        setVisibleModalResult(false);
        handleCreateOrder();
        break;
      case 'CancelOrder':
        setVisibleModalResult(false);
        setVisibleModalConfirm(true);
        break;
      case 'ReportError':
        console.log('Reporting an error');
        break;
      default:
        console.log('Unknown action');
    }
  };
  const confirmCancelOrder = () => {
    handleCleanData();
    setVisibleModalConfirm(false);
    navigation.navigate('tao-don-hang');
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderTitle title={t('inforOrder')} />
      <MyAvoidView>
        <MyView style={styles.content}>
          {/*info Receving*/}
          <MyView style={styles.groupInfor}>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('nameCustomer')}:</MyText>
              <MyText style={styles.textValue}>
                {orderData?.ho} {orderData?.ten}
              </MyText>
            </MyView>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('phoneNumber')}:</MyText>
              <MyText style={styles.textValue}>{orderData?.dienthoai}</MyText>
            </MyView>
            <MyView style={styles.wrapInfor}>
              <MyText style={[styles.textTitle, {flex: 0.3}]}>
                {t('address')}:
              </MyText>
              <MyText style={[styles.textValue, {flex: 0.7}]}>
                {orderData?.diachi}, {orderData?.thanhpho}
              </MyText>
            </MyView>
          </MyView>
          {/*info method*/}
          <MyView style={styles.groupInfor}>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('payment')}:</MyText>
              <MyText style={styles.textValue}>{paymentName}</MyText>
            </MyView>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('receivingMethod')}:</MyText>
              <MyText style={styles.textValue}>{receivingName}</MyText>
            </MyView>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('transporter')}:</MyText>
              <MyText style={styles.textValue}>{transporterName}</MyText>
            </MyView>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('orderDate')}:</MyText>
              <MyText style={styles.textValue}>{orderData?.ngaydathang}</MyText>
            </MyView>
          </MyView>
          {/*info number service*/}
          <MyView style={styles.groupInfor}>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('serviceProduct')}:</MyText>
              <MyText style={styles.textValue}>{extraServiceProduct}</MyText>
            </MyView>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('extraService')}:</MyText>
              <MyText style={styles.textValue}>{extraServiceOrder}</MyText>
            </MyView>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('quantityProduct')}:</MyText>
              <MyText style={styles.textValue}>{numberProduct}</MyText>
            </MyView>
          </MyView>
          {/*info price*/}
          <MyView style={styles.groupInfor}>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('unitPrice')}:</MyText>
              <MyText style={styles.textValue}>
                {formatPrice(sumAmountProduct)}đ
              </MyText>
            </MyView>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('extraSeviceFee')}:</MyText>
              <MyText style={styles.textValue}>
                {formatPrice(totalExtraServiceAmount)}đ
              </MyText>
            </MyView>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('feeship')}:</MyText>
              <MyText style={styles.textValue}>
                {formatPrice(orderData?.phiship)}đ
              </MyText>
            </MyView>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('promotion')}:</MyText>
              <MyText style={styles.textValue}>
                {formatPrice(orderData?.sotiengiam)}đ
              </MyText>
            </MyView>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>
                {t('VAT')}(<MyText style={styles.textPercent}>10%</MyText>):
              </MyText>
              <MyText style={styles.textValue}>
                {formatPrice(orderData?.vat)}đ
              </MyText>
            </MyView>
          </MyView>
          {/*info note*/}
          <MyView style={styles.groupInfor}>
            <MyView style={styles.wrapInfor}>
              <MyText style={[styles.textTitle, {flex: 0.4}]}>
                {t('noteOrder')}:
              </MyText>
              <MyText style={[styles.textValue, {flex: 0.6}]}>
                {orderData?.ghichudonhang}
              </MyText>
            </MyView>
          </MyView>
          {/*info total price*/}
          <MyView style={styles.groupInfor}>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('totalPrice')}:</MyText>
              <MyText style={styles.textTotalPrice}>
                {formatPrice(
                  (sumAmountProduct ?? 0) +
                    (orderData?.phiship ?? 0) +
                    (totalExtraServiceAmount ?? 0) +
                    (orderData?.vat ?? 0) -
                    (orderData?.sotiengiam ?? 0),
                )}
                đ
              </MyText>
            </MyView>
          </MyView>
        </MyView>
      </MyAvoidView>
      <Bottom
        titleBtn1={orderData?.madonchung ? t('cancelUpdate') : t('cancelOrder')}
        titleBtn2={orderData?.madonchung ? t('update') : t('createOrder')}
        sticky={true}
        onPress1={() => setVisibleModalConfirm(true)}
        onPress2={() => handleCreateOrder()}
        typeBtn1={2}
      />
      <ModalOrderResult
        isVisible={visibleModalResult}
        onClose={() => setVisibleModalResult(false)}
        onPress={action => hanldePressResult(action)}
        data={dataOrderResult}
        update={orderData?.madonchung ? true : false}
        paymentNow={orderData?.hinhthucthanhtoan === 4 ? true : false}
      />
      <ModalConfirm
        isVisible={visibleModalConfirm}
        onClose={() => setVisibleModalConfirm(false)}
        title={t('notification')}
        content={t('areYouCancelOrder')}
        onConfirm={() => confirmCancelOrder()}
      />
    </MySafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Sizes.spacing_3_Height,
    backgroundColor: Colors.background,
  },
  content: {
    gap: parseSizeHeight(10),
  },
  textTitle: {
    flex: 0.5,
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Grey,
  },
  textValue: {
    flex: 0.5,
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'right',
    color: Colors.neutrals_900,
  },
  textPercent: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Yellow_02,
  },
  textTotalPrice: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'right',
    color: Colors.semantics_Yellow_02,
  },
  groupInfor: {
    backgroundColor: Colors.neutrals_100,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingVertical: parseSizeHeight(16),
    gap: parseSizeHeight(5),
  },
  wrapInfor: {
    flex: 1,
    paddingHorizontal: Sizes.paddingWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
