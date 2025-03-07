import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ScanQRCode from '~components/ScanQR';
import { MyView } from '~components/MyStyles';
import fetchData from '~providers';
import { salesActions, salesSelectors } from '~redux/reducers';
import { convertDate } from '~utils';


export default Index = props => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const orderData = useSelector(state => salesSelectors.selectDataSales(state));
  //data product
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [visibleScan, setVisibleScan] = useState(true);
  const [typeData, setTypeData] = useState(-1);
  const [typeNotify, setTypeNotify] = useState('');
  const [contentNotification, setContentNotification] = useState('');

  useFocusEffect(
    useCallback(() => {
      setVisibleScan(true);
      setIsActive(true);
    }, []),
  );

  const handleScan = async value => {
    setContentNotification('');
    setTypeNotify('success');
    switch (true) {
      case value.startsWith('PPK'):
        await fetchData(dispatch, 'findProduct', { keyword: value }, (data) => {
          if (data?.success === true) {
            setData(data?.data);
            setTypeData(1);
          }
          else {
            setTypeData(-2);
          }
        });
        break;
      case value.startsWith('PK'):
        await fetchData(dispatch, 'findOrder', {
          loai: 0,
          chuoitimkiem: value,
          tungay: convertDate(-90),
          denngay: convertDate(0)
        },
          (res) => {
            if (res?.success === true) {
              setData(res?.data);
              setTypeData(2);
            }
          });

        break;
      case value.startsWith('6868'):
        await fetchData(dispatch, 'findCustomerManager', { chuoitimkiem: value, numberPage: 1, numberItem: 1 }, (data) => {
          if (data?.success === true) {
            setData(data?.data);
            setTypeData(3);
          }
        });
      case value !== '':
        setData(value);
        await setTypeData(4);
        break;
      default:
        await setTypeData(-2);
        break;
    }
  };

  const gotoScreen = async value => {
    if (value) {
      setVisibleScan(false);
      setIsActive(false);
      navigation.navigate(value);
    }
  };
  const handleAddProduct = async data => {
    let productExists = false;
    let updatedProducts = [];

    // Kiểm tra xem danh sách sản phẩm đã chọn có tồn tại không
    if (orderData?.sanphamdachon) {
      // Duyệt qua danh sách sản phẩm đã chọn
      updatedProducts = orderData.sanphamdachon.map(product => {
        if (product.IDSanPham === data?.IDSanPham) {
          // Nếu sản phẩm đã tồn tại, tăng số lượng và cập nhật giá
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
    dispatch(salesActions.setDataSales({ ...orderData, sanphamdachon: updatedProducts }));
    setContentNotification(t('notifiAddProduct'));
    setTypeNotify('success');
  }

  return (
    <MyView style={styles.container}>
      <ScanQRCode
        typeData={typeData}
        gotoScreen={gotoScreen}
        visible={visibleScan}
        isActive={isActive}
        handleScan={handleScan}
        addProduct={handleAddProduct}
        data={data}
        typeNotify={typeNotify}
        contentNotification={contentNotification}
        onViewDetail ={()=>setContentNotification(true)}
      />
      
    </MyView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
