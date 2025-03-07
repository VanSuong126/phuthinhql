import {Pressable, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';

import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  Height,
  FontStyles,
} from '~theme';
import {MyView, MyText, MyTextInput} from '~components/MyStyles';
import Button from '~buttons/MyButton';
import Icon from '~components/IconXML';

const Index = props => {
  const {onClose, isVisible, onApply} = props;
  const {t} = useTranslation();
  const promotionRef = useRef(null);

  const handleApply = () => {
    const value = promotionRef.current.text;
    onApply(value);
    onClose();
  };

  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modalContainer}>
      <MyView style={styles.container}>
        <Pressable style={styles.btnClose} onPress={() => onClose()}>
          <Icon
            name="undo"
            width={parseSizeWidth(24)}
            height={parseSizeHeight(24)}
          />
        </Pressable>
        <MyText style={styles.txtTitle}>{t('promotion')}</MyText>
        <MyView style={styles.content}>
          <MyText style={styles.txtNameInput}>{t('discountCode')}</MyText>
          <MyTextInput
            ref={promotionRef}
            style={styles.input}
            placeholderTextColor={Colors.accent_yellow}
            onChangeText={value => (promotionRef.current.text = value)}
          />
        </MyView>

        <MyView style={styles.btnApply}>
          <Button size="small" title={t('apply')} onPress={handleApply} />
        </MyView>
      </MyView>
    </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundShowPopup,
    margin: 0,
    height: Height,
  },
  container: {
    width: parseSizeWidth(329),
    borderRadius: 16,
    backgroundColor: Colors.neutrals_50,
    paddingHorizontal: parseSizeWidth(20),
    paddingVertical: parseSizeHeight(30),
    gap: parseSizeHeight(16),
    position: 'absolute',
    top: parseSizeHeight(135),
  },
  txtTitle: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.semantics_Black,
  },
  btnClose: {
    position: 'absolute',
    top: parseSizeHeight(30),
    right: parseSizeWidth(20),
    zIndex: 1,
  },
  btnApply: {
    alignItems: 'center',
  },
  content: {
    gap: parseSizeHeight(8),
  },
  txtNameInput: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  input: {
    width: parseSizeWidth(289),
    height: parseSizeHeight(43),
    borderRadius: 8,
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: parseSizeWidth(20),
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.accent_yellow,
    fontFamily: FontStyles.InterRegular,
  },
});
