import React, {useEffect, useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

import styles from './styles';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import {MyView, MySafeAreaView} from '~components/MyStyles';
import fetchData from '~providers';
import InputSearch from '~inputs/InputSearch';
import FlatList from '~components/FlatList';
import Bottom from '~components/Bottom';

const Index = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [stringSearch, setStringSearch] = useState('');
  const [dataDiscount, setDataDiscount] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);

  const handleDeleteItem = item => {
    fetchData(dispatch, 'deleteDiscount', {magiamgias: item}, data => {
      Toast.show({
        type: 'success',
        props: {message: t('successDelete')},
      });
      const deleteDiscount = dataDiscount.filter(
        discount => discount.MaGiamGia !== item,
      );
      setDataDiscount(deleteDiscount);
    });
  };
  const handleSearch = () => {
    if (stringSearch !== '') {
      const filterdata = dataDiscount.filter(item =>
        Object.values(item).some(
          value =>
            value &&
            value.toString().toLowerCase().includes(stringSearch.toLowerCase()),
        ),
      );
      if (filterdata.length === 0) {
        Toast.show({
          type: 'error',
          props: {message: t('promoCodeError')},
        });
      }
      setDataSearch(filterdata);
    } else {
      setDataSearch([]);
    }
  };
  const fetchDataDiscount = () => {
    fetchData(dispatch, 'getListDiscount', {}, data => {
      if (data?.success) {
        setDataDiscount(data.data);
      } else {
        Toast.show({
          type: 'error',
          props: {message: t('timeOut')},
        });
      }
    });
  };
  // useEffect(() => {
  //   fetchDataDiscount();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      fetchDataDiscount();
    }, []),
  );
  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar
        nameHeaderTitle={t('listPromotion')}
        iconRight="filter"
        onPressRight={() => console.log('filter')}
      />
      <InputSearch
        placeholder={t('searchCustomer')}
        value={stringSearch}
        getString={value => setStringSearch(value)}
        onSearch={handleSearch}
      />
      <MyView style={styles.body}>
        <FlatList
          data={dataSearch.length > 0 ? dataSearch : dataDiscount}
          loading={false}
          fetching={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyleProp={styles.list}
          type="listDiscount"
          onPress={handleDeleteItem}
        />
      </MyView>

      <Bottom
        sticky={false}
        onPress1={() => navigation.navigate('tao-ma-khuyen-mai')}
        titleBtn1={t('createPromotionCode')}
      />
    </MySafeAreaView>
  );
};

export default Index;
