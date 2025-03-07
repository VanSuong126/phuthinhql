import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';

import {MyView, MyText} from '~components/MyStyles';
import {commonSelectors} from '~redux/reducers';
import fetchData from '~providers';
import BoxArrowDown from '../BoxArrowDown';
import ModalSearch from '~modals/ModalSearch';
import {Colors, Sizes, parseSizeHeight, FontStyles} from '~theme';

const Index = ({
  labelName,
  countryCode,
  value,
  styleContainer,
  styleText,
  onChangeValue,
  contentError = '',
}) => {
  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = useState(false);
  const dataCities = useSelector(state =>
    commonSelectors.selectListCities(state),
  );
  const [dataConvert, setDataConvert] = useState([]);

  useEffect(() => {
    if (countryCode) {
      setDataConvert([]);
      fetchData(dispatch, 'getListCities', {CountryCode: countryCode});
    }
  }, [countryCode]);

  useEffect(() => {
    const updatedData = dataCities.map((item, index) => ({
      value: index + 1,
      label: item.StateName,
      cityCode: item.StateCode,
      selected: item.StateCode === value?.cityCode,
    }));
    setDataConvert(updatedData);
  }, [dataCities, value]);

  return (
    <MyView style={styles.container}>
      <BoxArrowDown
        labelName={labelName}
        value={value?.cityName || ''}
        styleContainer={styleContainer}
        styleText={styleText}
        onPress={() => setVisibleModal(true)}
      />
      {contentError && (
        <MyText style={styles.txtError}>
          {'* '}
          {contentError}
        </MyText>
      )}
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
  txtError: {
    paddingTop: parseSizeHeight(5),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline2,
    fontWeight: '400',
    color: Colors.semantics_Red_02,
  },
});
