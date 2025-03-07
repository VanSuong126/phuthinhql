import React, {useEffect, useState} from 'react';
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
  const [isSelected, setIsSelected] = useState(false);
  const [checkValue, setCheckValue] = useState(value);

  useEffect(() => {
    if (value !== checkValue) {
      setIsSelected(true);
      setCheckValue(value);
    }
  }, [value]);

  return (
    <MyView style={styles.container}>
      <MyView style={styles.wrapLabel}>
        <MyText style={styles.textLabel}>{labelName}</MyText>
      </MyView>
      <MyTouchableOpacity
        style={[
          styleContainer || styles.wrapInput,
          isSelected && styles.selected,
        ]}
        onPress={() => onPress()}>
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
  },
  wrapArrow: {
    position: 'absolute',
    right: parseSizeWidth(20),
  },
  selected: {
    borderWidth: 0.5,
    borderColor: Colors.semantics_Green_02,
  },
});
