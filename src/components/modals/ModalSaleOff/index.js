import {Pressable, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';

import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  Height,
  FontStyles,
} from '~theme';
import {MyView, MyText, MyTextInput} from '~components/MyStyles';
import Button from '~buttons/MyButton';
import Icon from '~components/IconXML';
import InputWithUnit from '~inputs/InputWithUnit';
import formatPrice from '~helper/formatPrice';

const Index = props => {
  const {onClose, isVisible, listProduct, productCode, onApply} = props;
  const {t} = useTranslation();
  const [data, setData] = useState(null);
  const [percentage, setPercentage] = useState('0');
  const [amount, setAmount] = useState('0');
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [maxDiscount, setMaxDiscount] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setData(listProduct);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      loadInitForm();
    }
  }, [productCode]);

  useEffect(() => {
    loadInitForm();
    if (data) {
      const discount = data
        .map(
          item =>
            item?.GiaGiamTienMat +
            item?.GiaSauGiam * item?.TiLeGiam * 0.01 * item?.SoLuongMua,
        )
        .reduce((a, b) => a + b, 0);
      const totalPrice = data
        .map(item => item?.GiaSauGiam * item?.SoLuongMua)
        .reduce((a, b) => a + b, 0);

      setTotalPrice(totalPrice);
      setTotalDiscount(discount);
    }
  }, [data]);

  const loadInitForm = () => {
    const product = data && data.find(item => item?.MaSanPham === productCode);
    if (product) {
      setAmount(product?.GiaGiamTienMat);
      setPercentage(product?.TiLeGiam);
      setMaxDiscount(product?.GiaSauGiam);
    }
  };

  useEffect(() => {
    if (!data) return;
    const updatedProducts = data.map(product => {
      if (product.MaSanPham === productCode) {
        if (product.GiaSauGiam === 0) {
          return {
            ...product,
            GiaGiamTienMat: 0,
            TiLeGiam: 0,
          };
        }
        return {
          ...product,
          GiaGiamTienMat: amount,
          TiLeGiam: percentage,
        };
      }
      return product;
    });
    setData(updatedProducts);
  }, [percentage, amount]);

  const handleApply = () => {
    onApply(data);
  };

  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modalContainer}>
      <MyView style={styles.container}>
        <Pressable style={styles.btnClose} onPress={() => onClose()}>
          <Icon
            name="undo"
            width={parseSizeWidth(24)}
            height={parseSizeHeight(24)}
          />
        </Pressable>
        <MyText style={styles.txtTitle}>{t('discount')}</MyText>
        <MyView style={styles.content}>
          <MyText style={styles.txtNameInput}>{t('discountByPercent')}</MyText>
          <InputWithUnit
            unit={'%'}
            value={percentage}
            onChangeText={value => setPercentage(value)}
            maxLength={4}
          />
        </MyView>
        <MyView style={styles.content}>
          <MyText style={styles.txtNameInput}>{t('discountByAmount')}</MyText>
          <InputWithUnit
            unit={'đ'}
            value={amount}
            onChangeText={value => setAmount(value)}
            maxLength={20}
            maxValue={maxDiscount}
          />
        </MyView>
        <MyView style={styles.totalDiscount}>
          <MyText style={styles.txtNameInput}>{t('totalDiscount')}</MyText>
          <MyView style={styles.total}>
            <MyText
              style={
                totalDiscount > 0
                  ? styles.txtPriceProductLineThrough
                  : styles.txtPriceProduct
              }>
              {formatPrice(totalPrice) || 0}đ
            </MyText>
            <MyText
              style={[styles.txtNameInput, {color: Colors.accent_yellow}]}>
              {formatPrice(totalDiscount) || 0}đ
            </MyText>
          </MyView>
        </MyView>
        <MyView style={styles.btnApply}>
          <Button size="small" title={t('apply')} onPress={handleApply} />
        </MyView>
      </MyView>
    </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundShowPopup,
    margin: 0,
    height: Height,
  },
  container: {
    width: parseSizeWidth(329),
    borderRadius: 16,
    backgroundColor: Colors.neutrals_50,
    paddingHorizontal: parseSizeWidth(20),
    paddingVertical: parseSizeHeight(30),
    gap: parseSizeHeight(16),
    position: 'absolute',
    top: parseSizeHeight(135),
  },
  txtTitle: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.semantics_Black,
  },
  btnClose: {
    position: 'absolute',
    top: parseSizeHeight(30),
    right: parseSizeWidth(20),
    zIndex: 1,
  },
  btnApply: {
    alignItems: 'center',
  },
  content: {
    gap: parseSizeHeight(8),
  },
  txtNameInput: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  txtPriceProduct: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '600',
    textAlign: 'left',
    color: Colors.neutrals_700,
  },
  txtPriceProductLineThrough: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '600',
    textAlign: 'left',
    color: Colors.neutrals_700,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.neutrals_700,
  },
  input: {
    width: parseSizeWidth(289),
    height: parseSizeHeight(43),
    borderRadius: 8,
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: parseSizeWidth(20),
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.accent_yellow,
    fontFamily: FontStyles.InterRegular,
  },
  totalDiscount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtTotal: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    textAlign: 'right',
    color: Sizes.neutrals_700,
  },
  total: {
    alignItems: 'flex-end',
  },
});
