import React, {useEffect, useState, useCallback} from 'react';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import fetchData from '~providers';
import LocalDB from '~data/asyncStorage';
import {commonSelectors} from '~redux/reducers';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import {
  MySafeAreaView,
  MyView,
  MyText,
  MyTouchableOpacity,
} from '~components/MyStyles';
import Bottom from '~components/Bottom';
import styles from './styles';
import Icon from '~components/IconXML';
import FlatList from '~components/FlatList';
import {handleErrorResponse} from '~helper/utils';

const Index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [urlWeb, setUrlWeb] = useState('');

  const dataStore = useSelector(state =>
    commonSelectors.selectorInforStore(state),
  );

  const fetchDataStore = () => {
    fetchData(dispatch, 'getInforStore', {loai: 1});
  };

  useFocusEffect(
    useCallback(() => {
      fetchDataStore();
    }, []),
  );

  const handleDeleteStore = item => {
    fetchData(dispatch, 'deleteStore', {id: item?.IDCuaHang}, res => {
      console.log('<<<<<<<<<<', res);

      if (res.success) {
        Toast.show({
          type: 'success',
          props: {message: t('successDelete')},
        });
        fetchDataStore();
      } else {
        Toast.show({
          type: 'error',
          props: handleErrorResponse(res?.message, t('deleteFail')),
        });
      }
    });
  };

  useEffect(() => {
    LocalDB.getUserData().then(data => setUrlWeb(data?.ViewImageUrl));
  }, []);

  const renderItem = ({item}) => {
    const imageUrl = `${urlWeb + item?.URLLogo}?random=${new Date().getTime()}`;

    return (
      <MyView style={styles.box}>
        <MyView style={styles.horizontal}>
          <Image
            key={item?.URLLogo}
            source={{uri: imageUrl}}
            style={styles.image}
            resizeMode="stretch"
          />
          <MyView>
            <MyText style={styles.txtName}>{item.TenCuaHang}</MyText>
            <MyView style={styles.horizontal}>
              <Icon name="location" width="18" height="18" />
              <MyText style={styles.txtLocation}>{item.DiaChiCuaHang2}</MyText>
            </MyView>
          </MyView>
        </MyView>
        <MyView style={styles.content}>
          <MyView style={styles.horizontal}>
            <Icon name="phone" width="18" height="18" />
            <MyText style={styles.txtGrey}>{item.DienThoaiCuaHang}</MyText>
          </MyView>
          <MyView style={styles.horizontal}>
            <Icon name="gmail" width="16" height="16" />
            <MyText style={styles.txtGrey}>{item.EmailCuaHang}</MyText>
          </MyView>
          <MyView style={styles.horizontal}>
            <Icon name="website" width="18" height="18" />
            <MyText style={styles.txtGrey}>{item.DiaChiWebCuaHang}</MyText>
          </MyView>
          <MyView style={styles.horizontal}>
            <Icon name="website" width="18" height="18" />
            <MyText style={styles.txtGrey}>{item.DiaChiWebCuaHang1}</MyText>
          </MyView>
        </MyView>
        <MyView style={styles.button}>
          <MyTouchableOpacity
            onPress={() => handleDeleteStore(item)}
            style={styles.delete}>
            <MyText style={styles.txtDelete}>{t('delete')}</MyText>
          </MyTouchableOpacity>
          <MyTouchableOpacity
            onPress={() =>
              navigation.navigate('them-cua-hang', {dataStore: item})
            }
            style={styles.update}>
            <MyText style={styles.txtUpdate}>{t('updateButton')}</MyText>
          </MyTouchableOpacity>
        </MyView>
      </MyView>
    );
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('manageBranch')} />
      <MyView style={styles.body}>
        <FlatList
          data={dataStore}
          loading={false}
          fetching={false}
          keyExtractor={(item, index) => item.IDCuaHang()}
          contentContainerStyleProp={styles.list}
          RenderItem={renderItem}
        />
      </MyView>
      <Bottom
        sticky={false}
        titleBtn1={t('addNew')}
        onPress1={() => navigation.navigate('them-cua-hang')}
      />
    </MySafeAreaView>
  );
};

export default Index;
