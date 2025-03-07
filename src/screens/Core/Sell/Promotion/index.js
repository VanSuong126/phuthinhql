import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

import HeaderToolBar from '~components/headers/HeaderToolBar';
import fetchData from '~providers';
import ItemDiscount from '~assets/images/Coupon.png';
import formatPrice from '~helper/formatPrice';
import Button from '~buttons/MyButton';

import {
  MyView,
  MyText,
  MySafeAreaView,
  MyImageBackground,
  MyScrollView,
} from '~components/MyStyles';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';
import InputSearch from '~inputs/InputSearch';
import {
  commonSelectors,
  commonActions,
  salesActions,
  salesSelectors,
} from '~redux/reducers';

const Index = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const listDiscountData = useSelector(state =>
    commonSelectors.selectListDiscount(state),
  );

  const orderData = useSelector(state => salesSelectors.selectDataSales(state));

  const [stringSearch, setStringSearch] = useState('');
  const [billingDiscounts, setBillingDiscounts] = useState([]);
  const [productDiscounts, setProductDiscounts] = useState([]);
  const [freeShipDiscounts, setFreeShipDiscounts] = useState([]);

  useEffect(() => {
    // filter list follow type
    const billingDiscounts = listDiscountData.filter(
      item => item?.LoaiGiamGia === 'BILLING',
    );
    const productDiscounts = listDiscountData.filter(
      item => item?.LoaiGiamGia === 'PRODUCT',
    );
    const freeShipDiscounts = listDiscountData.filter(
      item => item?.LoaiGiamGia === 'FREESHIP',
    );
    setBillingDiscounts(billingDiscounts);
    setProductDiscounts(productDiscounts);
    setFreeShipDiscounts(freeShipDiscounts);
  }, [listDiscountData]);

  //check promotion code
  const handleSearch = () => {
    if (stringSearch) {
      const isExist = listDiscountData.some(
        item => item.MaGiamGia === stringSearch,
      );
      if (!isExist) {
        fetchData(
          dispatch,
          'checkDiscountCode',
          {loai: 62, magiamgias: stringSearch},
          res => {
            if (res.success === true) {
              // add new code into List
              const updatedList = [...listDiscountData, res.data];
              dispatch(commonActions.setListDiscount(updatedList));
            } else {
              Toast.show({
                type: 'error',
                props: {message: t('promoCodeError')},
              });
            }
          },
        );
      }
    }
  };

  const handleSelect = item => {
    // Clone discount data
    const maGiamGias = orderData?.magiamgia || [];
    // Check if item already exists by MaGiamGia
    const isDuplicate = maGiamGias.some(mg => mg.MaGiamGia === item.MaGiamGia);
    let maGiamGiaNew;
    if (isDuplicate) {
      // If duplicate, remove the item
      maGiamGiaNew = maGiamGias.filter(mg => mg.MaGiamGia !== item.MaGiamGia);
    } else {
      // If not, remove by LoaiGiamGia and add the new item
      const filtered = maGiamGias.filter(
        mg => mg.LoaiGiamGia !== item.LoaiGiamGia,
      );
      maGiamGiaNew = [...filtered, item];
    }
    // Update orderData with the new discount list
    dispatch(
      salesActions.setDataSales({...orderData, magiamgia: maGiamGiaNew}),
    );
    console.log(maGiamGiaNew);
  };

  const renderDiscountList = (discounts, title) => {
    return (
      <MyView style={styles.discountSection}>
        <MyText style={styles.sectionTitle}>{title}</MyText>
        {discounts.map((item, index) => {
          // Kiểm tra nếu MaGiamGia đã có trong orderData.magiamgia
          const isSelected = orderData?.magiamgia?.some(
            discount => discount.MaGiamGia === item.MaGiamGia,
          );

          return (
            <MyImageBackground
              key={index}
              style={styles.discountItem}
              source={ItemDiscount}>
              <MyView style={styles.wrapTitleType}>
                <MyText style={styles.textTitleType}>
                  {t(item?.LoaiGiamGia)}
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfoDiscount}>
                <MyText style={styles.textTitleDiscount}>
                  {t('discountCode')}:
                  <MyText style={styles.textCode}> {item?.MaGiamGia}</MyText>
                </MyText>
                {item?.TyLeGiamGia > 0 ? (
                  <MyText style={styles.textDiscountValue}>
                    {' '}
                    {item?.TyLeGiamGia}%
                  </MyText>
                ) : (
                  <MyText style={styles.textDiscountValue}>
                    {' '}
                    {formatPrice(item?.SoTienGiamGia || item?.SoTienGiam)}đ
                  </MyText>
                )}
                <MyView style={styles.wrapButton}>
                  <Button
                    styleButton={[
                      styles.button,
                      isSelected ? styles.buttonSelected : styles.buttonDefault,
                    ]}
                    title={isSelected ? t('selected') : t('select')}
                    type={isSelected ? 1 : 2}
                    onPress={() => handleSelect(item)}
                  />
                </MyView>
              </MyView>
            </MyImageBackground>
          );
        })}
      </MyView>
    );
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('promotionCode')} />
      <MyView style={styles.content}>
        <InputSearch
          styleInputSearch={styles.search}
          value={stringSearch}
          type="Secondary"
          placeholder={t('search')}
          getString={value => setStringSearch(value)}
          onSearch={handleSearch}
        />
        <MyScrollView style={{flex: 1}}>
          {/* Render danh sách khuyến mãi theo loại */}
          {renderDiscountList(billingDiscounts, t('billingDiscount'))}
          {renderDiscountList(productDiscounts, t('productDiscount'))}
          {renderDiscountList(freeShipDiscounts, t('freeShipDiscount'))}
        </MyScrollView>
      </MyView>
    </MySafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  search: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: parseSizeWidth(15),
    marginTop: Sizes.spacing_3_Height,
  },
  content: {
    flex: 1,
    gap: parseSizeHeight(16),
    backgroundColor: Colors.background,
  },
  discountSection: {
    marginTop: parseSizeHeight(10),
    backgroundColor: Colors.neutrals_100,
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(10),
  },
  sectionTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    color: Colors.semantics_Black,
  },
  discountItem: {
    height: parseSizeHeight(122),
    flexDirection: 'row',
    backgroundColor: Colors.neutrals_100,
    padding: parseSizeWidth(10),
    borderRadius: 10,
    marginVertical: parseSizeHeight(5),
  },
  wrapTitleType: {
    transform: [{rotate: '-90deg'}],
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: parseSizeWidth(24),
  },
  textTitleType: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_h5,
    color: Colors.semantics_Yellow_02,
  },
  wrapInfoDiscount: {
    flex: 1,
    marginLeft: parseSizeWidth(50),
    gap: parseSizeHeight(10),
  },
  textTitleDiscount: {
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    fontSize: Sizes.text_subtitle1,
    color: Colors.semantics_Grey,
  },
  textCode: {
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    fontSize: Sizes.text_subtitle1,
    color: Colors.semantics_Black,
  },
  textDiscountValue: {
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    fontSize: Sizes.text_h5,
    color: Colors.semantics_Black,
  },
  wrapButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: parseSizeWidth(16),
    paddingVertical: parseSizeHeight(8),
    borderColor: Colors.neutrals_300,
    borderWidth: 1,
  },
  buttonSelected: {},
  buttonDefault: {},
});
