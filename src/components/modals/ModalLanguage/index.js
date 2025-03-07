import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';

import {
  FontStyles,
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import Modal from 'react-native-modal';
import {MyView, MyText} from '~components/MyStyles';
import Icon from '~components/IconXML';
import {Languages} from '~data/languages';
import LocalDB from '~data/asyncStorage';

const Index = props => {
  const {t} = useTranslation();
  const {isVisible, onClose, language} = props;

  const handleSelectLanguage = locale => {
    i18n.changeLanguage(_.lowerCase(locale));
    LocalDB.setLanguage(locale);
  };

  return (
    <Modal
      onBackdropPress={onClose}
      visible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modal}>
      <MyView style={styles.container}>
        <MyView style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.iconClose}>
            <Icon name={'undo'} width={24} height={24} />
          </TouchableOpacity>
          <MyText style={styles.textTitle}>{t('chooseLanguage')}</MyText>
          <MyView style={styles.wrapListLanguage}>
            {Languages &&
              Languages.map((item, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity
                    onPress={() => handleSelectLanguage(item?.locale)}
                    style={styles.wrapItemLanguage}>
                    <Icon
                      name={item?.country_code}
                      width={parseSizeWidth(32)}
                      height={parseSizeHeight(32)}
                    />
                    <MyText style={styles.textLanguage}>
                      {t(item?.language_code)}
                    </MyText>
                    {language === item?.locale && (
                      <MyView style={styles.wrapTick}>
                        <Icon name={'tick'} width={24} height={24} />
                      </MyView>
                    )}
                  </TouchableOpacity>
                  {index < Languages.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </React.Fragment>
              ))}
          </MyView>
        </MyView>
      </MyView>
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
    position: 'absolute',
    bottom: parseSizeHeight(84),
    height: parseSizeHeight(201),
    width: parseSizeWidth(329),
    backgroundColor: Colors.neutrals_50,
    borderRadius: parseSizeWidth(16),
    alignSelf: 'center',
    paddingHorizontal: parseSizeWidth(22),
    paddingVertical: parseSizeHeight(30),
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  iconClose: {
    position: 'absolute',
    top: parseSizeHeight(-18),
    right: parseSizeWidth(0),
  },
  textTitle: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    color: Colors.semantics_Grey,
    textAlign: 'center',
  },
  wrapListLanguage: {
    flex: 1,
  },
  wrapItemLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
    height: parseSizeHeight(32),
    gap: parseSizeWidth(11),
    marginVertical: parseSizeHeight(16),
  },
  wrapTick: {
    position: 'absolute',
    right: 0,
    bottom: parseSizeHeight(2),
  },
  textLanguage: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.neutrals_300,
    borderRadius: parseSizeWidth(100),
  },
});
