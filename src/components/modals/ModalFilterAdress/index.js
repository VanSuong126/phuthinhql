import {Pressable, StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import ToggleSwitch from 'toggle-switch-react-native';
import Button from '~buttons/MyButton';
import {
  FontStyles,
  Colors,
  Sizes,
  parseSizeHeight,
  Width,
  parseSizeWidth,
} from '~theme';
import {MyView, MyText} from '~components/MyStyles';
import Icon from '~components/IconXML';

data = [
  {
    id: 1,
    value: 'country',
  },
  {id: 2, value: 'provine_citi'},
  {id: 3, value: 'district'},
  {id: 4, value: 'status'},
];
const Index = ({isVisible, onClose, filter}) => {
  const {t} = useTranslation();
  const [toggleStates, setToggleStates] = useState({
    country: true,
    provine_citi: true,
    district: true,
    status: true,
  });

  const handleUndo = () => {
    setToggleStates({
      country: false,
      provine_citi: false,
      district: false,
      status: false,
    });
  };

  const handleToggle = (isOn, value) => {
    setToggleStates(prevState => ({
      ...prevState,
      [value]: isOn,
    }));
  };
  const handleApply = () => {
    onClose();
    filter(toggleStates);
  };
  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={isVisible}
      transparent={true}
      animationIn="slideInUp"
      style={styles.modal}>
      <MyView style={styles.container}>
        <MyView style={styles.line} />
        <MyView style={styles.horizontal}>
          <TouchableOpacity onPress={handleUndo}>
            <MyText>{t('undo')}</MyText>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Icon name="undo" width="24" height="24" />
          </TouchableOpacity>
        </MyView>
        {data.map((item, index) => (
          <MyView key={index} style={styles.box}>
            <MyText style={styles.label}>{t(item.value)}</MyText>
            <ToggleSwitch
              isOn={toggleStates[item.value]}
              onColor={Colors.brand_01}
              offColor={Colors.neutrals_300}
              size="medium"
              onToggle={isOn => handleToggle(isOn, item.value)}
            />
          </MyView>
        ))}

        <MyView style={styles.button}>
          <Button onPress={handleApply} title={t('apply')} size="primary" />
        </MyView>
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
    gap: Sizes.spacing_4_Width,
  },
  button: {
    marginBottom: Sizes.spacing_4_Height,
  },
  line: {
    marginTop: parseSizeHeight(20),
    width: parseSizeWidth(45),
    height: parseSizeHeight(5),
    borderRadius: 100,
    backgroundColor: Colors.neutrals_300,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingVertical: parseSizeHeight(10),
    paddingHorizontal: Sizes.spacing_5_Width,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: Sizes.spacing_5_Width,
  },
  label: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_700,
  },
});
