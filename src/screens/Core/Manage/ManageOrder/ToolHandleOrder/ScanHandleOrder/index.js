import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ScanQRCode from '~components/ScanQR';
import { MyView } from '~components/MyStyles';
import fetchData from '~providers';
import { managerActions, managerSelectors } from '~redux/reducers';
import { convertDate } from '~utils';


export default Index = props => {
  const { typeScanHandle, title = '' } = props?.route?.params
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const listOrder = useSelector(state => managerSelectors.selectListOrderScan(state)) || [];
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
      setData([]);
      setTypeData(-1);
    }, []),
  );

  useEffect(()=>{
    dispatch(managerActions.setListOrderScan(null));
  },[])

  const handleScan = async value => {
    setContentNotification('');
    setTypeNotify('');
    await fetchData(dispatch, 'findOrder', {
      loai: 0,
      chuoitimkiem: value,
      tungay: convertDate(-90),
      denngay: convertDate(0)
    },
      (res) => {
        if (res?.success === true) {
          const checkStatus = checkStatusOrder(res?.data[0]);
          if (checkStatus === true) {
            setTypeData(5);
            setData(res?.data);
            const newOrder = res?.data[0];
            // Kiểm tra nếu newOrder chưa có trong listOrder
            const isDuplicate = listOrder.some(order => order.IDDonHang === newOrder.IDDonHang);
            const updatedListOrder = isDuplicate
              ? listOrder
              : [...listOrder, { ...newOrder, selected: true }]; // Thêm selected: true bên trong mảng
            // Dispatch với listOrder đã xử lý
            dispatch(managerActions.setListOrderScan(updatedListOrder));
          }
          else {
            setTypeData(-2);
            setTypeNotify('fail');
            setContentNotification(t('statusError'))
          }
        }
        else {
          setTypeData(-2);
          setTypeNotify('fail');
          setContentNotification(t('cannotFoundOrder'))
        }
      });

  };

  const checkStatusOrder = (data) => {
    switch (typeScanHandle) {
      case 'daxacnhan':
        return data?.IDTinhTrangDonHang === 1 || data?.IDTinhTrangDonHang === 11;
      case 'dangvanchuyen':
        return [2, 21, 31, 32, 41].includes(data?.IDTinhTrangDonHang);
      case 'dagiaohang':
        return [5, 51].includes(data?.IDTinhTrangDonHang);
      default:
        return false;
    }
  };

  const gotoScreen = async value => {
    if (value) {
      setVisibleScan(false);
      setIsActive(false);
      navigation.navigate('danh-sach-don-quet', { title: title,  typeScanHandle: typeScanHandle });
    }
  };
  const handleAddProduct = async data => {

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
