import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { Calendar } from 'react-native-calendars';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';

import { MyView, MySafeAreaView, MyText, MyTouchableOpacity, MyScrollView } from '~components/MyStyles';
import { Colors, Sizes, FontStyles, parseSizeHeight, parseSizeWidth, configureLocaleCalendar } from '~theme';
import fetchData from '~providers';

export default Index = props => {
  const { t } = useTranslation();
  const { isVisible, onClose, idnguoidung, valueMonthYear } = props;
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState('');
  const [thang, setThang] = useState(new Date().getMonth() + 1);
  const [nam, setNam] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);

  useEffect(() => {
    configureLocaleCalendar(t);  // Cấu hình locale mỗi khi component được render
  }, [t]);

  useEffect(() => {
    if (valueMonthYear) {
      const [year, month] = valueMonthYear.split('-');
      setThang(month);
      setNam(year);
    }
  }, [isVisible]);

  

  useEffect(() => {
    if (idnguoidung) {
      getTimeSheet();
    }
  }, [thang, nam, idnguoidung]);

  const getTimeSheet = () => {
    const params = {
      idnguoidung: idnguoidung,
      thang: thang,
      nam: nam,
    }
    fetchData(dispatch, "getTimeSheet", params, (res) => {
      if (res.success === true) {
        setData(res?.data);
      }
      else {
        Toast.show({
          type: 'error',
          props: { message: res?.message },
        });
        setData();
      }
    })
  };


  const handleSelectDate = date => {
    const { dateString } = date;
    setSelectedDate(dateString);
  };

  const changeMonth = data => {
    setThang(data?.month);
    setNam(data?.year);
  };

  const renderDetail = item => {
    if (!Array.isArray(item?.ChamCongTrongNgay)) return null;

    let lanCheckIn = 1;
    let lanCheckOut = 1;

    return item.ChamCongTrongNgay.map((check, index) => {
      const checkType = check.Loai === 1 ? 'CheckIn' : 'CheckOut';
      const checkCount = check.Loai === 1 ? lanCheckIn++ : lanCheckOut++;

      return (
        <MyView style={styles.wrapItemDetail} key={index}>
          <MyText style={styles.textTitleItem}>
          {`${checkType} ${t('times')} ${checkCount}: `}
          </MyText>
          <MyText style={styles.textValueItem}>
            {new Date(check.TimeCheck).toLocaleTimeString()}
          </MyText>
        </MyView>
      );
    });
  };

  const renderComponentDay = (date, state) => {
    const item = Array.isArray(data?.BangChamCong)
      ? data.BangChamCong.find(item => item.Ngay === date.dateString)
      : null;

    let component;
    if (!item) {
      // Ngày không có dữ liệu
      component = (
        <MyView style={[styles.wrapDate, { backgroundColor: Colors.neutrals_50 }]} onPress={() => handleSelectDate(date)}>
          <MyText style={[styles.textDate, { color: Colors.neutrals_200 }]}>
            {date.day}
          </MyText>
        </MyView>
      );
    } else if (item.ChamCongTrongNgay.length > 0) {
      // Ngày có dữ liệu
      const attendance = item.ChamCongTrongNgay;
      const lastCheck = new Date(attendance[attendance.length - 1].TimeCheck);
      const firstCheck = new Date(attendance[0].TimeCheck);
      const workTime = Math.abs(lastCheck.getTime() - firstCheck.getTime());
      const hoursDifference = workTime / (1000 * 60 * 60);
      // Hàm kiểm tra xem mảng có cả Loai 1 và Loai 2 hay không
      const hasBothTypes = () => {
        const hasType1 = item.ChamCongTrongNgay.some(x => x.Loai === 1);
        const hasType2 = item.ChamCongTrongNgay.some(x => x.Loai === 2);
        return hasType1 && hasType2;
      };

      // Xác định màu sắc của biểu tượng IconCalendar dựa trên kết quả của hasBothTypes
      const colorText = hasBothTypes()
        ? hoursDifference >= 8
          ? Colors.semantics_Green_01
          : Colors.semantics_Red_01
        : Colors.semantics_Yellow_01;
      const colorBackGround = hasBothTypes()
        ? hoursDifference >= 8
          ? Colors.semantics_Green_03
          : Colors.semantics_Red_03
        : Colors.semantics_Yellow_03;
      component = (
        <MyTouchableOpacity
          style={[
            date.dateString === selectedDate ? styles.wrapDateSelected : styles.wrapDate,
            { backgroundColor: colorBackGround }
          ]}
          onPress={() => handleSelectDate(date)}>
          <MyText style={[styles.textDate, { color: colorText }]}>{date.day}</MyText>
        </MyTouchableOpacity>
      );
    } else {
      // Trường hợp mặc định (nếu có)
      component = (
        <MyTouchableOpacity
          style={[
            date.dateString === selectedDate ? styles.wrapDateSelected : styles.wrapDate,
            { backgroundColor: Colors.semantics_SmokyGrey }
          ]}
          onPress={() => handleSelectDate(date)}>
          <MyText style={styles.textDate}>{date.day}</MyText>
        </MyTouchableOpacity>
      );
    }
    return component;
  };

  return (
    <Modal
      onBackdropPress={() => onClose()}
      visible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modalComponent}>
      <MySafeAreaView style={styles.container}>
        <MyView style={styles.line} />
        <MyText style={styles.textTitle}>{t('checkinCheckoutDetail')}</MyText>
        <MyScrollView style={styles.content}>
          <Calendar
            firstDay={1}
            current={valueMonthYear}
            onMonthChange={changeMonth}
            dayComponent={({ date, state }) => renderComponentDay(date, state)}
            style={styles.calendar}

          />    
            {Array.isArray(data?.BangChamCong)
              ? data.BangChamCong.filter(item => item.Ngay === selectedDate).map((item, index) => (
                <MyView style={styles.boxDetailCheck}>
                <MyView key={index}>
                  {renderDetail(item)}
                </MyView>
                </MyView>
              ))
              : null}
        </MyScrollView>
      </MySafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalComponent: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
    backgroundColor: Colors.backgroundShowPopup,
  },
  container: {
    flex: 0.7,
    backgroundColor: Colors.background,
    borderStartStartRadius: parseSizeWidth(24),
    borderStartEndRadius: parseSizeWidth(24),
  },
  line: {
    marginVertical: Sizes.spacing_4_Height,
    width: parseSizeWidth(45),
    height: parseSizeHeight(5),
    borderRadius: 100,
    backgroundColor: Colors.neutrals_300,
    alignSelf: 'center',
  },
  textTitle: {
    fontFamily: FontStyles.InterRegular,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: Sizes.text_h5,
    color: Colors.semantics_Black,
  },
  content: {
    flex: 1,
    paddingTop: parseSizeWidth(10),
    paddingHorizontal: parseSizeWidth(24),
  },
  calendar: {
    backgroundColor: Colors.neutrals_100,
    borderWidth: 2,
    borderColor: Colors.neutrals_300,
    borderRadius: Sizes.radius,
  },
  wrapDate: {
    height: 32,
    width: 32,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: Colors.neutrals_50,
    borderColor: Colors.neutrals_300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapDateSelected: {
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.danger,
    backgroundColor: Colors.neutrals_50,
    borderRadius: 10,
  },
  textDate: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_700,
    textAlign: 'center',
  },
  textDateDisabled: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_700,
    textAlign: 'center',
  },

  testDateSelected: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_700,
    textAlign: 'center',
  },

  boxDetailCheck: {
    flex:1,
    marginTop: parseSizeHeight(24),
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Colors.neutrals_300,
    backgroundColor: Colors.neutrals_50,
    paddingVertical: parseSizeHeight(10),
    paddingHorizontal: parseSizeHeight(24),
  },
  wrapItemDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: parseSizeHeight(6),
  },



  textTitleItem: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_700,
    textAlign: 'center',
  },
  textValueItem: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.semantics_Black,
    textAlign: 'center',
  },



});
