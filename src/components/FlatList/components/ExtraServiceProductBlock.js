import {StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import {MyView, MyText, MyTouchableOpacity} from '~components/MyStyles';
import LocalDB from '~data/asyncStorage';
import formatPrice from '~helper/formatPrice';
import NoImage from '~assets/images/imageAvailable.png';
import Line from '~components/Line';
import Icon from '~components/IconXML';

import {
  Colors,
  Sizes,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
const Index = ({data, onPress}) => {
  const [urlWeb, setUrlWeb] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    LocalDB.getUserData().then(data => setUrlWeb(data?.ViewImageUrl));
  }, []);
  return (
    <MyView style={styles.box} key={data.IDDichVuCongThem}>
      <MyView style={styles.wrapTop}>
        <MyView style={styles.image}>
          {data?.URLImage ? (
            <Image
              source={{uri: urlWeb + data?.URLImage}}
              style={styles.imageProduct}
              resizeMode="stretch"
            />
          ) : (
            <Image
              source={NoImage}
              style={styles.imageProduct}
              resizeMode="cover"
            />
          )}
        </MyView>
        <MyView style={styles.wrapTop_Right}>
          <MyText style={styles.txtName}>{data?.TenSanPham}</MyText>
          <MyView style={styles.wrapTop_Right_Bottom}>
            <MyView style={styles.content}>
              <MyText style={styles.txtTitle}>SL:</MyText>
              <MyText style={styles.txtContent}>{data?.SoLuongMua}</MyText>
            </MyView>
            <MyView style={styles.content}>
              <MyText style={styles.txtTitle}>{t('price')}:</MyText>
              <MyText style={styles.txtContent}>
                {formatPrice(data?.GiaSauGiam)}đ
              </MyText>
            </MyView>
          </MyView>
        </MyView>
      </MyView>
      <MyTouchableOpacity
        onPress={() =>
          onPress({action: 'addNote', productCode: data?.MaSanPham})
        }
        style={styles.btnChoseService}>
        <MyText style={styles.txtButton}>Chọn dịch vụ</MyText>
      </MyTouchableOpacity>

      {data?.GhiChuTang && data.GhiChuTang.length > 0
        ? data.GhiChuTang.map((ghiChu, index) => (
            <MyView style={styles.wrapNote} key={index}>
              <Line color={Colors.neutrals_300} thickness={2} />
              <MyView style={styles.wrapRelation}>
                <MyText style={styles.textRelation}>
                  {' '}
                  {t('to')}: {ghiChu?.MoiQuanHe}
                </MyText>
                <MyTouchableOpacity
                  onPress={() => onPress({action: 'viewNote',productCode: data?.MaSanPham, ghiChu: ghiChu})}>
                  <Icon name="threeDot" width="19" height="18" />
                </MyTouchableOpacity>
              </MyView>
              <MyText style={styles.textName}>
                {ghiChu?.HoTen}({moment(ghiChu?.NgaySinh).format('DD/MM/YYYY')})
              </MyText>
            </MyView>
          ))
        : null}
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.neutrals_100,
    borderColor: Colors.neutrals_300,
    borderRadius: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: Sizes.marginHeight,
    paddingHorizontal: parseSizeWidth(9),
    paddingVertical: parseSizeHeight(10),
  },
  btnChoseService: {
    alignItems: 'center',
    backgroundColor: Colors.semantics_SmokyGrey,
    borderRadius: 100,
    height: parseSizeHeight(24),
    justifyContent: 'center',
    marginTop: Sizes.spacing_4_Height,
    width: parseSizeWidth(110),
  },
  container: {
    flex: 1,
    paddingHorizontal: Sizes.paddingHeight,
  },
  content: {
    flexDirection: 'row',
    gap: 5,
  },
  image: {
    backgroundColor: 'red',
    borderRadius: 8,
    height: parseSizeHeight(87),
    marginRight: parseSizeWidth(20),
    width: parseSizeWidth(75),
  },
  imageProduct: {
    borderRadius: 8,
    height: parseSizeHeight(87),
    width: parseSizeWidth(75),
  },
  txtButton: {
    fontFamily: FontStyles.InterRegular,
    color: Colors.semantics_Grey,
    fontSize: Sizes.text_tagline1,
  },
  txtContent: {
    fontFamily: FontStyles.InterRegular,
    color: Colors.semantics_Yellow_02,
    fontWeight: '500',
    textAlign: 'center',
  },
  txtName: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    textAlign: 'left',
    width: parseSizeWidth(228),
  },
  txtTitle: {
    fontFamily: FontStyles.InterRegular,
    color: Colors.neutrals_700,
    fontWeight: '500',
    textAlign: 'center',
  },
  wrapTop: {
    flexDirection: 'row',
  },
  wrapTop_Right: {
    justifyContent: 'space-between',
    paddingVertical: Sizes.spacing_1_Height,
  },
  wrapTop_Right_Bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapNote: {
    gap: Sizes.spacing_2_Height,
    paddingVertical: parseSizeHeight(5),
    marginVertical: parseSizeHeight(5),
  },
  wrapRelation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textRelation: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '600',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  textName: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.semantics_Grey,
    textAlign: 'left',
  },
});
