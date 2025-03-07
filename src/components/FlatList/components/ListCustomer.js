import React from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

import currencyFormat from '~helper/currencyFormat';
import DateComparison from '~components/DateComparison';
import Line from '~components/Line';
import {MyText, MyView} from '~components/MyStyles';
import {Colors, Sizes, FontStyles, parseSizeWidth} from '~theme';
import {Pressable} from 'react-native';
import truncateText from '~helper/truncateText';
const age = dateOfBirth => {
  const birthDate = moment(dateOfBirth);
  const today = moment();
  const age = today.diff(birthDate, 'years');
  return age;
};

const formatPhoneNumber = phoneNumber => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  if (cleaned.length !== 10) {
    const match = cleaned.match(/(\d{4})(\d{4})(\d{3})/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
  }
  const match = cleaned.match(/(\d{4})(\d{3})(\d{3})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
};

const ListCustomer = ({data, onPress, isSelected}) => {
  const {t} = useTranslation();
  const fomatDate = moment(data?.ngaySinh).format('DD/MM/YYYY');
  const isSelectedItem = isSelected.some(item => item === data.idKhachHang);

  return (
    <Pressable
      onPress={() => onPress(data)}
      style={[styles.item, isSelectedItem && styles.selectedItem]}>
      <MyView style={styles.linearHorizontal}>
        <MyText style={styles.txtName}>
          {`${data?.tenKhachHang} (${age(data?.ngaySinh)} ${t('age')})`}
        </MyText>
        <DateComparison dateToCompare={data?.ngaySinh} />
      </MyView>
      <Line color={Colors.neutrals_200} />
      <MyView>
        <MyView style={styles.linearHorizontal}>
          <MyText style={styles.txtBlack}>{fomatDate}</MyText>
          <MyView style={[styles.linearHorizontal, styles.rightContentItem]}>
            <MyText style={styles.txtBlack}>{data?.tongSoDonHang}</MyText>
            <MyText style={styles.txtGrey}>{t('order')}</MyText>
          </MyView>
        </MyView>
        <MyView style={styles.linearHorizontal}>
          <MyText style={styles.txtGrey}>
            {formatPhoneNumber(data?.soDienThoai)}
          </MyText>
          <MyView style={[styles.linearHorizontal, styles.rightContentItem]}>
            <MyText style={styles.txtBlack}>{data?.tongSoSanPham}</MyText>
            <MyText style={styles.txtGrey}>{t('product')}</MyText>
          </MyView>
        </MyView>
        <MyView style={styles.linearHorizontal}>
          <MyText style={styles.txtGrey}>
            {truncateText(data?.email, 23)}
          </MyText>
          <MyText style={styles.txtPrice}>
            {currencyFormat(data?.tongTien)}
          </MyText>
        </MyView>
      </MyView>
    </Pressable>
  );
};

export default ListCustomer;

const styles = StyleSheet.create({
  selectedItem: {
    backgroundColor: Colors.semantics_Green_03,
    borderColor: Colors.semantics_Green_02,
  },
  txtPrice: {
    fontStyle: FontStyles.InterMedium,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.semantics_Yellow_02,
  },
  rightContentItem: {
    gap: Sizes.spacing_1_Width,
  },
  txtGrey: {
    fontStyle: FontStyles.InterMedium,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.neutrals_700,
  },
  txtBlack: {
    fontStyle: FontStyles.InterMedium,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
  },
  txtName: {
    fontStyle: FontStyles.InterMedium,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.neutrals_900,
    width: parseSizeWidth(210),
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
