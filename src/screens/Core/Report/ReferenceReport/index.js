import {TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import styles from './styles';
import Data from '~data/dataReport';
import Icon from '~components/IconXML';
import {MyText, MyView, MyAvoidView} from '~components/MyStyles';
import Button from '~buttons/MyButton';
import ModalItemSelector from '~modals/ModalItemSelector';
import YearQuarterPicker from '~inputs/InputPicker/YearQuarterPicker';

const Index = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {dataTime, dataTypeReport} = Data();

  //QT tháng trong quý, NT tháng trong năm, NQ quý trong năm
  const [time, setTime] = useState(dataTime[0]);
  //KH: Khách hàng, DT: Doanh thu, DH: Đơn hàng, SP: Sản phẩm đã bán, CP: Chi phí
  const [typeReport, setTypeReport] = useState(dataTypeReport[0]);
  const [modalItemSelector, setModalItemSelector] = useState({
    check: false,
    type: '',
  });
  const [compareWith, setCompareWith] = useState({});
  const currentYear = moment().year();
  const currentQuarter = Math.ceil(moment().month() / 3); // Lấy quý hiện tại (từ tháng hiện tại)

  const handleGetCompare = item => {
    setCompareWith(prevState => {
      if (item?.type === 'source') {
        return {...prevState, source: {value: item?.value}};
      } else if (item?.type === 'compare') {
        return {...prevState, compare: {value: item?.value}};
      }
      return prevState;
    });
  };

  const handleViewReport = () => {
    // NT: nam => thang: nguon: NT2023 - dich: NT2024: 12 tháng trong năm 2023 so sánh với 12 tháng trong năm 20212 (1 năm bao gồm 12 tháng)
    // NQ: nam => quy: nguon: NQ2023 - dich: NQ2024: 4 quý trong năm 2023 so sánh với 4 quý trong năm 2024 (1 năm bao gồm 4 quý)
    // QT: quy => thang: nguon: QT202301 - dich: QT202402: quý 1 năm 2023 so sánh với quý 2 năm 2024 (1 quý bao gồm 3 tháng: tháng thứ X)

    const nguon = `${time?.key}${compareWith?.source?.value}`;
    const dich = `${time?.key}${compareWith?.compare?.value}`;

    navigation.navigate('bieu-do-so-sanh', {
      nguon: nguon,
      dich: dich,
      loaiSoLieu: typeReport.key,
    });
  };

  // Xử lý khi có thay đổi typeReport hoặc các giá trị khác (nếu cần)
  useEffect(() => {
    if (time.name === 'monthsOfQuarter') {
      setCompareWith({
        source: {value: `${currentYear}0${currentQuarter}`},
        compare: {value: `${currentYear - 1}0${currentQuarter}`},
      });
    } else {
      setCompareWith({
        source: {value: `${currentYear}`},
        compare: {value: `${currentYear - 1}`},
      });
    }
  }, [time]);

  return (
    <MyAvoidView>
      <MyView style={styles.body}>
        <MyView style={styles.wrapCard}>
          <MyText style={styles.txtLabelCard}>{t('time')}</MyText>
          <TouchableOpacity
            onPress={() => setModalItemSelector({check: true, type: 'time'})}
            style={styles.card}>
            <Icon name="calendar" width="24" height="24" />
            <MyText style={styles.txtCard}>{time?.label}</MyText>
            <Icon name="rightArrow" width="18" height="18" />
          </TouchableOpacity>
        </MyView>
        <MyView style={styles.wrapCard}>
          <MyText style={styles.txtLabelCard}>{t('dataType')}</MyText>
          <TouchableOpacity
            onPress={() =>
              setModalItemSelector({check: true, type: 'typeReport'})
            }
            style={styles.card}>
            <Icon name={typeReport?.nameIcon} width="24" height="24" />
            <MyText style={styles.txtCard}>{typeReport?.title}</MyText>
            <Icon name="rightArrow" width="18" height="18" />
          </TouchableOpacity>
        </MyView>
        <YearQuarterPicker
          labelName1={t('source')}
          labelName2={t('compareWith')}
          styleContainer={styles.select}
          minYear={2022}
          maxYear={2030}
          typePicker={time.name !== 'monthsOfQuarter' && 'year'}
          getValue={handleGetCompare}
          init={compareWith}
        />
      </MyView>
      <MyView style={styles.button}>
        <Button
          size={'primary'}
          title={t('viewTheReport')}
          onPress={handleViewReport}
        />
      </MyView>

      <ModalItemSelector
        isVisible={modalItemSelector.check}
        onClose={() => setModalItemSelector(false)}
        data={modalItemSelector.type === 'time' ? dataTime : dataTypeReport}
        getItem={modalItemSelector.type === 'time' ? setTime : setTypeReport}
      />
    </MyAvoidView>
  );
};

export default Index;
