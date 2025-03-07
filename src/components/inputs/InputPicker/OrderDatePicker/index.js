import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';


import Icon from '~components/IconXML';
import {
  MyView,
  MyText,
  MyTouchableOpacity,
} from '~components/MyStyles';
import { salesActions, salesSelectors } from '~redux/reducers';
import ModalCalendar from '~modals/ModalCalendar';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  FontStyles,
} from '~theme';

const getCurrentDateTime = () => {
  const current = new Date();
  const date = current.toISOString().split('T')[0];
  const time = current.toTimeString().split(' ')[0]; // Giờ, phút, giây
  return `${date} ${time}`;
};

const Index = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //init state
  const [visibleModalPicker, setVisibleModalPicker] = useState(false);
  const [orderDate, setOrderDate] = useState(getCurrentDateTime()); // Set mặc định là ngày giờ hiện tại

  // global state
  const orderData = useSelector(state => salesSelectors.selectDataSales(state));

  useEffect(() => {
    dispatch(salesActions.setDataSales({ ...orderData, ngaydathang: orderDate }));
  }, [orderDate]);

  return (
    <MyView style={styles.container}>
      <MyView style={styles.wrapIcon}>
        <Icon name="calendar" width="24" height="24" />
      </MyView>
      <MyView style={styles.wrapInfo}>
        <MyView style={styles.wrapTitle}>
          <MyText style={styles.titleTitle}>{t('orderDate')}</MyText>
          <MyTouchableOpacity onPress={() => setVisibleModalPicker(true)}>
            <Icon name="rightArrow" width="24" height="24" />
          </MyTouchableOpacity>
        </MyView>
        <MyView style={styles.wrapDetail}>
          <MyText style={styles.textInfo}>{moment(orderData?.ngaydathang).format('DD/MM/YYYY')}</MyText>
        </MyView>
      </MyView>
      <ModalCalendar
        isVisible={visibleModalPicker}
        defaultDate={orderData?.ngaydathang}
        onClose={() => setVisibleModalPicker(false)}
        onSelectDates={date => {
          const selectedDateTime = `${date} ${new Date().toTimeString().split(' ')[0]}`;
          setOrderDate(selectedDateTime);
        }}
      />
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    backgroundColor: Colors.neutrals_100,
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(10),
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  wrapIcon:{
    flex:0.1,
  },
  wrapInfo:{
    flex:0.9,
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '600',
    color: Colors.semantics_Black,
  },
  wrapDetail: {
    marginTop: parseSizeHeight(10),
  },
  textInfo: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
});
