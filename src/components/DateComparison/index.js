import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

import {MyText} from '~components/MyStyles';
import {parseSizeWidth, parseSizeHeight, Colors, Sizes} from '~theme';
const Index = ({dateToCompare}) => {
  const {t} = useTranslation();
  //chỉ sử dụng ngày tháng năm để so sánh, ngày đã được đưa về startOf 00:00 (HH:MM)
  const today = moment().startOf('day');
  const currentYear = today.year();
  // Ngày sinh nhật năm nay, chỉ lấy ngày mà không tính giờ
  let birthdayThisYear = moment(dateToCompare).startOf('day').year(currentYear);

  // Nếu sinh nhật đã qua trong năm nay, tính cho năm sau
  if (birthdayThisYear.isBefore(today)) {
    birthdayThisYear = birthdayThisYear.add(1, 'year');
  }
  const differenceInDays = birthdayThisYear.diff(today, 'days');

  const {color, text} = useMemo(() => {
    const intervalDays = value => {
      switch (value) {
        case 0:
          return {
            color: styles.red,
            text: t('today'),
          };
        case 1:
          return {
            color: styles.yellow,
            text: t('oneDaysLeft'),
          };
        case 2:
          return {
            color: styles.green,
            text: t('twoDaysLeft'),
          };
        case 3:
          return {
            color: styles.gray,
            text: t('threeDaysLeft'),
          };
        default: {
          return {
            text: `${differenceInDays} ${t('day')}`,
          };
        }
      }
    };
    return intervalDays(differenceInDays);
  }, [dateToCompare]);

  return <MyText style={[styles.text, color]}>{text}</MyText>;
};

const styles = StyleSheet.create({
  text: {
    borderRadius: 100,
    backgroundColor: Colors.neutrals_200,
    fontSize: Sizes.text_tagline2,
    textAlign: 'center',
    color: Colors.semantics_Grey,
    paddingHorizontal: parseSizeWidth(15),
    paddingVertical: parseSizeHeight(5),
    alignSelf: 'center',
  },
  red: {
    color: Colors.semantics_Red_01,
    backgroundColor: Colors.semantics_Red_03,
  },
  yellow: {
    color: Colors.semantics_Yellow_01,
    backgroundColor: Colors.semantics_Yellow_03,
  },
  green: {
    color: Colors.brand_01,
    backgroundColor: Colors.semantics_Green_03,
  },
  gray: {
    color: Colors.semantics_Grey,
    backgroundColor: Colors.neutrals_200,
  },
});

export default Index;
