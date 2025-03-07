import React, {useEffect, useState, useRef, forwardRef} from 'react';
import {
  Keyboard,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {FontStyles, Sizes, Colors} from '~theme';
import FastImage from 'react-native-fast-image';
import {AvoidSoftInputView} from 'react-native-avoid-softinput';
import LinearGradient from 'react-native-linear-gradient';

var _ = require('lodash');

// =============START CREATE MY COMPONENTS=============

// export const MyAvoidView = forwardRef(
//   ({children, scrollToX = 0, scrollToY = 0}, ref) => {
//     const refScrollView = ref || useRef(null);
//     const [enabled, setEnabled] = useState(false);

//     useEffect(() => {
//       const showSubscription = Keyboard.addListener('keyboardWillShow', () => {

//         refScrollView.current?.scrollTo({
//           x: scrollToX,
//           y: scrollToY,
//           animated: true,
//         });
//         setEnabled(true);
//       });

//       const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
//         refScrollView.current?.scrollTo({x: 0, y: 0, animated: true});
//         setEnabled(false);
//       });

//       return () => {
//         showSubscription.remove();
//         hideSubscription.remove();
//       };
//     }, [scrollToX, scrollToY]);

//     return (
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         enabled={enabled}
//         style={{flex: 1}}>
//         <ScrollView
//           bounces={false}
//           keyboardShouldPersistTaps="handled"
//           style={{flex: 1,  backgroundColor: 'transparent'}}
//           contentContainerStyle={{flexGrow: 1}}
//           ref={refScrollView}>
//           {children}
//         </ScrollView>
//       </KeyboardAvoidingView>
//     );
//   },
// );

export const MyAvoidView = forwardRef(({children}, ref) => {
  const [keyboardVisible, setKeyboardVisible] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(false);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(true);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <AvoidSoftInputView
      avoidOffset={keyboardVisible ? 40 : 0} // Không tránh bàn phím khi bàn phím đang hiển thị
      easing="easeIn" // Loại hiệu ứng khi bàn phím xuất hiện hoặc ẩn
      enabled={keyboardVisible} // Bật hoặc tắt tính năng tránh bàn phím
      hideAnimationDelay={0} // Thời gian trễ trước khi bắt đầu ẩn bàn phím
      hideAnimationDuration={0} // Thời gian hiệu ứng ẩn bàn phím
      showAnimationDelay={0} // Thời gian trễ trước khi bắt đầu hiển thị bàn phím
      showAnimationDuration={0} // Thời gian hiệu ứng hiển thị bàn phím
      style={{flex: 1}}>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ref={ref}>
        {children}
      </ScrollView>
    </AvoidSoftInputView>
  );
});

export const MyView = forwardRef((props, ref) => (
  <View ref={ref} style={props.style}>
    {props.children}
  </View>
));

export const MySafeAreaView = props => (
  <SafeAreaView
    style={[
      {
        backgroundColor: Colors.background,
      },
      props.style,
    ]}>
    {props.children}
  </SafeAreaView>
);

export const MyText = forwardRef((props, ref) => (
  <Text
    ref={ref}
    allowFontScaling={false}
    numberOfLines={props.numberOfLines}
    ellipsizeMode={props.ellipsizeMode}
    style={[
      {
        textAlign: 'left',
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_subtitle2,
        color: Colors.semantics_Black || '#000',
        fontWeight: '500',
      },
      props.style,
    ]}>
    {props.children}
  </Text>
));

export const MyTextInput = forwardRef((props, ref) => (
  <TextInput
    ref={ref}
    allowFontScaling={false}
    placeholder={typeof props.placeholder === 'string' ? props.placeholder : ''}
    value={props.value}
    placeholderTextColor={props.placeholderTextColor}
    secureTextEntry={props.secureTextEntry}
    keyboardType={props.keyboardType}
    returnKeyType={props.returnKeyType}
    maxLength={props.maxLength}
    onSubmitEditing={props.onSubmitEditing}
    onEndEditing={props.onEndEditing}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    onChangeText={props.onChangeText}
    editable={props.editable}
    multiline={props.multiline}
    onPressIn={props.onPressIn}
    numberOfLines={props.numberOfLines}
    blurOnSubmit={props.blurOnSubmit}
    style={[
      {
        textAlign: 'left',
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_subtitle2,
        color: Colors.semantics_Black,
      },
      props.style,
    ]}>
    {props.children}
  </TextInput>
));

export const MyTouchableWithoutFeedback = props => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {props.children}
  </TouchableWithoutFeedback>
);

export const MyTouchableOpacity = props => (
  <TouchableOpacity
    disabled={props?.disabled}
    style={props.style}
    onPress={props.onPress}
    onLongPress={props.onLongPress}
    onPressIn={props.onPressIn}
    onPressOut={props.onPressOut}
    activeOpacity={props.activeOpacity}>
    {props.children}
  </TouchableOpacity>
);

export const MyLinearGradient = props => (
  <LinearGradient
    colors={props.colors || ['#168548', '#05AA50']}
    start={props.start || {x: 0, y: 1}}
    end={props.end || {x: 1, y: 0}}
    style={props.style}>
    {props.children}
  </LinearGradient>
);

export const MyImageBackground = forwardRef((props, ref) => (
  <ImageBackground
    ref={ref}
    style={props.style}
    source={props.source}
    resizeMode={props.resizeMode}
    imageStyle={props.imageStyle}>
    {props.children}
  </ImageBackground>
));

export const MyImage = forwardRef((props, ref) => (
  <FastImage
    ref={ref}
    style={props.style}
    source={props.source}
    resizeMode={props.resizeMode || FastImage.resizeMode.cover}
    onLoad={props.onLoad}
    onError={props.onError}
    {...props}
  />
));
export const MyScrollView = props => (
  <ScrollView
    contentContainerStyle={props.contentContainerStyle}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    {...props}
  />
);
