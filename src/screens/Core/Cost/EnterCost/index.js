import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import ToggleSwitch from 'toggle-switch-react-native';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

import HeaderToolBar from '~components/headers/HeaderToolBar';
import InputText from '~inputs/InputText';
import {
  MySafeAreaView,
  MyView,
  MyAvoidView,
  MyText,
} from '~components/MyStyles';
import Bottom from '~components/Bottom';
import InputMutiLine from '~components/inputs/InputMutiLine';
import DatePicker from '~inputs/InputPicker/DatePicker';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';
import TypeCostPicker from '~inputs/InputPicker/TypeCostPicker';
import fetchData from '~providers';
import InputWithUnit from '~inputs/InputWithUnit';

const Index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();

  // State variables for each input field
  const [dateCost, setDateCost] = useState(new Date());
  const [orderCode, setOrderCode] = useState('');
  const [amountCost, setAmountCost] = useState('');
  const [errorCost, setErrorCost] = useState('');
  const [typeCost, setTypeCost] = useState('');
  const [note, setNote] = useState('');
  const [plus, setPlus] = useState(false);

  const handleRefresh = () => {
    setDateCost(new Date());
    setOrderCode('');
    setAmountCost('');
    setErrorCost('');
    setTypeCost('');
    setNote('');
    setPlus(false);
  };

  const handleSaveCost = () => {
    if (amountCost == 0) {
      setErrorCost(t('errorAmountCost'));
      return;
    } else {
      const params = {
        loai: 2,
        ngayphatsinh: moment(dateCost).format('YYYY-MM-DD'),
        sotien: plus ? amountCost : -amountCost,
        ghichu: note,
        idloaichiphi: typeCost?.value,
      };
      fetchData(dispatch, 'saveCost', params, res => {
        if (res?.success === true) {
          handleRefresh();
          Toast.show({
            type: 'success',
            props: {message: t('saveCostSuccess')},
          });
        } else {
          Toast.show({
            type: 'error',
            props: {message: res?.message},
          });
        }
      });
    }
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar
        nameHeaderTitle={t('enterCost')}
        iconRight="renew"
        onPressRight={() => handleRefresh()}
      />
      <MyAvoidView>
        <MyView style={styles.content}>
          <MyView style={styles.wrapInputCost}>
            <MyView style={styles.wrapTypeValue}>
              <MyView style={styles.wrapTitleType}>
                <MyText style={styles.textValueType}>-</MyText>
              </MyView>
              <ToggleSwitch
                isOn={plus}
                onColor={Colors.brand_01}
                offColor={Colors.neutrals_300}
                size="medium"
                onToggle={isOn => setPlus(isOn)}
              />
              <MyView style={styles.wrapTitleType}>
                <MyText style={styles.textValueType}>+</MyText>
              </MyView>
            </MyView>
            <InputWithUnit
              unit={'đ'}
              value={amountCost}
              keyboardType="numeric"
              labelName={t('amountCost')}
              placeholder={t('amountCost')}
              onChangeText={value => {
                setAmountCost(value);
                setErrorCost('');
              }}
              styleContainer={styles.containerInputCost}
              styleText={styles.textInputCost}
              contentError={errorCost}
            />
          </MyView>
          <DatePicker
            labelName={t('time')}
            styleContainer={styles.input}
            value={dateCost}
            getValue={val => setDateCost(val)}
            minDate={new Date('2020-01-01')} // Đặt ngày tối thiểu là 01/01/2020
            maxDate={new Date(new Date().setDate(new Date().getDate() + 30))} // Đặt ngày tối đa là 30 ngày từ hôm nay
          />
          <InputText
            value={orderCode}
            labelName={t('orderCode')}
            placeholder={t('orderCode')}
            onChangeText={value => setOrderCode(value)}
          />

          <TypeCostPicker
            selectedValue={typeCost}
            getValue={value => setTypeCost(value)}
          />
          <InputMutiLine
            labelName={t('note')}
            value={note}
            onChangeText={value => setNote(value)}
            maxLength={300}
          />
        </MyView>
      </MyAvoidView>
      <Bottom
        sticky={false}
        titleBtn1={t('viewList')}
        onPress1={() => navigation.navigate('danh-sach-chi-phi')}
        titleBtn2={t('saveCost')}
        onPress2={() => handleSaveCost()}
      />
    </MySafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Sizes.paddingWidth,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Sizes.paddingWidth,
    marginBottom: parseSizeHeight(40),
    gap: parseSizeHeight(20),
  },
  wrapInputCost: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: parseSizeWidth(10),
  },
  containerInputCost: {
    flex: 0.6,
  },
  wrapTypeValue: {
    flex: 0.4,
    flexDirection: 'row',
    gap: parseSizeWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: parseSizeHeight(10),
  },
  contentInputCost: {
    flex: 1,
  },
  textInputCost: {
    flex: 1,
    height: parseSizeHeight(50),
    backgroundColor: Colors.neutrals_200,
    color: Colors.semantics_Black,
  },
  wrapTitleType: {
    width: parseSizeWidth(30),
    height: parseSizeWidth(30),
    borderRadius: 100,
    backgroundColor: Colors.neutrals_200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textValueType: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '600',
    color: Colors.neutrals_700,
  },
});
