import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import {MyView, MyText, MyTouchableOpacity} from '~components/MyStyles';
import Icon from '~components/IconXML';

export default function Index(props) {
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <MyView style={styles.container}>
      <MyView style={styles.content}>
        <MyView style={styles.wrapTitle}>
          <MyText style={styles.txtTitle}>{t('statisticalReport')}</MyText>
        </MyView>
        <MyTouchableOpacity
          style={styles.wrapDropDown}
          onPress={() => navigation.navigate('bao-cao')}>
          <Icon name="list" width="24" height="24" />
          <MyText style={styles.textReport}>{t('report')}</MyText>
          <Icon name="arrowRight" width="18" height="18" />
        </MyTouchableOpacity>
      </MyView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  content: {
    backgroundColor: Colors.background,
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Sizes.paddingHeight,
  },
  txtTitle: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    color: Colors.neutrals_900,
    fontWeight: '600',
  },
  wrapDropDown: {
    height: parseSizeHeight(64),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.paddingWidth,
    borderColor: Colors.neutrals_300,
    borderRadius: 12,
    shadowColor: Colors.black,
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderWidth: 1,
    // borderColor: '#dddde3',
  },
  textReport: {
    flex: 1,
    marginLeft: parseSizeWidth(23),
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    fontSize: Sizes.text_subtitle1,
    color: Colors.neutrals_700,
  },
});
