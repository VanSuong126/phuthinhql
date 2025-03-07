import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

import {
  MyView,
  MyText,
  MySafeAreaView,
  MyAvoidView,
} from '~components/MyStyles';
import {Colors, Sizes, parseSizeHeight, FontStyles} from '~theme';
import Bottom from '~components/Bottom';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import formatPrice from '~helper/formatPrice';
import fetchData from '~providers';
import FlatList from '~components/FlatList';
import ModalNoteProduct from '~components/modals/ModalNoteProduct';
import ModalConfirm from '~modals/ModalConfirm';
import {salesActions, commonActions, commonSelectors} from '~redux/reducers';

const Index = props => {
  const {isVisible, onClose, orderData, onRefresh} = props;
  const navigation = useNavigation();
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [dataNoteView, setDataNoteView] = useState();
  const [visibleModalViewNote, setVisibleModalViewNote] = useState(false);

  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
  const [contentNotification, setContentNotification] = useState('');
  const [dataExtraService, setDataExtraService] = useState([]);
  const [totalExtraServiceAmount, setTotalExtraServiceAmount] = useState(0);
  const [sumAmountProduct, setSumAmountProduct] = useState(0);

  const paymentMethod = useSelector(commonSelectors.selectPaymentMethod) || [];
  const receivingMethod =
    useSelector(commonSelectors.selectReceivingMethod) || [];
  const transporter = useSelector(commonSelectors.selectTransporter) || [];

  useEffect(() => {
    // Tính tổng tiền dịch vụ cộng thêm của đơn hàng
    const totalExtraServiceAmount =
      orderData?.dichvucongthem?.reduce(
        (accumulator, currentValue) =>
          accumulator +
          (currentValue?.SoLuong || 0) * (currentValue?.DonGia || 0),
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
    setTotalExtraServiceAmount(totalExtraServiceAmount);
    setSumAmountProduct(totalAmountProduct);
    // get data for load form
    fetchData(dispatch, 'getExtraService', {loai: 2}, data => {
      if (data.success) {
        setDataExtraService(data.data);
      }
    });
    if (paymentMethod.length === 0) {
      fetchData(dispatch, 'getPaymentMethod', {loai: 261});
    }
    if (receivingMethod.length === 0) {
      fetchData(dispatch, 'getReceivingMethod', {loai: 251});
    }
    if (transporter.length === 0) {
      fetchData(dispatch, 'getTransporter', {
        loai: 271,
        mabanghotro: orderData?.mabang,
      });
    }
  }, [paymentMethod, receivingMethod, transporter]);

  // open modal confirm
  const handleCancel = () => {
    const contentNotification = t('notifyCancelOrderDraft');
    setContentNotification(contentNotification);
    setVisibleModalConfirm(true);
  };

  // create order Draft
  const handleCreate = () => {
    dispatch(salesActions.setDataSales(orderData));
    onClose();
    dispatch(commonActions.setListDiscount(orderData?.magiamgia || []));
    navigation.navigate('thong-tin-khach-hang');
  };
  // confirm delete order draft
  const cancelOrder = () => {
    setVisibleModalConfirm(false);
    fetchData(
      dispatch,
      'deleteDraftOrder',
      {IdDonHangNhap: orderData?.IdDonHangNhap},
      res => {
        if (res?.success === true) {
          onRefresh();
        } else {
          Toast.show({
            type: 'Error',
            props: {message: t('deleteDraftOrderSuccess')},
          });
        }
      },
    );
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modal}>
      <MySafeAreaView style={styles.container}>
        <HeaderToolBar
          nameHeaderTitle={t('orderDetail')}
          onPressBack={() => onClose()}
        />
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
                <MyText style={styles.textValue}>
                  {paymentMethod.find(
                    x => x.IDHinhThucThanhToan === orderData?.hinhthucthanhtoan,
                  )?.TenHinhThucThanhToan || '_'}
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitle}>
                  {t('receivingMethod')}:
                </MyText>
                <MyText style={styles.textValue}>
                  {receivingMethod.find(
                    x => x.IDHinhThucNhanHang === orderData?.hinhthucnhanhang,
                  )?.TenHinhThucNhanHang || '_'}
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitle}>{t('transporter')}:</MyText>
                <MyText style={styles.textValue}>
                  {transporter.find(
                    x => x.MaNhaVanChuyen === orderData?.manhavanchuyen,
                  )?.label || '_'}
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
            {/*info number service*/}
            <MyView style={styles.groupInfor}>
              <MyView style={[styles.wrapInfor, {alignItems: 'center'}]}>
                <MyText style={[styles.textTitle, {flex: 0.6}]}>
                  {t('extraService')}:
                </MyText>

                <MyView style={styles.wrapDetailExtraService}>
                  {Array.isArray(orderData?.dichvucongthem) &&
                    orderData.dichvucongthem.length > 0 &&
                    orderData?.dichvucongthem.map((item, index) => (
                      <MyText key={index} style={styles.textValue}>
                        {
                          dataExtraService.find(
                            x => x.IDDichVuCongThem === item?.ID,
                          )?.TenDichVuCongThem
                        }
                        (x{item.SoLuong})
                      </MyText>
                    ))}
                </MyView>
              </MyView>
            </MyView>
            <MyView style={styles.wrapListProduct}>
              <FlatList
                data={orderData?.sanphamdachon}
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

            {/*info total price*/}
            <MyView style={styles.groupInfor}>
              <MyView style={styles.wrapInfor}>
                <MyText style={styles.textTitlePrice}>
                  {t('totalPrice')}:
                </MyText>
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
          titleBtn1={t('cancelOrder')}
          titleBtn2={t('createOrder')}
          sticky={false}
          onPress1={() => handleCancel()}
          onPress2={() => handleCreate()}
          typeBtn1={2}
        />
        <ModalNoteProduct
          type={1}
          isVisible={visibleModalViewNote}
          onClose={() => setVisibleModalViewNote(false)}
          data={dataNoteView}
        />
        <ModalConfirm
          isVisible={visibleModalConfirm}
          onClose={() => setVisibleModalConfirm(false)}
          title={t('notification')}
          content={t(contentNotification)}
          onConfirm={() => {
            setVisibleModalConfirm(false);
            cancelOrder();
          }}
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
    gap: parseSizeHeight(5),
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
});
