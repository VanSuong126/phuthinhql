import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import {MyView, MyText} from '~components/MyStyles';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import Icon from '~components/IconXML';
import MonthYearPicker from '~components/MonthYearPicker';
import DatePicker from 'react-native-date-picker';
const Index = ({
  labelName,
  value = null,
  getValue,
  styleContainer,
  style,
  styleLabel,
  styleText,
  typeDate = '0',
  minDate = '1900-01-01',
  maxDate = moment().format('YYYY-MM-DD'),
  isSelected,
  contentError,
}) => {
  const {t} = useTranslation();
  const [modalCalendar, setModalCalendar] = useState(false);
  const [modalDate, setModalDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
  const [year, setYear] = useState(moment().format('YYYY'));

  // Hàm format ngày dựa trên typeDate và giá trị của value
  const formatDate = useCallback(() => {
    switch (typeDate) {
      case '0':
        if (value) {
          return moment(value).format('DD/MM/YYYY');
        } else if (selectedDate) {
          return moment(selectedDate).format('DD/MM/YYYY');
        } else {
          return '';
        }
      case '1':
        return moment(month, 'YYYY-MM').format('MM/YYYY');
      case '2':
        return `${t('year')} ${year}`;
      default:
        return '';
    }
  }, [selectedDate, month, year, value, typeDate]);

  const handleGetMonthYear = item => {
    if (typeDate === '1') {
      setMonth(item);
      getValue(item);
    }
    if (typeDate === '2') {
      setYear(item);
      getValue(item);
    }
  };
  //chọn ngày
  const handleConfirm = date => {
    const formattedValue = date ? moment(date).format('YYYY-MM-DD') : '';

    getValue(formattedValue);
    setSelectedDate(date);
    setModalCalendar(false);
  };
  const handleOpenModal = () => {
    //0 là chọn ngày, 1 là chọn tháng
    if (typeDate === '0') {
      setModalCalendar(true);
    } else if (typeDate === '1' || typeDate === '2') {
      setModalDate(true);
    }
  };

  useEffect(() => {
    if (isSelected === '') {
      setSelectedDate(null);
    }
  }, [isSelected]);

  return (
    <TouchableOpacity
      onPress={() => handleOpenModal()}
      style={[styles.container, style]}>
      <MyView style={styles.wrapLabel}>
        <MyText style={[styles.textLabel, styleLabel]}>{labelName}</MyText>
      </MyView>
      <MyView style={[styles.wrapInput, styleContainer]}>
        <MyText style={[styleText, styles.textValue]}>{formatDate()}</MyText>
        <MyView style={styles.Icon}>
          <Icon
            name={'calendar'}
            width={24}
            height={25}
            color={Colors.neutrals_700}
          />
        </MyView>
      </MyView>
      {contentError && (
        <MyText style={styles.txtError}>
          {'* '}
          {contentError}
        </MyText>
      )}
      <MonthYearPicker
        isVisible={modalDate}
        onClose={() => setModalDate(false)}
        stylesModal={styles.modalTypestyles}
        typePicker={typeDate === '1' ? 'month' : typeDate === '2' && 'year'}
        minYear={moment(minDate).year()}
        maxYear={moment(maxDate).year()}
        getMonthYear={item => handleGetMonthYear(item)}
      />
      <DatePicker
        modal
        open={modalCalendar}
        date={selectedDate || new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setModalCalendar(false)}
        locale="vi"
        mode="date"
        title={t('selectDate')}
        confirmText={t('confirm')}
        cancelText={t('cancel')}
        maximumDate={new Date(maxDate)}
        minimumDate={new Date(minDate)}
      />
    </TouchableOpacity>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  wrapLabel: {
    marginBottom: parseSizeHeight(5),
  },
  textLabel: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    color: Colors.neutrals_700,
  },
  textValue: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '400',
    color: Colors.semantics_Black,
  },
  value: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(-4),
  },
  wrapInput: {
    height: parseSizeHeight(50),
    paddingHorizontal: parseSizeWidth(20),
    backgroundColor: Colors.neutrals_200,
    borderRadius: parseSizeWidth(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Icon: {
    position: 'absolute',
    right: parseSizeWidth(20),
  },
  modalTypestyles: {
    height: parseSizeHeight(500),
  },
  txtError: {
    paddingTop: parseSizeHeight(5),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline2,
    fontWeight: '400',
    color: Colors.semantics_Red_02,
  },
});
