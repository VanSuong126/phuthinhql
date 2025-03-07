import {StyleSheet, Platform, View, ScrollView} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import RenderHTML from 'react-native-render-html';
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
  const {isVisible, onClose, note} = props;
  const {t} = useTranslation();

  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modal}>
      <MySafeAreaView style={styles.container}>
        <ScrollView>
          <MyView style={styles.line} />
          <View style={styles.content}>
            <RenderHTML
              contentWidth={Width}
              source={{html: note || t('notContent')}}
              baseStyle={styles.text}
            />
          </View>
          <MyView style={styles.button}>
            <Button
              title={t('done')}
              size="primary"
              type={1}
              onPress={onClose}
            />
          </MyView>
        </ScrollView>
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
    maxHeight: 'auto',
    backgroundColor: Colors.neutrals_50,
    borderTopLeftRadius: parseSize(24),
    borderTopRightRadius: parseSize(24),
    alignSelf: 'center',
    justifyContent: 'center',
    paddingBottom: Platform.OS === 'android' ? parseSizeHeight(24) : 0,
  },
  content: {
    marginHorizontal: Sizes.marginWidth,
    backgroundColor: Colors.neutrals_200,
    borderRadius: parseSize(8),
    paddingHorizontal: parseSizeWidth(20),
    paddingVertical: parseSizeHeight(13),
  },
  text: {
    fontSize: Sizes.text_subtitle1,
    fontWeight: '400',
    color: Colors.semantics_Black,
  },
  button: {
    alignItems: 'center',
    marginTop: Sizes.spacing_3_Height,
  },
});
