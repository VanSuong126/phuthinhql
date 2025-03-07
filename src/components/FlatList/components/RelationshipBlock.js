import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import {MyText, MyView} from '~components/MyStyles';
import Line from '~components/Line';
import {Colors, Sizes, FontStyles, parseSizeHeight} from '~theme';

const Index = ({data, index, onPress}) => {
  const { t } = useTranslation();
  const options = [
    { label: t('male'), gender: 1 },
    { label: t('female'), gender: 0 },
    { label: t('unselected'), gender: -1 },
];
let gender =options.find(g=>g.gender === data?.GioiTinh)?.label;
  return (
    <TouchableOpacity onPress={() => onPress({
      IDMoiQuanHe: data.ID,
      MoiQuanHe: data?.MoiQuanHe,
      HoTen:data?.HoTen,
      GioiTinh:data?.Gioitinh,
      GioiTinhText:gender,
      NgaySinh:data?.NgaySinh,
      GhiChu: data?.GhiChu,
     })} style={styles.item}>
      <MyView style={styles.content}>
        <MyText style={styles.textName}>{data?.MoiQuanHe}: {data?.HoTen}| {gender} </MyText>
        <MyText style={styles.textInfo}>{moment(data?.NgaySinh).format('DD/MM/YYYY')}</MyText>
      </MyView>
      <Line color={Colors.neutrals_300} thickness={1} />
    </TouchableOpacity>
  );
};

export default Index;

const styles = StyleSheet.create({
  content: {
    gap: parseSizeHeight(5),
  },
  item: {
    gap: Sizes.spacing_4_Height,
    marginBottom: Sizes.spacing_4_Height,
  },
  textName: {
    fontFamily: FontStyles.InterRegular,
    fontWeight: '600',
    fontSize: Sizes.text_subtitle2,
    color: Colors.semantics_Grey,
  },
  textInfo: {
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    fontSize: Sizes.text_tagline1,
    color: Colors.semantics_Grey,
  },

});
