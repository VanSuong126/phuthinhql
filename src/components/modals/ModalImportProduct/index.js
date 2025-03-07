import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '~theme';
import Modal from 'react-native-modal';
import {MyText, MyView} from '~components/MyStyles';
import Icon from '~components/IconXML';
import Button from '~buttons/MyButton';
import InputWithUnit from '~inputs/InputWithUnit';

const Index = props => {
  const {t} = useTranslation();
  const {isVisible, data, onApply, onClose} = props;
  const [amount, setAmount] = useState(0);

  const handleSubmit = () => {
    const dataUpdated = {
      soLuong: amount,
      idSanPham: data?.productID,
    };
    onApply(dataUpdated);
    onClose();
  };
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
          <MyText style={styles.textTitle}>
            {t('importProduct')} {data?.codeProduct}
          </MyText>
          <MyView style={styles.wrapInput}>
            <MyText style={styles.labelInput}>{data?.productName}</MyText>
            <InputWithUnit
              unit={''}
              value={amount}
              onChangeText={value => setAmount(value)}
              maxLength={20}
              maxValue={1000000000}
            />
          </MyView>
          <MyView style={styles.wrapButton}>
            <Button
              title={t('confirm')}
              size="popup"
              type={1}
              onPress={() => handleSubmit()}
            />
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
    // height: parseSizeHeight(220),
    width: parseSizeWidth(329),
    backgroundColor: Colors.neutrals_50,
    borderRadius: parseSizeWidth(16),
    alignSelf: 'center',
    paddingHorizontal: parseSizeWidth(22),
    paddingVertical: parseSizeHeight(30),
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  iconClose: {
    position: 'absolute',
    top: parseSizeHeight(-18),
    right: parseSizeWidth(0),
  },
  wrapInput: {
    marginVertical: parseSizeHeight(20),
    gap: parseSizeHeight(8),
  },
  textTitle: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    color: Colors.semantics_Grey,
    textAlign: 'center',
  },
  labelInput: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
  wrapButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
