import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';


import { FontStyles, Colors, Sizes, parseSizeHeight, parseSizeWidth } from '~theme';
import Modal from 'react-native-modal';
import { MyView, MyText } from '~components/MyStyles';
import Icon from '~components/IconXML';
import Button from '~buttons/MyButton';
import InputWithUnit from '~inputs/InputWithUnit';


const Index = props => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isVisible, data, onApply, onClose } = props;
  const [contactPrice, setContactPrice] = useState(0);

  const handleSubmit = () => {
   const dataUpdate = {
      IDSanPham: data?.IDSanPham,
      SoLuongMua: 1,
      GiaBan: contactPrice,
      GiaSauGiam:contactPrice,
      ThoiGianBaoHanh: data?.ThoiGianBaoHanh,
      KhoiLuong: data?.KhoiLuong,
      GiaGiamTienMat: 0,
      TiLeGiam: 0,
      MaSanPham: data?.MaSanPham,
      TenSanPham: data?.TenSanPham,
      URLImage: data?.URLImage,
      BaoHanh: false,
      SuaChua: false,
    }
    onApply(dataUpdate);
    setContactPrice(0);
    onClose();
  };
  return (
    <Modal onBackdropPress={onClose} visible={isVisible} transparent={true} animationType="slide" style={styles.modal}>
      <MyView style={styles.container}>
        <MyView style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.iconClose}>
            <Icon name={'undo'} width={24} height={24} />
          </TouchableOpacity>
          <MyText style={styles.textTitle}>{t('actualPrice')}</MyText>
          <MyView style={styles.wrapInput}>
            <MyText style={styles.labelInput}>{t('priceSale')}</MyText>
            <InputWithUnit
              unit={'đ'}
              value={contactPrice}
              onChangeText={value => setContactPrice(value)}
              maxLength={20}
              maxValue={10000000000}
            />
          </MyView>
          <MyView style={styles.wrapButton}>
              <Button
                title={t('apply')}
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
