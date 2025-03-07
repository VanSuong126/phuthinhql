import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import FastMenu from '~screens/Core/FastMenu';
import HeaderMain from '~components/headers/HeaderMain';
import ModalItemSelector from '~modals/ModalItemSelector';
import {
  MyView,
  MySafeAreaView,
  MyTouchableOpacity,
  MyText,
} from '~components/MyStyles';
import {
  Colors,
  Sizes,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import Icon from '~components/IconXML';



const Index = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalItemSelector, setModalItemSelector] = useState(false);

  const dataPaymentMoMo = [
    { value: 'tao-sua-diem-check', title: t('createCheckPoint'), nameIcon: 'location', widthIcon: 24, heightIcon: 24 },
    { value: 'danh-sach-diem-check', title:t('listCheckPoint'), nameIcon: 'list', widthIcon: 30, heightIcon: 20 },
  ]

  const handleSelectItem =item=>{
      if(item?.value)
      {
        navigation.navigate(item?.value,{type:1, headerTitle:  t('createCheckPoint')});
      }
  }
  return (
    <MySafeAreaView style={styles.container}>
      <HeaderMain title={t('attendance')} />
      <MyView style={styles.content}>
        <MyTouchableOpacity style={styles.wrapDropDown} onPress={() => setModalItemSelector(true)} >
          <Icon name="location" width="30" height="30" />
          <MyText style={styles.textItem}>{t('managerCheckPoint')}</MyText>
          <Icon name="arrowRight" width="18" height="18" />
        </MyTouchableOpacity>
        <MyTouchableOpacity style={styles.wrapDropDown} onPress={() =>  navigation.navigate("lich-su-checkin")} >
          <Icon name="clock" width="30" height="30" />
          <MyText style={styles.textItem}>{t('attendanceHistory')}</MyText>
          <Icon name="arrowRight" width="18" height="18" />
        </MyTouchableOpacity>
      </MyView>
      <FastMenu />
      <ModalItemSelector
        isVisible={modalItemSelector}
        onClose={() => setModalItemSelector(false)}
        data={dataPaymentMoMo}
        getItem={item => handleSelectItem(item)}
      />
    </MySafeAreaView>
  );
};

export default Index;


const styles = StyleSheet.create({

  content: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Sizes.paddingWidth,
    gap: parseSizeHeight(24),

  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 0,
    margin: 0,
  },

  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Sizes.paddingHeight,
  },
  txtTitle: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    color: Colors.neutrals_900,
    fontWeight: '600',
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
    borderColor: '#dddde3',
  },
  textItem: {
    flex: 1,
    marginLeft: parseSizeWidth(23),
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    fontSize: Sizes.text_subtitle1,
    color: Colors.neutrals_700,
  },
});
