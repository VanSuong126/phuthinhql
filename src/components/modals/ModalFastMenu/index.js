import {StyleSheet, TouchableOpacity, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {
  FontStyles,
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  parseSize,
} from '~theme';
import Modal from 'react-native-modal';
import {
  MyView,
  MyText,
  MyImageBackground,
  MySafeAreaView,
} from '~components/MyStyles';
import Icon from '~components/IconXML';
import BackgroundFastMenu from '~assets/images/backgroundFastMenu.png';
import CircularMenu from './CircularNavigation';
import SettingFastMenu from './SettingFastMenu';
import LocalDB from '~data/asyncStorage';

const Index = props => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const {isVisible, onClose} = props;
  const [isSettingVisible, setIsSettingVisible] = useState(false);
  const [dataFastMenu, setDataFastMenu] = useState([]);

  const handleCloseSetting = () => {
    handleGetData();
    setIsSettingVisible(false);
  };
  const handleGetData = async () => {
    const data = await LocalDB.getUserData();

    if (data) {
      const filterData = data?.Permissions.filter(
        item => item.IsFastMenu === true,
      );

      setDataFastMenu(
        filterData.map(item => ({
          value: item.MaChuyenMuc,
          label: item.TenChuyenMuc,
          icon: item.IdchuyenMuc,
        })),
      );
    }
  };
  const handleOpenScan = () => {
    navigation.navigate('quet-ma');
    onClose();
  };
  const handleGotoScreen = value => {
    if (value) {
      navigation.navigate(value);
      onClose();
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      style={styles.modal}>
      <MySafeAreaView style={styles.container}>
        <MyView style={styles.fastNavigate}>
          <TouchableOpacity
            onPress={() => setIsSettingVisible(true)}
            style={styles.wrapAddFunton}>
            <Icon name="editGrey" width="18" height="18" />
            <MyText style={styles.updateFuntion}>{t('editFeature')}</MyText>
          </TouchableOpacity>
          <CircularMenu
            dataFastMenu={dataFastMenu}
            onScan={() => handleOpenScan()}
            onGoToScreen={value => handleGotoScreen(value)}
          />
        </MyView>
        <MyImageBackground
          style={styles.backgroundFastMenu}
          source={BackgroundFastMenu}
          resizeMode="stretch">
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.btnNavigation}>
            <Icon name="home" width="30" height="30" />
          </TouchableOpacity>
          <MyView style={styles.wrapFastAccess}>
            <TouchableOpacity
              onPress={() => onClose()}
              style={styles.btnFastAccess}>
              <LinearGradient
                colors={['#198B4D', '#05AA50']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.btnAccessGradient}>
                <MyView style={styles.gif}>
                  <Icon name="closeNoBG" width="48" height="48" />
                </MyView>
              </LinearGradient>
            </TouchableOpacity>
            <MyText style={styles.txtFastAccess}> {t('close')}</MyText>
          </MyView>
          <TouchableOpacity style={styles.btnNavigation}>
            <Icon name="bell" width="30" height="30" />
          </TouchableOpacity>
        </MyImageBackground>
        <SettingFastMenu
          isVisible={isSettingVisible}
          onClose={() => handleCloseSetting()}
        />
      </MySafeAreaView>
    </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    backgroundColor: 'rgba(0, 0, 0,0.35)',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0,0.35)',
  },
  updateFuntion: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.semantics_Black,
  },
  wrapAddFunton: {
    width: parseSizeWidth(183),
    height: parseSizeHeight(28),
    borderRadius: 100,
    backgroundColor: Colors.semantics_SmokyGrey,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: parseSizeWidth(5),
    zIndex: 1,
  },
  fastNavigate: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: parseSizeHeight(120),
    gap: parseSizeHeight(20),
  },
  //

  backgroundFastMenu: {
    height: parseSize(84),
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginHorizontal: parseSizeWidth(45),
    paddingRight: parseSizeWidth(33),
    paddingLeft: parseSizeWidth(35),
  },
  wrapFastAccess: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: parseSizeHeight(18),
    marginBottom: parseSizeHeight(30),
  },
  btnFastAccess: {
    alignItems: 'center',
    justifyContent: 'center',
    width: parseSizeHeight(66),
    height: parseSizeHeight(66),
    borderRadius: parseSizeHeight(66),
    borderWidth: parseSize(2),
    borderColor: Colors.neutrals_500,
    backgroundColor: Colors.neutrals_100,
  },
  btnAccessGradient: {
    width: parseSizeHeight(60),
    height: parseSizeHeight(60),
    borderRadius: parseSizeHeight(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width: parseSizeWidth(30),
    height: parseSizeWidth(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtFastAccess: {
    fontWeight: '500',
    fontSize: Sizes.text_tagline1,
    color: Colors.brand_01,
    fontFamily: FontStyles.InterRegular,
  },
});
