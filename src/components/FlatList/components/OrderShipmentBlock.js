import { StyleSheet, Pressable } from 'react-native';
import React, { } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';


import { MyView, MyText, MyTouchableOpacity } from '~components/MyStyles';
import Icon from '~components/IconXML';
import Line from '~components/Line';
import truncateText from '~helper/truncateText';
import formatPrice from '~helper/formatPrice';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
  ColorStatus
} from '~theme';

const Index = ({ data, index, onPress }) => {
  const { t } = useTranslation();
  const colorStatus = ColorStatus?.['t' + data?.IDTinhTrangDonHang];
  const colorsBackground = ColorStatus?.['b' + data?.IDTinhTrangDonHang];

  return (
    <Pressable
      style={[
        styles.boxOrder,
        data?.selected ? { backgroundColor: Colors?.semantics_Green_03 } : null
      ]}
      onPress={() => onPress({ action: 'selectOrder', orderID: data?.IDDonHang })}
      key={index}
    >
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="calendar" width="24" height="24" />
          <MyText style={styles.textInfo}>{moment(data?.NgayDatHang).format('DD/MM/YYYY')}</MyText>
        </MyView>
        <MyView style={styles.wrapInfo}>
          <Icon name="clock" width="24" height="24" />
          <MyText style={styles.textInfo}>{moment(data?.NgayDatHang).format('HH:mm:ss')}</MyText>
        </MyView>
      </MyView>
      <Line
        type="solid"
        thickness={2}
        color={Colors.neutrals_300}
        width="100%"
      />
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <MyText style={[styles.textName, { fontWeight: '600', color: Colors.semantics_Black }]}>{data?.HoNguoiNhan} {data?.TenNguoiNhan}</MyText>
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="barcode" width="24" height="24" />
          <MyText style={styles.textInfo}>{data?.MaDonHang} </MyText>
        </MyView>
        <MyView style={[styles.wrapStatus, { backgroundColor: colorsBackground }]}>
          <MyText style={[styles.textStatus, { color: colorStatus }]}>{truncateText(data?.TinhTrangDonHang, 20)}</MyText>
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="phone" width="24" height="24" />
          <MyText style={styles.textInfo}>{data?.DienThoaiNguoiNhan}</MyText>
        </MyView>
        <MyView style={styles.wrapInfo}>
          <MyText style={styles.textPrice}>{formatPrice(data?.TongSoTienThanhToan)}đ</MyText>
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="shipment" width="24" height="24" color={Colors.semantics_Grey} />
          <MyText style={styles.textInfo}>{data?.TenNhaVanChuyen || t('notYet')}</MyText>
        </MyView>
        <MyView style={styles.wrapInfo}>
          <Icon name="cart" width="24" height="24" color={Colors.semantics_Grey} />
          <MyText style={styles.textInfo}>{data?.TongSoLuong}</MyText>
        </MyView>
      </MyView>
     { !data?.selected&& <MyView style={styles.bottom_RightBox}>
        <MyTouchableOpacity
          onPress={() => onPress({ action: 'editOrder', orderID: data?.IDDonHang })}
          style={styles.btnEdit}>
          <MyText style={styles.textButtonEdit}>{t('editOrder')}</MyText>
        </MyTouchableOpacity>
        <MyTouchableOpacity
          onPress={() => onPress({ action: 'viewDetailOrder', orderID: data?.IDDonHang })}
          style={styles.btn}>
          <MyText style={styles.textButton}>{t('processOrder')}</MyText>
        </MyTouchableOpacity>
      </MyView>}
    </Pressable>
  );
};

export default Index;

const styles = StyleSheet.create({
  boxOrder: {
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(15),
    marginVertical: parseSizeHeight(8),
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    borderRadius: 12,
    gap: 16,
  },
  wrapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(8),
  },
  textInfo: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '500',
    flexWrap: 'wrap',

    textAlign: 'left',
    color: Colors.neutrals_700,
  },
  textName: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    flexWrap: 'wrap',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  bottom_RightBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapViewInfo: {
    backgroundColor: Colors.semantics_Yellow_03,
    paddingHorizontal: parseSizeHeight(16),
    paddingVertical: parseSizeWidth(8),
    borderRadius: 20,
  },
  wrapStatus: {
    backgroundColor: Colors.semantics_Green_03,
    paddingHorizontal: parseSizeHeight(10),
    paddingVertical: parseSizeWidth(8),
    borderRadius: 20,

  },
  textStatus: {
    fontFamily: FontStyles.InterRegular,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: Sizes.text_tagline1,
    color: Colors.semantics_Green_01,
  },
  btn: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.brand_01,
    paddingHorizontal: parseSizeHeight(24),
    paddingVertical: parseSizeWidth(8),
    borderRadius: 20,
  },
  textButton: {
    fontFamily: FontStyles.InterRegular,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: Sizes.text_tagline1,
    color: Colors.neutrals_50,
  },
  btnEdit: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.semantics_Yellow_03,
    paddingHorizontal: parseSizeHeight(24),
    paddingVertical: parseSizeWidth(8),
    borderRadius: 20,
  },
  textButtonEdit: {
    fontFamily: FontStyles.InterRegular,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: Sizes.text_tagline1,
    color: Colors.semantics_Yellow_01,
  }
});
