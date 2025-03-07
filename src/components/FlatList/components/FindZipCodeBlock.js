import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import {MyText} from '~components/MyStyles';
import Line from '~components/Line';
import {Colors, Sizes, FontStyles} from '~theme';
const Index = ({data, index, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress(data)} style={styles.item}>
      <MyText style={styles.txtItem}>{data.label}</MyText>
      <Line color={Colors.neutrals_300} thickness={1} />
    </TouchableOpacity>
  );
};

export default Index;

const styles = StyleSheet.create({
  item: {
    gap: Sizes.spacing_4_Height,
    marginBottom: Sizes.spacing_4_Height,
  },
  txtItem: {
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
});
