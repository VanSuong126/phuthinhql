import React, {useState} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';

import {MyText, MyView} from '~components/MyStyles';
import {Colors, Sizes} from '~theme';

const Index = ({data}) => {
  const {t} = useTranslation();
  const styleText = [
    styles.txtInfor,
    data?.dataSoSanh < 0 && styles.txtInforRed,
  ];
  return (
    <MyView style={styles.infor}>
      <MyText style={styles.txtMonth}>{t(data?.groupByKey)}</MyText>
      <MyText style={styleText}>{data?.dataSoSanh ?? '0'}</MyText>
      <MyText style={styleText}>{data?.dataTyLe ?? '0%'}</MyText>
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  infor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingVertical: Sizes.spacing_3_Height,
  },
  txtMonth: {
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  },
  txtInfor: {
    fontWeight: '600',
    textAlign: 'center',
    marginRight: Sizes.spacing_1_Width,
    flex: 1,
    color: Colors.brand_01,
  },
  txtInforRed: {
    color: Colors.semantics_Red_02,
  },
});
