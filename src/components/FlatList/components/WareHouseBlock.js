import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {MyView, MyText} from '~components/MyStyles';
import Icon from '~components/IconXML';
import LocalDB from '~data/asyncStorage';
import NoImage from '~assets/images/imageAvailable.png';

import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';
const WareHouseList = ({data, index, onPress}) => {
  const [urlWeb, setUrlWeb] = useState('');
  const {t} = useTranslation();

  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  useEffect(() => {
    LocalDB.getUserData().then(data => setUrlWeb(data?.ViewImageUrl));
  }, []);
  return (
    <MyView style={styles.boxProduct}>
      <MyView style={styles.topBox}>
        <MyView style={styles.status}>
          <Icon name="wifiLinear" width="24" height="24" />
          <MyText style={styles.txtID}>{data?.MaSanPham}</MyText>
        </MyView>
        <MyText style={styles.txtRemaining}>
          {t('remaining')}: {data?.SoLuong}
        </MyText>
      </MyView>
      <MyView style={styles.bodyBox}>
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
          {data?.GiamGia !== 0 && (
            <MyView style={styles.boxStart}>
              <Icon name="start" width="14" height="14" />
            </MyView>
          )}
        </MyView>
        <MyView style={styles.bodyBoxRight}>
          <MyText style={styles.txtNameProduct}>{data?.TenSanPham}</MyText>
          <MyView style={styles.Price}>
            <MyText style={styles.txtPrice}>
              {!data?.GiaSauGiam
                ? t('contactPrice')
                : formatPrice(data?.GiaSauGiam)}
            </MyText>
            {data?.GiamGia !== 0 && (
              <MyText style={styles.txtOldPrice}>
                {formatPrice(data?.GiaBan)}
              </MyText>
            )}
          </MyView>
          <MyView style={styles.bottom_RightBox}>
            <MyView style={styles.wanrranty}>
              <MyText style={styles.txtWanrranty}>{t('lifeWarranty')}</MyText>
            </MyView>
            <TouchableOpacity
              onPress={() => onPress(data)}
              style={styles.btnAdd}>
              <Icon name="plusBGLinear" width="30" height="30" />
            </TouchableOpacity>
          </MyView>
        </MyView>
      </MyView>
    </MyView>
  );
};

export default WareHouseList;

const styles = StyleSheet.create({
  boxProduct: {
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingVertical: parseSizeHeight(10),
    paddingHorizontal: Sizes.paddingWidth,
    gap: parseSizeHeight(6),
    marginVertical: parseSizeHeight(6),
  },
  topBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  status: {
    flexDirection: 'row',
    gap: parseSizeWidth(5),
    alignItems: 'center',
  },
  txtID: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',

    textAlign: 'left',
    color: Colors.brand_01,
  },
  txtRemaining: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    textAlign: 'right',
    color: Colors.neutrals_700,
    width: parseSizeWidth(100),
  },
  bodyBox: {
    flexDirection: 'row',
    gap: parseSizeWidth(22),
  },
  bodyBoxRight: {
    gap: parseSizeHeight(8),
  },
  image: {
    width: parseSizeWidth(92),
    height: parseSizeHeight(103),
    borderRadius: 8,
  },
  imageProduct: {
    width: parseSizeWidth(92),
    height: parseSizeHeight(103),
    borderRadius: 8,
  },
  txtNameProduct: {
    fontFamily: FontStyles.InterRegular,
    width: parseSizeWidth(228),
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  Price: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtPrice: {
    fontFamily: FontStyles.InterSemiBold,
    fontWeight: '600',

    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  txtOldPrice: {
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    textAlign: 'right',
    color: Colors.neutrals_700,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.neutrals_700,
  },
  bottom_RightBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wanrranty: {
    width: parseSizeWidth(131),
    height: parseSizeHeight(24),
    borderRadius: 100,
    backgroundColor: Colors.semantics_Yellow_03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtWanrranty: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.accent_yellow,
  },
  btnAdd: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxStart: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: Colors.neutrals_50,
    position: 'absolute',
    right: parseSizeWidth(8),
    top: parseSizeHeight(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
