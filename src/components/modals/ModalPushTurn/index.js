import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';
import moment from 'moment';

import {
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '~theme';
import Modal from 'react-native-modal';
import {MyText, MyView} from '~components/MyStyles';
import Icon from '~components/IconXML';
import Button from '~buttons/MyButton';
import InputWithUnit from '~inputs/InputWithUnit';
import ModalCalendar from '~modals/ModalCalendar';
const Index = props => {
  const {t} = useTranslation();
  const {isVisible, data, onApply, onClose} = props;
  const [amount, setAmount] = useState(0);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [modalCalendar, setModalCalendar] = useState(false);

  const handleSubmit = () => {
    if (fromDate && toDate) {
      const formattedFromDate = fromDate.split('/').reverse().join('-');
      const formattedToDate = toDate.split('/').reverse().join('-');
      const dataUpdated = {
        soLuot: amount,
        idSanPham: data?.productID,
        fromDate: formattedFromDate,
        toDate: formattedToDate,
      };
      onApply(dataUpdated);
    } else {
      Toast.show({
        type: 'error',
        props: {message: t('notHaveDatePushed')},
      });
    }
    onClose();
  };

  const handleGetDateFromCalendar = (fromDate, toDate) => {
    const today = moment().format('YYYY-MM-DD');
    //2025-02-01 2025-02-28
    if (moment(today).isAfter(moment(fromDate))) {
      const formattedToday = today.split('-').reverse().join('/');
      setFromDate(formattedToday);
      setToDate(formattedToday);
      Toast.show({
        type: 'warning',
        props: {message: t('Đẩy lượt phải bắt đầy từ hôm nay')},
      });
      return;
    }
    //01/02/2025 28/02/2025
    const formattedFromDate = fromDate.split('-').reverse().join('/');
    const formattedToDate = toDate.split('-').reverse().join('/');
    setFromDate(formattedFromDate);
    setToDate(formattedToDate);
  };

  return (
    <Modal
      onBackdropPress={onClose}
      visible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modal}>
      <MyView style={styles.container}>
        <MyView style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.iconClose}>
            <Icon name={'undo'} width={24} height={24} />
          </TouchableOpacity>
          <MyText style={styles.textTitle}>{t('pushTurn')}</MyText>
          <MyView style={styles.body}>
            <MyView style={styles.wrapInput}>
              <MyText style={styles.labelInput}>{t('fromdatetodate')}</MyText>
              <TouchableOpacity
                onPress={() => setModalCalendar(true)}
                style={styles.selectDate}>
                <Icon name={'calendar'} width={18} height={18} />
                <MyText style={styles.textSelect}>
                  {fromDate || 'DD/MM/YYYY'} - {toDate || 'DD/MM/YYYY'}
                </MyText>
              </TouchableOpacity>
            </MyView>
            <MyView style={styles.wrapInput}>
              <MyText style={styles.labelInput}>{t('numberOflikes')}</MyText>
              <InputWithUnit
                unit={''}
                value={amount}
                onChangeText={value => setAmount(value)}
                maxLength={20}
                maxValue={999}
              />
            </MyView>
          </MyView>
          <MyView style={styles.wrapButton}>
            <Button
              title={t('confirm')}
              size="popup"
              type={1}
              onPress={() => handleSubmit()}
            />
          </MyView>
        </MyView>
      </MyView>
      <ModalCalendar
        isVisible={modalCalendar}
        onClose={() => setModalCalendar(false)}
        onSelectDates={(fromDate, toDate) =>
          handleGetDateFromCalendar(fromDate, toDate)
        }
        type="DateArr"
      />
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
  body: {
    marginVertical: Sizes.spacing_4_Height,
    gap: Sizes.spacing_4_Height,
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
  selectDate: {
    borderRadius: 8,
    backgroundColor: Colors.neutrals_100,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    height: parseSizeHeight(44),
    paddingHorizontal: parseSizeWidth(20),
    alignItems: 'center',
    gap: parseSizeWidth(10),
    flexDirection: 'row',
  },
  textSelect: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.accent_yellow,
    flex: 1,
  },
});
