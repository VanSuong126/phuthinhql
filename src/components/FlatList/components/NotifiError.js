import {StyleSheet} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {MyView, MyText} from '~components/MyStyles';

import {Colors, Sizes, parseSizeWidth, FontStyles, parseSize} from '~theme';
const Index = ({data, index}) => {
  return (
    <MyView style={styles.box}>
      <MyView style={styles.boxLeft}>
        <MyText style={styles.txtContent}>{data?.order_code}</MyText>
        <MyText style={styles.txtContent}>{data?.phone}</MyText>
      </MyView>
      <MyText
        style={[styles.errorText, data?.success === '01' && styles.success]}>
        {data?.message}
      </MyText>
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  box: {
    borderRadius: parseSize(16),
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: Sizes.spacing_2_Width,
    paddingVertical: Sizes.spacing_3_Width,
    gap: Sizes.spacing_2_Width,
    width: parseSizeWidth(260),
  },
  boxLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtContent: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.neutrals_700,
  },
  errorText: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.semantics_Red_01,
  },
  success: {
    color: Colors.brand_01,
  },
});
