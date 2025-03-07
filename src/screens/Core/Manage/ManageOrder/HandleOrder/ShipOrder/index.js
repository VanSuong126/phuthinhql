import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import moment from 'moment';

import {
  MyView,
  MyText,
  MySafeAreaView,
  MyAvoidView,
  MyTouchableOpacity,
} from '~components/MyStyles';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';
import Bottom from '~components/Bottom';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import formatPrice from '~helper/formatPrice';
import fetchData from '~providers';
import {PrintShipLabel} from '~helper/print';
import ModalConfirm from '~modals/ModalConfirm';
import Icon from '~components/IconXML';
import TransporterPicker2 from '~components/inputs/InputPicker/TransporterPicker2';
import InputWithUnit from '~inputs/InputWithUnit';
import DatePicker from '~inputs/InputPicker/DatePicker';
import CheckBox from '~components/CheckBox';
import InputMutiLine from '~components/inputs/InputMutiLine';
import ModalAddressLevel4 from '~modals/ModalAddressLevel4';

const Index = props => {
  const {title, orderID, type = 0} = props?.route?.params;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [orderData, setOrderData] = useState();
  const [thuHo, setThuHo] = useState(0);
  const [khaiGia, setKhaiGia] = useState(900000);
  const [shipDate, setShipDate] = useState(new Date());
  const [shopTraShip, setShopTraShip] = useState(false);
  const [hangDeVo, setHangDeVo] = useState(false);
  const [khoiLuong, setKhoiLuong] = useState(300);
  const [note, setNote] = useState(
    'Không cho xem hàng, Không cho thử hàng/ đồng kiểm',
  );
  const [daPhongThuy, setDaPhongThuy] = useState(true);
  const [tram, setTram] = useState(false);
  const [shipingCost, setShipingCost] = useState(0);

  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
  const [contentNotification, setContentNotification] = useState('');
  const [visibleModalAddressLevel4, setVisibleModalAddressLevel4] =
    useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getDataDetail();
    }, []),
  );

  const getDataDetail = () => {
    const params = {
      loai: 12,
      iddonhang: orderID,
    };
    fetchData(dispatch, 'getDetailOrder', params, res => {
      if (res?.success === true) {
        const dataOrder = res?.data?.DonHang[0];
        setOrderData(dataOrder);
      } else {
        Toast.show({
          type: 'error',
          props: {message: res?.message},
        });
      }
    });
  };

  // Ship Order
  const hanldeShipOrder = async (diachicap4 = 'Khác') => {
    if (!orderData?.MaNhaVanChuyen) {
      Toast.show({
        type: 'error',
        props: {message: t('emptyTransporter')},
      });
      return;
    }
    const sanpham = getSanPham();
    const params = getParam({sanpham});
    fetchData(dispatch, 'shipOrder', {...params, diachicap4}, res => {
      console.log(res);

      if (res.success === true) {
        const trackingCode = res?.data?.order?.tracking_id;
        if (trackingCode) {
          const contenNotify = `Đơn hàng đã được gửi sang nhà vận chuyển GHTK. Mã vận đơn ${trackingCode}`;
          setContentNotification(contenNotify);
          setVisibleModalConfirm(true);
        } else {
          Toast.show({
            type: 'success',
            props: {message: t('sendRequestShipmentSuccess')},
          });
          navigation.goBack();
        }
      } else {
        if (res?.message?.includes('Đường')) {
          setVisibleModalAddressLevel4(true);
        } else {
          Toast.show({
            type: 'error',
            props: {message: t('sendRequestShipmentError')},
          });
        }
      }
    });
  };
  // get product
  const getSanPham = () => {
    if (!daPhongThuy && !tram) return [];

    const weight = khoiLuong / 1000;
    return daPhongThuy && tram
      ? [
          {name: 'Đá Phong Thủy', weight: weight / 2},
          {name: 'Trầm', weight: weight / 2},
        ]
      : [{name: daPhongThuy ? 'Đá Phong Thủy' : 'Trầm', weight}];
  };

  const getParam = sanpham => {
    const commonParams = {
      iddonhang: orderData?.IDDonHang,
      manhavanchuyen: orderData?.MaNhaVanChuyen,
      mienship: shopTraShip ? 1 : 0,
      khoiluong: khoiLuong,
      devo: hangDeVo ? 1 : 0,
    };
    const specificParams =
      orderData?.LoaiVanChuyen === 'order'
        ? {
            ghichu: note,
            trigiakhaigia: khaiGia,
            tienthuho: thuHo,
            ngaygiaohang: moment(shipDate).format('YYYY-MM-DD'),
            sanpham,
          }
        : {
            ngaygiaohang: moment(shipDate).format('YYYY-MM-DD'),
            phishipthuc: shipingCost,
            ghichu: note,
          };

    return {...commonParams, ...specificParams};
  };

  // get data label
  const printLabel = () => {
    const params = {
      madonhang: orderData?.MaDonHang,
    };
    fetchData(dispatch, 'printLabel', params, res => {
      if (res?.success === true) {
        const dataOrder = {
          NguoiNhan: res?.data?.HoTenNguoiNhan,
          DienThoaiKhachHang: res?.data?.DienThoaiNguoiNhan,
          DiaChiNhan: res?.data?.DiaChiNhan,
        };
        PrintShipLabel({data: dataOrder, shipCode: res?.data?.MaVanDon});
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          props: {message: t('dataLabelError')},
        });
      }
    });
  };

  const handleResendShipRequest = value => {
    setVisibleModalAddressLevel4(false);
    hanldeShipOrder(value);
  };
  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('deliveryOrder')} />
      <MyAvoidView>
        <MyView style={styles.content}>
          {/* Địa chỉ nhận */}
          <MyView style={styles.container_r2}>
            <MyView style={styles.wrapIcon_r2}>
              <Icon name="location" width="24" height="24" />
            </MyView>
            <MyView style={styles.wrapInfo_r2}>
              <MyView style={styles.wrapTitle_r2}>
                <MyText style={styles.titleTitle}>{t('deliveryTo')}</MyText>
                <MyTouchableOpacity
                  onPress={() =>
                    navigation.navigate('doi-dia-chi-nhan', {data: orderData})
                  }>
                  <Icon name="edit" width="20" height="20" />
                </MyTouchableOpacity>
              </MyView>
              <MyView style={styles.wrapDetail_r2}>
                <MyText style={styles.textOrderCode}>
                  {orderData?.MaDonHang}
                </MyText>
                <MyText style={styles.textInfo}>
                  {orderData?.NguoiNhan} | {orderData?.DienThoaiKhachHang}
                </MyText>
                <MyText style={styles.textInfo}>{orderData?.DiaChiNhan}</MyText>
                <MyText style={styles.textInfo}>
                  {orderData?.ThanhPhoNhan}
                </MyText>
              </MyView>
            </MyView>
          </MyView>
          <MyView style={styles.groupContent}>
            {/* nhà vận chuyển */}
            <TransporterPicker2
              value={orderData?.TenNhaVanChuyen}
              mabanghotro={orderData?.MaBangNhan}
              getValue={data =>
                setOrderData({
                  ...orderData,
                  MaNhaVanChuyen: data?.MaNhaVanChuyen,
                  TenNhaVanChuyen: data?.label,
                  LoaiVanChuyen: data?.TypeUrl,
                })
              }
            />
            {/* ngày giao */}
            <DatePicker
              labelName={t('shipDate')}
              value={shipDate}
              getValue={value => setShipDate(value)}
            />
            {/* loại đơn */}
            <MyView style={styles.wrapCheck}>
              <MyText style={styles.labelCheck}>{t('typeOrder')}</MyText>
              <MyView style={styles.groupCheck}>
                <CheckBox
                  value={shopTraShip}
                  title={t('paidShop')}
                  styleContainerCheck={styles.containerCheck}
                  styleTitle={styles.textValueCheck}
                  onSelect={value => setShopTraShip(value)}
                />
                <CheckBox
                  value={hangDeVo}
                  title={t('fragileItems')}
                  styleContainerCheck={styles.containerCheck}
                  styleTitle={styles.textValueCheck}
                  onSelect={value => setHangDeVo(value)}
                />
              </MyView>
            </MyView>
            {/* chi phí vận chuyển trực tiếp */}
            {orderData?.LoaiVanChuyen === 'direct' && shopTraShip && (
              <MyView style={styles.wrapInputUnit}>
                <MyText style={styles.labelInput}>{t('shipingCost')}</MyText>
                <InputWithUnit
                  styleContainer={styles.inputUnit}
                  styleText={styles.textUnit}
                  unit={'đ'}
                  value={shipingCost}
                  onChangeText={value => setShipingCost(value)}
                  maxLength={20}
                  maxValue={10000000000}
                />
              </MyView>
            )}
            {/* loại sản phẩm vận chuyển */}
            {orderData?.LoaiVanChuyen === 'order' && (
              <MyView style={styles.groupContent2}>
                <MyView style={styles.wrapCheck}>
                  <MyText style={styles.labelCheck}>
                    {t('typeProductDelivery')}
                  </MyText>
                  <MyView style={styles.groupCheck}>
                    <CheckBox
                      value={tram}
                      title={t('agarwood')}
                      styleContainerCheck={styles.containerCheck}
                      styleTitle={styles.textValueCheck}
                      onSelect={value => setTram(value)}
                    />
                    <CheckBox
                      value={daPhongThuy}
                      title={t('fengShuiCrystals')}
                      styleContainerCheck={styles.containerCheck}
                      styleTitle={styles.textValueCheck}
                      onSelect={value => setDaPhongThuy(value)}
                    />
                  </MyView>
                </MyView>
                {/* COD */}
                <MyView style={styles.wrapInputUnit}>
                  <MyText style={styles.labelInput}>{t('codPrice')}</MyText>
                  <InputWithUnit
                    styleContainer={styles.inputUnit}
                    styleText={styles.textUnit}
                    unit={'đ'}
                    value={thuHo}
                    onChangeText={value => setThuHo(value)}
                    maxLength={20}
                    maxValue={10000000000}
                  />
                </MyView>
                {/* Khai giá */}
                <MyView style={styles.wrapInputUnit}>
                  <MyText style={styles.labelInput}>
                    {t('declaredValue')}
                  </MyText>
                  <InputWithUnit
                    styleContainer={styles.inputUnit}
                    styleText={styles.textUnit}
                    unit={'đ'}
                    value={khaiGia}
                    onChangeText={value => setKhaiGia(value)}
                    maxLength={20}
                    maxValue={10000000000}
                  />
                </MyView>
              </MyView>
            )}
            {/* Trọng lượng */}
            <MyView style={styles.wrapInputUnit}>
              <MyText style={styles.labelInput}>{t('weight')}</MyText>
              <InputWithUnit
                styleContainer={styles.inputUnit}
                styleText={styles.textUnit}
                unit={'gram'}
                value={khoiLuong}
                onChangeText={value => setKhoiLuong(value)}
                maxLength={10}
                maxValue={100000}
              />
            </MyView>
            {/* ghi chú */}
            <InputMutiLine
              styleContainer={styles.containerNote}
              styleText={styles.textNote}
              labelName={t('note')}
              value={note}
              onChangeText={value => setNote(value)}
              maxLength={300}
            />
          </MyView>
          <MyView style={styles.wrapTotal}>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTitle}>{t('quantity')}</MyText>
              <MyText style={styles.textValue}>
                {orderData?.TongSoLuong} {t('product')}
              </MyText>
            </MyView>
            <MyView style={styles.wrapInfor}>
              <MyText style={styles.textTotalPrice}>{t('totalPrice')}</MyText>
              <MyText style={styles.textValuePrice}>
                {formatPrice(orderData?.TongSoTienThanhToan)}đ
              </MyText>
            </MyView>
          </MyView>
        </MyView>
      </MyAvoidView>
      <Bottom
        titleBtn1={t('shipment')}
        sticky={false}
        onPress1={() => hanldeShipOrder()}
        typeBtn1={2}
      />
      <ModalConfirm
        isVisible={visibleModalConfirm}
        isSuccessNotify={true}
        onClose={() => {
          setVisibleModalConfirm(false), navigation.goBack();
        }}
        title={t('notification')}
        titleConfirm={t('printLabel')}
        titleCancel={t('close')}
        content={t(contentNotification)}
        onConfirm={() => {
          setVisibleModalConfirm(false);
          printLabel();
        }}
      />
      <ModalAddressLevel4
        isVisible={visibleModalAddressLevel4}
        thanhphonhan={orderData?.ThanhPhoNhan}
        diachinhan={orderData?.DiaChiNhan}
        onClose={() => setVisibleModalAddressLevel4(false)}
        title={t('addressLevel4')}
        onConfirm={value => handleResendShipRequest(value)}
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
  wrapOpenFind: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: Colors.neutrals_100,
    borderColor: Colors.neutrals_300,
    paddingVertical: parseSizeHeight(10),
    paddingHorizontal: parseSizeHeight(24),
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: parseSizeHeight(24),
  },
  textTitle: {
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    fontSize: Sizes.text_subtitle1,
    color: Colors.neutrals_700,
  },

  container_r2: {
    flexDirection: 'row',
    backgroundColor: Colors.neutrals_100,
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(10),
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  wrapIcon_r2: {
    flex: 0.1,
  },
  wrapInfo_r2: {
    flex: 0.9,
  },
  wrapTitle_r2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '600',
    color: Colors.semantics_Black,
  },
  wrapDetail_r2: {
    marginTop: parseSizeHeight(10),
    gap: parseSizeHeight(4),
  },
  textInfo: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
  textOrderCode: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '600',
    color: Colors.semantics_Black,
  },
  groupContent: {
    backgroundColor: Colors.neutrals_100,
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(10),
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    gap: parseSizeHeight(20),
  },
  groupContent2: {
    gap: parseSizeHeight(20),
  },
  wrapInputUnit: {
    gap: parseSizeHeight(8),
  },
  labelInput: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
  labelCheck: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '500',
    color: Colors.semantics_Black,
  },
  inputUnit: {
    height: parseSizeHeight(48),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutrals_200,
    borderRadius: parseSizeWidth(8),
  },
  textUnit: {
    height: parseSizeHeight(48),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Black,
    backgroundColor: Colors.neutrals_200,
  },
  groupCheck: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textValueCheck: {
    textAlign: 'left',
    marginLeft: parseSizeWidth(4),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '500',
    color: Colors.semantics_Black,
  },
  containerCheck: {
    flex: 1,
  },
  containerNote: {
    margin: 0,
  },
  textNote: {
    maxHeight: 60,
  },
  wrapCheck: {
    gap: parseSizeHeight(10),
  },
  wrapTotal: {
    backgroundColor: Colors.neutrals_100,
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(20),
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    gap: parseSizeHeight(10),
  },
  wrapInfor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTotalPrice: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '600',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  textValuePrice: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'right',
    color: Colors.brand_01,
  },
  textValue: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '500',
    textAlign: 'right',
    color: Colors.semantics_Black,
  },
});
