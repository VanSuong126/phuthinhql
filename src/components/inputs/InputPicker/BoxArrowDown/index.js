import React from 'react';
import {StyleSheet} from 'react-native';

import {MyView, MyText, MyTouchableOpacity} from '~components/MyStyles';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import Icon from '~components/IconXML';

const Index = ({labelName, value, styleContainer, styleText, onPress}) => {
  return (
    <MyView style={styles.container}>
      <MyView style={styles.wrapLabel}>
        <MyText style={styles.textLabel}>{labelName}</MyText>
      </MyView>
      <MyTouchableOpacity
        style={styleContainer || styles.wrapInput}
        onPress={onPress}>
        <MyText style={styleText || styles.textValue}>{value}</MyText>
        <MyView style={styles.wrapArrow}>
          <Icon
            name={'downArrow'}
            width={parseSizeWidth(24)}
            height={parseSizeHeight(25)}
            color={Colors.neutrals_700}
          />
        </MyView>
      </MyTouchableOpacity>
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  wrapLabel: {
    marginBottom: parseSizeHeight(5),
  },
  textLabel: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    color: Colors.neutrals_700,
  },
  textValue: {
    paddingRight: parseSizeWidth(24),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '400',
    color: Colors.semantics_Black,
  },
  wrapInput: {
    height: parseSizeHeight(50),
    paddingHorizontal: parseSizeWidth(20),
    backgroundColor: Colors.neutrals_200,
    borderRadius: parseSizeWidth(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth:1,
    borderColor:Colors.neutrals_300,
  },
  wrapArrow: {
    position: 'absolute',
    right: parseSizeWidth(20),
  },
});
