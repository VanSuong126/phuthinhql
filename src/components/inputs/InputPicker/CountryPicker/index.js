import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';

import {MyView} from '~components/MyStyles';
import {commonSelectors} from '~redux/reducers';
import fetchData from '~providers';
import BoxArrowDown from '../BoxArrowDown';
import ModalSearch from '~modals/ModalSearch';

const Index = ({
  labelName,
  value,
  styleContainer,
  styleText,
  onChangeValue,
}) => {
  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = useState(false);
  const dataCountries = useSelector(state =>
    commonSelectors.selectListCountries(state),
  );
  const [dataConvert, setDataConvert] = useState([]);

  useEffect(() => {
    if (!dataCountries || dataCountries.length === 0) {
      fetchData(dispatch, 'getListCountries');
    }
  }, []);

  useEffect(() => {
    const updatedData = dataCountries.map((item, index) => ({
      value: index + 1,
      label: item.CountryName,
      countryCode: item.CountryCode,
      selected: item.CountryCode === value?.countryCode,
    }));
    setDataConvert(updatedData);
  }, [dataCountries, value]);

  return (
    <MyView style={styles.container}>
      <BoxArrowDown
        labelName={labelName}
        value={value?.countryName}
        styleContainer={styleContainer}
        styleText={styleText}
        onPress={() => setVisibleModal(true)}
      />
      <ModalSearch
        isVisible={visibleModal}
        onClose={() => setVisibleModal(false)}
        data={dataConvert}
        typeFlatlist="findZipCode"
        selected={item => onChangeValue(item)}
      />
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
