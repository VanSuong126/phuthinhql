import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import LocalDB from '~data/asyncStorage';

import {MyView, MyText} from '~components/MyStyles';
import {Sizes, Colors, parseSizeHeight, FontStyles, parseSize} from '~theme';
import Icon from '~components/IconXML';

const Index = props => {
  const {t} = useTranslation();
  const {
    handleDeleteImage,
    handleSelectImage,
    branchImages,
    originalImage = null,
  } = props;
  const [urlWeb, setUrlWeb] = useState('');
  const imageUrl = `${urlWeb + originalImage}?random=${new Date().getTime()}`;
  useEffect(() => {
    LocalDB.getUserData().then(data => setUrlWeb(data?.ViewImageUrl));
  }, []);
  return (
    <MyView style={styles.body}>
      {branchImages || originalImage ? (
        <MyView>
          <TouchableOpacity
            onPress={handleDeleteImage}
            style={styles.deleteImage}>
            <Icon name={'xRemoveCircle'} height={24} width={24} />
          </TouchableOpacity>

          <Image
            source={originalImage ? {uri: imageUrl} : {uri: branchImages}}
            style={styles.image}
            resizeMode="stretch"
          />
        </MyView>
      ) : (
        <TouchableOpacity onPress={handleSelectImage} style={styles.addImage}>
          <Icon name="plusCircle" width="25" height="25" />
        </TouchableOpacity>
      )}
      <MyText style={styles.txtGrey}>{t('logo')}</MyText>
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  deleteImage: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 5,
  },
  image: {
    height: 189,
    borderRadius: parseSize(8),
    backgroundColor: Colors.neutrals_100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImage: {
    height: parseSizeHeight(189),
    borderRadius: parseSize(8),
    backgroundColor: Colors.neutrals_100,
    borderWidth: 1,
    borderColor: Colors.brand_01,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtGrey: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.neutrals_700,
    marginTop: parseSizeHeight(6),
  },
  body: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: Sizes.marginWidth,
    paddingVertical: parseSizeHeight(10),
  },
});
