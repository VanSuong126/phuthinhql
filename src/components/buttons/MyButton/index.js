import {StyleSheet, ActivityIndicator} from 'react-native';
import React, {useMemo, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  Colors,
  Sizes,
  parseSizeWidth,
  parseSizeHeight,
  FontStyles,
} from '~theme';
import Icon from '~components/IconXML';
import {MyTouchableOpacity, MyText, MyView} from '~components/MyStyles';

const Index = props => {
  const {
    styleButtonGradient,
    styleButton,
    title,
    type,
    onPress,
    nameIcon,
    size,
    widthSizeView,
    ColorButton = Colors.semantics_Green_03,
    TextColorButton,
    txtCustom,
    disabled,
    isLoading = false,
  } = props;
  const [isPressed, setIsPressed] = useState(false);

  const {gradientColors, textColor, buttonBackgroundColor, loadingColor} =
    useMemo(() => {
      const ColorType = value => {
        if (value == 1) {
          return {
            gradientColors: ['#198B4D', '#05AA50'],
            textColor: Colors.neutrals_50,
            buttonBackgroundColor: Colors.semantics_Green_01,
            loadingColor: '#ffffff',
          };
        } else if (value == 2) {
          return {
            gradientColors: ['#e3fff0', '#e3fff0'],
            textColor: Colors.semantics_Green_01,
            buttonBackgroundColor: Colors.semantics_SmokyGrey,
            loadingColor: '#0a8040',
          };
        } else if (value == 3) {
          return {
            gradientColors: [ColorButton, ColorButton],
            textColor: TextColorButton,
            buttonBackgroundColor: Colors.semantics_SmokyGrey,
            loadingColor: '#ffffff',
          };
        }
        else if (value == 4) {
          return {
            gradientColors: [ColorButton, ColorButton],
            textColor: TextColorButton,
            buttonBackgroundColor: Colors.semantics_SmokyGrey,
            loadingColor: '#ffffff',
          };
        
        } 
         else {
          return {
            gradientColors: ['#0A8040', '#05AA50'],
            textColor: Colors.neutrals_50,
            buttonBackgroundColor: Colors.semantics_Green_01,
            loadingColor: '#ffffff',
          };
        }
      };

      return ColorType(type);
    }, [type, ColorButton]);
  const {widthSize, gapSize, heightSize} = useMemo(() => {
    const SizeButton = value => {
      switch (value) {
        case 'primary':
          return {
            widthSize: parseSizeWidth(293),
            heightSize: parseSizeHeight(50),
            gapSize: parseSizeHeight(10),
          };
        case 'primary_icon':
          return {
            widthSize: parseSizeWidth(215),
            heightSize: parseSizeHeight(50),
            gapSize: parseSizeHeight(10),
          };
        case 'medium':
          return {
            widthSize: parseSizeWidth(162),
            heightSize: parseSizeHeight(46),
            gapSize: parseSizeHeight(10),
          };
        case 'medium_icon':
          return {
            widthSize: parseSizeWidth(203),
            heightSize: parseSizeHeight(46),
            gapSize: parseSizeHeight(10),
          };
        case 'small':
          return {
            widthSize: parseSizeWidth(133),
            heightSize: parseSizeHeight(37),
            gapSize: parseSizeHeight(10),
          };
        case 'small_icon':
          return {
            widthSize: parseSizeWidth(157),
            heightSize: parseSizeHeight(37),
            gapSize: parseSizeHeight(10),
          };
        case 'popup':
          return {
            widthSize: parseSizeWidth(163),
            heightSize: parseSizeHeight(35),
            gapSize: 0,
          };
        case 'custom':
          return {
            widthSize: parseSizeWidth(56),
            heightSize: parseSizeHeight(37),
            gapSize: 0,
          };
        default:
          return {};
      }
    };
    return SizeButton(size);
  }, [size]);

  return (
    <LinearGradient
      colors={gradientColors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styleButtonGradient || styles.gradient}>
      <MyTouchableOpacity
        disabled={disabled}
        activeOpacity={1}
        style={[
          styles.buttonContainer,
          styleButton,
          isPressed && {backgroundColor: buttonBackgroundColor},
          {
            width: parseSizeWidth(widthSizeView) || widthSize,
            height: heightSize,
          },
        ]}
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}>
        <MyView style={[styles.content, {gap: gapSize}]}>
          {nameIcon && (
            <Icon
              name={nameIcon}
              width={Sizes.iconSize_Width}
              height={Sizes.iconSize_Height}
            />
          )}
          {isLoading ? (
            <ActivityIndicator size={heightSize * 0.6} color={loadingColor} />
          ) : (
            <MyText style={[styles.txt, {color: textColor}, txtCustom]}>
              {title}
            </MyText>
          )}
        </MyView>
      </MyTouchableOpacity>
    </LinearGradient>
  );
};

export default Index;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    gap: 9,
  },
  txt: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.textDefault,
    fontWeight: '600',
    textAlign: 'center',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    flexDirection: 'row',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    zIndex: 1,
  },
});
