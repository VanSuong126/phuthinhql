import {StyleSheet} from 'react-native';
import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from '~components/IconXML';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';

import {checkPermission} from '~helper/permission';
import {Sizes, Colors, parseSizeHeight, FontStyles} from '~theme';
import {MyText, MyView, MyTouchableOpacity} from '~components/MyStyles';
import {parseSizeWidth} from '../../theme';

export default function UploadImage({getUrlImage}) {
  const {t} = useTranslation();
  const checkPermissionLibrary = async () => {
    const permissionLocation = await checkPermission('library');
    if (!permissionLocation) {
      Toast.show({
        type: 'error',
        props: {message: t('missPermissionLibrary')},
      });
    } else {
      handleSelectImage();
    }
  };

  /**
   * Handles the image selection from the device image library.
   * @returns {void}
   */
  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      saveToPhotos: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('cancel choose photo');
      } else if (response.errorCode) {
        console.log('Error:', response.errorCode);
      } else {
        const uri = response.assets[0].uri;
        getUrlImage(uri); // Lưu ảnh được chọn
      }
    });
  };

  return (
    <MyView style={styles.container}>
      <MyTouchableOpacity
        style={styles.buttonUpload}
        onPress={checkPermissionLibrary}>
        <Icon name="library" width="24" height="24" />
        <MyText style={styles.textUpload}>{t('choosePhotoFromLibrary')}</MyText>
      </MyTouchableOpacity>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: parseSizeHeight(24),
    paddingVertical: parseSizeWidth(4),
    backgroundColor: Colors.semantics_Grey,
    borderRadius: 20,
  },
  textUpload: {
    marginLeft: parseSizeHeight(4),
    fontFamily: FontStyles.InterRegular,
    // fontFamily: 'Inter',
    fontSize: Sizes.textDefault,
    fontWeight: '500',
    color: Colors.neutrals_50,
  },
});
