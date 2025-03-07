import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { StyleSheet } from 'react-native';

import HeaderToolBar from '~components/headers/HeaderToolBar';
import InputSearch from '~components/inputs/InputSearch';

import FlatList from '~components/FlatList';
import { MyView, MySafeAreaView } from '~components/MyStyles';
import { Colors, Sizes, parseSizeHeight } from '~theme';
import fetchData from '~providers';
import ModalTimeSheet from '~components/modals/ModalTimeSheet';
import MonthYearPicker from '~components/MonthYearPicker';

export default Index = props => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  // init state
  const [dataOrigin, setDataOrigin] = useState([]);
  const [data, setData] = useState();
  const [stringSearch, setStringSearch] = useState('');
  const [modalDate, setModalDate] = useState(false);
  const [visibleTimeSheet, setVisibleTimeSheet] = useState(false);
  const [idUserView, setIdUserView] = useState();

  const [valueMonthYear, setValueMonthYear] = useState(
    props?.route?.params == null
      ? moment(new Date()).format('YYYY-MM')
      : props?.route?.params.valueMonthYear,
  );
  // get all Buyer when load first
  useEffect(() => {
    getStatementChecks();
  }, [valueMonthYear]);

  const getStatementChecks = () => {
    const [year, month] = valueMonthYear.split('-');

    const params = {
      thang: month,
      nam: year,
    }
    fetchData(dispatch, "getStatementChecks", params, (res) => {
      if (res.success === true) {
        setDataOrigin(res?.data);
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
  const findStaff = async () => {
    if (stringSearch !== '') {
      const dataFind =
        dataOrigin &&
        dataOrigin?.filter(item => {
          const searchTerm = stringSearch.toLowerCase();
          return item?.HoTen.toLowerCase().includes(searchTerm);
        });
      setData(dataFind);
    } else {
      setData(dataOrigin);
    }
  };

  const handleSelectStaff = data => {
    setIdUserView(data?.IDNguoiDung);
    setVisibleTimeSheet(true);
  }

  const handleGetMonthYear  =value => {
    setValueMonthYear(value);
  }

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('historyCheckin')}
       iconRight="calendar"
       onPressRight={() => setModalDate(true)}
       />
      <InputSearch
        value={stringSearch}
        placeholder={t('findStaff')}
        getString={text => setStringSearch(text)}
        onSearch={() => findStaff()}
      />
      <MyView style={styles.content}>
        <FlatList
          data={data}
          loading={false}
          fetching={false}
          type="historyCheckin"
          onPress={data => handleSelectStaff(data)}
        />
      </MyView>
      <ModalTimeSheet
        isVisible={visibleTimeSheet}
        onClose={() => setVisibleTimeSheet(false)}
        idnguoidung={idUserView}
        valueMonthYear={valueMonthYear}
      />
      <MonthYearPicker
        isVisible={modalDate}
        onClose={() => setModalDate(false)}
        typeDate={1}
        minYear={'2023'}
        maxYear={'2024'}
        getMonthYear={item => handleGetMonthYear(item)}
      />
    </MySafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginVertical: parseSizeHeight(16),
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: Sizes.border,
    paddingVertical: Sizes.padding / 2,
    marginVertical: Sizes.margin / 2,
  },
  wrapInfo: {
    flex: 0.7,
  },
});
