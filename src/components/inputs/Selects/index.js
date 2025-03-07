import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import FilterOption from '~components/FilterOption';
import {MyView, MyText} from '~components/MyStyles';
import BoxArrowDown from '../InputPicker/BoxArrowDown';
import {Sizes, Colors, FontStyles, parseSizeHeight} from '~theme';

const Index = ({
  labelName,
  value,
  options = [],
  styleContainer,
  styleText,
  onChangeValue,
  contentError = '',
}) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const [label, setLabel] = useState('');
  useEffect(() => {
    if (value !== undefined && value !== null) {
      const datafind = options && options.find(x => x?.value === value);
      if (datafind) {
        setLabel(datafind?.label);
      } else {
        setLabel('');
      }
    }
  }, [options, value]);

  return (
    <MyView style={styles.container}>
      <BoxArrowDown
        labelName={labelName}
        value={label}
        styleContainer={styleContainer}
        styleText={styleText}
        onPress={() => setVisibleModal(true)}
      />
      {contentError && (
        <MyText style={styles.txtError}>
          {'* '}
          {contentError}
        </MyText>
      )}
      <FilterOption
        isVisible={visibleModal}
        onClose={() => setVisibleModal(false)}
        data={options}
        limitSelect={1}
        styles={{height: 200}}
        onListOption={value => onChangeValue(value[0])}
      />
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtError: {
    paddingTop: parseSizeHeight(5),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline2,
    fontWeight: '400',
    color: Colors.semantics_Red_02,
  },
});
