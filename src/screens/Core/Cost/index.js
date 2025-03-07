import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';

import FastMenu from '~screens/Core/FastMenu';
import HeaderMain from '~components/headers/HeaderMain';
import {
  MyScrollView,
  MySafeAreaView,
  MyTouchableOpacity,
  MyText,
} from '~components/MyStyles';
import {
  Colors,
  Sizes,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import Icon from '~components/IconXML';

const Index = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const dataMenu = [
    {
      value: 'nhap-chi-phi',
      title: t('enterCost'),
      nameIcon: 'edit',
      widthIcon: 30,
      heightIcon: 20,
    },
    {
      value: 'danh-sach-chi-phi',
      title: t('listCost'),
      nameIcon: 'listCost',
      widthIcon: 30,
      heightIcon: 20,
    },
  ];
  
  return (
    <MySafeAreaView style={styles.container}>
      <HeaderMain title={t('cost')} />
      <MyScrollView style={styles.content}>
        {/* Render dataMenu here */}
        {dataMenu.map((item, index) => (
          <MyTouchableOpacity
            key={index}
            style={[
              styles.wrapDropDown,
              {marginTop: index === 0 ? 0 : parseSizeHeight(24)},
            ]}
            onPress={() => navigation.navigate(item?.value)}>
            <Icon
              name={item.nameIcon}
              width={item.widthIcon}
              height={item.heightIcon}
            />
            <MyText style={styles.textItem}>{item.title}</MyText>
            <Icon name="arrowRight" width="18" height="18" />
          </MyTouchableOpacity>
        ))}
      </MyScrollView>
      <FastMenu />
    </MySafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Sizes.paddingWidth,
    marginBottom: parseSizeHeight(40),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 0,
    margin: 0,
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
    borderColor: '#dddde3',
  },
  textItem: {
    flex: 1,
    marginLeft: parseSizeWidth(23),
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    fontSize: Sizes.text_subtitle1,
    color: Colors.neutrals_700,
  },
});
