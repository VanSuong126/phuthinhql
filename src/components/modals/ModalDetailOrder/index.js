import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import Modal from 'react-native-modal';
import {listRole} from '~constants';

import {
  MyView,
  MyText,
  MySafeAreaView,
  MyAvoidView,
} from '~components/MyStyles';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
  ColorStatus,
} from '~theme';
import Bottom from '~components/Bottom2';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import formatPrice from '~helper/formatPrice';
import fetchData from '~providers';
import FlatList from '~components/FlatList';
import ModalNoteProduct from '~components/modals/ModalNoteProduct';
import truncateText from '~helper/truncateText';
import {salesActions, commonActions} from '~redux/reducers';
import ModalReason from '~modals/ModalReason';

const Index = props => {
  const {isVisible, onClose, orderID, onUpdate={}} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [orderData, setOrderData] = useState();
  const [extraServiceOrder, setExtraServiceOrder] = useState([]);
  const [totalExtraServiceAmount, setTotalExtraServiceAmount] = useState(0);
  const [listProduct, setListProduct] = useState();
  const [dataNoteView, setDataNoteView] = useState();
  const [visibleModalViewNote, setVisibleModalViewNote] = useState(false);
  const [visibleModalReason, setVisibleModalReason] = useState(false);
  const [titleReason, setTitleReason] = useState('');
  const [reasonDefault, setReasonDefault] = useState('');
  const [typeProcess, setTypeProcess] = useState('');
  const [colorStatus, setColorStatus] = useState();
  const [colorsBackground, setcolorsBackground] = useState();
  const [editOrderRole, setEditOrderRole] = useState(false);

  // type: 0 chỉ hiển thị không có thao tác
  // type: 1 thao tác xác nhận đơn, hủy đơn, điều chỉnh đơn
  // type: 2 thao tác yêu cầu hủy đơn, hủy xác nhận đơn

  const [type, setType] = useState(0);
  // danh sách quyền trên UI của User

  useEffect(() => {
    if (isVisible) getDataDetail();
    const checkRole = async () => {
      const roles = await listRole();
      setEditOrderRole(roles.includes('order'));
    };
    checkRole();
  }, [isVisible]);
  // call api get detail order
  const getDataDetail = () => {
    const params = {
      loai: 12,
      iddonhang: orderID,
    };
    fetchData(dispatch, 'getDetailOrder', params, res => {
      if (res?.success === true) {
        const dataOrder = res?.data?.DonHang[0];
        setOrderData(dataOrder);
        const dataDVCT = dataOrder?.DichVuCongThem;
        if (dataDVCT) {
          setExtraServiceOrder(JSON.parse(dataDVCT));
          const sumExtraAmount = JSON.parse(dataDVCT).reduce((total, item) => {
            return total + item.ThanhTien;
          }, 0);
          setTotalExtraServiceAmount(sumExtraAmount);
        } else {
          setExtraServiceOrder([]);
          setTotalExtraServiceAmount(0);
        }

        // get product
        const sanPhams = dataOrder?.SanPham;
        setListProduct(JSON.parse(sanPhams));
        setColorStatus(ColorStatus?.['t' + dataOrder?.IDTinhTrangDonHang]);
        setcolorsBackground(ColorStatus?.['b' + dataOrder?.IDTinhTrangDonHang]);

        // Set type based on IDTinhTrangDonHang
        const {IDTinhTrangDonHang} = dataOrder;
        if (IDTinhTrangDonHang === 1 || IDTinhTrangDonHang === 11) {
          setType(1);
        } else if (
          [2, 21, 3, 31, 32, 33, 4, 41, 5, 6].includes(IDTinhTrangDonHang)
        ) {
          setType(2);
        } else {
          setType(0);
        }
      } else {
        setOrderData(null);
        setListProduct([]);
        setExtraServiceOrder([]);
        setTotalExtraServiceAmount(0);
      }
    });
  };
  // go to screen shipment
  const handleGotoShipment = () => {
    navigation.navigate('giao-hang', {orderID: orderID});
    onClose();
  };
  // handle button send request update order
  const handleRequestUpdate = kind => {
    switch (kind) {
      case 'confirmOrder':
        setVisibleModalReason(true);
        setTitleReason(t('reasonConfirmOrder'));
        setReasonDefault(t('confirmOrderOnline'));
        setTypeProcess('confirmOrder');
        break;
      case 'updateOrder':
        setVisibleModalReason(true);
        setTitleReason(t('reasonUpdateOrder'));
        setTypeProcess('updateOrder');
        break;
      case 'requestCancel':
        setVisibleModalReason(true);
        setTitleReason(t('reasonRequestCancel'));
        setTypeProcess('requestCancel');
        break;
      case 'cancelOrder':
        setVisibleModalReason(true);
        setTitleReason(t('reasonCancelOrder'));
        setTypeProcess('cancelOrder');
        break;
      default:
        console.warn('Loại yêu cầu không hợp lệ:', kind);
        break;
    }
  };

  const hanldeConfirmReason = reason => {
    switch (typeProcess) {
      case 'updateOrder':
        onUpdate({orderID: orderID, status: 'updateOrder', reason: reason});
        onClose();
        break;
      case 'requestCancel':
        onUpdate({orderID: orderID, status: 'requestCancel', reason: reason});
        onClose();
        break;
      case 'cancelOrder':
        onUpdate({orderID: orderID, status: 'cancelOrder', reason: reason});
        onClose();
        break;
      case 'confirmOrder':
        onUpdate({orderID: orderID, status: 'confirmOrder', reason: reason});
        onClose();
        break;
      default:
        console.warn('Loại yêu cầu không hợp lệ:', typeProcess);
        break;
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modal}>
      <MySafeAreaView style={styles.container}>
        <HeaderToolBar
          nameHeaderTitle={t('inforOrder')}
          onPressBack={() => onClose()}
        />
        <MyAvoidView>
          <MyView style={styles.content}>
            {/*info Receving*/}
            <MyView style={styles.groupInfor}>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitle}>{t('orderCode')}:</MyText>
                <MyText style={styles.textValue}>{orderData?.MaDonHang}</MyText>
              </MyView>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitle}>{t('orderDate')}:</MyText>
                <MyText style={styles.textValue}>
                  {moment(orderData?.NgayDatHang).format('DD/MM/YYYY HH:mm:ss')}
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitle}>{t('status')}:</MyText>
                <MyView
                  style={[
                    styles.wrapStatus,
                    {backgroundColor: colorsBackground},
                  ]}>
                  <MyText style={[styles.textStatus, {color: colorStatus}]}>
                    {truncateText(orderData?.TinhTrangDonHang, 20)}
                  </MyText>
                </MyView>
              </MyView>
            </MyView>
            {/*info method*/}
            {/*info Receving*/}
            <MyView style={styles.groupInfor}>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitle}>{t('nameCustomer')}:</MyText>
                <MyText style={styles.textValue}>
                  {orderData?.HoNguoiNhan} {orderData?.TenNguoiNhan}
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitle}>{t('phoneNumber')}:</MyText>
                <MyText style={styles.textValue}>
                  {orderData?.DienThoaiKhachHang}
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfor}>
                <MyText style={[styles.textTitle, {flex: 0.3}]}>
                  {t('address')}:
                </MyText>
                <MyText style={[styles.textValue, {flex: 0.7}]}>
                  {orderData?.DiaChiNhan}, {orderData?.ThanhPhoNhan}
                </MyText>
              </MyView>
            </MyView>
            {/*info method*/}
            <MyView style={styles.groupInfor}>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitle}>{t('payment')}:</MyText>
                <MyText style={styles.textValue}>
                  {orderData?.TenHinhThucThanhToan}
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitle}>
                  {t('receivingMethod')}:
                </MyText>
                <MyText style={styles.textValue}>
                  {orderData?.TenHinhThucNhanHang}
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitle}>{t('transporter')}:</MyText>
                <MyText style={styles.textValue}>
                  {orderData?.TenNhaVanChuyen || '_'}
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
                  {orderData?.GhiChu}
                </MyText>
              </MyView>
            </MyView>
            {/*info number service*/}
            <MyView style={styles.groupInfor}>
              <MyView style={[styles.wrapInfor, {alignItems: 'center'}]}>
                <MyText style={[styles.textTitle, {flex: 0.6}]}>
                  {t('extraService')}:
                </MyText>

                <MyView style={styles.wrapDetailExtraService}>
                  {extraServiceOrder.map((item, index) => (
                    <MyText key={index} style={styles.textValue}>
                      {item.TenSanPham}(x{item.SoLuong})
                    </MyText>
                  ))}
                </MyView>
              </MyView>
            </MyView>
            <MyView style={styles.wrapListProduct}>
              <FlatList
                data={listProduct}
                onPress={data => {
                  setDataNoteView(data?.ghiChu);
                  setVisibleModalViewNote(true);
                }}
                loading={false}
                fetching={false}
                type="productDetail"
                contentContainerStyleProp={styles.containnerFlatList}
                scrollEnabled={false}
              />
            </MyView>

            {/*info price*/}
            <MyView style={styles.groupInfor}>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitle}>{t('unitPrice')}:</MyText>
                <MyText style={styles.textValue}>
                  {formatPrice(orderData?.TongSoTien)}đ
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
                  {formatPrice(orderData?.PhiShip)}đ
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitle}>{t('promotion')}:</MyText>
                <MyText style={styles.textValue}>
                  {formatPrice(orderData?.SoTienGiam)}đ
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitle}>
                  {t('VAT')}(<MyText style={styles.textPercent}>10%</MyText>):
                </MyText>
                <MyText style={styles.textValue}>
                  {formatPrice(orderData?.VAT)}đ
                </MyText>
              </MyView>
            </MyView>

            {/*info total price*/}
            <MyView style={styles.groupInfor}>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitlePrice}>
                  {t('totalPrice')}:
                </MyText>
                <MyText style={styles.textTotalPrice}>
                  {formatPrice(orderData?.TongSoTienThanhToan)}đ
                </MyText>
              </MyView>
            </MyView>
          </MyView>
        </MyAvoidView>
        {type != 0 && (
          <Bottom
            listButton={[
              // Xác nhận đơn Online
              {
                title: t('confirmOrder'),
                typeButton: 2,
                onPress: () => handleRequestUpdate('confirmOrder'),
                visible: type == 1 ? true : false,
                size: 'primary',
              },
              // Chuyển sang màn Đơn hàng giao
              {
                title: t('shipping'),
                typeButton: 2,
                onPress: () => handleGotoShipment(),
                visible: type == 2 ? true : false,
                size: 'primary',
              },
              // Điều chỉnh đơn trực tiếp
              {
                title: t('updateButton'),
                typeButton: 2,
                onPress: () => handleRequestUpdate('updateOrder'),
                visible: type == 2 && editOrderRole ? true : false,
                size: 'primary',
              },
              // Yêu cầu hủy xác nhận đơn
              {
                title: t('cancelConfirm'),
                typeButton: 4,
                onPress: () => handleRequestUpdate('requestCancel'),
                visible: type == 2 && !editOrderRole ? true : false,
                size: 'primary',
              },
              // Hủy đơn
              {
                title: t('cancelOrder'),
                onPress: () => handleRequestUpdate('cancelOrder'),
                typeButton: 4,
                size: 'primary',
                visible: type !== 0 ? true : false,
              },
            ]}
          />
        )}
        <ModalNoteProduct
          type={1}
          isVisible={visibleModalViewNote}
          onClose={() => setVisibleModalViewNote(false)}
          data={dataNoteView}
        />
        <ModalReason
          isVisible={visibleModalReason}
          onClose={() => setVisibleModalReason(false)}
          onConfirm={reason => hanldeConfirmReason(reason)}
          titleReason={titleReason}
          deafault={reasonDefault}
        />
      </MySafeAreaView>
    </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    backgroundColor: Colors.background,
  },
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
  textTitlePrice: {
    flex: 0.7,
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '600',
    textAlign: 'left',
    color: Colors.semantics_Black,
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
    gap: parseSizeHeight(10),
  },
  wrapInfor: {
    flex: 1,
    paddingHorizontal: Sizes.paddingWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapDetailExtraService: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  wrapListProduct: {
    paddingHorizontal: Sizes.paddingWidth,
    margin: 0,
  },
  containnerFlatList: {
    gap: parseSizeHeight(10),
  },
  wrapStatus: {
    backgroundColor: Colors.semantics_Green_03,
    paddingHorizontal: parseSizeHeight(10),
    paddingVertical: parseSizeWidth(6),
    borderRadius: 20,
  },
  textStatus: {
    fontFamily: FontStyles.InterRegular,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: Sizes.text_tagline1,
    color: Colors.semantics_Green_01,
  },
});
