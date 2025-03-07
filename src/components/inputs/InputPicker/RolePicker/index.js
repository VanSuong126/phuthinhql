import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

import FilterOption from '~components/FilterOption';
import {MyView} from '~components/MyStyles';
import BoxArrowDown from '~components/inputs/InputPicker/BoxArrowDown';
import {Sizes, Colors, FontStyles, parseSizeHeight} from '~theme';
import {commonSelectors} from '~redux/reducers';
import fetchData from '~providers';
const Index = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {
    labelName,
    styleContainer,
    styleText,
    onChangeValue,
    styleBoxArrowDown,
    //Chỉ chuyền vào Value của Role
    isSelected,
  } = props;
  const [modalRole, setModalRole] = useState(false);
  const [role, setRole] = useState([]);
  const [data, setData] = useState([]);

  const handleSelectOption = item => {
    onChangeValue(item);
    setRole(item);
  };
  const fetchDataRole = () => {
    fetchData(dispatch, 'getListRole', {}, data => {
      if (data.success) {
        setData(data.data);
      } else {
        Toast.show({
          type: 'error',
          props: {message: t('notifidontfindRole')},
        });
      }
    });
  };
  useEffect(() => {
    fetchDataRole();
  }, []);

  const checkArray = arr => {
    return arr.some(item => typeof item === 'object' && item !== null);
  };

  useEffect(() => {
    if (isSelected && checkArray(isSelected) === false) {
      const filtered = data.filter(role => role.value === isSelected[0]);
      setRole(filtered);
    }
  }, [isSelected, data]);

  return (
    <MyView style={styleContainer}>
      <BoxArrowDown
        labelName={labelName}
        value={role.length > 0 ? role[0].label : t('selectRole')}
        styleContainer={styleBoxArrowDown}
        styleText={
          styleText ||
          (role.length > 0 ? styles.txtTextClicked : styles.txtText)
        }
        onPress={() => setModalRole(true)}
      />
      <FilterOption
        isVisible={modalRole}
        onClose={() => setModalRole(false)}
        data={data}
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
