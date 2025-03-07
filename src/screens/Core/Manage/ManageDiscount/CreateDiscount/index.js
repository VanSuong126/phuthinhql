import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import {
  MyView,
  MySafeAreaView,
  MyText,
  MyAvoidView,
} from '~components/MyStyles';
import Bottom from '~components/Bottom';
import {Pressable} from 'react-native';
import Icon from '~components/IconXML';
import DatePickerArr from '~inputs/InputPicker/DatePickerArr';
import Input from '~inputs/InputText';
import TypeDiscount from '~inputs/InputPicker/TypeDisCount';
import fetchData from '~providers';
import Toast from 'react-native-toast-message';
import InputWithUnit from '~inputs/InputWithUnit';
const Index = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const nowDate = moment().format('YYYY-MM-DD');
  const [ischeck, setIsCheck] = useState(false);
  const [fromDate, setFromDate] = useState(nowDate);
  const [toDate, setToDate] = useState(nowDate);
  const [typeDiscount, setTypeDiscount] = useState('');

  // State values for the inputs
  const [quantity, setQuantity] = useState();
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [usage, setUsage] = useState();

  const ClickCheckBox = () => {
    setIsCheck(!ischeck);
  };

  const codeDiscountRandom = length => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars.charAt(randomIndex);
    }

    return result;
  };

  function generateDiscountCodes(soluongma) {
    let codes = [];
    for (let i = 0; i < soluongma; i++) {
      const magiamgia = codeDiscountRandom(5);
      codes.push(magiamgia);
    }
    return codes.join(', '); // Ghép các mã thành chuỗi, ngăn cách bởi dấu phẩy
  }

  const CreateDiscount = () => {
    const today = moment().format('YYYY-MM-DD');

    if (!quantity || (!amount && !rate) || !usage || !typeDiscount) {
      Toast.show({
        type: 'error',
        props: {
          message: t('checkSend'),
        },
      });
      return;
    } else if (moment(today).isAfter(moment(fromDate))) {
      Toast.show({
        type: 'error',
        props: {
          message: t('warningCreateDiscount'),
        },
      });
      return;
    }

    const magiamgias = generateDiscountCodes(quantity);

    const params = {
      soluongma: Number(quantity),
      magiamgias: magiamgias,
      loaigiamgia: typeDiscount,
      sotiengiamgia: Number(amount),
      tylegiamgia: Number(rate),
      tungay: fromDate,
      denngay: toDate,
      solansudung: Number(usage),
      noibo: ischeck === true ? 0 : 1,
    };

    fetchData(dispatch, 'createDiscount', params, data => {
      if (data.data[0].success === '01') {
        Toast.show({
          type: 'success',
          props: {
            message: `${t('notifiSuccessCreateCodeDiscount')}`,
          },
        });
      } else {
        Toast.show({
          type: 'error',
          props: {
            message: t('notifiErrorCreateCodeDiscount'),
          },
        });
      }
    });
    navigation.navigate('qua_tri_khach_hang');
  };
  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('createPromotionCode')} />
      <MyAvoidView contentContainer={styles.contentContainer}>
        <MyView style={styles.body}>
          <MyView style={[styles.horizontal, styles.checkBox]}>
            <MyText style={styles.txtCheckBox}>{t('internal')}</MyText>
            <Pressable onPress={ClickCheckBox}>
              <Icon
                name={ischeck ? 'checked' : 'unChecked'}
                width={20}
                height={20}
              />
            </Pressable>
          </MyView>
          <TypeDiscount
            styleContainer={styles.typeDiscount}
            getOption={setTypeDiscount}
          />
          <DatePickerArr
            labelName={t('usagePeriod')}
            styleContainer={styles.dateArr}
            getFromDate={setFromDate}
            getToDate={setToDate}
          />
          <MyView style={styles.horizontal}>
            <Input
              styleContainer={styles.input}
              labelName={t('numberofCodes')}
              value={quantity}
              onChangeText={setQuantity}
              returnKeyType="next"
              keyboardType="numeric"
              styleText={styles.textInput}
            />
            <InputWithUnit
              unit={'đ'}
              value={amount}
              onChangeText={setAmount}
              maxLength={20}
              styleContainer={styles.input}
              styleText={styles.textInput}
              labelName={t('discountAmount')}
            />
          </MyView>
          <MyView style={styles.horizontal}>
            <InputWithUnit
              unit={'%'}
              value={rate}
              onChangeText={setRate}
              maxLength={20}
              styleContainer={styles.input}
              styleText={styles.textInput}
              labelName={t('rateDiscount')}
              maxValue={100}
            />
            <Input
              styleContainer={styles.input}
              labelName={t('numberOfUses')}
              value={usage}
              onChangeText={setUsage}
              returnKeyType="done"
              keyboardType="numeric"
              styleText={styles.textInput}
            />
          </MyView>
        </MyView>
      </MyAvoidView>

      <MyView style={styles.bottom}>
        <Bottom
          sticky={false}
          onPress1={() => CreateDiscount()}
          titleBtn1={t('createPromotionCode')}
        />
      </MyView>
    </MySafeAreaView>
  );
};

export default Index;
