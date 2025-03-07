import {StyleSheet} from 'react-native';

import {
  Sizes,
  Colors,
  FontStyles,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import {MyView, MyText} from '~components/MyStyles';
import React from 'react';
import Icon from '~components/IconXML';

export const toastConfig = {
  congratulation: ({props: {message}}) => (
    <MyView style={[styles.container, {backgroundColor: '#FFFAE6'}]}>
      <Icon name="congratulation" width="24" height="24" />
      <MyText style={styles.text}>{message}</MyText>
    </MyView>
  ),
  success: ({props: {message}}) => (
    <MyView style={[styles.container, {backgroundColor: '#E3FFF0'}]}>
      <Icon name="toastIconSuccess" width="24" height="24" />
      <MyText style={styles.text}>{message}</MyText>
    </MyView>
  ),
  warning: ({props: {message}}) => (
    <MyView style={[styles.container, {backgroundColor: '#FFFAE6'}]}>
      <Icon name="toastIcon" width="24" height="24" />
      <MyText style={styles.text}>{message}</MyText>
    </MyView>
  ),
  error: ({props: {message}}) => (
    <MyView style={[styles.container, {backgroundColor: '#FFDDDD'}]}>
      <Icon name="toastIcon" width="24" height="24" color="#FF0303" />
      <MyText style={styles.text}>{message}</MyText>
    </MyView>
  ),
  info: ({props: {message}}) => (
    <MyView style={[styles.container, {backgroundColor: '#E7F2FF'}]}>
      <Icon name="toastIcon" width="24" height="24" color="#007AFF" />
      <MyText style={styles.text}>{message}</MyText>
    </MyView>
  ),
};

const styles = StyleSheet.create({
  container: {
    minHeight: parseSizeHeight(50),
    marginVertical: parseSizeHeight(10),
    marginHorizontal: parseSizeWidth(24),
    backgroundColor: '#FFFAE6',
    alignItems: 'center',
    borderRadius: parseSize(8),
    paddingVertical: parseSizeHeight(8),
    paddingHorizontal: parseSizeWidth(24),
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    flex: 1,
    marginLeft: parseSizeWidth(10),
    fontSize: Sizes.text_subtitle1,
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    color: Colors.semantics_Black,
  },
});
