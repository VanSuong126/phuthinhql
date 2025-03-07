import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {MyText, MyView} from '~components/MyStyles';
import {Colors, Sizes, FontStyles, parseSizeHeight} from '~theme';
import Icon from '~components/IconXML';
const Index = props => {
  const {data, onPress, isSelected} = props;
  const {t} = useTranslation();
  const checkSelected = isSelected.some(product => product?.id === data?.id);

  return (
    <Pressable
      key={data?.id}
      onPress={() => onPress(data)}
      style={[styles.itemContainer, checkSelected && styles.selectedItem]}>
      {checkSelected ? (
        <MyView style={styles.selectedInto}>
          <MyView style={styles.selectedItemLeft}>
            <MyText style={[styles.txtOption, styles.txtSelected]}>
              {t(data?.label)}
            </MyText>
          </MyView>
          <Icon name="tickBorderGreen" width="24" height="24" />
        </MyView>
      ) : (
        <MyText style={styles.txtOption}>{t(data?.label)}</MyText>
      )}
    </Pressable>
  );
};

export default Index;

const styles = StyleSheet.create({
  txtSelected: {
    color: Colors.semantics_Green_01,
  },
  txtOption: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_700,
    textAlign: 'center',
  },
  selectedItemLeft: {
    flexDirection: 'row',
    gap: Sizes.spacing_4_Width,
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: Colors.semantics_Green_03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedInto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing_5_Width,
    paddingVertical: Sizes.spacing_3_Height,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutrals_300,
    backgroundColor: Colors.neutrals_100,
    gap: Sizes.spacing_4_Width,
    marginTop: parseSizeHeight(8),
  },
});
