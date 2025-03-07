import {TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {useSelector, useDispatch} from 'react-redux';

import {commonSelectors} from '~redux/reducers';
import styles from './styles';
import Data from '~data/dataReport';
import Icon from '~components/IconXML';
import ChosseTypeDate from '~inputs/InputPicker/ChosseTypeDate';
import DatePicker from '~inputs/InputPicker/DatePicker';
import DatePickerArr from '~inputs/InputPicker/DatePickerArr';
import Branch from '~inputs/InputPicker/Branch';
import ModalItemSelector from '~modals/ModalItemSelector';
import FilterOption from '~components/FilterOption';
import Button from '~buttons/MyButton';
import {MyText, MyView, MyAvoidView} from '~components/MyStyles';
import {Colors} from '~theme';
import LocalDB from '~data/asyncStorage';
import fetchData from '~providers';

const Index = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {dataReport, dataChosseTime} = Data();
  const dispatch = useDispatch();
  //Chọn loại Report
  const [modalItemSelector, setModalItemSelector] = useState(false);
  const [card, setCard] = useState(dataReport[0]);
  //nút toggle
  const [chooseType, setChooseType] = useState(false);

  const [fromDate, setFromDate] = useState(moment().format('YYYY-MM-DD'));
  const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));

  const [branch, setBranch] = useState([]);
  //Chọn ngày,tháng,năm
  const [type, setType] = useState(dataChosseTime[0]);
  const [modalType, setModalType] = useState(false);

  const [user, setUser] = useState();

  const dataStories = useSelector(commonSelectors.selectorListStore) || [];

  // Fetch the user data from LocalDB and set the user state
  const handleGetDate = (value, type) => {
    if (type === '1' && value === '') {
      value = moment().format('YYYY-MM');
    } else if (type === '2' && value === '') {
      value = moment().format('YYYY');
    }

    if (value) {
      if (type === '1') {
        const startOfMonth = moment(value, 'YYYY-MM').startOf('month');
        const endOfMonth = moment(value, 'YYYY-MM').endOf('month');
        setFromDate(startOfMonth.format('YYYY-MM-DD'));
        setToDate(endOfMonth.format('YYYY-MM-DD'));
      } else if (type === '2') {
        const startOfYear = moment(value, 'YYYY').startOf('year');
        const endOfYear = moment(value, 'YYYY').endOf('year');
        setFromDate(startOfYear.format('YYYY-MM-DD'));
        setToDate(endOfYear.format('YYYY-MM-DD'));
      } else {
        setFromDate(value);
        setToDate(value);
      }
    } else {
      setFromDate('');
      setToDate('');
    }
  };
  const handleTogge = isOn => {
    setChooseType(isOn), setType(dataChosseTime[0]);
    setFromDate(moment().format('YYYY-MM-DD'));
    setToDate(moment().format('YYYY-MM-DD'));
  };

  //check từ ngày đến ngày không được quá 3 tháng
  const checkDateArr = (date1, date2) => {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    // Tính khoảng cách giữa hai ngày tính bằng tháng
    const yearDifference = endDate.getFullYear() - startDate.getFullYear();
    const monthDifference = endDate.getMonth() - startDate.getMonth();
    const totalMonthsDifference = yearDifference * 12 + monthDifference;

    if (Math.abs(totalMonthsDifference) > 3) {
      return false;
    } else {
      return true;
    }
  };
  //click vào Xem báo cáo
  const handleButton = screen => {
    const dataBranch = branch.length === 0 ? dataStories : branch;
    const formatDataStories = dataBranch
      .filter(item => item?.value !== 'all')
      .map(item => item.IDCuaHang)
      .join(', ');

    if (checkDateArr(toDate, fromDate) === false && chooseType === true) {
      Toast.show({
        type: 'warning',
        props: {message: t('warningBetween')},
      });
      return;
    }

    if (fromDate !== '' && toDate !== '') {
      const checkType =
        type?.value == '1' ? 'month' : type?.value == '2' ? 'year' : 'date';
      navigation.navigate(screen, {
        checkType: checkType,
        typeReport: card,
        fromDate: fromDate,
        toDate: toDate,
        branch: formatDataStories,
        chooseType: chooseType,
      });
    } else {
      Toast.show({
        type: 'error',
        props: {message: t('emptyTimeViewReport')},
      });
    }
  };

  const fetchUserData = async () => {
    const data = await LocalDB.getUserData();
    const vaitro = data?.UserInfo?.IDVaiTro;
    setUser(vaitro);
  };

  useEffect(() => {
    if (user == null) {
      fetchUserData();
    }
  }, []);
  useEffect(() => {
    if (dataStories.length === 0) {
      fetchData(dispatch, 'getListStore');
    }
  }, []);
  const renderType = () => {
    if (chooseType) {
      return (
        <MyView style={styles.chooseTime}>
          <DatePickerArr
            labelName={`${t('from')} - ${t('to')}`}
            styleInput={styles.input}
            styleText={styles.txtBranch}
            styleTextYear={styles.txtBranch}
            getFromDate={val => setFromDate(val)}
            getToDate={val => setToDate(val)}
            styleFomat={styles.txtBranch}
          />
        </MyView>
      );
    } else {
      return (
        <MyView style={styles.chooseTime}>
          <ChosseTypeDate
            labelName={t('selectTime')}
            value={type?.label}
            styleText={styles.txtBranch}
            styleContainer={styles.inputFiled}
            onPress={() => setModalType(true)}
          />
          <DatePicker
            styleContainer={styles.inputFiled}
            value={fromDate}
            styleText={
              type?.value === '0'
                ? styles.txtInputDate
                : styles.txtInputMonthandYear
            }
            getValue={val => handleGetDate(val, type?.value)}
            typeDate={type?.value}
            minDate="2000-01-01"
            maxDate="2026-01-01"
          />
        </MyView>
      );
    }
  };

  return (
    <MyAvoidView>
      <MyView style={styles.body}>
        <TouchableOpacity
          onPress={() => setModalItemSelector(true)}
          style={styles.card}>
          <Icon
            name={card?.nameIcon || dataReport[0]?.nameIcon}
            width="24"
            height="24"
          />
          <MyText style={styles.txtCard}>
            {card?.title || dataReport[0]?.title}
          </MyText>
          <Icon name="rightArrow" width="18" height="18" />
        </TouchableOpacity>
        {(user === 1 || user === 6) && (
          <Branch
            labelName={t('selectBranch')}
            onChangeValue={item => setBranch(item)}
            styleContainer={styles.branch}
            styleBoxArrowDown={styles.inputPickerBranch}
            data={dataStories}
            isSelected={dataStories.filter(store => store.value === 'all')}
          />
        )}
        <MyView style={styles.chooseType}>
          <MyText style={styles.txtChooseType}>{t('viewByTime')}</MyText>
          <ToggleSwitch
            isOn={chooseType}
            offColor={Colors.neutral_50}
            onToggle={isOn => handleTogge(isOn)}
            trackOnStyle={styles.onToggle}
            trackOffStyle={styles.offToggle}
            thumbOnStyle={styles.thumbStyle}
            thumbOffStyle={styles.thumbStyle}
          />
        </MyView>
        {renderType()}
        <MyView style={styles.button}>
          <Button
            size={'primary'}
            title={t('viewOverReport')}
            onPress={() => handleButton('bao-cao-tong-quan')}
          />
          <Button
            size={'primary'}
            type={2}
            title={t('viewDetailReport')}
            onPress={() => handleButton('bao-cao-chi-tiet')}
          />
        </MyView>
        <ModalItemSelector
          isVisible={modalItemSelector}
          onClose={() => setModalItemSelector(false)}
          data={dataReport}
          getItem={item => setCard(item)}
          stylesModal={styles.modalListCardStyle}
        />
        <FilterOption
          isVisible={modalType}
          onClose={() => setModalType(false)}
          data={dataChosseTime}
          onListOption={item => (
            setType(item[0]), handleGetDate('', item[0].value)
          )}
          limitSelect={1}
          stylesModal={styles.modalTypestyles}
        />
      </MyView>
    </MyAvoidView>
  );
};

export default Index;
