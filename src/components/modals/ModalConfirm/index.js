import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';

import {
  Colors,
  Sizes,
  FontStyles,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import { MyView, MyText } from '~components/MyStyles';
import Icon from '~components/IconXML';
import Button from '~buttons/MyButton';
import ConfirmX from '~assets/images/confirmX.png';
import ConfirmV from '~assets/images/confirmV.png';

const Index = props => {
  const { t } = useTranslation();
  const { 
    type=0,
    isVisible,
    titleConfirm= t('confirm'),
    titleCancel =t('cancel'),
    onClose,
    onConfirm,
    title,
    content,
    isSuccessNotify =false
   } = props;

  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={isVisible} // Changed from `visible` to `isVisible`
      backdropOpacity={0.5} // Optional: Set backdrop opacity for a better look
      animationType="slide"
      style={styles.modalComponent}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.btnClose} onPress={onClose}>
          <Icon name="undo" width="24" height="24" />
        </TouchableOpacity>
        <View style={styles.top}>
          <Image style={styles.img} source={isSuccessNotify? ConfirmV: ConfirmX} resizeMode="cover" />
        </View>
        <View style={styles.bottom}>
          <MyView style={styles.intoBottomNotifi}>
            <Text style={styles.txtTitle}>{t(title)}</Text>
            <Text style={styles.txtContent}>{content} </Text>
            <Button
              title={titleConfirm}
              onPress={()=>onConfirm()}
              type="1"
              size="small"
              styleButtonGradient={styles.btnConfirm}
            />
           {type===0&& <Button
              title={titleCancel}
              onPress={onClose}
              type="2"
              size="small"
            />}
          </MyView>
        </View>
      </View>
    </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  txtBtn: {
    fontFamily: FontStyles.InterRegular,
    color: Colors.neutrals_600,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: parseSizeHeight(16),
  },
  txtContent: {
    fontFamily: FontStyles.InterRegular,
    marginTop: parseSizeHeight(5),
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.semantics_Red_02,
    marginBottom: parseSizeHeight(20),
  },
  txtTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.semantics_Black,
  },
  btnConfirm: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    marginBottom: parseSizeHeight(12),
  },
  btnClose: {
    position: 'absolute',
    zIndex: 2,
    right: parseSizeWidth(15),
    top: parseSizeHeight(15),
  },
  img: {
    width: parseSizeWidth(91),
    height: parseSizeHeight(100),
  },

  intoBottomNotifi: {
    width: parseSizeWidth(185),
    height: parseSizeHeight(155),
    alignItems: 'center',
    justifyContent: 'center',
  },
  intoBottom: {
    width: parseSizeWidth(163),
    height: parseSizeHeight(102),
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    width: parseSizeWidth(250),
    height: parseSizeHeight(130),
    backgroundColor: Colors.neutrals_200,
    borderTopLeftRadius: parseSize(16),
    borderTopRightRadius: parseSize(16),
    alignItems: 'center',
    paddingVertical: Sizes.spacing_4_Height,
  },
  bottom: {
    width: parseSizeWidth(250),
    height: parseSizeHeight(200),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: parseSizeWidth(250),
    backgroundColor: Colors.background,
    borderRadius: parseSize(16),
    alignItems: 'center',
    paddingBottom:10,
  },
  modalComponent: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundShowPopup,
  },
});
