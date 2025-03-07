import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';

import Icon from '~components/IconXML';
import styles from './styles';
import {MyText, MyLinearGradient, MyView} from '~components/MyStyles';

const Index = ({dataFastMenu, onScan, onGoToScreen}) => {
  const navigation = useNavigation();
  const [hoveredButton, setHoveredButton] = useState(null);

  const handlePressIn = button => {
    setHoveredButton(button);
  };

  const handlePressOut = menu => {
    setHoveredButton(null);
    onGoToScreen(menu);
  };

  const startEndLinear = val => {
    switch (val) {
      case 'top':
        return {
          start: {x: 1, y: 1},
          end: {x: 0, y: 0},
          stylesItem: styles.itemTop,
          stylesInto: styles.intoTop,
        };

      case 'bottom':
        return {
          start: {x: 0, y: 0},
          end: {x: 1, y: 1},
          stylesItem: styles.itemBottom,
          stylesInto: styles.intoBottom,
        };
      case 'left':
        return {
          start: {x: 1, y: 0},
          end: {x: 0, y: 1},
          stylesItem: styles.itemLeft,
          stylesInto: styles.intoLeft,
        };
      case 'right':
        return {
          start: {x: 0, y: 1},
          end: {x: 1, y: 0},
          stylesItem: styles.itemRight,
          stylesInto: styles.intoRight,
        };
      default:
        return {
          start: {x: 0, y: 0},
          end: {x: 1, y: 1},
          stylesItem: {},
          stylesInto: {},
        };
    }
  };

  const renderButton = (styleDirection, value, menu) => {
    const direction = startEndLinear(styleDirection);
    const label = dataFastMenu[value]?.label || 'Item';
    const icon = `chuyenmuc${dataFastMenu[value]?.icon}`;

    return (
      <Pressable
        onPressIn={() => handlePressIn(styleDirection)}
        onPressOut={()=>handlePressOut(menu)}
        style={direction.stylesItem}>
        {hoveredButton === styleDirection ? (
          <MyLinearGradient
            start={direction.start}
            end={direction.end}
            style={styles.linearGradient}>
            <MyView style={direction.stylesInto}>
              <Icon name={icon} width="30" height="30" color={Colors.neutrals_50} />
              <MyText
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.txtMenuClick}>
                {label}
              </MyText>
            </MyView>
          </MyLinearGradient>
        ) : (
          <MyView style={direction.stylesInto}>
          <Icon name={icon} width="30" height="30" color={Colors.semantics_Green_01} />
            <MyText
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.txtMenu}>
              {label}
            </MyText>
          </MyView>
        )}
      </Pressable>
    );
  };

  return (
    <MyView style={styles.menu}>
      <MyView style={styles.itemTop_Bottom}>
        {renderButton('top', 0, dataFastMenu[0]?.value)}
        {renderButton('right', 1, dataFastMenu[1]?.value)}
      </MyView>
      <MyView style={styles.itemTop_Bottom}>
        {renderButton('left', 2, dataFastMenu[2]?.value)}
        {renderButton('bottom', 3,dataFastMenu[3]?.value)}
      </MyView>
      <Pressable style={styles.scanCircle} onPress = {onScan}>
        <Icon name="scan" width="30" height="30" />
      </Pressable>
    </MyView>
  );
};

export default Index;
