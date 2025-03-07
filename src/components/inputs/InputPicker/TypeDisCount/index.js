import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import FilterOption from '~components/FilterOption';
import {MyView} from '~components/MyStyles';
import BoxArrowDown from '../BoxArrowDown';
import {Sizes, Colors, FontStyles, parseSizeHeight} from '~theme';
import fetchData from '~providers';

const Index = props => {
  const {styleContainer, getOption} = props;

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [dataTypeDiscount, setDataTypeDiscount] = useState([]);
  const [optionSelected, setOptionSelected] = useState({});

  const isEmptyObject = obj => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const handleSelectOption = item => {
    setOptionSelected(item[0]);
    getOption(item[0].value);
  };

  const fetchDataTypeDiscount = () => {
    fetchData(dispatch, 'getTypeDiscount', {}, data =>
      setDataTypeDiscount(data.data),
    );
  };
  useEffect(() => {
    fetchDataTypeDiscount();
  }, []);
  return (
    <MyView style={styleContainer}>
      <BoxArrowDown
        labelName={t('selectPromotionType')}
        value={
          isEmptyObject(optionSelected) === true
            ? t('selectPromotionType')
            : optionSelected.TenLoaiGiamGia
        }
        onPress={() => setModal(true)}
        styleText={isEmptyObject(optionSelected) === true && styles.txtText}
      />
      <FilterOption
        isVisible={modal}
        onClose={() => setModal(false)}
        data={dataTypeDiscount}
        onListOption={item => handleSelectOption(item)}
        limitSelect={1}
        stylesModal={styles.modalStyles}
      />
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  modalStyles: {
    height: parseSizeHeight(400),
  },
  txtText: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    color: Colors.neutrals_500,
    textAlign: 'center',
  },
  txtTextClicked: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    color: Colors.semantics_Black,
    textAlign: 'center',
  },
});
