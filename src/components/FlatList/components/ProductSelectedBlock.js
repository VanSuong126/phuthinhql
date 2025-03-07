import {StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {MyView, MyText} from '~components/MyStyles';
import LocalDB from '~data/asyncStorage';
import PlusAndMinus from '~components/PlusAndMinus';
import formatPrice from '~helper/formatPrice';
import Button from '~buttons/MyButton';
import NoImage from '~assets/images/imageAvailable.png';

import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';
const Index = ({data, onPress}) => {
  const [urlWeb, setUrlWeb] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    LocalDB.getUserData().then(data => setUrlWeb(data?.ViewImageUrl));
  }, []);
  const sumDiscount =
    data?.GiaGiamTienMat + data?.GiaSauGiam * data?.TiLeGiam * 0.01;
  return (
    <MyView style={styles.boxProduct}>
      <MyView style={styles.content}>
        <MyView style={styles.groupBox}>
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
          <MyView style={styles.wrapNameProduct}>
            <MyText style={styles.txtNameProduct}>{data?.TenSanPham}</MyText>
            <MyView style={styles.wrapPrice}>
              <MyText style={styles.textPrice}>
                {formatPrice(data?.GiaSauGiam)}đ
              </MyText>
              <MyView>
                <PlusAndMinus
                  onCountChange={val =>
                    onPress({
                      action: 'updateQuantity',
                      value: val,
                      productCode: data?.MaSanPham,
                    })
                  }
                  initCount={data?.SoLuongMua}
                />
              </MyView>
            </MyView>
          </MyView>
        </MyView>
        <MyView style={styles.wrapDiscount}>
          <MyText style={styles.textProductCode}>{data?.MaSanPham}</MyText>
          <MyText style={styles.textDiscount}>
            {t('discount')}:
            <MyText style={styles.textPriceDiscount}>
              {formatPrice(sumDiscount)}đ
            </MyText>
          </MyText>
        </MyView>
        <MyView style={styles.wrapButton}>
          <Button
            size="custom"
            onPress={() =>
              onPress({
                action: 'openModalSaleOff',
                productCode: data?.MaSanPham,
              })
            }
            title={t('discount')}
            type={3}
            ColorButton={Colors.semantics_SmokyGrey}
            txtCustom={styles.textBtnDiscount}
            widthSizeView={85}
          />
          <Button
            size="custom"
            onPress={() =>
              onPress({action: 'deleteProduct', productCode: data?.MaSanPham})
            }
            title={t('delete')}
            type={3}
            ColorButton={Colors.semantics_Red_03}
            txtCustom={styles.textBtnDelete}
          />
        </MyView>
      </MyView>
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  boxProduct: {
    backgroundColor: Colors.neutrals_100,
    marginVertical: parseSizeHeight(8),
  },
  content: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Colors.neutrals_300,
    paddingVertical: parseSizeHeight(10),
    paddingHorizontal: parseSizeWidth(10),
    gap: parseSizeHeight(16),
  },
  groupBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: parseSizeWidth(10),
  },
  wrapNameProduct: {
    flex: 1,
    paddingLeft: parseSizeWidth(20),
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 8,
  },
  wrapDiscount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textProductCode: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.neutrals_700,
  },
  imageProduct: {
    width: parseSizeWidth(92),
    height: parseSizeHeight(103),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  txtNameProduct: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  wrapPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textPrice: {
    fontFamily: FontStyles.InterSemiBold,
    fontWeight: '500',
    fontSize: Sizes.text_subtitle1,
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  textPriceDiscount: {
    fontFamily: FontStyles.InterSemiBold,
    fontWeight: '500',
    fontSize: Sizes.text_subtitle1,
    textAlign: 'left',
    color: Colors.semantics_Yellow_02,
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
  wrapButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBtnDelete: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.semantics_Red_01,
  },
  textBtnDiscount: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
});
