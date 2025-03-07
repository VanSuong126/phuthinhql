import React, {  } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {useNavigation} from '@react-navigation/native';


import Icon from '~components/IconXML';
import { MyView, MyText, MyTouchableOpacity } from '~components/MyStyles';
import { Colors, Sizes, parseSizeHeight, FontStyles } from '~theme';



const Index = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handlePicker =()=>{
    navigation.navigate('khuyen-mai-don-hang')
  }
  return (
    <MyView style={styles.container}>
      <MyView style={styles.wrapIcon}>
        <Icon name="promotion" width="24" height="24" />
      </MyView>
      <MyView style={styles.wrapInfo}>
        <MyView style={styles.wrapTitle}>
          <MyText style={styles.titleTitle}>{t('addPromoCode')}</MyText>
          <MyTouchableOpacity onPress={handlePicker }>
            <Icon name="rightArrow" width="24" height="24" />
          </MyTouchableOpacity>
        </MyView>
      </MyView>
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.neutrals_100,
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(10),
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  wrapIcon: {
    flex: 0.1,
  },
  wrapInfo: {
    flex: 0.9,
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '600',
    color: Colors.semantics_Black,
  },
});
