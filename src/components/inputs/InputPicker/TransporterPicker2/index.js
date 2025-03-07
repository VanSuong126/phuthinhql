import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';

import Icon from '~components/IconXML';
import {MyView, MyText, MyTouchableOpacity} from '~components/MyStyles';
import {salesActions, salesSelectors, commonSelectors} from '~redux/reducers';
import {Colors, Sizes, parseSizeHeight, FontStyles} from '~theme';
import fetchData from '~providers';
import BoxArrowDown from '../BoxArrowDown';
import ModalItemSelector from '~modals/ModalItemSelector';

const Index = ({value, mabanghotro, getValue}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  // Init state
  const [visibleModal, setVisibleModal] = useState(false);

  // Global state
  const transporter = useSelector(commonSelectors.selectTransporter) || [];

  useEffect(() => {
    if (transporter.length === 0) {
      fetchData(dispatch, 'getTransporter', {
        loai: 271,
        mabanghotro: mabanghotro,
      });
    }
  }, [mabanghotro]);

  const handleSelected = data => {
    if (data) {
      getValue(data);
    }
  };
  return (
    <MyView style={styles.container}>
      <BoxArrowDown
        labelName={t('transporter')}
        value={value}
        onPress={() => setVisibleModal(true)}
      />
      <ModalItemSelector
        isVisible={visibleModal}
        onClose={() => setVisibleModal(false)}
        data={transporter}
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
