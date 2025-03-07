import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';

import {MyView, MyText} from '~components/MyStyles';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import Icon from '~components/IconXML';
import ModalCalendar from '~modals/ModalCalendar';
import InputDate from '~inputs/InputDate';

const Index = ({
  labelName,
  styleContainer,
  styleText,
  styleTextYear,
  styleFomat,
  styleInput,
  getFromDate,
  getToDate,
  getDate,
  editable,
}) => {
  const {t} = useTranslation();
  const [modalCalendar, setModalCalendar] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const handleInput = (type, date) => {
    const parsedDate = moment(date).format('YYYY-MM-DD');

    if (type === 'from') {
      if (toDate && moment(parsedDate).isAfter(toDate)) {
        Toast.show({
          type: 'error',
          props: {message: t('warningFromDateArr')},
        });
        return getFromDate(new Date()), setFromDate(new Date());
      }

      setFromDate(parsedDate);
      getFromDate(parsedDate);
    } else {
      if (fromDate && moment(parsedDate).isBefore(fromDate)) {
        Toast.show({
          type: 'error',
          props: {message: t('warningToDateArr')},
        });
        return getToDate(new Date()), setToDate(new Date());
      }

      setToDate(parsedDate);
      getToDate(parsedDate);
    }
  };

  const handleGetDateFromCalendar = (fromDate, toDate) => {
    setFromDate(fromDate);
    setToDate(toDate);
    if (getDate) {
      getDate({fromDate, toDate});
    } else {
      getFromDate(fromDate);
      getToDate(toDate);
    }
  };

  return (
    <MyView style={[styles.container, styleContainer]}>
      <MyView style={styles.wrapLabel}>
        <MyText style={styles.textLabel}>{labelName}</MyText>
      </MyView>
      <MyView style={[styles.wrapInput, styleInput]}>
        <InputDate
          dateDefault={fromDate}
          stylesContainer={styles.inputFromDate}
          getValue={date => handleInput('from', date)}
          styleSparator={[styles.textFomat, styleFomat]}
          styleText={[styles.textValue, styleText]}
          styleTextYear={[styles.textValue, styleTextYear]}
          editable={editable}
        />
        <MyText style={[styles.textFomat, styleFomat]}>-</MyText>
        <InputDate
          dateDefault={toDate}
          stylesContainer={styles.inputToDate}
          getValue={date => handleInput('to', date)}
          styleSparator={[styles.textFomat, styleFomat]}
          styleText={[styles.textValue, styleText]}
          styleTextYear={[styles.textValue, styleTextYear]}
          editable={editable}
        />
        <TouchableOpacity
          onPress={() => setModalCalendar(true)}
          style={styles.wrapArrow}>
          <Icon
            name={'calendar'}
            width={parseSizeWidth(24)}
            height={parseSizeHeight(25)}
            color={Colors.neutrals_700}
          />
        </TouchableOpacity>
      </MyView>
      <ModalCalendar
        isVisible={modalCalendar}
        onClose={() => setModalCalendar(false)}
        onSelectDates={(fromDate, toDate) =>
          handleGetDateFromCalendar(fromDate, toDate)
        }
        type="DateArr"
        defaultFromDate={fromDate}
        defaultToDate={toDate}
      />
    </MyView>
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
  textFomat: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    color: Colors.semantics_Black,
    textAlign: 'center',
  },
  textValue: {
    textAlign: 'left',
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '400',
    color: Colors.semantics_Black,
    height: '100%',
  },
  value: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(-4),
    flex: 1,
  },
  wrapInput: {
    height: parseSizeHeight(50),
    paddingHorizontal: parseSizeWidth(20),
    backgroundColor: Colors.neutrals_200,
    borderRadius: parseSizeWidth(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: parseSizeWidth(10),
  },
  inputFromDate: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputToDate: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
