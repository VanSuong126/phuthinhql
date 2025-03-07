import {StyleSheet} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {MyText, MyTouchableOpacity} from '~components/MyStyles';
import {
  Colors,
  Sizes,
  FontStyles,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import Icon from '~components/IconXML';
const Index = ({data, onPress}) => {
  const {t} = useTranslation();

  return (
    <MyTouchableOpacity onPress={() => onPress(data)} style={styles.item}>
      <Icon
        name={data?.nameIcon || 'product'}
        width={data?.widthIcon || 24}
        height={data?.heightIcon || 24}
        color={data?.colorIcon || null}
      />
      <MyText style={styles.txtItem}>{t(data?.title || data?.label)}</MyText>
    </MyTouchableOpacity>
  );
};

export default Index;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    height: parseSizeHeight(64),
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: parseSize(12),
    paddingHorizontal: parseSizeWidth(24),
  },
  txtItem: {
    marginLeft: parseSizeHeight(24),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    color: Colors.neutrals_700,
  },
});
