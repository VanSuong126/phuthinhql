import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';


import { FontStyles, Colors, Sizes, parseSizeHeight, parseSizeWidth } from '~theme';
import Modal from 'react-native-modal';
import { MyView, MyText } from '~components/MyStyles';
import Icon from '~components/IconXML';
import Button from '~buttons/MyButton';
import InputWithUnit from '~inputs/InputWithUnit';


const Index = props => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isVisible,listFeeship, onApply, onClose } = props;
  const [freeship, setFeeship] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSubmit = () => {
    onApply(freeship);
    onClose();
  };

  // handle set feeship from transporter 
  const handleSelectFeeShip = (item, index) => {
    if (selectedIndex === index)
    {
      setFeeship(0);
      setSelectedIndex(-1);
    }
    else
    {
      setFeeship(item?.feeShip);
      setSelectedIndex(index);
    }
  };

  return (
    <Modal onBackdropPress={onClose} visible={isVisible} transparent={true} animationType="slide" style={styles.modal}>
      <MyView style={styles.container}>
        <MyView style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.iconClose}>
            <Icon name={'undo'} width={24} height={24} />
          </TouchableOpacity>
          <MyText style={styles.textTitle}>{t('enterFeeShip')}</MyText>
          <MyView style={styles.wrapInput}>
          {listFeeship && listFeeship.map((item, index) => (
              <TouchableOpacity key={index} style={[
                  styles.feeshipItem,
                  selectedIndex === index && { backgroundColor: Colors.semantics_Green_02 }
                ]} onPress={() => handleSelectFeeShip(item, index)}>
                <MyText style={[
                  styles.textFeeship,
                  selectedIndex === index && { color: Colors.neutrals_50 }
                ]}>{item?.maNhaVanChuyen} - {item?.feeShip}</MyText>
              </TouchableOpacity>
            ))}
            <MyText style={styles.labelInput}>{t('feeshipOfShop')}</MyText>
            <InputWithUnit
              unit={'đ'}
              value={freeship}
              onChangeText={value => setFeeship(value)}
              maxLength={20}
              maxValue={10000000000}
            />
          </MyView>
          <MyView style={styles.wrapButton}>
              <Button
                title={t('apply')}
                size="medium"
                type={1}
                onPress={() => handleSubmit()}
              />
            </MyView>
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
    backgroundColor: 'rgba(0, 0, 0,0.35)',
  },
  container: {
    position: 'absolute',
    top: parseSizeHeight(212),
    // height: parseSizeHeight(220),
    width: parseSizeWidth(329),
    backgroundColor: Colors.neutrals_50,
    borderRadius: parseSizeWidth(16),
    alignSelf: 'center',
    paddingHorizontal: parseSizeWidth(22),
    paddingVertical: parseSizeHeight(30),
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  iconClose: {
    position: 'absolute',
    top: parseSizeHeight(-18),
    right: parseSizeWidth(0),
  },
  wrapInput: {
    marginVertical: parseSizeHeight(20),
    gap: parseSizeHeight(8),

  },
  textTitle: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    color: Colors.semantics_Grey,
    textAlign: 'center',
  },
  labelInput: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
  wrapButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  feeshipItem:{
    backgroundColor:Colors.neutrals_200,
    alignSelf:'left',
    paddingVertical:parseSizeHeight(4),
    paddingHorizontal: parseSizeWidth(20),
    borderRadius:20,
    borderWidth:1,
    borderColor:Colors.neutrals_300,
  },
  textFeeship:{
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  }
});
