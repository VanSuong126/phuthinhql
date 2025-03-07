import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';
import {MyView, MyText} from '~components/MyStyles';
import Icon from '~components/IconXML';

const Index = ({data, index}) => {
  const navigation = useNavigation();
  return (
    <MyView style={styles.container}>
      <MyView style={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.navigate(data?.MaChuyenMuc)}
          style={styles.wrapItem}>
         <Icon name={`chuyenmuc${data?.IdchuyenMuc}`} width="24" height="24" color={Colors.semantics_Black} />
        </TouchableOpacity>
        <MyText style={styles.textMenu}>{data?.TenChuyenMuc}</MyText>
      </MyView>
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  content: {
    width: parseSizeWidth(70),
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-between',
  },
  wrapItem: {
    height: parseSizeWidth(70),
    width: parseSizeWidth(70),
    borderRadius: parseSizeWidth(100),
    padding: parseSizeWidth(23),
    marginTop: parseSizeWidth(24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutrals_200,
  },
  textMenu: {
    marginTop:parseSizeHeight(10),
    fontFamily: FontStyles.InterRegular,
    paddingHorizontal: parseSizeWidth(10),
    textAlign: 'center',
    fontFamily: FontStyles.InterMedium,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
});
