import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { MyView } from '~components/MyStyles';
import { Colors, Sizes, parseSizeHeight, FontStyles } from '~theme';
import BoxArrowDown from '../BoxArrowDown';
import ModalItemSelector from '~modals/ModalItemSelector';
import fetchData from '~providers';


const Index = ({ selectedValue,  getValue }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // Init state
  const [visibleModal, setVisibleModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(dispatch, 'getTypeCost', {loai:28}, (res) => {
      if(res.success)
      {
        setData(res.data);
      }
    });
  }, []);

  const handleSelected = (data) => {
    if (data) {
      getValue(data);
    }
  };
  return (
    <MyView style={styles.container}>
      <BoxArrowDown
        labelName={t('typeCost')}
        value={selectedValue?.label || ''}
        onPress={() => setVisibleModal(true)}
      />
      <ModalItemSelector
        isVisible={visibleModal}
        onClose={() => setVisibleModal(false)}
        data={data}
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
