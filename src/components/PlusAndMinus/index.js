import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {MyView, MyText, MyTouchableOpacity} from '~components/MyStyles';
import {Sizes, Colors, FontStyles} from '~theme';
import Icon from '~components/IconXML';

const Index = ({
  initCount,
  onCountChange,
  styleCount,
  limitCount = 1,
  maxCount = 99, 
}) => {
  const [count, setCount] = useState(initCount);

  const handlePlus = () => {
    setCount(prevCount => {
      const newCount = prevCount < maxCount ? prevCount + 1 : prevCount;
      onCountChange && onCountChange(newCount);
      return newCount;
    });
  };

  const handleMinus = () => {
    setCount(prevCount => {
      const newCount = prevCount > limitCount ? prevCount - 1 : limitCount;
      onCountChange && onCountChange(newCount);
      return newCount;
    });
  };

  return (
    <MyView style={styles.containerCount}>
      <MyTouchableOpacity onPress={handleMinus} style={styles.btnCount}>
        <Icon name="minusNoBG" width="12" height="12" />
      </MyTouchableOpacity>
      <MyText style={count >0 ? styles.txtCount : styles.txtCountUnSelect}>{count}</MyText>
      <MyTouchableOpacity onPress={handlePlus} style={styles.btnCount}>
        <Icon name="plusNoBG" width="12" height="12" />
      </MyTouchableOpacity>
    </MyView>
  );
};

const styles = StyleSheet.create({
  containerCount: {
    gap: Sizes.spacing_4_Width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCount: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.neutrals_200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtCount: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    textAlign: 'center',
    color: Colors.semantics_Black,
  },
  txtCountUnSelect: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    textAlign: 'center',
    color: Colors.neutrals_300,
  },
});

export default Index;
