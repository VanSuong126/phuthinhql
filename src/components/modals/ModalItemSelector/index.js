import {StyleSheet, Platform} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

import {
  Colors,
  Sizes,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Width,
} from '~theme';
import {MyView, MySafeAreaView} from '~components/MyStyles';
import FlatList from '~components/FlatList';

const Index = props => {
  const {isVisible, onClose, data, getItem, stylesModal, onPress} = props;

  const handleSelected = item => {
    if (getItem) {
      getItem(item);
    }
    onClose();
  };

  const handleItemPress = item => {
    if (onPress) {
      onPress(item);
    } else {
      handleSelected(item);
    }
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
        <MyView style={ [styles.content]}>
          <FlatList
            data={data}
            grid={false}
            loading={false}
            fetching={false}
            type="itemSelector"
            onPress={item => handleItemPress(item)}
            contentContainerStyleProp={styles.containerFlatlist}
          />
        </MyView>
      </MySafeAreaView>
    </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    padding:0,
    flex:1,
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
    paddingBottom:Platform.OS ==='android'?parseSizeHeight(24):0,
  },
  content: {
    marginHorizontal: Sizes.marginWidth,
  },
  containerFlatlist: {
    gap: Sizes.spacing_3_Height,
  },
});
