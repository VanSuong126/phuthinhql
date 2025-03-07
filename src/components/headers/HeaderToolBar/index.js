import React, {useState} from 'react';
import Icon from '~components/IconXML';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

import {MyView, MyTouchableOpacity, MyText} from '~components/MyStyles';
export default HeaderTitle = props => {
  const {
    nameHeaderTitle,
    onPressBack = null,
    iconRight = null,
    onPressRight = null,
    containerStyle,
  } = props;
  const navigation = useNavigation();

  const hanldClickBack = () => {
    if (onPressBack == null) {
      navigation.goBack();
    } else {
      onPressBack();
    }
  };

  return (
    <MyView style={containerStyle || styles.containerHeaderStyle}>
      <MyTouchableOpacity
        style={styles.wrapIconBack}
        onPress={() => hanldClickBack()}>
        <Icon name="leftArrowHeader" width="24" height="24" />
      </MyTouchableOpacity>
      <MyView style={styles.wrapTitleHeader}>
        <MyText style={styles.textTitleHeader}>{nameHeaderTitle}</MyText>
      </MyView>
      {iconRight && (
        <MyTouchableOpacity
          style={styles.wrapIconBack}
          onPress={() => onPressRight()}>
          <Icon name={iconRight} width="24" height="24" />
        </MyTouchableOpacity>
      )}
    </MyView>
  );
};
