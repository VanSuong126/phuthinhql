import React, {useState} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';

import currencyFormat from '~helper/currencyFormat';
import Line from '~components/Line';
import Icon from '~components/IconXML';
import {MyText, MyView} from '~components/MyStyles';
import {
  Colors,
  Sizes,
  FontStyles,
  parseSizeWidth,
  parseSizeHeight,
} from '~theme';
import moment from 'moment';

const formatPhoneNumber = phoneNumber => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);

  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }

  return phoneNumber;
};

const Index = ({data, onPress}) => {
  const {t} = useTranslation();
  const [checkbox, setCheckBox] = useState(data?.isCheck);
  const fomatDate = moment(data?.NgayDatHang).format('DD/MM/YYYY');
  const fomatDateTime = moment(data?.NgayDatHang).format('HH:mm:ss');
  return (
    <MyView style={styles.box}>
      <MyView style={styles.horizontal}>
        <MyView style={styles.horizontal}>
          <Icon name="calendar" width="18" height="18" />
          <MyText style={styles.txtGrey}>{fomatDate}</MyText>
        </MyView>
        <MyView style={styles.horizontal}>
          <Icon name="stopWatch" width="18" height="18" />
          <MyText style={styles.txtGrey}>{fomatDateTime}</MyText>
        </MyView>
      </MyView>
      <Line color={Colors.neutrals_300} />
      <MyText style={styles.name}>{data?.NguoiNhan}</MyText>
      <MyView style={styles.horizontal}>
        <MyView style={styles.horizontal}>
          <Icon name="barcode" width="18" height="18" />
          <MyText style={styles.txtGrey}>{data?.MaDonChung}</MyText>
        </MyView>
        <MyView style={styles.horizontal}>
          <Icon
            color={Colors.semantics_Black}
            name="order"
            width="18"
            height="18"
          />
          <MyText style={styles.txtGrey}>2</MyText>
        </MyView>
      </MyView>
      <MyView style={styles.horizontal}>
        <MyView style={styles.horizontal}>
          <Icon name="phone" width="18" height="18" />
          <MyText style={styles.txtGrey}>
            {formatPhoneNumber(data?.DienThoaiKhachHang)}
          </MyText>
        </MyView>
        <MyText style={styles.txtPrice}>
          {currencyFormat(data?.TongSoTienThanhToan)}
        </MyText>
      </MyView>
      <MyView style={[styles.horizontal, styles.bottom]}>
        <Pressable
          onPress={() =>
            onPress({...data, isCheck: !data?.isCheck}, setCheckBox(!checkbox))
          }>
          <Icon
            name={checkbox === true ? 'checked' : 'unChecked'}
            width={parseSizeWidth(20)}
            height={parseSizeHeight(20)}
          />
        </Pressable>
        <MyText
          style={[
            styles.txtStatus,
            data?.TinhTrangDonHang !== 'Hủy đơn' && styles.txtStatusGreen,
          ]}>
          {data?.TinhTrangDonHang}
        </MyText>
      </MyView>
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  wrapCheck: {
    flexDirection: 'row',
  },
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.content,
  },
  textTitleCheck: {
    fontFamily: FontStyles.InterRegular,
    marginTop: parseSizeHeight(2),
    marginLeft: parseSizeWidth(10),
    fontSize: Sizes.text_tagline1,
    color: Colors.neutrals_700,
  },
  iconcheck: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.danger,
  },
  txtStatusGreen: {
    backgroundColor: Colors.semantics_Green_03,
    color: Colors.brand_01,
  },
  txtStatus: {
    borderRadius: 100,
    backgroundColor: Colors.semantics_Red_03,
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.semantics_Red_01,
    paddingHorizontal: parseSizeWidth(15),
    paddingVertical: parseSizeHeight(5),
  },
  bottom: {
    marginTop: Sizes.spacing_1_Height,
  },
  txtPrice: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.semantics_Yellow_02,
  },
  name: {
    fontSize: Sizes.text_subtitle1,
  },
  line: {
    marginVertical: 10,
  },
  txtGrey: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.neutrals_700,
    marginLeft: parseSizeWidth(10),
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: Colors.neutrals_100s,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingVertical: Sizes.spacing_4_Height,
    paddingHorizontal: Sizes.spacing_4_Height,
    gap: Sizes.spacing_3_Height,
  },
});
