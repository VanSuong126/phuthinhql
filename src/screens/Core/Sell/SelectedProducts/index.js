import { TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import FlatList from '~components/FlatList';
import formatPrice from '~helper/formatPrice';


import { salesActions, salesSelectors } from '~redux/reducers';
import styles from './styles';
import {
  MyView,
  MyText,
  MySafeAreaView,
} from '~components/MyStyles';
import Icon from '~components/IconXML';
import Bottom from '~components/Bottom';
import LocalDB from '~data/asyncStorage';
import ModalSaleOff from '~modals/ModalSaleOff';
const Index = () => {
  const navigation = useNavigation();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [urlWeb, setUrlWeb] = useState('');
  const [productCodeDiscount, setProductCodeDiscount] = useState(null);
  const [visibleModalSaleOff, setVisibleModalSaleOff] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [listProduct, setListProduct] = useState([]);
  //lấy link weburl
  useEffect(() => {
    LocalDB.getUserData().then(data => setUrlWeb(data?.ViewImageUrl));
  }, []);

  // lấy data từ selector
  const orderData = useSelector(state => salesSelectors.selectDataSales(state));

  useEffect(() => {
    if (orderData) {
      getDataTotal(orderData?.sanphamdachon);
      setListProduct(orderData?.sanphamdachon);
    }
  }, [orderData]);

  const getDataTotal = (listProduct) => {
    if (!listProduct) return;
    const numberSales = listProduct
      .map(item => item?.SoLuongMua)
      .reduce((a, b) => a + b, 0);

      const discount = listProduct
      .map(item => (item?.GiaGiamTienMat *item?.SoLuongMua) + (item?.GiaSauGiam * item?.TiLeGiam *0.01)*item?.SoLuongMua)
      .reduce((a, b) => a + b, 0);

    const priceOrigin = listProduct
      .map(item => (item?.GiaSauGiam)*item?.SoLuongMua)
      .reduce((a, b) => a + b, 0);

    setTotalQuantity(numberSales);
    setTotalPrice(priceOrigin - discount > 0 ? priceOrigin - discount : 0);
    setTotalDiscount(discount);
  };

  const updateQuantity = async (value, MaSanPham) => {
    const updatedProducts = listProduct.map(product => {
      if (product.MaSanPham === MaSanPham) {
        const updatedQuantity = value;
        return {
          ...product,
          SoLuongMua: updatedQuantity,
        };
      }
      return product;
    });
    dispatch(salesActions.setDataSales({ ...orderData, sanphamdachon: updatedProducts }));
  };

  const deleteProduct = async (MaSanPham) => {
    const updatedProducts = listProduct.filter(product => product?.MaSanPham !== MaSanPham);

    dispatch(salesActions.setDataSales({
      ...orderData,
      sanphamdachon: updatedProducts
    }));
  };

  const handleOnPress = data => {
    const { action, value, productCode } = data;

    switch (action) {
      case 'updateQuantity':
        updateQuantity(value, productCode);
        break;

      case 'openModalSaleOff':
        setVisibleModalSaleOff(true);
        setProductCodeDiscount(productCode);
        break;

      case 'deleteProduct':
        deleteProduct(productCode);
        break;

      default:
        console.log('Unknown action');
    }
  };
  const handleDiscountByID = data => {
    if (data) {
      setVisibleModalSaleOff(false);
      dispatch(salesActions.setDataSales({ ...orderData, sanphamdachon: data }));
    }
  };

  const handleContinue = () => {
    if(orderData?.sanphamdachon?.length > 0) {
      dispatch(salesActions.setDataSales({ ...orderData, sotiengiamtrensanpham: totalDiscount }));
      if(orderData?.idkhachhang) {
              navigation.navigate('dich-vu-cong-them');
      }
      else {
        navigation.navigate('thong-tin-khach-hang');
      }
    }
    else {
      Toast.show({
        type: 'error',
        props: { message: t('emptyProduct') },
      });
    }
  };

  return (
    <MySafeAreaView style={styles.container}>
      <MyView style={styles.header}>
        <MyText style={styles.txtHeader}>{t('selectedProduct')}</MyText>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconHeader}>
          <Icon name="renew" width="24" height="24" />
        </TouchableOpacity>
      </MyView>
      <MyView style={styles.total}>
        <MyView style={styles.contentTotal}>
          <MyText style={styles.txtTitle}>{t('quantity')}:</MyText>
          <MyText style={styles.txtContent}>{totalQuantity}</MyText>
        </MyView>
        <MyView style={styles.contentTotal}>
          <MyText style={styles.txtTitle}>{t('discount')}:</MyText>
          <MyText style={styles.txtContent}>{formatPrice(totalDiscount)}đ</MyText>
        </MyView>
        <MyView style={styles.contentTotal}>
          <MyText style={styles.txtTitle}>{t('priceAfterDiscount')}:</MyText>
          <MyText style={styles.txtContent}>{formatPrice(totalPrice)}đ</MyText>
        </MyView>
      </MyView>
      <MyView style={styles.body}>
        <FlatList
          data={listProduct}
          onPress={data => handleOnPress(data)}
          loading={false}
          fetching={false}
          type="productSelected"
        />
      </MyView>
      <Bottom
        titleBtn1={t('addProduct')}
        titleBtn2={t('continue')}
        onPress1={() => navigation.navigate('kho-hang')}
        onPress2={() => handleContinue()}
      />
      <ModalSaleOff
        isVisible={visibleModalSaleOff}
        listProduct={listProduct}
        productCode={productCodeDiscount}
        onClose={() => setVisibleModalSaleOff(false)}
        onApply={data => handleDiscountByID(data)}
      />
    </MySafeAreaView>
  );
};

export default Index;
