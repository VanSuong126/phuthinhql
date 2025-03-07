import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, parseSizeHeight, parseSizeWidth, Sizes} from '../../theme';
import {MyText} from '../MyStyles';
import Icon from '../IconXML';
import {useTranslation} from 'react-i18next';
import {useEffect, useRef, useState} from 'react';

const Index = ({show, onPress}) => {
  const {t} = useTranslation();
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    toggleButton();
  },[show])
  const toggleButton = () => {
    Animated.timing(animation, {
      toValue: show ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };
  const buttonTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });
  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: buttonTranslateY}]}]}>
      <TouchableOpacity
          activeOpacity={1}
          style={styles.floatButton} onPress={() => onPress()}>
        <Icon name="xCircle" width="16" height="16" />
        <MyText style={styles.floatButtonText}>{t('deselectAll')}</MyText>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: parseSizeHeight(60),
    bottom: parseSizeHeight(0),
    left:0,
    right:0,
    justifyContent:'center',
    alignItems:'center',
  },
  floatButton: {
    backgroundColor: Colors.semantics_Red_03,
    padding: parseSizeHeight(10),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: parseSizeWidth(139),
    height: parseSizeHeight(36),
    flexDirection: 'row',
    columnGap: Sizes.spacing_3_Width,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  floatButtonText: {
    color: Colors.semantics_Red_01,
    fontSize: Sizes.text_tagline1,
  },
});
export default Index;
