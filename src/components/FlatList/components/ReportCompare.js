import React, {useState} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';

import Icon from '~components/IconXML';
import {MyText, MyView} from '~components/MyStyles';
import {Colors, Sizes, parseSizeWidth} from '~theme';

const Index = ({data}) => {
  const {t} = useTranslation();
  return (
    <MyView style={styles.infor}>
      <MyText style={styles.txtMonth}>{t(data?.groupByKey)}</MyText>
      <MyText style={styles.txtInfor}>
        {data?.dataDich === 0 ? '-' : data?.dataDich}
      </MyText>
      <MyView style={styles.inforNguon}>
        <MyText style={styles.txtInforNguon}>
          {data?.dataNguon === 0 ? '-' : data?.dataNguon}
        </MyText>
        {data?.dataNguon !== 0 && (
          <Icon
            name={data?.dataDich < data?.dataNguon ? 'up' : 'down'}
            width="18"
            height="18"
          />
        )}
      </MyView>
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
    color: Colors.brand_02,
  },
  inforNguon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtInforNguon: {
    fontWeight: '600',
    textAlign: 'center',
    marginRight: Sizes.spacing_1_Width,
    color: Colors.brand_01,
  },
});
