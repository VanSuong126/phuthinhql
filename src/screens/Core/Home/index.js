import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { StyleSheet, AppState } from 'react-native';

import LocalDB from '~data/asyncStorage';
import { Sizes,Colors, parseSizeWidth, STATUS_BAR_HEIGHT} from '~theme';
import {MyView, MyAvoidView} from '~components/MyStyles';
import HeaderHome from './Section/HeaderHome';
import PoolSummary from './Section/PoolSummary';
import MenuHome from './Section/MenuHome';
import BannerHome from './Section/BannerHome';
import BottomNavigate from '~components/BottomNavigate';

export default function Index(props) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  let backgroundTimer = null;

  const handleAppStateChange = async nextAppState => {
    if (nextAppState === 'background') {
      console.log('Ứng dụng chạy nền');
      const saveLogin = await LocalDB.getSaveLogin();
      backgroundTimer = setTimeout(() => {
        if (!saveLogin) {
          LocalDB.initializeDefaults();
          LocalDB.setUserData(null);
          LocalDB.setSkipScreen('skipSplash');
          navigation.navigate('Login');
          console.log('Logout khi không sử dụng 3p');
        }
      }, 180000);
    } else {
      clearTimeout(backgroundTimer);
    }
  };


  // get data User
  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      appStateListener.remove(); // Clean up the AppState listener
      clearTimeout(backgroundTimer); // Clear background timer on cleanup
    };
  }, []);

  return (
    <MyView style={styles.container}>
      <MyView style={styles.content}>
        <HeaderHome/>
        <MyAvoidView>
          <MyView style={styles.body}>
            <PoolSummary />
            <MenuHome />
            <BannerHome />
          </MyView>
        </MyAvoidView>
      </MyView>
      <BottomNavigate />
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 0,
    paddingTop:STATUS_BAR_HEIGHT,
  },
  content: {
    flex: 1,
    marginHorizontal: Sizes.marginWidth,
  },
  body:{
    flex: 1,
    gap: parseSizeWidth(14),
  }
});
