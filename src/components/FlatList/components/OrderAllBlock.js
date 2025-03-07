import { StyleSheet } from 'react-native';
import React from 'react';
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
  ColorStatus,
} from '~theme';

const Index = ({ data, index, onPress }) => {
  const { t } = useTranslation();

  const printInvoice = [11, 2, 21, 5, 8, 3, 31, 32, 33, 4, 41, 5, 51, 6].includes(
    data?.IDTinhTrangDonHang,
  );
  const printLabel = [21, 5, 8].includes(data?.IDTinhTrangDonHang);
  const colorStatus = ColorStatus?.['t' + data?.IDTinhTrangDonHang];
  const colorsBackground = ColorStatus?.['b' + data?.IDTinhTrangDonHang];
  const buttons = [
    printInvoice && {
      action: 'printInvoice',
      label: t('printInvoice'),
      backgroundColor: Colors.semantics_Yellow_03,
      textColor: Colors.semantics_Red_01,
    },
    data?.LoaiVanChuyen === 'order' && printLabel && {
      action: 'printLabel',
      label: t('printLabel'),
      backgroundColor: Colors.neutrals_200,
      textColor: Colors.semantics_Grey,
    },
    {
      action: 'viewDetailOrder',
      label: printInvoice ? t('processOrder') : t('viewDetail'),
      backgroundColor: printInvoice ? Colors.semantics_Green_01 : Colors.semantics_Yellow_02,
    },
  ].filter(Boolean);
  return (
    <MyView style={styles.boxOrder} key={index}>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="calendar" width="24" height="24" />
          <MyText style={styles.textInfo}>
            {moment(data?.NgayDatHang).format('DD/MM/YYYY')}
          </MyText>
        </MyView>
        <MyView style={styles.wrapInfo}>
          <Icon name="clock" width="24" height="24" />
          <MyText style={styles.textInfo}>
            {moment(data?.NgayDatHang).format('HH:mm:ss')}
          </MyText>
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
          <MyText
            style={[
              styles.textName,
              { fontWeight: '600', color: Colors.semantics_Black },
            ]}>
            {data?.HoNguoiNhan} {data?.TenNguoiNhan}
          </MyText>
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="barcode" width="24" height="24" />
          <MyText style={styles.textInfo}>{data?.MaDonHang} </MyText>
        </MyView>
        <MyView
          style={[styles.wrapStatus, { backgroundColor: colorsBackground }]}>
          <MyText style={[styles.textStatus, { color: colorStatus }]}>
            {truncateText(data?.TinhTrangDonHang, 20)}
          </MyText>
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="phone" width="24" height="24" />
          <MyText style={styles.textInfo}>{data?.DienThoaiNguoiNhan}</MyText>
        </MyView>
        <MyView style={styles.wrapInfo}>
          <MyText style={styles.textPrice}>
            {formatPrice(data?.TongSoTienThanhToan)}đ
          </MyText>
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon
            name="receiving"
            width="24"
            height="24"
            color={Colors.semantics_Grey}
          />
          <MyText style={styles.textInfo}>{data?.TenHinhThucNhanHang}</MyText>
        </MyView>
        <MyView style={styles.wrapInfo}>
          <Icon
            name="cart"
            width="24"
            height="24"
            color={Colors.semantics_Grey}
          />
          <MyText style={styles.textInfo}>{data?.TongSoLuong}</MyText>
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="location" width="24" height="24" />
          <MyText style={[styles.textInfo, { flex: 1 }]}>
            {data?.DiaChiNhan}, {data?.ThanhPhoNhan}
          </MyText>
        </MyView>
      </MyView>
      <MyView
        style={[
          styles.bottom_RightBox,
          buttons.length === 1 && { justifyContent: 'flex-end' },
        ]}>
        {buttons.map(({ action, label, backgroundColor, textColor }) => (
          <MyTouchableOpacity
            key={action}
            onPress={() => onPress({ action, orderCode: data?.MaDonHang, orderID: data?.IDDonHang })}
            style={[styles.btn, { backgroundColor }]}>
            <MyText style={[styles.textButton, textColor && { color: textColor }]}>
              {label}
            </MyText>
          </MyTouchableOpacity>
        ))}
      </MyView>
    </MyView>
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
    flex: 1,
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
  btn: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.brand_01,
    paddingHorizontal: parseSizeHeight(15),
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
});
