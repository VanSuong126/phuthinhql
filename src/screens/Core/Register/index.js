import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Image, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

import {
  Sizes,
  Colors,
  FontStyles,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import {
  MyView,
  MyText,
  MyAvoidView,
  MyImageBackground,
} from '~components/MyStyles';
import InputText from '~components/inputs/InputText';
import Button from '~buttons/MyButton';
import Background from '~assets/images/loginBackground.png';
import LogoLogin from '~assets/images/logoLogin.png';
import Languages from '~components/Languages';
import fetchData from '~providers';
import {handleErrorResponse} from '~helper/utils';

export default function Index(props) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Tách riêng từng state cho từng trường input
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [rePassWord, setRePassWord] = useState('');

  // Tách riêng state cho từng lỗi của từng trường
  const [lastNameError, setLastNameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passWordError, setPassWordError] = useState('');
  const [rePassWordError, setRePassWordError] = useState('');

  const handleRegister = () => {
    let hasError = false;

    // Kiểm tra từng trường và cập nhật lỗi
    if (!lastName.trim()) {
      setLastNameError(t('requiredField'));
      hasError = true;
    }
    if (!firstName.trim()) {
      setFirstNameError(t('requiredField'));
      hasError = true;
    }
    if (!email.trim()) {
      setEmailError(t('requiredField'));
      hasError = true;
    }
    if (!userName.trim()) {
      setUserNameError(t('requiredField'));
      hasError = true;
    }
    if (userName.length < 5) {
      setUserNameError(t('userNameMinLength'));
      hasError = true;
    }
    if (!passWord.trim()) {
      setPassWordError(t('requiredField'));
      hasError = true;
    }
    if (passWord.length < 5) {
      setPassWordError(t('passWordMinLength'));
      hasError = true;
    }
    if (!rePassWord) {
      setRePassWordError(t('requiredField'));
      hasError = true;
    }
    if (passWord !== rePassWord) {
      setRePassWordError(t('passwordMismatch'));
      hasError = true;
    }

    // Nếu không có lỗi, gọi hàm registerNewAccount
    if (!hasError) {
      registerNewAccount();
    }
  };

  const registerNewAccount = () => {
    const params = {
      ho: lastName,
      ten: firstName,
      taiKhoan: userName,
      matKhau: passWord,
      email: email,
      idvaitro: 1,
    };
    fetchData(dispatch, 'createUserAdmin', params, res => {
      if (res?.success === true) {
        Toast.show({
          type: 'success',
          props: {
            message: t('addAccountSuccess'),
          },
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          props: handleErrorResponse(res?.message, t('addAccountFailure')),
        });
      }
    });
  };

  return (
    <MyImageBackground
      style={styles.background}
      source={Background}
      resizeMode="stretch">
      <SafeAreaView style={styles.container}>
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
              onPress={() => navigation.navigate('Login')}>
              <MyText style={styles.textDescriptionIntro}>
                {t('textDescriptionIntro2')}{' '}
                <MyText style={styles.textRegisterNow}>{t('loginNow')}</MyText>
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
                value={lastName}
                labelName={t('lastNameInput')}
                placeholder={t('lastNameInput')}
                contentError={lastNameError}
                onChangeText={value => {
                  setLastName(value);
                  setLastNameError('');
                }}
                maxLength={50}
              />
              <InputText
                value={firstName}
                labelName={t('firstNameInput')}
                placeholder={t('firstNameInput')}
                contentError={firstNameError}
                onChangeText={value => {
                  setFirstName(value);
                  setFirstNameError('');
                }}
                maxLength={50}
              />
              <InputText
                value={email}
                labelName={t('email')}
                placeholder={t('email')}
                contentError={emailError}
                onChangeText={value => {
                  setEmail(value);
                  setEmailError('');
                }}
                maxLength={100}
              />
              <InputText
                value={userName}
                labelName={t('userName')}
                keyboardType="email-address"
                placeholder={t('userName')}
                contentError={userNameError}
                onChangeText={value => {
                  setUserName(value);
                  setUserNameError('');
                }}
                maxLength={20}
              />
              <InputText
                value={passWord}
                labelName={t('passWord')}
                placeholder={t('passWord')}
                type="password"
                secureTextEntry
                contentError={passWordError}
                onChangeText={value => {
                  setPassWord(value);
                  setPassWordError('');
                }}
                maxLength={100}
              />
              <InputText
                value={rePassWord}
                labelName={t('rePassWord')}
                placeholder={t('rePassWord')}
                type="password"
                secureTextEntry
                contentError={rePassWordError}
                onChangeText={value => {
                  setRePassWord(value);
                  setRePassWordError('');
                }}
                maxLength={100}
              />
            </MyView>
            <MyView style={styles.wrapButtonSignIn}>
              <Button
                title={t('register')}
                size="primary"
                type={1}
                onPress={() => handleRegister()}
              />
            </MyView>
          </MyView>
        </MyAvoidView>
      </SafeAreaView>
    </MyImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
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
    height: '100%',
    borderTopLeftRadius: parseSize(24),
    borderTopRightRadius: parseSize(24),
    backgroundColor: Colors.white,
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
  wrapButtonSignIn: {
    marginTop: parseSizeHeight(24),
    paddingHorizontal: Sizes.paddingWidth,
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
