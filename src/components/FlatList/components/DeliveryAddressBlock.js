import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment';

import {MyText, MyView} from '~components/MyStyles';
import Line from '~components/Line';
import {Colors, Sizes, FontStyles, parseSizeHeight} from '~theme';
import Icon from '~components/IconXML';
import { parseSizeWidth } from '../../../theme';

const Index = ({data, index, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress(data)} style={styles.item}>
      <MyView style ={styles.wrapIcon}>
       <Icon name="edit" width="24" height="24" />
      </MyView>
      <MyView style={styles.content}>
        <MyText style={styles.textName}>{data?.Ho} {data?.Ten} | {data?.DienThoai}</MyText>
        <MyText style={styles.textInfo}>{data?.DiaChi}</MyText>
        <MyText style={styles.textInfo}>{data.ThanhPho.replace(/,?\s*ZIP.*$/, "").trim()}, {data.TenQuocGia}</MyText>
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
  wrapIcon:{
    position:'absolute',
    right:parseSizeWidth(0),
    top: parseSizeHeight(16),
  }
});
