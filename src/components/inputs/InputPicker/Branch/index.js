import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';

import FilterOption from '~components/FilterOption';
import {MyView} from '~components/MyStyles';
import BoxArrowDown from '~components/inputs/InputPicker/BoxArrowDown';
import {Sizes, Colors, FontStyles, parseSizeHeight} from '~theme';
const Index = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {
    labelName,
    styleContainer,
    styleText,
    onChangeValue,
    styleBoxArrowDown,
    limitSelected = -1,
    //Chỉ chuyền vào IDCuaHang của Role
    isSelected,
    data,
  } = props;
  const [modalBranch, setModalBranch] = useState(false);
  const [branch, setBranch] = useState([]);
  const [checkSelected, setCheckSelected] = useState(isSelected ? true : false);
  const handleSelectOption = item => {
    onChangeValue(item);
    setBranch(item);
    setCheckSelected(false);
  };

  const dataStoire = data;

  return (
    <MyView style={styleContainer}>
      <BoxArrowDown
        labelName={labelName}
        value={
          isSelected && checkSelected
            ? t(isSelected[0]?.TenCuaHang)
            : branch.length === 1
            ? branch[0]?.label
            : branch.length === dataStoire.length
            ? t('selectAllBranch')
            : branch.length === 0
            ? t('selectBranch')
            : `${branch.length} ${t('branch')}`
        }
        styleContainer={styleBoxArrowDown}
        styleText={
          styleText ||
          (branch.length > 0 || checkSelected
            ? styles.txtTextClicked
            : styles.txtText)
        }
        onPress={() => setModalBranch(true)}
      />
      <FilterOption
        isVisible={modalBranch}
        onClose={() => setModalBranch(false)}
        data={dataStoire}
        onListOption={item => handleSelectOption(item)}
        limitSelect={limitSelected}
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
