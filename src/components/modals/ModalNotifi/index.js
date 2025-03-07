import {StyleSheet} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';

import {
  FontStyles,
  Colors,
  Sizes,
  parseSizeHeight,
  Width,
  Height,
  parseSize,
} from '~theme';
import {MyView, MyText} from '~components/MyStyles';
import FlatList from '~components/FlatList';
import Button from '~buttons/MyButton';

const Index = props => {
  const {t} = useTranslation();
  const {isVisible, onClose, data = [], TextTitle} = props;

  return (
    <Modal
      onBackdropPress={onClose}
      visible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modal}>
      <MyView style={styles.container}>
        <MyText style={styles.txtTitle}>{TextTitle}</MyText>
        <MyView style={styles.body}>
          <FlatList
            data={data}
            loading={false}
            fetching={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyleProp={styles.list}
            type="notifiError"
          />
        </MyView>
        <Button onPress={onClose} size="popup" title={t('confirm')} />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: Width / 1.2,
    height: Height / 1.8,
    backgroundColor: Colors.neutrals_100,
    shadowColor: 'rgba(66, 71, 76, 0.32)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.25,
    elevation: 5,
    borderRadius: Sizes.spacing_5_Width,
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing_5_Width,
    paddingVertical: Sizes.spacing_3_Width,
  },
  body: {
    flex: 1,
    marginVertical: Sizes.spacing_3_Width,
  },
  list: {
    gap: Sizes.spacing_4_Height,
  },
  txtTitle: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'center',
  },
});
