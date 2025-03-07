import React from 'react';
import { StyleSheet } from 'react-native';

import { Colors, Sizes, FontStyles } from '~theme';
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
    marginHorizontal: Sizes.marginWidth,
    marginVertical: Sizes.marginHeight,
  },
  textTitleHeader: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_h3,
    fontWeight: '600',
    color: Colors.semantics_Black,
    textAlign: 'left',
  },
});
