import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Colors, parseSizeWidth, Height, Sizes} from '~theme';
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
      const filterdata = data&&data.length>0&&data.filter(item => 
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
        <HeaderToolBar nameHeaderTitle={t('search')} onPressBack={onClose} />
        <MyView style={styles.body}>
          <InputSearch
            value={stringSearch}
            styleInputSearch={styles.seacrch}
            placeholder={t('search')}
            getString={value => setStringSearch(value)}
            onSearch={handleSearch}
          />
          <MyView style={styles.total}>
            <MyText style={styles.txtTitle}>{t('searchResults')}:</MyText>
            <MyText style={styles.txtResult}>{dataSearch?.length || 0}</MyText>
          </MyView>
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
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    margin: 0,
  },
  body: {
    flex: 1,
    paddingHorizontal:Sizes.paddingWidth,
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
