import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Modal from 'react-native-modal';
import { Colors, parseSizeWidth, parseSizeHeight, Sizes, parseSize, FontStyles } from '~theme';
import { MyView, MySafeAreaView, MyText, MyScrollView } from '~components/MyStyles';
import Button from '~buttons/MyButton';

const Index = (props) => {
  const { t } = useTranslation();
  const { isVisible, onClose, data } = props;

  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modal}
    >
      <MySafeAreaView style={styles.container}>
        <MyView style={styles.line} />
        <MyScrollView style={styles.content}>
          {Array.isArray(data) && data.map((item, index) => (
            <MyView key={index} style={styles.wrapItem}>
              <MyView style={styles.wrapRow}>
                <MyView style={styles.wrapInfo}>
                  <MyText style={styles.textName}>{t('from')}: {item?.HoTenNguoiTao}
                  </MyText>
                </MyView>
              </MyView>
              <MyView style={styles.wrapRow}>
                <MyView style={styles.wrapInfo}>
                  <MyText style={styles.textTitle}>{t('requestDate')}: </MyText>
                  <MyText style={styles.textInfo}>{moment(item?.NgayYeuCau).format('DD/MM/YYYY')}</MyText>
                </MyView>
              </MyView>
              <MyView style={styles.wrapRow}>
                <MyView style={[styles.wrapInfo, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                  <MyText style={styles.textTitle}>{t('status')}: </MyText>
                  <MyView style={[
                    styles.wrapStatus,
                     item?.TrangThaiYeuCau ===1&& { backgroundColor: Colors.semantics_Green_03 ,borderColor: Colors.semantics_Green_01, borderWidth: 1 },
                     item?.TrangThaiYeuCau ===7&& { backgroundColor: Colors.semantics_Red_03,borderColor: Colors.semantics_Red_01, borderWidth: 1} ]}>
                    <MyText style={[styles.textStatus,
                     item?.TrangThaiYeuCau ===1&& { color: Colors.semantics_Green_01 },
                     item?.TrangThaiYeuCau ===7&& { color: Colors.semantics_Red_01 } ]}>
                      {item?.TrangThaiYeuCau === 0 ? t('waiting') : item?.TrangThaiYeuCau === 1 ? t('accept') : t('reject')}
                    </MyText>
                  </MyView>
                </MyView>
              </MyView>
              <MyView style={styles.wrapRow}>
                <MyView style={styles.wrapInfo}>
                  <MyText style={styles.textTitle}>{t('approver')}: </MyText>
                  <MyText style={styles.textInfo}>{item?.HoTenNguoiPheDuyet}</MyText>
                </MyView>
              </MyView>
              <MyView style={styles.wrapRow}>
                <MyView style={styles.wrapInfo}>
                  <MyText style={styles.textTitle}>{t('approvalDate')}: </MyText>
                  <MyText style={styles.textInfo}>{moment(item?.NgayYeuCau).format('DD/MM/YYYY')}</MyText>
                </MyView>
              </MyView>
              <MyView style={styles.wrapRow}>
                <MyView style={styles.wrapInfo}>
                  <MyText style={styles.textTitle}>{t('reason')}: </MyText>
                  <MyText style={styles.textInfo}>{item?.LyDoYeuCau}</MyText>
                </MyView>
              </MyView>
            </MyView>
          ))}
        </MyScrollView>
        <MyView style={styles.wrapButton}>
          <Button
            title={t('close')}
            onPress={onClose}
            type="1"
            size={"medium"}
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
    maxHeight: '60%',
    backgroundColor: Colors.neutrals_50,
    borderTopLeftRadius: parseSize(24),
    borderTopRightRadius: parseSize(24),
    alignSelf: 'center',
    justifyContent: 'center',
    paddingBottom: Platform.OS === 'android' ? parseSizeHeight(24) : 0,
  },
  content: {
    marginHorizontal: Sizes.marginWidth,
  },
  wrapItem: {
    marginVertical: parseSizeHeight(10),
    gap: parseSizeHeight(6),
  },
  wrapRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: parseSizeHeight(6),
  },
  wrapInfo: {
    flexDirection: 'row',
  },
  textTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Grey,
  },
  textName: {
    marginBottom: parseSizeHeight(10),
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '600',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  wrapStatus: {
    paddingHorizontal: parseSizeHeight(8),
    paddingVertical: parseSizeWidth(6),
    backgroundColor: Colors.neutrals_300, 
    borderRadius: 20,

  },
  textStatus: {
    fontFamily: FontStyles.InterRegular,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: Sizes.text_tagline1,
    color: Colors.semantics_Black,
  },
  textInfo: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  wrapButton: {
    marginHorizontal: Sizes.marginWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
