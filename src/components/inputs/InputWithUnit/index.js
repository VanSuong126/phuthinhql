import {StyleSheet, Pressable, View} from 'react-native';
import React, {useState} from 'react';
import {
  Sizes,
  Colors,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';
import Icon from '~components/IconXML';
import {MyView, MyTextInput, MyText} from '~components/MyStyles';
import formatPrice from '~helper/formatPrice';
import formatNumber from '~helper/formatNumber';

const Index = props => {
  const {
    inputRef = null,
    unit = 'đ',
    placeholder,
    value = 0,
    maxValue = 10000000000,
    onChangeText,
    maxLength = 100,
    returnKeyType = 'next',
    keyboardType = 'number-pad',
    styleContainer = null,
    styleText = null,
    colorPlaceholder = null,
    onPressIn = null,
    onEndEditing,
    labelName,
    styleswrapLabel,
    styleLabel,
    editable = true,
    contentError = '',
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const CleanIcon = ({onClean}) => (
    <Pressable onPressIn={onClean} style={styles.wrapIcon}>
      <Icon name={'undo'} width={24} height={25} />
    </Pressable>
  );

  const handleCleanText = () => {
    onChangeText(0);
  };

  const handleLeave = () => {
    setIsFocused(false);
  };

  const handleChange = text => {
    let numericValue = text;
    if (text.includes(unit)) {
      numericValue = text.replace(/[^\d]/g, '');
    } else {
      numericValue = text.replace(/[^\d]/g, '');
      if (numericValue.length > 1) {
        numericValue = numericValue = numericValue.slice(0, -1);
      } else {
        numericValue = 0;
      }
    }
    if (numericValue > 100 && unit === '%') {
      numericValue = 100;
    }
    if (numericValue > maxValue) {
      numericValue = maxValue;
    }
    onChangeText(!numericValue ? 0 : parseFloat(numericValue));
  };
  return (
      <MyView style={styleContainer || styles.container}>
        {labelName && (
          <MyView style={styleswrapLabel || styles.wrapLabel}>
            <MyText style={styleLabel || styles.textLabel}>{labelName}</MyText>
          </MyView>
        )}
        <MyView style={styles.wrapInput}>
          <MyTextInput
            editable={editable}
            ref={inputRef}
            style={[styles.input, isFocused && styles.inputActive, styleText]}
            onChangeText={handleChange}
            onSubmitEditing={handleLeave}
            onEndEditing={onEndEditing}
            onFocus={() => setIsFocused(true)}
            onBlur={handleLeave}
            placeholder={placeholder}
            placeholderTextColor={colorPlaceholder || Colors.semantics_Black}
            value={`${
              !!unit ? formatPrice(value) : formatNumber(value)
            }${unit}`}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            maxLength={maxLength}
            onPressIn={onPressIn}
          />
          {value?.length > 0 && isFocused && (
            <CleanIcon onClean={handleCleanText} />
          )}
        </MyView>
        {contentError && (
        <MyText style={styles.txtError}>
          {'* '}
          {contentError}
        </MyText>
      )}
      </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  wrapInput: {
    backgroundColor: Colors.neutrals_100,
    borderRadius: parseSizeWidth(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputActive: {
    flex: 1,
    height: parseSizeHeight(43),
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    // borderColor: Colors.neutrals_300,
    paddingHorizontal: parseSizeWidth(20),
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.accent_yellow,
    fontFamily: FontStyles.InterRegular,
    borderColor: Colors.semantics_Green_02,
  },
  input: {
    flex: 1,
    height: parseSizeHeight(43),
    borderRadius: 8,
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: parseSizeWidth(20),
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.accent_yellow,
    fontFamily: FontStyles.InterRegular,
  },
  wrapIcon: {
    position: 'absolute',
    right: parseSizeWidth(24),
    zIndex: 999,
  },

  textLabel: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    color: Colors.neutrals_700,
  },
  wrapLabel: {
    marginBottom: parseSizeHeight(5),
  },
  txtError: {
    position: 'absolute',
    bottom: parseSizeHeight(-20),
    paddingTop: parseSizeHeight(5),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline2,
    fontWeight: '400',
    color: Colors.semantics_Red_02,
  },
});
