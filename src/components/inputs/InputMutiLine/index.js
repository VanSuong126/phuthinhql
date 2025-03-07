import { StyleSheet, Pressable, Keyboard } from 'react-native';
import React, { useState } from 'react';
import {
  Sizes,
  Colors,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';
import Icon from '~components/IconXML';
import { MyView, MyText, MyTextInput } from '~components/MyStyles';


const Index = props => {
  const {
    inputRef = null,
    labelName = '',
    placeholder,
    value = 0,
    contentError ='',
    onChangeText,
    maxLength = 100,
    returnKeyType = 'done',
    keyboardType = 'default',
    styleContainer = null,
    styleText = null,
    colorPlaceholder = null,
    onPressIn = null,
    onEndEditing,
  } = props;

  const [isFocused, setIsFocused] = useState(false);


  const CleanIcon = ({ onClean }) => (
    <Pressable onPressIn={onClean} style={styles.wrapIcon}>
      <Icon
        name={'undo'}
        width={24}
        height={25}
      />
    </Pressable>
  );

  const handleCleanText = () => {
    onChangeText(0);
  };

  const handleLeave = () => {
    Keyboard.dismiss();
    setIsFocused(false);
  };



  return (
    <MyView>
      <MyView style={[styles.container,styleContainer]}>
        <MyText style={styles.textLabel}>{labelName} ({value ? value.length : 0}/{300})</MyText>
        <MyView style={styles.wrapInput}>
          <MyTextInput
            ref={inputRef}
            style={[
              styles.input,
              isFocused && styles.inputActive,
              contentError && styles.inputError,
              styleText,
            ]}
            multiline
            blurOnSubmit ={true}
            numberOfLines={4}
            onChangeText={text => onChangeText(text)}
            onSubmitEditing={handleLeave}
            onEndEditing={handleLeave}
            onFocus={() => setIsFocused(true)}
            onBlur={handleLeave}
            placeholder={placeholder}
            placeholderTextColor={colorPlaceholder || Colors.semantics_Black}
            value={value}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            maxLength={maxLength}
            onPressIn={onPressIn}
            
          />
          {
            value?.length > 0 && isFocused && <CleanIcon onClean={handleCleanText} />
          }
        </MyView>
        {contentError && (
        <MyText style={styles.txtError}>
          {'* '}
          {contentError}
        </MyText>
      )}
      </MyView>
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    gap: parseSizeHeight(4),
  },
  wrapInput: {
    backgroundColor: Colors.neutrals_100,
    borderRadius: parseSizeWidth(8),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  inputError: {
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: FontStyles.InterRegular,
    borderRadius: 8,
    height: parseSizeHeight(92),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: parseSizeWidth(20),
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    textAlign: 'left',
    textAlignVertical: 'top',
    color: Colors.semantics_Grey,
    borderColor: Colors.semantics_Red_02,
  },
  inputActive: {
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: FontStyles.InterRegular,
    borderRadius: 8,
    height: parseSizeHeight(92),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: parseSizeWidth(20),
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    textAlign: 'left',
    textAlignVertical: 'top',
    color: Colors.semantics_Grey,
    borderColor: Colors.semantics_Green_02,
  },
  input: {
    flex: 1,
    fontFamily: FontStyles.InterRegular,
    borderRadius: 8,
    height: parseSizeHeight(92),
    backgroundColor: Colors.neutrals_200,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: parseSizeWidth(20),
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    textAlign: 'left',
    textAlignVertical: 'top',
    color: Colors.semantics_Grey,
    flexWrap: 'wrap',
  },
  wrapIcon: {
    position: 'absolute',
    top: parseSizeHeight(10),
    right: parseSizeWidth(10),
    zIndex: 2,
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
});
