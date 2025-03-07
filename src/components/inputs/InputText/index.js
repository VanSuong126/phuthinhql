import { StyleSheet, Pressable, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import Icon from '~components/IconXML';
import { MyView, MyText, MyTextInput } from '~components/MyStyles';
import { t } from 'i18next';

const Index = props => {
  const {
    inputRef = null,
    labelName = 'Tài khoản',
    placeholder,
    value,
    onChangeText,
    type = 'text',
    maxLength = 100,
    returnKeyType = 'next',
    keyboardType = 'default',
    contentError = null,
    styleContainer = null,
    styleText = null,
    styleLabel = null,
    colorPlaceholder = null,
    onPressIn = null,
    secureTextEntry = false,
    iconName = null,
    onPressIcon = null,
    editable = true,
    onEndEditing,
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(secureTextEntry);

  const PasswordIcon = ({ hideShowPassword }) => (
    <Pressable onPressIn={hideShowPassword} style={styles.wrapIcon}>
      {isHidden === true ? (
        <Icon name={'eyeOff'} width={24} height={25} />
      ) : (
        <Icon name={'eyeOn'} width={24} height={25} />
      )}
    </Pressable>
  );

  const CleanIcon = ({ onClean }) => (
    <Pressable onPressIn={onClean} style={styles.wrapIcon}>
      <Icon name={'undo'} width={24} height={25} />
    </Pressable>
  );

  const CustomIcon = ({ IconName, onPressIcon }) => (
    <Pressable onPressIn={onPressIcon} style={styles.wrapIcon}>
      <Icon
        name={IconName}
        width={24}
        height={25}
        color={Colors.neutrals_700}
      />
    </Pressable>
  );

  const handleCleanText = () => {
    onChangeText('');
  };
  const handleShowHidePass = () => {
    setIsHidden(!isHidden);
  };
  const handleLeave = () => {
    setIsFocused(false);
  };

  return (
    <MyView style={styleContainer || styles.container}>
      <MyView style={styles.wrapLabel}>
        <MyText style={styleLabel || styles.textLabel}>{labelName}</MyText>
      </MyView>
      <MyView style={styles.wrapInput}>
        <MyTextInput
          ref={inputRef}
          style={[
            styles.input,
            isFocused && styles.inputActive,
            contentError && styles.inputError,
            styleText,
          ]}
          onChangeText={onChangeText}
          onSubmitEditing={handleLeave}
          onEndEditing={onEndEditing}
          onFocus={() => setIsFocused(true)}
          onBlur={handleLeave}
          placeholder={placeholder}
          placeholderTextColor={colorPlaceholder || Colors.semantics_Black}
          value={value}
          secureTextEntry={isHidden}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          onPressIn={onPressIn}
          editable={editable}
        />
        {type === 'password' ? (
          <PasswordIcon hideShowPassword={handleShowHidePass} />
        ) : type === 'custom' ? (
          <CustomIcon IconName={iconName} onPressIcon={onPressIcon} />
        ) : (
          value?.length > 0 &&
          isFocused && <CleanIcon onClean={handleCleanText} />
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
  wrapLabel: {
    marginBottom: parseSizeHeight(5),
  },
  textLabel: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    color: Colors.neutrals_700,
  },
  txtError: {
    paddingTop: parseSizeHeight(5),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline2,
    fontWeight: '400',
    color: Colors.semantics_Red_02,
  },
  wrapInput: {
    backgroundColor: Colors.neutrals_200,
    borderRadius: parseSizeWidth(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputError: {
    flex: 1,
    borderRadius: parseSizeWidth(8),
    backgroundColor: Colors.neutrals_200,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '400',
    color: Colors.semantics_Black,
    paddingHorizontal: parseSizeWidth(20),
    paddingVertical: parseSizeHeight(14),
    borderWidth: 1,
    borderColor: Colors.semantics_Red_02,
  },
  inputActive: {
    flex: 1,
    borderRadius: parseSizeWidth(8),
    backgroundColor: Colors.neutrals_200,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '400',
    color: Colors.semantics_Black,
    paddingHorizontal: parseSizeWidth(20),
    paddingVertical: parseSizeHeight(14),
    borderWidth: 1,
    borderColor: Colors.semantics_Green_02,
  },
  input: {
    flex: 1,
    borderRadius: parseSizeWidth(8),
    backgroundColor: Colors.neutrals_200,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '400',
    color: Colors.semantics_Black,
    paddingHorizontal: parseSizeWidth(20),
    paddingVertical: parseSizeHeight(14),
    // borderWidth: 1,
    // borderColor: Colors.neutrals_300,
  },
  wrapIcon: {
    position: 'absolute',
    right: parseSizeWidth(24),
    zIndex: 999,
  },
  containerError: {
    borderColor: Colors.semantics_Red_02,
    borderWidth: 1,
  },
  containerOn: {
    borderColor: Colors.semantics_Green_02,
    borderWidth: 1,
  },
});
