import {StyleSheet} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';

import {MyView, MyText, MyTextInput} from '~components/MyStyles';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';

const isLeapYear = year => {
  //chia hết cho 4 nhưng không chia hết cho 100 là năm nhuận
  //và chia hết cho 400 là năm nhuận
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  } else {
    return false;
  }
};

const checkDayByMonth = (month, year) => {
  let daysInMonth;
  const numericYear = parseInt(year, 10);

  if (month === '02') {
    daysInMonth = isLeapYear(numericYear) ? '29' : '28';
  } else if (
    month === '01' ||
    month === '03' ||
    month === '05' ||
    month === '07' ||
    month === '08' ||
    month === '10' ||
    month === '12'
  ) {
    daysInMonth = '31';
  } else {
    daysInMonth = '30';
  }

  return daysInMonth;
};

const Index = props => {
  const {
    styleSparator,
    styleText,
    separator1 = '/',
    separator2 = '/',
    getValue,
    dateDefault,
    styleTextYear,
    limitInputYear = 2030,
    editable = null,
  } = props;
  const {t} = useTranslation();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const inputDateRef = useRef(null);
  const inputMonthRef = useRef(null);
  const inputYearRef = useRef(null);

  // Hàm thêm 0 nếu giá trị chỉ có 1 ký tự
  const formatDay = value => {
    if (value.length === 1) {
      return `0${value}`;
    }
    return value;
  };

  const handleSubmit = () => {
    const dayNumber = parseInt(day || '0', 10);
    const monthNumber = parseInt(month || '0', 10);
    const yearNumber = parseInt(year || '0', 10);
    const nowDate = new Date();
    let getMonth = month;
    let getYear = year;
    let getDay = day;

    if (yearNumber < 1900 || yearNumber > limitInputYear) {
      // Nếu năm không hợp lệ, lấy năm hiện tại
      getYear = String(nowDate.getFullYear());
      setYear(getYear);
    }

    if (monthNumber < 1 || monthNumber > 12) {
      // Nếu tháng không hợp lệ, lấy tháng hiện tại
      getMonth = String(nowDate.getMonth() + 1);
      setMonth(getMonth);
    }

    if (dayNumber < 1 || dayNumber > 31) {
      // Nếu ngày không hợp lệ, tính số ngày của tháng dựa trên năm
      getDay = checkDayByMonth(getMonth, getYear);
      setDay(getDay);
    }

    // Kiểm tra tính hợp lệ của ngày với tháng
    const dateString = `${getYear}-${getMonth}-${getDay}`;
    const dateFormat = 'YYYY-MM-DD';
    const dateIsValid = moment(dateString, dateFormat, true).isValid();

    if (!dateIsValid) {
      // Nếu ngày không hợp lệ, chỉnh sửa lại ngày cuối cùng của tháng
      getDay = checkDayByMonth(getMonth, getYear);
      setDay(getDay);
    }

    const date = moment(`${getYear}-${getMonth}-${getDay}`, dateFormat);
    getValue(date);
  };

  useEffect(() => {
    if (dateDefault !== '') {
      const date = moment(dateDefault, 'YYYY-MM-DD');

      setDay(date.format('DD'));
      setMonth(date.format('MM'));
      setYear(date.format('YYYY'));
    } else {
      const nowDate = new Date();
      const day = String(nowDate.getDate());
      const month = String(nowDate.getMonth() + 1);
      const year = String(nowDate.getFullYear());

      setDay(formatDay(day));
      setMonth(formatDay(month));
      setYear(year);
    }
  }, [dateDefault]);

  return (
    <MyView style={[styles.container]}>
      <MyTextInput
        ref={inputDateRef}
        placeholder={'--'}
        returnKeyType="next"
        blurOnSubmit={false}
        style={[styles.textDefault, styles.textValue, styleText]}
        keyboardType="numeric"
        onSubmitEditing={() => {
          inputMonthRef.current?.focus(), setDay(formatDay(day));
        }}
        value={day}
        onChangeText={text => {
          setDay(text);
          if (text.length === 2) {
            inputMonthRef.current?.focus();
          }
        }}
        maxLength={2}
        editable={editable}
      />
      <MyText style={[styles.txtSparator, styleSparator]}>{separator1}</MyText>
      <MyTextInput
        ref={inputMonthRef}
        placeholder={'--'}
        returnKeyType="next"
        blurOnSubmit={false}
        style={[styles.textDefault, styleText || styles.textValue]}
        keyboardType="numeric"
        onSubmitEditing={() => {
          inputYearRef.current?.focus(), setMonth(formatDay(month));
        }}
        value={month}
        onChangeText={text => {
          setMonth(text);
          if (text.length === 2) {
            inputYearRef.current?.focus();
          }
        }}
        maxLength={2}
        editable={editable}
      />
      <MyText style={[styles.txtSparator, styleSparator]}>{separator2}</MyText>
      <MyTextInput
        ref={inputYearRef}
        placeholder={'----'}
        returnKeyType="done"
        style={[styles.textYear, styles.textValue, styleTextYear]}
        maxLength={4}
        keyboardType="numeric"
        value={year}
        onChangeText={text => setYear(text)}
        onSubmitEditing={handleSubmit}
        editable={editable}
      />
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  txtSparator: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '400',
    color: Colors.semantics_Black,
  },
  textValue: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '400',
    color: Colors.semantics_Black,
  },
  textYear: {
    height: parseSizeHeight(50),
  },
  textDefault: {
    height: parseSizeHeight(50),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
