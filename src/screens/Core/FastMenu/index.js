import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import Icon from '~components/IconXML';
import styles from './styles';
import {
  MyView,
  MyText,
  MyImageBackground,
  MySafeAreaView,
} from '~components/MyStyles';

import BackgroundFastMenu from '~assets/images/backgroundFastMenu.png';
import ModalFastMenu from '~components/modals/ModalFastMenu';

const Index = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [openFastNavigate, setOpenFastNavigate] = useState(false);
  const handleFastNavigate = () => {
    setOpenFastNavigate(() => !openFastNavigate);
  };

  return (
    <MySafeAreaView style={styles.container}>
      <ModalFastMenu
        isVisible={openFastNavigate}
        onClose={handleFastNavigate}
      />
      {!openFastNavigate && (
        <MyImageBackground
          style={styles.backgroundFastMenu}
          source={BackgroundFastMenu}
          resizeMode="stretch">
          <TouchableOpacity
            style={styles.btnNavigation}
            onPress={() => navigation.navigate('Home')}>
            <Icon name="home" width="30" height="30" />
          </TouchableOpacity>
          <MyView style={styles.wrapFastAccess}>
            <TouchableOpacity
              onPress={() => handleFastNavigate()}
              style={styles.btnFastAccess}>
              <LinearGradient
                colors={['#198B4D', '#05AA50']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.btnAccessGradient}>
                {openFastNavigate ? (
                  <MyView style={styles.gif}>
                    <Icon name="closeNoBG" width="48" height="48" />
                  </MyView>
                ) : (
                  <FastImage
                    source={require('~assets/images/gif/presslong.gif')}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.gif}
                  />
                )}
              </LinearGradient>
            </TouchableOpacity>
            <MyText style={styles.txtFastAccess}>{t('quickAccess')}</MyText>
          </MyView>
          <TouchableOpacity style={styles.btnNavigation}>
            <Icon name="bell" width="30" height="30" />
          </TouchableOpacity>
          <ModalFastMenu
            isVisible={openFastNavigate}
            onClose={handleFastNavigate}
          />
        </MyImageBackground>
      )}
    </MySafeAreaView>
  );
};

export default Index;
