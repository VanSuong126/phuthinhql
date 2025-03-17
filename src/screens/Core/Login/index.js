import React, {useRef, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';

import {Image, StyleSheet, Platform, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';

import {getFcmToken} from '~helper/notifyFCM';
import {getUniqueId} from 'react-native-device-info';
import {VERSION, VERSION_CODE_ANDROID, VERSION_CODE_IOS} from '@env';
import LocalDB from '~data/asyncStorage';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Height,
} from '~theme';
import {
  MyView,
  MyText,
  MyAvoidView,
  MySafeAreaView,
} from '~components/MyStyles';
import InputText from '~components/inputs/InputText';
import CheckBox from '~components/CheckBox';
import Languages from '~components/Languages';
import {encodeData, decodeData} from '~helper/transformData';
import {userActions} from '~redux/reducers';
import Background from '~assets/images/loginBackground.png';
import LogoLogin from '~assets/images/logoLogin.png';
import Button from '~buttons/MyButton';
import {handleErrorResponse} from '~helper/utils';
import ModalForgetPass from '~components/modals/ModalForgetPass';

export default function Index(props) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //get global state
  // useState
  const [saveLogin, setSaveLogin] = useState(false);
  const refUserName = useRef(null);
  const refPassWord = useRef(null);
  const [userNameError, setUserNameError] = useState('');
  const [passWordError, setPassWordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUsername] = useState('');
  const [passWord, setPassword] = useState('');

  const [modalForgetPass, setModalForgetPass] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Lấy giá trị skipScreen từ LocalDB
        const valueSaveLogin = await LocalDB.getSaveLogin();
        setSaveLogin(valueSaveLogin);
      } catch (error) {
        console.error('Error loading data', error);
      } finally {
        LocalDB.setSaveLogin(false);
        setSaveLogin(false);
      }
    };
    loadData();
  }, []);

  const handleLogin = async () => {
    const tokenNofitication = await getFcmToken();
    const deviceId = await getUniqueId();
    if (!userName) {
      setUserNameError(t('emptyUserName'));
      return;
    }
    if (!passWord) {
      setPassWordError(t('emptyPassWord'));
      return;
    } else {
      // LocalDB.setUserData(dataUser);
      // navigation.navigate('Home');
      callApiLogin({
        TokenNofitication: tokenNofitication,
        DeviceId: deviceId,
        Account: userName,
        Password: passWord,
        DeviceModel: Platform.OS,
      });
    }
  };

  const callApiLogin = async dataLogin => {
    setLoading(true);
    const payload = {
      params: encodeData(dataLogin),
      onSuccess: async data => {
        const dataTransform = decodeData(data?.EncodedData, data?.Hash);
        LocalDB.setUserData(dataTransform);
        LocalDB.setSkipScreen('skipLogin');
        setLoading(false);
        Toast.show({
          type: 'congratulation',
          props: {message: t('loginSuccess')},
        });
        navigation.navigate('Home');
      },
      onError: async error => {
        setLoading(false);
        Toast.show({
          type: 'error',
          props: handleErrorResponse(error, t('loginFail')),
        });
      },
    };
    await dispatch(userActions.userLogin(payload));
  };

  // handle change text
  const handleChangeText = (nameInput, value) => {
    if (nameInput == 'userName') {
      setUserNameError('');
      setUsername(value);
    } else if (nameInput == 'passWord') {
      setPassWordError('');
      setPassword(value);
    }
  };
  // save or note save login
  const handleSaveLogin = value => {
    setSaveLogin(value);
    LocalDB.setSaveLogin(value);
  };

  return (
    <MySafeAreaView style={styles.container}>
      <Image
        source={Background}
        resizeMode="stretch"
        style={styles.imageBackground}
      />
      <Languages />
      <MyAvoidView style={styles.content}>
        <MyView style={styles.wrapIntro}>
          <MyText style={styles.textTitleIntro}>
            {t('textTitleIntro1')}
            {`\n`}
            {t('textTitleIntro2')}
          </MyText>
          <Pressable
            style={styles.wrapRegisterNow}
            onPress={() => navigation.navigate('Register')}>
            <MyText style={styles.textDescriptionIntro}>
              {t('textDescriptionIntro')}{' '}
              <MyText style={styles.textRegisterNow}>{t('registerNow')}</MyText>
            </MyText>
          </Pressable>
        </MyView>
        <MyView style={styles.wrapFormSignIn}>
          <MyView style={styles.wrapLogo}>
            <Image
              source={LogoLogin}
              style={styles.imageLogoLogin}
              resizeMode="contain"
            />
          </MyView>
          <MyView style={styles.wrapInputSignIn}>
            <InputText
              value={userName}
              inputRef={refUserName}
              labelName={t('userName')}
              type="text"
              placeholder={t('userName')}
              contentError={userNameError}
              onChangeText={value => handleChangeText('userName', value)}
            />
            <InputText
              value={passWord}
              inputRef={refPassWord}
              labelName={t('passWord')}
              type="password"
              placeholder={t('passWord')}
              secureTextEntry={true}
              contentError={passWordError}
              onChangeText={value => handleChangeText('passWord', value)}
            />
          </MyView>
          <MyView style={styles.wrapForgetPass}>
            <CheckBox
              value={saveLogin}
              title={t('saveLogin')}
              styleCheckBox={styles.styleCheckBox}
              styleTitle={styles.textValueCheck}
              onSelect={value => handleSaveLogin(value)}
            />
            <Pressable onPress={() => setModalForgetPass(true)}>
              <MyText style={styles.textForgetPass}>
                {t('forgetPassword')}
              </MyText>
            </Pressable>
          </MyView>
          <MyView style={styles.wrapButtonSignIn}>
            <Button
              isLoading={loading}
              title={t('signIn')}
              size="primary"
              type={1}
              onPress={() => handleLogin()}
            />
          </MyView>
          <MyView style={styles.wrapFooterSignIn}>
            <MyText style={styles.textVersion}>
              {`PHUTHINH v.${VERSION}(${Platform.OS === 'ios' ? VERSION_CODE_IOS : VERSION_CODE_ANDROID})`}
            </MyText>
            <MyText style={styles.textFooterSignIn}>{t('copyRight')}</MyText>
          </MyView>
        </MyView>
      </MyAvoidView>

      <ModalForgetPass
        isVisible={modalForgetPass}
        onClose={() => setModalForgetPass(false)}
      />
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    position: 'absolute',
    width: '100%',
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.neutrals_50,
  },
  content: {
    flex: 1,
    marginTop: parseSizeHeight(20),
  },
  wrapIntro: {
    paddingHorizontal: Sizes.paddingWidth,
    paddingTop: parseSizeHeight(17),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textTitleIntro: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h4,
    fontWeight: '600',
    color: Colors.neutrals_50,
  },
  textDescriptionIntro: {
    paddingTop: parseSizeHeight(12),
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.neutrals_500,
  },
  wrapFormSignIn: {
    height: Height * 0.7,
    borderTopLeftRadius: parseSize(24),
    borderTopRightRadius: parseSize(24),
    backgroundColor: Colors.neutrals_50,
    marginTop: Sizes.marginHeight,
    paddingHorizontal: Sizes.paddingWidth,
  },
  wrapLogo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogoLogin: {
    marginTop: parseSizeHeight(48),
    width: parseSizeWidth(164.8),
    height: parseSizeHeight(33.7),
  },
  wrapInputSignIn: {
    justifyContent: 'center',
    marginVertical: parseSizeHeight(24),
    gap: parseSizeHeight(24),
  },
  titleSignIn: {
    paddingTop: Sizes.paddingHeight,
    textAlign: 'left',
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h4,
    fontWeight: '600',
    color: Colors.semantics_Grey,
  },
  wrapFooterSignIn: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 2,
    flex: 1,
  },
  wrapForgetPass: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textForgetPass: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.accent_blue,
  },
  wrapButtonSignIn: {
    marginTop: parseSizeHeight(24),
    paddingHorizontal: Sizes.paddingWidth,
  },
  textFooterSignIn: {
    textAlign: 'center',
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline2,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
  textVersion: {
    textAlign: 'center',
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '600',
    color: Colors.brand_system_02,
  },
  wrapRegisterNow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRegisterNow: {
    textAlign: 'center',
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '600',
    color: Colors.neutrals_50,
    textDecorationLine: 'underline',
  },
});
