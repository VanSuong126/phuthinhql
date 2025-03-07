import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import ToggleSwitch from 'toggle-switch-react-native';
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
import {salesActions, salesSelectors} from '~redux/reducers';
import HeaderTitle from '~components/headers/HeaderTitle';
import formatPrice from '~helper/formatPrice';
import AddressPicker from '~components/inputs/InputPicker/AddressPicker';
import OrderDatePicker from '~components/inputs/InputPicker/OrderDatePicker';
import PaymentPicker from '~components/inputs/InputPicker/PaymentPicker';
import ReceivingPicker from '~components/inputs/InputPicker/ReceivingPicker';
import TransporterPicker from '~components/inputs/InputPicker/TransporterPicker';
import FeeshipPicker from '~components/inputs/InputPicker/FeeshipPicker';
import PromotionPicker from '~components/inputs/InputPicker/PromotionPicker';
import InputMutiLine from '~components/inputs/InputMutiLine';
import moment from 'moment';

const Index = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [noteOrder, setNoteOrder] = useState('');
  const [vat, setVat] = useState(false);
  const [vatValue, setVatValue] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const orderData = useSelector(state => salesSelectors.selectDataSales(state));

  useEffect(() => {
    setNoteOrder(orderData?.ghichudonhang);
    if (orderData?.vat > 0) {
      setVat(true);
    }
  }, []);

  useEffect(() => {
    // sum price product
    const sumAmountProduct = orderData?.sanphamdachon.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.GiaSauGiam * currentValue.SoLuongMua,
      0,
    );

    // get fee ship
    const feeship = orderData?.phiship || 0;

    // caculator sum price
    let discountProduct = 0;
    let discountFeeship = 0;
    let discountBilling = 0;

    if (orderData?.magiamgia && Array.isArray(orderData?.magiamgia)) {
      orderData?.magiamgia.forEach(item => {
        // discount feeship
        if (item.LoaiGiamGia === 'FREESHIP') {
          discountFeeship =
            (feeship * (item?.TyLeGiamGia ?? 0)) / 100 +
            (item?.SoTienGiamGia ?? 0);
        }
        // discount product
        if (item.LoaiGiamGia === 'PRODUCT') {
          discountProduct =
            (sumAmountProduct * (item?.TyLeGiamGia ?? 0)) / 100 +
            (item?.SoTienGiamGia ?? 0);
        }
        // sum discount on billing
        if (item.LoaiGiamGia === 'BILLING') {
          const totalBeforeDiscount = sumAmountProduct + feeship;
          discountBilling =
            (totalBeforeDiscount * (item?.TyLeGiamGia ?? 0)) / 100 +
            (item?.SoTienGiamGia ?? 0);
        }
      });
    }

    // sum all discount
    const discountBill = discountFeeship + discountProduct + discountBilling;
    setDiscountAmount(discountBill);

    // get value VAT
    if (vat === true) {
      const sumVat = (sumAmountProduct + feeship - discountBill) * 0.1;
      setVatValue(sumVat);
    } else {
      setVatValue(0);
    }
  }, [orderData, vat]);

  const handleContinueDetailOrder = () => {
    if (checkData()) {
      const dataUpdate = {
        ...orderData,
        ghichudonhang: noteOrder,
        sotiengiam: discountAmount,
        vat: vatValue,
      };
      dispatch(salesActions.setDataSales(dataUpdate));
      navigation.navigate('thong-tin-don-hang');
    }
  };
  // check data prev go to next screen
  const checkData = () => {
    if (!orderData?.dienthoai || !orderData?.thanhpho || !orderData?.diachi) {
      Toast.show({
        type: 'error',
        props: {message: t('emptyAddressReceiving')},
      });
      return false;
    } else if (!orderData?.hinhthucthanhtoan) {
      Toast.show({
        type: 'error',
        props: {message: t('emptyPaymentMethod')},
      });
      return false;
    } else if (!orderData?.hinhthucnhanhang) {
      Toast.show({
        type: 'error',
        props: {message: t('emptyReceivingMethod')},
      });
      return false;
    } else if (!orderData?.sanphamdachon) {
      Toast.show({
        type: 'error',
        props: {message: t('emptyProduct')},
      });
      return false;
    }
    return true;
  };

  const handleCleanDetailOrder = () => {
    setVat(false);
    const dataUpdate = {
      ...orderData,
      ho: '',
      ten: '',
      tenkhachhang: '',
      dienthoai: '',
      dienthoainhan: '',
      email: '',
      maquocgia: 'VN',
      tenquocgia: 'Viet Nam',
      mabang: '71',
      tenbang: 'TP. Hồ Chí Minh',
      tenquan: '',
      zipcode: '',
      thanhpho: '',
      diachi: '',
      ngaydathang: moment(Date()).format('YYYY-MM-DD HH:mm:ss'),
      hinhthucthanhtoan: '',
      hinhthucnhanhang: '',
      manhavanchuyen: '',
      phiship: 0,
      magiamgia: [],
      sotiengiam: 0,
      vat: 0,
    };
    dispatch(salesActions.setDataSales(dataUpdate));
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderTitle title={t('orderDetail')} />
      <MyAvoidView>
        <MyView style={styles.content}>
          <AddressPicker />
          <OrderDatePicker />
          <PaymentPicker />
          <ReceivingPicker />
          {orderData?.hinhthucnhanhang === 1 && <TransporterPicker />}
          <FeeshipPicker />
          <PromotionPicker />
          <MyView style={styles.wrapNote}>
            <InputMutiLine
              labelName={t('noteOrder')}
              value={noteOrder}
              onChangeText={value => setNoteOrder(value)}
              maxLength={300}
            />
          </MyView>
          <MyView style={styles.groupDetail}>
            <MyView style={styles.wrapDetailPromo}>
              <MyText style={styles.textTitle}>{t('promotion')}: </MyText>
              <MyText style={styles.textValue}>
                {formatPrice(discountAmount)}đ
              </MyText>
            </MyView>

            <MyView style={styles.wrapVAT}>
              <MyText style={styles.textTitle}>
                VAT:{' '}
                <MyText style={styles.textVat}>{formatPrice(vatValue)}đ</MyText>
              </MyText>
              <ToggleSwitch
                isOn={vat}
                onColor={Colors.brand_01}
                offColor={Colors.neutrals_300}
                size="medium"
                onToggle={isOn => setVat(isOn)}
              />
            </MyView>
          </MyView>
        </MyView>
      </MyAvoidView>
      <Bottom
        titleBtn1={t('re-enter')}
        titleBtn2={t('continue')}
        sticky={true}
        onPress1={() => handleCleanDetailOrder()}
        onPress2={() => handleContinueDetailOrder()}
        typeBtn1={2}
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
  header: {
    height: Sizes.spacing_9_Height,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: Sizes.paddingHeight,
    gap: Sizes.spacing_3_Height,
    backgroundColor: Colors.neutrals_100,
  },
  body: {
    flex: 1,
  },
  iconHeader: {
    position: 'absolute',
    right: Sizes.paddingWidth,
    top: parseSizeHeight(26),
    bottom: parseSizeHeight(14),
  },
  txtHeader: {
    height: parseSizeHeight(28),
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.semantics_Black,
  },
  content: {
    gap: parseSizeHeight(10),
  },
  wrapNote: {
    backgroundColor: Colors.neutrals_100,
    paddingVertical: parseSizeHeight(10),
    paddingHorizontal: Sizes.paddingWidth,
  },
  groupDetail: {
    backgroundColor: Colors.neutrals_100,
    paddingVertical: parseSizeHeight(10),
    paddingHorizontal: Sizes.paddingWidth,
    gap: parseSizeHeight(10),
    marginBottom: parseSizeHeight(10),
  },
  wrapDetailPromo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapVAT: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.semantics_Black,
  },
  textValue: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.semantics_Grey,
  },
  textVat: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.semantics_Yellow_02,
  },
});
