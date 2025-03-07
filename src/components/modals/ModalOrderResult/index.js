import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Clipboard from '@react-native-community/clipboard';
import Modal from 'react-native-modal';

import { Colors, parseSizeWidth, parseSizeHeight, Sizes, FontStyles } from '~theme';
import { MyView, MyText, MyImage, MyTouchableOpacity } from '~components/MyStyles';
import ImageCreateSuccess from '~assets/images/createOrderSuccess.png';
import ImageCreateFail from '~assets/images/createOrderFail.png';

import QRCode from '~assets/images/qrCode.png';
import Icon from '~components/IconXML';
import Button from '~buttons/MyButton';
import ModalPayment from '~components/modals/ModalPayment';


const Index = props => {
  const { t } = useTranslation();
  const { isVisible, onClose, data, paymentNow = false, onPress, update = false } = props;
  const [visibleModalPayment, setVisibleModalPayment] = useState(false);

  const handlePress = action => {
    onPress(action);
  }

  const RenderSuccess = () => {
    return (
      <MyView style={styles.content}>
        <MyView style={styles.wrapImageResult}>
          <MyImage source={ImageCreateSuccess} style={styles.imageResult} resizeMode="stretch" />
        </MyView>
        <MyView style={styles.wrapBodyResult}>
          <MyText style={styles.titleResult}>{update ? t('updateOrderSuccess') : t('createOrderSuccess')}</MyText>
          <MyView style={styles.wrapShare}>
            <MyTouchableOpacity style={styles.wrapPrint} onPress={() => handlePress({ action: "PrintOrderBill" })}>
              <MyImage source={QRCode} style={styles.imageQR} resizeMode="stretch" />
              <MyText style={styles.textPrint}>{t('printOrderBill')}</MyText>
            </MyTouchableOpacity>
            <MyText style={styles.line} />
            <MyTouchableOpacity style={styles.wrapCopy} onPress={() => Clipboard.setString(data?.DonHang[0]?.MaDonHang)}>
              <MyText style={styles.textCopy}>{data?.DonHang[0]?.MaDonHang}</MyText>
              <MyView style={styles.wrapIconCopy}>
                <Icon name="copy" width="18" height="18" color={Colors.semantics_Black} />
              </MyView>
            </MyTouchableOpacity>
          </MyView>
        </MyView>
        <MyView style={styles.wrapFooter}>
          <MyTouchableOpacity style={styles.wrapComplete} onPress={() => handlePress({ action: "Complete" })}>
            <MyText style={styles.textComplete}>{t('complete')}</MyText>
          </MyTouchableOpacity>
          {paymentNow && <Button
            title={t('paymentNow')}
            size="primary"
            type={1}
            onPress={() => setVisibleModalPayment(true)}
          />}
          <Button
            title={t('createNewOrder')}
            size="primary"
            type={2}
            onPress={() => handlePress({ action: "CreateNewOrder" })}
          />
        </MyView>
      </MyView>
    )
  }

  const RenderFail = () => {
    return (
      <MyView style={styles.content}>
        <MyView style={styles.wrapImageResult}>
          <MyImage source={ImageCreateFail} style={styles.imageResult} resizeMode="stretch" />
        </MyView>
        <MyView style={styles.wrapBodyResult}>
          <MyText style={styles.titleResult}>{update ? t('updateOrderFail') : t('createOrderFail')}</MyText>
          <MyView style={styles.wrapError}>
            <MyText style={styles.textTechnicalError}>{t('technicalError')}?</MyText>
            <MyTouchableOpacity style={styles.wrapComplete} onPress={() => handlePress({ action: "ReportError" })}>
              <MyText style={styles.textReportError}>{t('reportError')}</MyText>
            </MyTouchableOpacity>
          </MyView>
        </MyView>
        <MyView style={styles.wrapFooter}>
          <Button
            title={t('tryAgain')}
            size="primary"
            type={1}
            onPress={() => handlePress({ action: "TryAgain" })}
          />
          <Button
            title={t('cancelOrder')}
            size="primary"
            type={2}
            onPress={() => handlePress({ action: "CancelOrder" })}
          />
        </MyView>
      </MyView>
    )
  }

  return (
    <Modal
      onBackdropPress={onClose}
      visible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modal}>
      <MyView style={styles.container}>
        {Array.isArray(data?.DonHang) && data?.DonHang?.[0]?.MaDonHang
          ? <RenderSuccess />
          : <RenderFail />
        }
      </MyView>
      <ModalPayment
        isVisible={data?.DonHang ? visibleModalPayment : false}
        onClose={() => setVisibleModalPayment(false)}
        orderCode={data?.DonHang?.[0]?.MaDonHang || ''}
        totalAmountPayment={data?.DonHang?.[0]?.TongSoTien|| 0}
      />
    </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    margin: 0,
  },
  content: {
    flex: 1,
    gap: parseSizeHeight(24),
    paddingHorizontal: Sizes.paddingWidth,
  },
  wrapImageResult: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageResult: {
    width: '80%',
    height: '70%',
    alignItems: 'flex-end',
  },
  wrapBodyResult: {
    flex: 0.2,
    justifyContent: 'flex-start',
    gap: parseSizeHeight(24),

  },
  titleResult: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h4,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.semantics_Black,
  },
  wrapShare: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.neutrals_300,
    borderRadius: parseSizeWidth(10),
    paddingVertical: parseSizeHeight(10),
    gap: parseSizeWidth(10),
  },
  wrapPrint: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: parseSizeWidth(16),
    gap: parseSizeWidth(10),
  },
  textPrint: {
    flex: 1,
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_700,
    textAlign: 'center',
  },
  line: {
    backgroundColor: Colors.neutrals_300,
    height: parseSizeWidth(40),
    width: 2,
  },
  wrapCopy: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: parseSizeWidth(10),
  },
  imageQR: {
    width: parseSizeWidth(50),
    height: parseSizeWidth(50),
  },
  textCopy: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.semantics_Yellow_02,
    textAlign: 'center',
  },
  wrapIconCopy: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapFooter: {
    flex: 0.3,
    gap: parseSizeHeight(10),
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: parseSizeHeight(42),
  },
  wrapComplete: {
    paddingVertical: parseSizeHeight(4),
  },
  textComplete: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.accent_blue,
    textAlign: 'center',
  },
  wrapError: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: parseSizeWidth(10),
  },
  textTechnicalError: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.semantics_Black,
    textAlign: 'center',
  },
  textReportError: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.accent_blue,
    textAlign: 'center',
  },

});
