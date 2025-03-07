import React from 'react';
import { StyleSheet } from 'react-native';

import { Colors, Sizes, FontStyles,parseSizeHeight } from '~theme';
import { MyView, MyText } from '~components/MyStyles';

export default Index = ({title}) => {
  return (
    <MyView style={styles.container}>
      <MyText style={styles.textTitleHeader}>{title}</MyText>
    </MyView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: Sizes.spacing_9_Height,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: Sizes.paddingHeight,
    gap: Sizes.spacing_3_Height,
    backgroundColor: Colors.neutrals_100,
  },
  textTitleHeader: {
    height: parseSizeHeight(28),
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.semantics_Black,
  },
});
