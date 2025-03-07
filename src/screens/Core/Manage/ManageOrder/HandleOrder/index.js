import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import HeaderToolBar from '~components/headers/HeaderToolBar';
import Icon from '~components/IconXML';
import DatePickerArr from '~inputs/InputPicker/DatePickerArr';
import ModalItemSelector from '~modals/ModalItemSelector';
import Button from '~buttons/MyButton';
import {
  Colors,
  Sizes,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import {
  MyText,
  MyView,
  MySafeAreaView,
  MyTouchableOpacity,
} from '~components/MyStyles';

const Index = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dataTypeOrder = [
    {id: 0, value: 'allOrder', label: t('allOrder'), nameIcon: 'all'},
    {
      id: 1,
      value: 'unConfirm',
      label: t('unConfirmOrder'),
      nameIcon: 'clock',
      colorIcon: Colors.semantics_Yellow_02,
    },
    {id: 2, value: 'shipment', label: t('shipmentOrder'), nameIcon: 'shipment'},
    {id: 3, value: 'draftOrder', label: t('draftOrder'), nameIcon: 'file'},
    {
      id: 4,
      value: 'requestCancelOrder',
      label: t('requestCancelOrder'),
      nameIcon: 'bell',
      colorIcon: Colors.semantics_Red_02,
    },
  ];
  const [fromDate, setFromDate] = useState(moment().format('YYYY-MM-DD'));
  const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
  const [modalItemSelector, setModalItemSelector] = useState(false);
  const [typeOrder, setTypeOrder] = useState(dataTypeOrder[0]);

  const handleViewList = () => {
    if (typeOrder?.id === 3) {
      navigation.navigate('quan-tri-don-nhap');
    } else if (typeOrder?.id === 4) {
      navigation.navigate('don-huy-xac-nhan', {fromDate, toDate});
    } else {
      navigation.navigate('danh-sach-don-hang', {
        type: typeOrder,
        fromDate,
        toDate,
      });
    }
  };

  return (
    <MySafeAreaView style={styles.container}>
      <MyView style={styles.content}>
        <MyTouchableOpacity
          style={styles.wrapDropDown}
          onPress={() => setModalItemSelector(true)}>
          <Icon
            name={typeOrder?.nameIcon}
            width="30"
            height="30"
            color={typeOrder?.colorIcon}
          />
          <MyText style={styles.textItem}>{typeOrder?.label}</MyText>
          <Icon name="arrowRight" width="18" height="18" />
        </MyTouchableOpacity>
        <DatePickerArr
          styleContainer={styles.containerDateRangePicker}
          labelName={`${t('from')} - ${t('to')}`}
          getFromDate={val => setFromDate(val)}
          getToDate={val => setToDate(val)}
          styleFomat={styles.txtBranch}
        />
        <MyView style={styles.wrapButton}>
          <Button
            title={t('viewList')}
            onPress={() => handleViewList()}
            type="1"
            size="primary"
          />
        </MyView>
      </MyView>
      <ModalItemSelector
        isVisible={modalItemSelector}
        onClose={() => setModalItemSelector(false)}
        data={dataTypeOrder}
        getItem={item => setTypeOrder(item)}
      />
    </MySafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Sizes.paddingWidth,
  },
  wrapDropDown: {
    height: parseSizeHeight(64),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.paddingWidth,
    borderColor: Colors.neutrals_300,
    borderRadius: 12,
    shadowColor: Colors.black,
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderWidth: 1,
    // borderColor: '#dddde3',
  },
  textItem: {
    flex: 1,
    marginLeft: parseSizeWidth(23),
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    fontSize: Sizes.text_subtitle1,
    color: Colors.neutrals_700,
  },
  containerDateRangePicker: {
    marginTop: parseSizeHeight(30),
  },
  wrapButton: {
    marginTop: parseSizeHeight(30),
    marginHorizontal: Sizes.marginWidth,
  },
});
