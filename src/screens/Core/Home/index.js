import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Pressable, AppState} from 'react-native';

import LocalDB from '~data/asyncStorage';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import {
  MyView,
  MyText,
  MySafeAreaView,
  MyAvoidView,
} from '~components/MyStyles';
import Languages from '~components/Languages';
import Line from '~components/Line';
import FavoriteMenu from '~screens/Core/Home/FavoriteMenu';
import Report from '~screens/Core/Home/Report';
import FastMenu from '~screens/Core/FastMenu';
import LogoAvatar from '~assets/images/person.png';

export default function Index(props) {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [dataUser, setDataUser] = useState();

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

  useFocusEffect(
    useCallback(() => {
      LocalDB.getUserData().then(data => {
        if (data) {
          setDataUser(data);
        }
      });
    }, []),
  );

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
    <MySafeAreaView style={styles.container}>
      <MyView style={styles.content}>
        <MyView style={styles.header}>
          <Pressable
            style={styles.wrapAvatar}
            onPress={() => navigation.navigate('Profile')}>
            <Image
              source={LogoAvatar}
              resizeMode="contain"
              style={styles.avatar}
            />
            <MyView>
              <MyText style={styles.textName}>
                {dataUser?.UserInfo?.Ho} {dataUser?.UserInfo?.Ten}
              </MyText>
              <MyText style={styles.textRole}>
                {dataUser?.Role?.RoleName}
              </MyText>
            </MyView>
          </Pressable>
          <Languages type="dark" />
        </MyView>
        <Line
          type="dotted"
          thickness={2}
          color={Colors.neutrals_300}
          width="100%"
        />
        <MyAvoidView>
          <MyView style={styles.body}>
            <FavoriteMenu />
            <Report />
          </MyView>
        </MyAvoidView>
      </MyView>
      <FastMenu />
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 0,
  },
  content: {
    flex: 1,
    marginHorizontal: Sizes.marginWidth,
  },
  header: {
    marginVertical: parseSizeHeight(16),
    height: parseSizeHeight(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: parseSizeWidth(50),
    height: parseSizeWidth(50),
    borderRadius: parseSizeWidth(50),
    borderColor: Colors.neutrals_50,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  textName: {
    marginLeft: parseSizeWidth(14),
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_subtitle1,
    color: Colors.neutrals_900,
    fontWeight: '600',
  },
  textRole: {
    marginLeft: parseSizeWidth(14),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    color: Colors.neutrals_700,
    fontWeight: '500',
  },
});
