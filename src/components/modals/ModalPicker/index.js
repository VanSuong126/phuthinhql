import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Colors, parseSizeWidth, parseSizeHeight, Sizes} from '~theme';
import Modal from 'react-native-modal';
import {MyView, MySafeAreaView, MyText} from '~components/MyStyles';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import InputSearch from '~inputs/InputSearch';
import FlatList from '~components/FlatList';
const Index = props => {
  const {t} = useTranslation();
  const {isVisible, onClose, data, selected, typeFlatlist} = props;
  const [dataSearch, setDataSearch] = useState([]);
  const [stringSearch, setStringSearch] = useState('');

  const handleSelected = item => {
    selected(item);
    onClose();
  };

  const handleSearch = () => {
    if (stringSearch) {
      const filterdata = data.filter(item => 
        Object.values(item).some(value =>
          value && value.toString().toLowerCase().includes(stringSearch.toLowerCase())
        )
      );
      setDataSearch(filterdata);
    } else {
      setDataSearch(data);
    }
  };
  
  useEffect(() => {
    if (data) {
      setDataSearch(data);
    }
  }, [data]);
  return (
    <Modal
      onBackdropPress={onClose}
      visible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modal}>
      <MySafeAreaView style={styles.container}>
        <MyView style={styles.body}>
        <MyView style={styles.line} />
          <MyView style={styles.content}>
            <FlatList
              data={dataSearch}
              grid={false}
              loading={false}
              fetching={false}
              type={typeFlatlist}
              onPress={item => handleSelected(item)}
            />
          </MyView>
        </MyView>
      </MySafeAreaView>
    </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    backgroundColor: 'rgba(0, 0, 0,0.35)',
    justifyContent:'flex-end',
  },
  container: {
    flex: 0.6,
    margin: 0,
    borderStartStartRadius:parseSizeWidth(24),
    borderStartEndRadius:parseSizeWidth(24),
  },
  body: {
    flex: 1,
    paddingHorizontal:Sizes.paddingWidth,
  },
  line: {
    marginVertical: Sizes.spacing_4_Height,
    width: parseSizeWidth(45),
    height: parseSizeHeight(5),
    borderRadius: 100,
    backgroundColor: Colors.neutrals_300,
    alignSelf:'center',
  },
  content: {
    flex: 1,
  },
  total: {
    flexDirection: 'row',
    gap: parseSizeWidth(5),
    marginTop: Sizes.spacing_3_Height,
    marginBottom: Sizes.marginHeight,
  },
  txtTitle: {
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
   
    textAlign: 'left',
  },
  txtResult: {
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
   
    textAlign: 'left',
    color: Colors.accent_yellow,
  },
});
