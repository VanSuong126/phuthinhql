import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Colors, parseSizeWidth, parseSizeHeight, Sizes, FontStyles} from '~theme';
import Modal from 'react-native-modal';
import {MyView, MySafeAreaView, MyText, MyTouchableOpacity} from '~components/MyStyles';
import FlatList from '~components/FlatList';
import Icon from '~components/IconXML';


const Index = props => {
  const {t} = useTranslation();
  const {isVisible, onClose, data, selected, onCleanAddress = null, typeFlatlist} = props;
  const [dataSearch, setDataSearch] = useState([]);

  const handleSelected = item => {
    selected(item);
    onClose();
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
         {onCleanAddress&& <MyTouchableOpacity style= {styles.wrapAddNew} onPress ={()=>onCleanAddress()}>
              <MyText style ={styles.textAddNew}>{t('addNewDeliveryAddress')}</MyText>
              <Icon name="plusNoBG" width="18" height="18" />
            </MyTouchableOpacity>}
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
  wrapAddNew:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical:parseSizeWidth(16)
  },
  textAddNew:{
    fontFamily: FontStyles.InterRegular,
  fontSize: Sizes.text_subtitle1,
  fontWeight: '500',
  color: Colors.semantics_Black,
  textAlign: 'left',
  }
});
