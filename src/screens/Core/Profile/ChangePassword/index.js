import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

import {parseSizeHeight, Sizes} from '~theme';
import {MySafeAreaView, MyView, MyAvoidView} from '~components/MyStyles';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import InputText from '~components/inputs/InputText';
import Button from '~buttons/MyButton';
import fetchData from '~providers';
import {handleErrorResponse} from '~helper/utils';

export default function Index(props) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Tách riêng từng state cho từng trường input
  const [passwordOld, setPasswordOld] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [rePasswordNew, setRePasswordNew] = useState('');

  // Tách riêng state cho từng lỗi của từng trường
  const [passwordOldError, setPasswordOldError] = useState('');
  const [passwordNewError, setPasswordNewError] = useState('');
  const [rePasswordNewError, setRePasswordNewError] = useState('');

  const handleChangePassword = () => {
    Keyboard.dismiss();
    let hasError = false;

    // Kiểm tra từng trường và cập nhật lỗi
    if (!passwordOld.trim()) {
      setPasswordOldError(t('requiredField'));
      hasError = true;
    }
    if (passwordNew.length < 5) {
      setPasswordNewError(t('passWordMinLength'));
      hasError = true;
    }
    if (!passwordNew.trim()) {
      setPasswordNewError(t('requiredField'));
      hasError = true;
    }
    if (!rePasswordNew.trim()) {
      setRePasswordNewError(t('requiredField'));
      hasError = true;
    }
    if (passwordOld && passwordNew && passwordOld === passwordNew) {
      setPasswordNewError(t('passwordNewSame'));
      hasError = true;
    }
    if (passwordNew !== rePasswordNew) {
      setRePasswordNewError(t('rePasswordNewMismatch'));
      hasError = true;
    }

    // Nếu không có lỗi, gọi hàm registerNewAccount
    if (!hasError) {
      changePassword();
    }
  };

  const changePassword = () => {
    const params = {
      oldPassword: passwordOld,
      newPassword: passwordNew,
    };
    fetchData(dispatch, 'changePassword', params, res => {
      if (res?.success === true) {
        Toast.show({
          type: 'success',
          props: {
            message: t('changePasswordSuccess'),
          },
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          props: handleErrorResponse(res?.message, t('changePasswordFail')),
        });
      }
    });
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('changePassword')} />
      <MyAvoidView>
        <MyView style={styles.wrapForm}>
          <InputText
            value={passwordOld}
            labelName={t('passwordOld')}
            placeholder={t('passwordOld')}
            type="password"
            secureTextEntry
            contentError={passwordOldError}
            onChangeText={value => {
              setPasswordOld(value);
              setPasswordOldError('');
            }}
          />
          <InputText
            value={passwordNew}
            labelName={t('passwordNew')}
            placeholder={t('passwordNew')}
            type="password"
            secureTextEntry
            contentError={passwordNewError}
            onChangeText={value => {
              setPasswordNew(value);
              setPasswordNewError('');
            }}
          />
          <InputText
            value={rePasswordNew}
            labelName={t('rePasswordNew')}
            placeholder={t('rePasswordNew')}
            type="password"
            secureTextEntry
            contentError={rePasswordNewError}
            onChangeText={value => {
              setRePasswordNew(value);
              setRePasswordNewError('');
            }}
          />
        </MyView>
      </MyAvoidView>

      <MyView style={styles.wrapButton}>
        <Button
          title={t('update')}
          size="primary"
          type={1}
          onPress={() => handleChangePassword()}
        />
      </MyView>
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  wrapForm: {
    flex: 1,
    gap: parseSizeHeight(20),
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: Sizes.spacing_3_Height,
  },
  wrapButton: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: parseSizeHeight(24),
  },
});
