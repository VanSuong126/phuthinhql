import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { MyView, MyText, MySafeAreaView } from '~components/MyStyles';
import styles from './styles';
import InputSearch from '~inputs/InputSearch';
import Bottom from '~components/Bottom';
import FlatList from '~components/FlatList';
import { commonActions, commonSelectors, salesActions, salesSelectors } from '~redux/reducers';
import fetchData from '~providers';
import formatPrice from '~helper/formatPrice';
import ModalContactPrice from '~modals/ModalContactPrice';


const Index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [numberSales, setNumberSales] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [activeLoadMore, setActiveLoadMore] = useState(true);
  const [stringSearch, setStringSearch] = useState('');

  const [visibleModalContactPrice, setVisibleModalContactPrice] = useState(false);
  const [productUpdate, setProductUpdate] = useState();


  const products = useSelector(state => commonSelectors.selectListProduct(state));
  const orderData = useSelector(state => salesSelectors.selectDataSales(state));

  useEffect(() => {
    if (orderData?.sanphamdachon) {
      const numberSales = orderData?.sanphamdachon
        .map(item => item?.SoLuongMua)
        .reduce((a, b) => a + b, 0);
      const totalPrice = orderData?.sanphamdachon
        .map(item => item?.GiaSauGiam * item?.SoLuongMua)
        .reduce((a, b) => a + b, 0);
      setNumberSales(numberSales);
      setTotalPrice(totalPrice);
    }
  }, [orderData]);

  const handleFindProduct = () => {
    dispatch(commonActions.setListProduct({ reset: true }));
    setPage(1);
    toggleLoading(true);
    fetchData(dispatch, 'getDataWareHouse', { loai:5,numberPage: 1, keyword: stringSearch }, (res) => {
      if (res?.success === true) {
        dispatch(commonActions.setListProduct(res?.data));
        if (res?.data.length === 10) {
          setActiveLoadMore(true);
          toggleLoading(false);
        } else {
          setActiveLoadMore(false);
          toggleLoading(false);
        }
      }
      else {
        setActiveLoadMore(false);
        toggleLoading(false);
      }
    });
  };

  const handleLoadMore = () => {
    if (!loading && !fetching && activeLoadMore) {
      const nextPage = page + 1;
      toggleLoading(true);
      fetchData(dispatch, 'getDataWareHouse', {loai:5, numberPage: nextPage, keyword: stringSearch }, (res) => {
        if (res?.success === true) {
          dispatch(commonActions.setListProduct(res?.data));
          if (res?.data.length === 10) {
            setActiveLoadMore(true);
            toggleLoading(false);
          } else {
            setActiveLoadMore(false);
            toggleLoading(false);
          }
        }
        else {
          setActiveLoadMore(false);
          toggleLoading(false);
        }
      });
      setPage(nextPage);
      toggleLoading(true);
    }
  };

  const toggleLoading = async (bool = false) => {
    if (page === 1) {
      setLoading(bool);
    } else {
      setFetching(bool);
    }
  };
  const handleAdd = async data => {
    if(data?.SoLuong<1)
    {
      Toast.show({
        type: 'warning',
        props: { message: t('outOfStock') },
      });
      return;
    }
    let productExists = false;
    let updatedProducts = [];

    // Kiểm tra xem danh sách sản phẩm đã chọn có tồn tại không
    if (orderData?.sanphamdachon) {
      // Duyệt qua danh sách sản phẩm đã chọn
      updatedProducts = orderData.sanphamdachon.map(product => {
        if (product.IDSanPham === data?.IDSanPham) {
          // Nếu sản phẩm đã tồn tại, tăng số lượng 
          productExists = true;
          const updatedQuantity = product.SoLuongMua + 1;
          return {
            ...product,
            SoLuongMua: updatedQuantity,
          };
        }
        return product;
      });
    }

    // Nếu sản phẩm không tồn tại trong danh sách, thêm sản phẩm mới
    if (!productExists) {
      if (data?.GiaSauGiam > 0) {
        updatedProducts.push({
          IDSanPham: data?.IDSanPham,
          SoLuongMua: 1,
          GiaBan: data?.GiaBan,
          GiaSauGiam: data?.GiaSauGiam,
          ThoiGianBaoHanh: data?.ThoiGianBaoHanh,
          KhoiLuong: data?.KhoiLuong,
          GiaGiamTienMat: 0,
          TiLeGiam: 0,
          MaSanPham: data?.MaSanPham,
          TenSanPham: data?.TenSanPham,
          URLImage: data?.URLImage,
          BaoHanh: false,
          SuaChua: false,
        });
      }
      else {
        if (data?.SanPhamTrucTuyen === 2) {
          navigation.navigate('bao-hanh-sua-chua', { data: data });
          return;
        }
        else {
          setProductUpdate(data);
          setVisibleModalContactPrice(true);
        }
      }
    }

    // Cập nhật danh sách sản phẩm đã chọn
    setTimeout(() => {
      dispatch(salesActions.setDataSales({ ...orderData, sanphamdachon: updatedProducts }));
  }, 200);
  };

  const updateContactPrice = async data => {
    dispatch(salesActions.setDataSales({ ...orderData, sanphamdachon: [...orderData.sanphamdachon, data] }));
  };

  return (
    <MySafeAreaView style={styles.container}>
      <MyView style={styles.header}>
        <MyText style={styles.txtHeader}>{t('productInventory')}</MyText>
      </MyView>
      <InputSearch
        value={stringSearch}
        styleInputSearch={styles.seacrch}
        type="wareHouse"
        placeholder={t('search')}
        getString={value => setStringSearch(value)}
        onSearch={handleFindProduct}
      />
      <MyView style={styles.body}>
        <MyView style={styles.inforTotal}>
          <MyView style={styles.contentInfor}>
            <MyText style={styles.txtTitle}>{t('quantity')}</MyText>
            <MyText style={styles.txtContent}>
              {numberSales ? formatPrice(numberSales) : 0}
            </MyText>
          </MyView>
          <MyView style={styles.contentInfor}>
            <MyText style={styles.txtTitle}>{t('unitPrice')}</MyText>
            <MyText style={styles.txtContent}>{totalPrice ? formatPrice(totalPrice) : 0}đ</MyText>
          </MyView>
        </MyView>
        <FlatList
          data={products}
          loading={loading}
          fetching={fetching}
          onPress={data => handleAdd(data)}
          onEndReached={() => {
            if (activeLoadMore) {
              handleLoadMore();
            }
          }}
          type="wareHouse"
        />
      </MyView>
      <Bottom
        titleBtn1={t('selectedProduct')}
        onPress1={() => navigation.navigate('san-pham-da-chon')}
      />
      <ModalContactPrice
        isVisible={visibleModalContactPrice}
        data={productUpdate}
        onApply={updateContactPrice}
        onClose={() => setVisibleModalContactPrice(false)}
      />
    </MySafeAreaView>
  );
};

export default Index;
