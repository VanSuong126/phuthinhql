import React, {useState, memo, useEffect} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

import styles from './styles';
import Icon from '~components/IconXML';
import Button from '~buttons/MyButton';
import InputDate from '~inputs/InputDate';
import {parseSizeWidth, configureLocaleCalendar} from '~theme';
import {
  MyText,
  MyView,
  MyTouchableOpacity,
  MyAvoidView,
} from '~components/MyStyles';

// Component chỉnh style cho ngày
const DayComponent = memo(
  ({date, state, isSelected, isWithinRange, onDayPress}) => {
    return (
      <MyTouchableOpacity
        style={[
          styles.wrapDate,
          isSelected && styles.selectedDate,
          isWithinRange && !isSelected && styles.rangeDate,
          state === 'disabled' && styles.disabledDate,
        ]}
        onPress={() => onDayPress(date)}>
        <MyText
          style={[
            styles.textDate,
            state === 'disabled' && styles.disabledText,
          ]}>
          {date.day}
        </MyText>
      </MyTouchableOpacity>
    );
  },
);

const index = ({
  defaultFromDate,
  defaultToDate = null,
  isVisible,
  onClose,
  onSelectDates,
  type, // 'DateArr'
  minDate = '1990-01-01',
  maxDate = '2040-12-30',
}) => {
  const {t} = useTranslation();

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const nowDate = new Date();
  const [currentDate, setCurrentDate] = useState(nowDate.toString());

  const handleInput = (type, date) => {
    const parsedDate = moment(date).format('YYYY-MM-DD');
    if (type === 'from') {
      setFromDate(parsedDate);
    } else {
      setToDate(parsedDate);
    }
  };
  //Chức năng chuyển năm
  const changeYear = offset => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + offset);
    setCurrentDate(newDate.toString());
  };

  //Chức năng chuyển tháng
  const changeMonth = offset => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate.toString());
  };

  // lấy ngày sau khi click
  const onDayPress = day => {
    if (type === 'DateArr') {
      if (!fromDate || (fromDate && toDate)) {
        setFromDate(day.dateString);
        setToDate('');
      } else {
        const selectedToDate = day.dateString;
        if (new Date(selectedToDate) < new Date(fromDate)) {
          setFromDate(selectedToDate);
          setToDate('');
        } else {
          setToDate(selectedToDate);
        }
      }
    } else {
      setFromDate(day.dateString);
      setToDate('');
    }
  };
  // style lại ngày tháng khi được click
  const renderComponentDay = (date, state) => {
    const dateString = date.dateString;
    const isWithinRange =
      fromDate &&
      toDate &&
      new Date(dateString) >= new Date(fromDate) &&
      new Date(dateString) <= new Date(toDate);
    const isSelected =
      (fromDate && fromDate === dateString) ||
      (toDate && toDate === dateString);
    return (
      <DayComponent
        date={date}
        state={state}
        isSelected={isSelected}
        isWithinRange={isWithinRange}
        onDayPress={onDayPress}
      />
    );
  };

  // component nút chuyển tháng và năm
  const renderArrow = direction => {
    if (direction === 'left') {
      return (
        <MyView style={styles.boxBtnHeader}>
          <MyTouchableOpacity
            style={styles.btnHeader}
            onPress={() => changeYear(-1)}>
            <Icon name="doubleLeftArrow" width="18" height="18" />
          </MyTouchableOpacity>
          <MyTouchableOpacity
            style={styles.btnHeader}
            onPress={() => changeMonth(-1)}>
            <Icon name="leftArrow" width="18" height="18" />
          </MyTouchableOpacity>
        </MyView>
      );
    }
    if (direction === 'right') {
      return (
        <MyView style={styles.boxBtnHeader}>
          <MyTouchableOpacity
            style={styles.btnHeader}
            onPress={() => changeMonth(1)}>
            <Icon name="rightArrow" width="18" height="18" />
          </MyTouchableOpacity>
          <MyTouchableOpacity
            style={styles.btnHeader}
            onPress={() => changeYear(1)}>
            <Icon name="doubleRightArrow" width="18" height="18" />
          </MyTouchableOpacity>
        </MyView>
      );
    }
  };

  // component header hiển thị tháng năm
  const renderComponentHeader = date => {
    const header = date.toString('MMMM, yyyy');

    return (
      <MyView style={styles.headerContainer}>
        <MyText style={styles.headerText}>{header}</MyText>
      </MyView>
    );
  };

  // nút chọn
  const handleSelect = () => {
    if (type === 'DateArr') {
      if (toDate === '') {
        Toast.show({
          type: 'warning',
          props: {message: t('warningNotChosse')},
        });
        const today = moment().format('YYYY-MM-DD');
        onSelectDates(today, today);
      } else {
        onSelectDates(fromDate, toDate);
      }
    } else {
      onSelectDates(fromDate, toDate);
    }
    onClose();
  };

  useEffect(() => {
    configureLocaleCalendar(t); // Cấu hình locale mỗi khi component được render
  }, [t]);

  //lịch di chuyển khi fromdate được set lại
  useEffect(() => {
    if (fromDate) {
      const dateForm = new Date(fromDate);
      setCurrentDate(dateForm.toString());
    }
  }, [fromDate]);

  useEffect(() => {
    if (defaultFromDate) {
      setFromDate(moment(defaultFromDate).format('YYYY-MM-DD'));
    } else {
      setFromDate(moment().format('YYYY-MM-DD'));
    }
  }, [defaultFromDate]);
  useEffect(() => {
    if (type === 'DateArr') {
      if (defaultToDate) {
        setToDate(moment(defaultToDate).format('YYYY-MM-DD'));
      } else {
        setToDate(moment().format('YYYY-MM-DD'));
      }
    }
  }, [defaultToDate]);

  return (
    <Modal
      onBackdropPress={onClose}
      visible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modalContainer}>
      <MyAvoidView>
        <MyView style={styles.container}>
          <MyView style={styles.modalContent}>
            <MyView style={styles.lineGrey} />
            {type === 'DateArr' && (
              <MyView style={styles.inputDate}>
                <MyView style={styles.itemInputDate}>
                  <MyText style={styles.titleInputDate}>{t('from')}</MyText>
                  <InputDate
                    dateDefault={fromDate}
                    getValue={date => handleInput('from', date)}
                    stylesContainer={styles.stylesContainer}
                    editable={false}
                  />
                </MyView>
                <MyView style={styles.line} />
                <MyView style={styles.itemInputDate}>
                  <MyText style={styles.titleInputDate}>{t('to')}</MyText>
                  <InputDate
                    dateDefault={toDate}
                    getValue={date => handleInput('to', date)}
                    stylesContainer={styles.stylesContainer}
                    editable={false}
                  />
                </MyView>
              </MyView>
            )}
            <MyView style={styles.boxCalendar}>
              <Calendar
                style={styles.calendar}
                onDayPress={onDayPress}
                dayComponent={({date, state}) =>
                  renderComponentDay(date, state)
                }
                theme={styles.calendarTheme}
                renderHeader={date => renderComponentHeader(date)}
                renderArrow={direction => renderArrow(direction)}
                current={currentDate}
                key={currentDate + ''}
                minDate={minDate || '1999-01-01'}
                maxDate={maxDate || nowDate.toISOString().split('T')[0]}
              />
              <MyView style={styles.button}>
                <Button
                  title={t('delete')}
                  size="small"
                  type={2}
                  onPress={() => onClose()}
                  widthSizeView={parseSizeWidth(76)}
                />
                <Button
                  title={t('select')}
                  size="small"
                  type={1}
                  onPress={() => handleSelect()}
                  widthSizeView={parseSizeWidth(84)}
                />
              </MyView>
            </MyView>
          </MyView>
        </MyView>
      </MyAvoidView>
    </Modal>
  );
};

export default index;
