import {StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';

import {Colors, Sizes, FontStyles} from '~theme';
import Icon from '~components/IconXML';
import {
  MyView,
  MyTouchableOpacity,
  MyTextInput,
  MyText,
} from '~components/MyStyles';
const Index = props => {
  const {
    placeholder,
    getString,
    contentError,
    error,
    typeKeyboard,
    returnKeyType,
    maxLength,
    blurOnSubmit,
  } = props;
  const [value, setValue] = useState('');
  const [submit, setSubmit] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const inputRef = useRef(null);
  const handleOnChangeText = text => {
    setValue(text);
    getString(text);
    setSubmit(false);
  };

  const handleSubmitEditing = () => {
    setSubmit(true);
    inputRef.current.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleHiddenPass = () => {
    setIsHidden(!isHidden);
  };
  const styleContainer = () => {
    if (error) {
      return styles.containerError;
    } else {
      switch (true) {
        case isFocused:
          return styles.containerOn;
        case !value && submit:
          return styles.containerError;
        case value && !submit:
          return styles.containerOn;
        default:
          return null;
      }
    }
  };
  const showTestError = () => {
    if (error) {
      return <MyText style={styles.txtError}>{contentError}</MyText>;
    } else if (!value && submit && !isFocused) {
      return <MyText style={styles.txtError}>{contentError}</MyText>;
    }
  };

  return (
    <MyView>
      <MyView style={[styles.container, styleContainer()]}>
        <MyTextInput
          ref={inputRef}
          style={styles.input}
          onChangeText={handleOnChangeText}
          onSubmitEditing={handleSubmitEditing}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={Colors.semantics_Black}
          value={value}
          secureTextEntry={isHidden}
          keyboardType={typeKeyboard}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          blurOnSubmit={blurOnSubmit}
        />
        <MyTouchableOpacity onPress={() => handleHiddenPass()}>
          {isHidden ? (
            <Icon name="eyeOff" width="24" height="24" />
          ) : (
            <Icon name="eyeOn" width="24" height="24" />
          )}
        </MyTouchableOpacity>
      </MyView>
      {showTestError()}
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  txtError: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline2,
    fontWeight: '400',
    color: Colors.semantics_Red_02,
  },
  input: {
    flex: 1,
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '400',
    color: Colors.semantics_Black,
    zIndex: 1,
  },
  containerError: {
    borderColor: Colors.semantics_Red_02,
    borderWidth: 1,
  },
  containerOn: {
    borderColor: Colors.semantics_Green_02,
    borderWidth: 1,
  },
  container: {
    borderRadius: 8,
    backgroundColor: Colors.neutrals_200,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
