import React from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import Line from '~components/Line';
import {MyText, MyTouchableOpacity, MyView} from '~components/MyStyles';
import {
  Colors,
  Sizes,
  FontStyles,
  parseSizeWidth,
  parseSizeHeight,
} from '~theme';

const ListCustomer = ({data, onPress}) => {
  const {t} = useTranslation();
  const fomatDate = moment(data?.DenNgay).format('DD/MM/YYYY');
  return (
    <MyView style={styles.item}>
      <MyView style={styles.linearHorizontal}>
        <MyText style={styles.txtNameDiscount}>{`${
          data?.NoiBo === 0
            ? `${data?.MaGiamGia} - ${t('internal')}`
            : data?.MaGiamGia
        }`}</MyText>
        <MyTouchableOpacity
          onPress={() => onPress(data?.MaGiamGia)}
          style={styles.btnDelete}>
          <MyText style={styles.txtDelete}>{t('delete')}</MyText>
        </MyTouchableOpacity>
      </MyView>
      <Line color={Colors.neutrals_200} />
      <MyText style={styles.txtGrey}>{data?.TenLoaiGiamGia}</MyText>
      <MyView style={styles.linearHorizontal}>
        <MyView style={styles.linearHorizontal}>
          <MyText style={styles.txtGrey}>{t('expired')}</MyText>
          <MyText style={styles.txtBlack}>{fomatDate}</MyText>
        </MyView>
        <MyView style={styles.linearHorizontal}>
          <MyText style={styles.txtGrey}>{t('numberOfTime')}</MyText>
          <MyText style={styles.txtBlack}>{data?.SoLanSuDung}</MyText>
        </MyView>
      </MyView>
    </MyView>
  );
};

export default ListCustomer;

const styles = StyleSheet.create({
  txtDelete: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.semantics_Red_01,
  },
  btnDelete: {
    width: parseSizeWidth(52),
    height: parseSizeHeight(26),
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.semantics_Red_03,
  },
  txtNameDiscount: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.semantics_Yellow_02,
  },
  txtGrey: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.neutrals_700,
  },
  txtBlack: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    marginLeft: Sizes.spacing_1_Height,
  },
  item: {
    width: parseSizeWidth(342),
    backgroundColor: Colors.neutrals_50,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    borderRadius: Sizes.spacing_4_Width,
    paddingHorizontal: Sizes.spacing_5_Width,
    paddingVertical: Sizes.spacing_3_Height,
    gap: Sizes.spacing_2_Height,
  },
  linearHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
