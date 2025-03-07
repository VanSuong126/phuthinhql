import {Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

import {
  FontStyles,
  Colors,
  Sizes,
  parseSizeHeight,
  Width,
  parseSizeWidth,
} from '~theme';
import {MyView, MyText} from '~components/MyStyles';

const RenderButtonGroups = ({title, dataGroups, onPress, groupId}) => {
  const [selected, setSelected] = useState();
  const handleSelected = item => {
    if (item.id === selected) {
      setSelected(null);
      onPress(null, groupId);
    } else {
      setSelected(item.id);
      onPress(item, groupId);
    }
  };

  return (
    <MyView style={styles.box}>
      <MyText style={styles.txtTitle}>{title}</MyText>
      <MyView style={styles.chosseFilter}>
        {dataGroups.map((item, index) => (
          <Pressable key={index} onPress={() => handleSelected(item)}>
            <LinearGradient
              colors={
                selected === item.id
                  ? ['#198B4D', '#05AA50']
                  : [Colors.semantics_Green_03, Colors.semantics_Green_03]
              }
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradient}>
              <MyText
                style={[
                  styles.txtBtn,
                  selected === item.id && styles.txtBtnClick,
                ]}>
                {`${item.label}`}
              </MyText>
            </LinearGradient>
          </Pressable>
        ))}
      </MyView>
    </MyView>
  );
};

const Index = ({isVisible, onClose, filter, data = []}) => {
  const {t} = useTranslation();
  const [value, setValue] = useState([]);

  const handleGetFilter = (item, groupName) => {
    const existingIndex = value.findIndex(
      existingItem => existingItem.groupName === groupName,
    );

    if (existingIndex !== -1) {
      const updatedValue = [...value];
      updatedValue[existingIndex] = {...item, groupName};
      setValue(updatedValue);
    } else {
      setValue([...value, {...item, groupName}]);
    }
  };

  const handleBackdropPress = () => {
    filter(value);
    onClose();
    setValue([]);
  };

  return (
    <Modal
      onBackdropPress={handleBackdropPress}
      isVisible={isVisible}
      transparent={true}
      animationIn="slideInUp"
      style={styles.modal}>
      <MyView style={styles.container}>
        <MyView style={styles.line} />
        {data.map((item, index) => (
          <RenderButtonGroups
            key={index}
            title={item.title}
            dataGroups={item.data}
            onPress={handleGetFilter}
            groupId={item.name}
          />
        ))}
      </MyView>
    </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    backgroundColor: Colors.backgroundShowPopup,
    justifyContent: 'flex-end',
  },
  container: {
    width: Width,
    backgroundColor: Colors.neutrals_100,
    shadowColor: 'rgba(66, 71, 76, 0.32)',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    shadowOpacity: 0.25,
    elevation: 5,
    borderTopLeftRadius: Sizes.spacing_5_Width,
    borderTopRightRadius: Sizes.spacing_5_Width,
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing_5_Width,
  },
  line: {
    marginVertical: parseSizeHeight(20),
    width: parseSizeWidth(45),
    height: parseSizeHeight(5),
    borderRadius: 100,
    backgroundColor: Colors.neutrals_300,
  },
  box: {
    width: '100%',
    marginBottom: Sizes.spacing_3_Height,
  },
  txtTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    textAlign: 'left',
    marginBottom: Sizes.spacing_2_Height,
  },
  chosseFilter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Sizes.spacing_3_Height,
    justifyContent: 'space-between',
  },
  txtBtn: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.semantics_Green_01,
  },
  txtBtnClick: {
    color: Colors.neutrals_50,
  },
  gradient: {
    paddingHorizontal: parseSizeWidth(17),
    paddingVertical: parseSizeHeight(5),
    borderRadius: 100,
  },
});
