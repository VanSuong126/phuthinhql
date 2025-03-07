import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { MyView } from '~components/MyStyles';
import { Colors, Sizes, parseSizeHeight, FontStyles } from '~theme';
import BoxArrowDown from '../BoxArrowDown';
import ModalItemSelector from '~modals/ModalItemSelector';


const Index = ({ value,  getValue }) => {
  const { t } = useTranslation();
  // Init state
  const [visibleModal, setVisibleModal] = useState(false);

  const personalData = [
    { value: 'Ông', label: 'Ông' , nameIcon :'employee'},
    { value: 'Bà', label: 'Bà' , nameIcon :'employee'},
    { value: 'Cô', label: 'Cô' , nameIcon :'employee'},
    { value: 'Chú', label: 'Chú' , nameIcon :'employee'},
    { value: 'Anh', label: 'Anh', nameIcon :'employee'},
    { value: 'Chị', label: 'Chị' , nameIcon :'employee'},
    { value: 'Khác', label: 'Khác' , nameIcon :'employee'},
];
  const handleSelected = (data) => {
    if (data) {
      getValue(data?.value);
    }
  };
  return (
    <MyView style={styles.container}>
      <BoxArrowDown
        labelName={t('personal')}
        value={value}
        onPress={() => setVisibleModal(true)}
      />
      <ModalItemSelector
        isVisible={visibleModal}
        onClose={() => setVisibleModal(false)}
        data={personalData}
        getItem={item => handleSelected(item)}
      />
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
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
  wrapDetail: {
    marginTop: parseSizeHeight(10),
  },
  textInfo: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
});
