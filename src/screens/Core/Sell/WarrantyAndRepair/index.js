import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Keyboard } from 'react-native';

import { MyView, MyText, MySafeAreaView, MyAvoidView } from '~components/MyStyles';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import InputSearch from '~inputs/InputSearch';
import InputText from '~inputs/InputText';
import styles from './styles';
import CheckBox from '~components/CheckBox';
import Bottom from '~components/Bottom';
import { salesActions } from '~redux/reducers';
import InputWithUnit from '~inputs/InputWithUnit';


const Index = props => {
  const route = useRoute();
  const { data } = route.params;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Replace useRef with useState
  const [codeOrder, setCodeOrder] = useState(data?.MaSanPham || '');
  const [nameProduct, setNameProduct] = useState(data?.TenSanPham || '');
  const [price, setPrice] = useState(data?.GiaSauGiam == 0 ? '0' : data?.GiaSauGiam.toString());
  const [note, setNote] = useState(data?.GhiChu || '');
  const [checkWarranty, setCheckWarranty] = useState(data?.BaoHanh);
  const [checkRepair, setCheckRepair] = useState(data?.SuaChua);
  const [stringSearch, setStringSearch] = useState('');


  const handleSearch = text => {
    console.log(text);
  };

  const handleSave = () => {
    navigation.goBack();
  };

  const handleUpdate = () => {
    if (codeOrder && nameProduct && price && note) {
      dispatch(
        salesActions.updateProduct({
          MaSanPham: data.MaSanPham,
          TenSanPham: nameProduct,
          GiaBan: price,
          GhiChu: note,
          BaoHanh: checkWarranty,
          SuaChua: checkRepair,
        }),
      );
      navigation.goBack();
    }
  };

  const handleOnChangeText = (nameInput, value) => {
    switch (nameInput) {
      case 'CodeOrder':
        setCodeOrder(value);
        break;
      case 'NameProduct':
        setNameProduct(value);
        break;
      case 'Price':
        setPrice(value);
        break;
      case 'Note':
        setNote(value);
        break;
      default:
        console.log('Unknown input name');
        break;
    }
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar
        nameHeaderTitle={t('warranty_and_repair')}
        iconRight="renew"
        onPressRight={() => navigation.goBack()}
      />
      <MyView style={styles.header}>
        <InputSearch
          value={stringSearch}
          type="Secondary"
          placeholder={t('search')}
          getString={value => setStringSearch(value)}
          onSearch={handleSearch}
        />
      </MyView>
      <MyAvoidView>
        <MyView style={styles.body}>
          <InputText
            labelName={t('orderCode')}
            type="text"
            value={codeOrder}
            contentError={''}
            onChangeText={value => handleOnChangeText('CodeOrder', value)}
            onBlur={() => Keyboard.dismiss()}
            returnKeyType="done"
          />
          <InputText
            labelName={t('productName')}
            type="text"
            value={nameProduct}
            contentError={''}
            onChangeText={value => handleOnChangeText('NameProduct', value)}
            onBlur={() => Keyboard.dismiss()}
            returnKeyType="done"
          />
          <MyView style={styles.wrapInputUnit}>
            <MyText style={styles.labelInput}>{t('unitPrice')}</MyText>
            <InputWithUnit
              styleContainer={styles.inputUnit}
              styleText={styles.textUnit}
              unit={'đ'}
              value={price}
              onChangeText={value => setPrice(value)}
              maxLength={20}
              maxValue={10000000000}
            />
          </MyView>
          <InputText
            labelName={t('note')}
            type="text"
            value={note}
            contentError={''}
            onChangeText={value => handleOnChangeText('Note', value)}
            onBlur={() => Keyboard.dismiss()}
            returnKeyType="done"
          />
          <MyView style={styles.checkbox}>
            <CheckBox
              value={checkWarranty}
              title={t('warrantyService')}
              styleTitle={styles.textValueCheck}
              onSelect={value => setCheckWarranty(value)}
            />
            <CheckBox
              value={checkRepair}
              title={t('repairService')}
              styleTitle={styles.textValueCheck}
              onSelect={value => setCheckRepair(value)}
            />
          </MyView>
        </MyView>
      </MyAvoidView>
      <Bottom
        titleBtn1="Lưu"
        titleBtn2="Cập nhật"
        onPress1={handleSave}
        onPress2={handleUpdate}
      />
    </MySafeAreaView>
  );
};

export default Index;
