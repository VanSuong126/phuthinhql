import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { Colors, parseSizeWidth, parseSizeHeight, Sizes,parseSize, FontStyles } from '~theme';
import Modal from 'react-native-modal';
import { MyView, MySafeAreaView, MyText } from '~components/MyStyles';
import Button from '~buttons/MyButton';

const Index = props => {
  const { t } = useTranslation();
  const { isVisible, onClose, data, onDelete = null } = props;

  return (
    <Modal
      onBackdropPress={onClose}
      visible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modal}>
      <MySafeAreaView style={styles.container}>
          <MyView style={styles.line} />
          <MyView style={styles.content}>
            <MyView style={styles.wrapRelationship}>
              <MyText style={styles.textTitle}>{t('to')}: {data?.MoiQuanHe}</MyText>
              <MyText style={styles.textInfo}>{data?.HoTen} ({moment(data?.NgaySinh).format('DD/MM/YYYY')})</MyText>
              <MyText style={styles.textInfo}>{data?.LoiNhan}</MyText>
            </MyView>
            <MyView style={styles.wrapNote}>
              <MyText style={styles.textTitle}>{t('serviceProduct')}</MyText>
             {data?.QuaTang && <MyText style={styles.textInfo}>{t('gift')}</MyText>}
             {data?.SanPhamGieoDuyen&& <MyText style={styles.textInfo}>{t('meritProduct')}</MyText>}
              <MyText style={styles.textInfo}>{data?.NoiDungDichVuCongThem}</MyText>
            </MyView>
            <MyView style={onDelete?styles.wrapButton1:styles.wrapButton2}>
              {onDelete && <Button
                title={t('deleteNote')}
                onPress={() => onDelete()}
                type="2"
                size="medium"
              />}
              <Button
                title={t('close')}
                onPress={() => onClose()}
                type="1"
                size={onDelete?"medium": "primary"}
              />
            </MyView>
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
  wrapRelationship: {
    gap: parseSizeHeight(8),
  },
  wrapNote: {
    marginVertical: parseSizeHeight(20),
    gap: parseSizeHeight(8),
  },
  textTitle: {
    marginBottom: parseSizeHeight(10),
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '600',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  textInfo: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Grey,
  },
  wrapButton1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapButton2: {
    marginHorizontal:Sizes.marginWidth,
    justifyContent: 'center',
    alignItems:'center',
  },
});
