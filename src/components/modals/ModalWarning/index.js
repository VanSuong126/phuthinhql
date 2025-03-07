import {StyleSheet} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';

import {
  FontStyles,
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import {MyView, MyText} from '~components/MyStyles';
import Button from '~buttons/MyButton';

const Index = props => {
  const {t} = useTranslation();
  const {isVisible, onClose, textButton, title, content, onPress} = props;

  return (
    <Modal
      onBackdropPress={onClose}
      visible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modal}>
      <MyView style={styles.container}>
        <MyView style={styles.line} />
        <MyText style={styles.txtTitle}>{title}</MyText>
        <MyText style={styles.txtContent}>{content}</MyText>
        <Button size ={'primary'} title={textButton} onPress={onPress} />
      </MyView>
    </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    backgroundColor: Colors.backgroundShowPopup,
    justifyContent: 'flex-end',
  },
  container: {
    width: parseSizeWidth(390),
    height: parseSizeHeight(202),
    backgroundColor: Colors.neutrals_100,
    shadowColor: 'rgba(66, 71, 76, 0.32)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.25,
    elevation: 5,
    borderTopLeftRadius: Sizes.spacing_5_Width,
    borderTopRightRadius: Sizes.spacing_5_Width,
    alignItems: 'center',
  },
  line: {
    marginTop: parseSizeHeight(20),
    width: parseSizeWidth(45),
    height: parseSizeHeight(5),
    borderRadius: 100,
    backgroundColor: Colors.neutrals_300,
  },
  txtTitle: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',

    textAlign: 'center',
    color: Colors.brand_01,
    marginTop: parseSizeHeight(21),
  },
  txtContent: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',

    textAlign: 'center',
    color: Colors.semantics_Grey,
    marginTop: parseSizeHeight(4),
    marginBottom: Sizes.marginHeight,
  },
});
