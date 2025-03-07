import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

import GetDataAddressLevel4GHTK from '~helper/getAddressLevel4GHTK';
import BoxArrowDown from '~components/inputs/InputPicker/BoxArrowDown';
import Button from '~buttons/MyButton';
import ModalItemSelector from '~modals/ModalItemSelector';
import { MyView, MyText } from '~components/MyStyles';
import { Colors,Sizes, parseSizeHeight,parseSizeWidth, FontStyles} from '~theme';

const Index = (props) => {
  const { t } = useTranslation();
  const { thanhphonhan, diachinhan, isVisible, onConfirm, onClose } = props;
  const [dataAddressLv4, setDataAddressLv4] = useState([]);
  const [value, setValue] = useState();
  const [visibleModal, setVisibleModal] = useState(false);

  // Xử lý lấy địa chỉ cấp 4 từ GHTK
  useEffect(() => {
    if (isVisible) {
      fetchData();
    }
  }, [thanhphonhan, isVisible]);

  const fetchData = async () => {
    try {
      const parts = thanhphonhan.split(', ');
      const xa = parts[0];
      const huyen = parts[1];
      const tinh = parts[2];

      const reponse = await GetDataAddressLevel4GHTK({
        Tinh: tinh,
        Huyen: huyen,
        Xa: xa,
      });
      const result = JSON.parse(reponse);
      if (result?.success === true) {
        const dataCovert = result?.data.map((location, index) => ({
          value: index + 1, 
          label: location
        }));
        setDataAddressLv4(dataCovert);
      } else {
        Toast.show({
          type: 'error',
          props: {message: t('getDataAddressLevel4Error')},
        });
      }
    } catch (error) {
      console.error('Lỗi trong fetchData:', error);
      // Xử lý lỗi ở đây
    }
  };

  const handleConfirm = () => {
    
  };

  return (
    <Modal
      animationIn="zoomIn"
      animationOut="zoomOut"
      transparent={true}
      isVisible={isVisible}
      animationOutTiming={150}
      animationInTiming={250}
      backdropOpacity={0.3}
      onBackdropPress={() => onClose()}
      style={styles.modal}
    >
      <MyView style={styles.container}>
        <MyText style={styles.textTitle}>
          {t('incorrectAddressLevel4')}
        </MyText>

        <MyView style={styles.content}>
          <MyView style={styles.wrapInfo}>
            <MyText style={styles.textContent}>{diachinhan}</MyText>
            <MyText style={styles.textContent}>{thanhphonhan}</MyText>
          </MyView>
          <BoxArrowDown
            labelName={t('addressLevel4')}
            value={value}
            onPress={() => setVisibleModal(true)}
          />
          <Button
            title={t('confirm')}
            onPress={() => onConfirm(value)}
            type="1"
            size="primary"
          />
          <ModalItemSelector
            isVisible={visibleModal}
            onClose={() => setVisibleModal(false)}
            data={dataAddressLv4}
            getItem={item => setValue(item?.label)}
          />
        </MyView>
      </MyView>
    </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: parseSizeWidth(20),
    paddingVertical: Sizes.paddingHeight,
    paddingHorizontal:Sizes.paddingWidth,
  },
  content: {
    width: '100%',
    borderRadius: parseSizeWidth(20),
    backgroundColor: Colors.neutrals_50,
    justifyContent: 'center',
    padding: Sizes.padding,
    gap: parseSizeHeight(10),
  },
  textTitle: {
    fontFamily: FontStyles.InterSemiBold,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: Sizes.text_subtitle2,
    color: Colors.semantics_Black,
  },
  wrapInfo: {
    width: '100%',
    borderRadius: Sizes.radius,
    backgroundColor: Colors.neutrals_50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    fontFamily: FontStyles.InterSemiBold,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: Sizes.text_tabline1,
    color: Colors.semantics_Black,
  },
});
