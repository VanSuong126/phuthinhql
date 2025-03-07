import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import {Colors, parseSizeHeight, parseSizeWidth} from '~theme';
import Modal from 'react-native-modal';
import {MyView, MyImage} from '~components/MyStyles';
import Icon from '~components/IconXML';
import Button from '~buttons/MyButton';
import BackgroundModalSell from '~assets/images/backgroundModalSell.png';

const Index = props => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const {isVisible, onClose} = props;
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
          <MyView style={styles.wrapImage}>
            <MyImage
              source={BackgroundModalSell}
              style={styles.image}
              resizeMode="stretch"
            />
          </MyView>
          <MyView style={styles.wrapButton}>
            <MyView style={styles.wrapButton}>
              <Button
                title={t('chosseProduct')}
                size="popup"
                type={1}
                onPress={() => {
                  navigation.navigate('kho-hang'), onClose();
                }}
              />
              <Button
                title={t('chosseCustomner')}
                size="popup"
                ColorButton={Colors.neutrals_50}
                TextColorButton={Colors.neutrals_600}
                type={3}
                onPress={() => {
                  navigation.navigate('thong-tin-khach-hang'), onClose();
                }}
              />
            </MyView>
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
    top: parseSizeHeight(212),
    width: parseSizeWidth(250),
    backgroundColor: Colors.neutrals_50,
    borderRadius: parseSizeWidth(16),
    alignSelf: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  wrapImage: {
    flex: 0.6,
    height: parseSizeHeight(159),
    backgroundColor: Colors.neutrals_300,
  },
  iconClose: {
    position: 'absolute',
    top: parseSizeHeight(10),
    right: parseSizeWidth(10),
    zIndex: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wrapButton: {
    flex: 0.4,
    paddingVertical: parseSizeWidth(16),
    alignItems: 'center',
    justifyContent: 'center',
    gap: parseSizeHeight(16),
  },
});
