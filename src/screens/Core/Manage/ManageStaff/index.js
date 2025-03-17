import React, {useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import HeaderToolBar from '~components/headers/HeaderToolBar';
import InputSearch from '~inputs/InputSearch';
import {MySafeAreaView, MyView} from '~components/MyStyles';
import Bottom from '~components/Bottom';
import TabControl from '~components/TabControl';
import {Colors, Sizes, Width} from '~theme';
import ActiveStaff from './ActiveStaff';
import BlockStaff from './BlockStaff';
import fetchData from '~providers';

const Index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [stringSearch, setStringSearch] = useState('');
  const [dataSearch, setDataSearch] = useState([]);
  const [tabSelected, setTabSelected] = useState(0);
  const [data, setData] = useState([]);
  const tabs = [t('active'), t('blocked')];

  const handleTabPress = index => {
    setTabSelected(index);
  };

  const handleSearch = () => {
    if (stringSearch !== '') {
      const filterdata = data.filter(item =>
        Object.values(item).some(
          value =>
            value &&
            value.toString().toLowerCase().includes(stringSearch.toLowerCase()),
        ),
      );
      if (filterdata.length === 0) {
        Toast.show({
          type: 'error',
          props: {message: t('doNotHavePermission')},
        });
      }
      setDataSearch(filterdata);
    } else {
      setDataSearch([]);
    }
  };

  const handleTab = val => {
    setTabSelected(val);
    setDataSearch([]);
    setStringSearch('');
  };
  const handleUpdateEmployee = () => {
    navigation.navigate('them-moi-nhan-vien');
  };

  const fetchDataStaffs = () => {
    fetchData(dispatch, 'getListStaff', {}, data => {
      if (data.success === true) {
        const result = data.data;
        const activeStaff = result.filter(user => user.isLock === false);
        const lockStaff = result.filter(user => user.isLock === true);
        setData(tabSelected === 0 ? activeStaff : lockStaff);
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchDataStaffs();
      setStringSearch('');
      setDataSearch([]);
    }, [tabSelected]),
  );

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('manageEmployee')}
       iconRight="plus"
       onPressRight={handleUpdateEmployee}
        />
      <MyView style={styles.body}>
        <MyView style={styles.tabControl}>
          <TabControl
            tabs={tabs}
            selectedIndex={tabSelected}
            onTabPress={handleTabPress}
          />
        </MyView>
        <InputSearch
          placeholder={t('findStaff')}
          value={stringSearch}
          getString={value => setStringSearch(value)}
          onSearch={handleSearch}
          type={true}
        />
        <MyView style={styles.content}>
          {tabSelected === 0 ? (
            <ActiveStaff
              data={dataSearch.length > 0 ? dataSearch : data}
              isTabSelected={handleTab}
            />
          ) : (
            <BlockStaff
              data={dataSearch.length > 0 ? dataSearch : data}
              isTabSelected={handleTab}
            />
          )}
        </MyView>
      </MyView>
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    marginVertical: Sizes.paddingHeight,
    flex: 1,
  },
  tabControl: {
    marginBottom: Sizes.spacing_3_Height,
  },
  body: {
    alignItems: 'center',
    flex: 1,
    width: Width,
    paddingHorizontal: Sizes.paddingWidth,
    marginTop: Sizes.spacing_3_Height,
    marginBottom: Sizes.spacing_3_Height,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 0,
    margin: 0,
    alignItems: 'center',
  },
});

export default Index;
