import {StyleSheet, Platform} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {
  Colors,
  Sizes,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Width,
} from '~theme';
import {MyView, MySafeAreaView} from '~components/MyStyles';
import Button from '~buttons/MyButton';

const Index = props => {
  const {isVisible, onClose, data, itemProduct = {}} = props;
  const navigation = useNavigation();
  const {t} = useTranslation();
  const handleClickItem = item => {
    navigation.navigate(
      item?.typeNavigate === 'add' ? item?.navigate : item?.navigateUpdate,
      {
        type: item?.typeNavigate,
        data: itemProduct,
      },
    );
    onClose();
  };
  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modal}>
      <MySafeAreaView style={styles.container}>
        <MyView style={styles.line} />
        <MyView style={styles.content}>
          {data.map(item => {
            return (
              <Button
                size="primary"
                title={t(item?.title)}
                type={2}
                onPress={() => handleClickItem(item)}
              />
            );
          })}
        </MyView>
      </MySafeAreaView>
    </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    padding: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors.backgroundShowPopup,
  },
  line: {
    alignSelf: 'center',
    width: parseSizeWidth(45),
    height: parseSizeHeight(5),
    borderRadius: parseSize(100),
    backgroundColor: Colors.neutrals_400,
    marginTop: parseSizeHeight(20),
    marginBottom: Sizes.spacing_4_Height,
  },
  container: {
    width: '100%',
    maxHeight: '50%',
    backgroundColor: Colors.neutrals_50,
    borderTopLeftRadius: parseSize(24),
    borderTopRightRadius: parseSize(24),
    alignSelf: 'center',
    justifyContent: 'center',
    paddingBottom: Platform.OS === 'android' ? parseSizeHeight(24) : 0,
  },
  content: {
    gap: Sizes.spacing_4_Height,
    marginHorizontal: Sizes.marginWidth,
    alignItems: 'center',
  },
  containerFlatlist: {
    gap: Sizes.spacing_3_Height,
  },
});
