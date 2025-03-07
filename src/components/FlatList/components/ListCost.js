import React from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

import Line from '~components/Line';
import {MyText, MyView} from '~components/MyStyles';
import {Colors, Sizes, parseSize} from '~theme';
import {currencyFormatNoUnit} from '~helper/currencyFormat';
const Index = ({data}) => {
  return (
    <MyView style={styles.item}>
      <MyView style={styles.horizontal}>
        <MyText style={styles.txtTitleItem}>{data?.TenLoaiChiPhi}</MyText>
        <MyText style={[styles.txtPrice, data?.SoTien < 0 && styles.txtRed]}>
          {data?.SoTien > 0
            ? `+${currencyFormatNoUnit(data?.SoTien)}`
            : currencyFormatNoUnit(data?.SoTien)}
        </MyText>
      </MyView>
      <Line thickness={1} color={Colors.neutrals_200} />
      <MyText style={styles.txtTitle}>
        {`${moment(data?.NgayPhatSinh).format('DD/MM/YYYY')} ${moment(
          data?.NgayPhatSinh,
        ).format('HH:mm')}`}
      </MyText>
      <MyText>{data?.HoTenNguoiNhap}</MyText>
      <MyText style={styles.txtContent}>{data?.GhiChu}</MyText>
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    backgroundColor: Colors.neutrals_50,
    borderRadius: parseSize(16),
    paddingHorizontal: Sizes.spacing_5_Width,
    paddingVertical: Sizes.spacing_3_Height,
    gap: Sizes.spacing_2_Height,
  },
  txtTitleItem: {
    fontWeight: '500',
    color: Colors.neutrals_900,
    fontSize: Sizes.text_subtitle2,
  },
  txtContent: {
    fontWeight: '500',
    color: Colors.neutrals_700,
  },
  txtPrice: {
    fontWeight: '500',
    color: Colors.brand_01,
  },
  txtRed: {
    fontWeight: '500',
    color: Colors.semantics_Red_02,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
