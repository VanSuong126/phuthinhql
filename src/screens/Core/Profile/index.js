/**
 * Screen for user login
 * @flow
 */

import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Pressable,Platform, StyleSheet, Image } from 'react-native';

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
  MyTouchableOpacity,
} from '~components/MyStyles';
import Icon from '~components/IconXML';
import Avatar from '~assets/images/person.png';
import Button from '~buttons/MyButton';
import ModalWarning from '~components/modals/ModalWarning';
import ModalConfirm from '~modals/ModalConfirm';
import fetchData from '~providers';
import LocalDB from '~data/asyncStorage';
import { MyAvoidView } from '../../../components/MyStyles';
import {VERSION, VERSION_CODE_ANDROID, VERSION_CODE_IOS} from '@env';
/**
 * Screen for user login
 */

export default function Index(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [dataUser, setDataUser] = useState();
  const [visibleModal, setModalVisible] = useState(false);
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);

  // get data User
  useEffect(() => {
    LocalDB.getUserData().then(data => {
      if (data) {
        setDataUser(data);
      }
    });
  }, []);

  const handleLogout = async () => {
    setModalVisible(false);
    await LocalDB.initializeDefaults();
    await LocalDB.setUserData(null);
    await LocalDB.setSkipScreen('skipSplash');
    await navigation.navigate('Login');
  };
  const handleCleanData = () => {
    setVisibleModalConfirm(false);
    fetchData(
      dispatch,
      'updateStaff',
      {
        loai: 8,
        idnguoidung: dataUser?.UserInfo?.IDNguoiDung,
        islock: 0,
      },
      data => {
        if (data.success === true) {
          handleLogout();
        } else {
          Toast.show({
            type: 'error',
            props: {
              message:
                data?.message || `${t('lock')} ${t('accountLokedFailure')}`,
            },
          });
        }
      },
    );
  };
  return (
    <MySafeAreaView style={styles.container}>
      <MyView style={styles.content}>
        <Pressable style={styles.headerBar} onPress={() => navigation.goBack()}>
          <Icon name="leftArrow" width="24" height="24" />
          <MyText style={styles.textTitleHeader}>{t('account')}</MyText>
        </Pressable>
        <MyAvoidView>
          <MyView style={styles.body}>
            <MyView style={styles.wrapAvatar}>
              <Image
                source={Avatar}
                resizeMode="contain"
                style={styles.avatar}
              />
              <MyView style={styles.circleAvatar}>
                <Icon name="circleAvatar" width="165" height="165" />
              </MyView>
              <MyView style={styles.wrapIconEdit}>
                <Icon name="editWhite" width="18" height="18" />
              </MyView>
            </MyView>
            <MyView style={styles.wrapName}>
              <MyText style={styles.textName}>
                {dataUser?.UserInfo?.Ho} {dataUser?.UserInfo?.Ten}
              </MyText>
              <MyText style={styles.textID}>
                {dataUser?.UserInfo?.IDNguoiDung}
              </MyText>
            </MyView>
            <MyView style={styles.wrapAllInfo}>
              <MyView style={styles.wrapInfo}>
                <MyText style={styles.titleInfo}>{t('dateOfBirth')}</MyText>
                <MyText style={styles.valueInfo}>
                  {moment(dataUser?.UserInfo?.NgaySinhNhat).format(
                    'DD/MM/YYYY',
                  )}
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfo}>
                <MyText style={styles.titleInfo}>{t('phoneNumber')}</MyText>
                <MyText style={styles.valueInfo}>
                  {dataUser?.UserInfo?.DienThoai}
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfo}>
                <MyText style={styles.titleInfo}>{t('email')}</MyText>
                <MyText
                  style={[
                    styles.valueInfo,
                    { width: parseSizeWidth(250), textAlign: 'right' },
                  ]}>
                  {dataUser?.UserInfo?.Email}
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfo}>
                <MyText style={styles.titleInfo}>{t('idCard')}</MyText>
                <MyText style={styles.valueInfo}>
                  {dataUser?.UserInfo?.CMND}
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfo}>
                <MyText style={styles.titleInfo}>{t('role')}</MyText>
                <MyText style={styles.valueInfo}>
                  {dataUser?.UserInfo?.VaiTro}
                </MyText>
              </MyView>
              <MyView style={styles.wrapInfo}>
                <MyText style={styles.titleInfo}>{t('branch')}</MyText>
                <MyText style={styles.valueInfo}>
                  {dataUser?.StoreInfo?.TenCuaHang}
                </MyText>
              </MyView>
            </MyView>
          </MyView>
          <MyText style={styles.textVersion}>
            {`PHUTHINH v.${VERSION}(${Platform.OS === 'ios' ? VERSION_CODE_IOS : VERSION_CODE_ANDROID})`}
          </MyText>
          <MyView style={styles.wrapButton}>
            <MyTouchableOpacity
              style={styles.buttonClean}
              onPress={() => setVisibleModalConfirm(true)}>
              <Icon
                name="trashGrey"
                width="18"
                height="18"
                color={Colors.semantics_Black}
              />
              <MyText style={styles.textButtonClean}>{t('cleanData')}</MyText>
            </MyTouchableOpacity>
            <MyTouchableOpacity
              style={styles.buttonChangePassword}
              onPress={() => navigation.navigate('ChangePassword')}>
              <Icon
                name="lock"
                width="18"
                height="18"
                color={Colors.semantics_Yellow_01}
              />
              <MyText style={styles.textButtonChangePassword}>
                {t('changePassword')}
              </MyText>
            </MyTouchableOpacity>
          </MyView>

          <MyView style={styles.footer}>
            <Button
              size={'primary'}
              title={t('logout')}
              onPress={() => setModalVisible(true)}
            />
          </MyView>
        </MyAvoidView>
      </MyView>
      <ModalWarning
        isVisible={visibleModal}
        onClose={() => setModalVisible(false)}
        textButton={t('confirm')}
        title={t('notification')}
        content={t('confirmLogOutContent')}
        onPress={() => handleLogout()}
      />
      <ModalConfirm
        isVisible={visibleModalConfirm}
        onClose={() => setVisibleModalConfirm(false)}
        title={t('notification')}
        content={t('cleanDataNotification')}
        onConfirm={() => handleCleanData()}
      />
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    marginHorizontal: Sizes.marginWidth,
  },
  headerBar: {
    marginTop: Sizes.marginHeight,
    height: parseSizeHeight(50),
    alignItems: 'center',
    flexDirection: 'row',
  },
  textTitleHeader: {
    flex: 1,
    fontFamily: FontStyles.InterRegular,
    textAlign: 'center',
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.semantics_Grey,
  },
  body: {
    marginTop: Sizes.marginHeight,
  },
  wrapAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleAvatar: {
    position: 'absolute',
    width: parseSizeWidth(165),
    height: parseSizeWidth(165),
    borderRadius: parseSizeWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapIconEdit: {
    position: 'absolute',
    bottom: parseSizeWidth(-20),
    width: parseSizeWidth(35),
    height: parseSizeWidth(35),
    borderRadius: parseSizeWidth(20),
    backgroundColor: Colors.neutrals_900,
    borderColor: Colors.neutrals_50,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  iconEdit: {
    width: parseSizeWidth(24),
    height: parseSizeWidth(35),
    borderRadius: parseSizeWidth(20),
    backgroundColor: Colors.neutrals_700,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: parseSizeWidth(147),
    height: parseSizeWidth(147),
    borderRadius: parseSizeWidth(100),
    borderColor: Colors.neutrals_50,
    borderWidth: 1,
    backgroundColor: 'green',
  },
  wrapName: {
    marginTop: Sizes.marginHeight,
    alignItems: 'center',
  },
  textName: {
    fontSize: Sizes.text_h4,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.neutrals_900,
    fontFamily: FontStyles.InterSemiBold,
  },
  textID: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.neutrals_700,
  },
  wrapAllInfo: {
    marginTop: Sizes.marginHeight,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    borderRadius: 12,
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: Sizes.paddingHeight / 2,
    gap: Sizes.spacing_4_Width,
  },
  wrapInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleInfo: {
    textAlign: 'left',
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_default,
    fontWeight: '500',
    color: Colors.neutrals_700,
  },
  valueInfo: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_default,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
  footer: {
    alignItems: 'center',
    width: '100%',
    marginTop: parseSizeHeight(99),
  },
  wrapButton: {
    flexDirection: 'row',
    // marginTop: Sizes.marginHeight,
    marginTop: Sizes.spacing_2_Height,
    justifyContent: 'center',
    alignItems: 'center',
    gap: parseSizeWidth(10),
  },
  buttonClean: {
    backgroundColor: Colors.neutrals_200,
    paddingHorizontal: parseSizeWidth(20),
    paddingVertical: parseSizeWidth(8),
    borderRadius: parseSizeWidth(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: parseSizeWidth(5),
  },
  textButtonClean: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_default,
    fontWeight: '500',
    color: Colors.semantics_Black,
  },
  buttonChangePassword: {
    backgroundColor: Colors.semantics_Yellow_03,
    paddingHorizontal: parseSizeWidth(20),
    paddingVertical: parseSizeWidth(8),
    borderRadius: parseSizeWidth(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: parseSizeWidth(5),
  },
  textButtonChangePassword: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_default,
    fontWeight: '500',
    color: Colors.semantics_Yellow_01,
  },
  textVersion: {
    textAlign: 'center',
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '600',
    color: Colors.brand_01,
    // marginTop: Sizes.spacing_2_Height,
    marginTop: Sizes.marginHeight,
  },
});
