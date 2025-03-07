import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import BackgroundMenu from '~assets/images/bgFavoriteMenu.png';
import {
  MyView,
  MyText,
  MyImageBackground,
  MyTouchableOpacity,
} from '~components/MyStyles';
import Icon from '~components/IconXML';

const Index = ({ data, index }) => {
  const navigation = useNavigation();
  return (
    <MyTouchableOpacity
      onPress={() => navigation.navigate(data?.MaChuyenMuc)}
      style={styles.container}>
      <MyView style={styles.content} >
        {index === 0 || index === 3 ? (
          <MyImageBackground
            style={styles.wrapItemBackGround}
            source={BackgroundMenu}>
            <MyView style={styles.wrapIconMenu}>
              <Icon name={`chuyenmuc${data?.IdchuyenMuc}`} width="24" height="24" color={Colors.neutrals_50} />
            </MyView>
            <MyView style={styles.wrapNameMenu}>
              <MyText style={styles.textValue1}>{data?.TenChuyenMuc}</MyText>
            </MyView>
          </MyImageBackground>
        ) : (
          <MyView style={styles.wrapItem}>
            <MyView style={styles.wrapIconMenu}>
              <Icon name={`chuyenmuc${data?.IdchuyenMuc}`} width="24" height="24" color={Colors.brand_01} />
            </MyView>
            <MyView style={styles.wrapNameMenu}>
              <MyText style={styles.textValue2}>{data?.TenChuyenMuc}</MyText>
            </MyView>
          </MyView>
        )}
      </MyView>
    </MyTouchableOpacity>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  content: {
    flexDirection: 'row',
  },
  wrapItem: {
    height: parseSizeHeight(100),
    width: parseSizeWidth(163),
    borderRadius: parseSizeWidth(16),
    borderWidth: 1,
    borderColor: Colors.neutrals_500,
    paddingHorizontal: parseSizeWidth(19),
    paddingVertical: parseSizeHeight(11),
    overflow: 'hidden',
    gap: parseSizeHeight(10),
  },
  wrapItemBackGround: {
    height: parseSizeHeight(100),
    width: parseSizeWidth(163),
    borderRadius: parseSizeWidth(16),
    paddingHorizontal: parseSizeWidth(19),
    paddingTop: parseSizeHeight(11),
    overflow: 'hidden',
    gap: parseSizeHeight(10),

  },
  wrapNameMenu: {
    flex: 0.6,
    flexWrap: 'wrap',
    alignItems:'flex-end',
    justifyContent:'flex-end',
  },
  wrapIconMenu: {
    flex: 0.4,
  },
  textValue1: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.textDefault,
    color: Colors.neutrals_50,
    fontWeight: '600',
    textAlignVertical:'bottom',
  },
  textValue2: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.textDefault,
    color: Colors.semantics_Green_01,
    fontWeight: '600',
  },
});
