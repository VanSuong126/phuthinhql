import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import HeaderToolBar from '~components/headers/HeaderToolBar';
import styles from './styles';
import InputSearch from '~inputs/InputSearch';
import {
  MySafeAreaView,
  MyView,
  MyText,
  MyTouchableOpacity,
} from '~components/MyStyles';
import FlatList from '~components/FlatList';
import Bottom from '~components/Bottom';
import fetchData from '~providers';
import TabControl from '~components/TabControl';
import Icon from '~components/IconXML';
import {Colors} from '~theme';
import ModalItemSelector from '~modals/ModalItemSelector';
import ModalCalendar from '~modals/ModalCalendar';
import Toast from 'react-native-toast-message';
import ModalNotifi from '~modals/ModalNotifi';

const Index = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [dataSampleNews, setDataSampleNews] = useState([]);
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [dataNotifiError, setDataNotifiError] = useState([]);

  const [modal, setModal] = useState(false);
  const [modalCalendar, setModalCalendar] = useState(false);
  const [modalNotifi, setModalNotifi] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sampleNews, setSampleNews] = useState({});
  const [stringSearch, setStringSearch] = useState('');
  const [tabSelected, setTabSelected] = useState(0);
  const [selectedList, setSelectedList] = useState([]);

  const tabs = [t('notSent'), t('sent')];

  const handleTabPress = index => {
    setTabSelected(index);
    setSampleNews({});
    setSelectedList([]);
    setData([]);
  };
  const handleGetDates = (fromDate, toDate) => {
    setFromDate(fromDate), setToDate(toDate), setSelectedList([]), setData([]);
  };
  const ClickCheckBox = val => {
    if (selectedList.some(item => item.IDDonHang === val.IDDonHang)) {
      setSelectedList(prevData =>
        prevData.filter(i => i.IDDonHang !== val.IDDonHang),
      );
    } else {
      setSelectedList(prevData => [...prevData, val]);
    }
  };
  const handleSearch = () => {
    if (stringSearch !== '') {
      const filterdata = data.filter(item =>
        Object.values(item).some(
          value =>
            value &&
            value.toString().toLowerCase().includes(stringSearch.toLowerCase()),
        ),
      );
      if (filterdata.length === 0) {
        Toast.show({
          type: 'error',
          props: {message: t('notFoundCustomer')},
        });
      }
      setDataSearch(filterdata);
    } else {
      setDataSearch([]);
    }
  };

  const handleSendZaloOA = () => {
    const params = {
      loai: sampleNews?.id,
      template_id: sampleNews.template_id,
      listdonhang: selectedList,
    };
    fetchData(dispatch, 'sendMessageZaloOAMulti', params, data => {
      if (data.data) {
        setDataNotifiError(data.data);
      }
      if (data.message) {
        setDataNotifiError(data.message);
      }
      setModalNotifi(true);
    });
  };
  const handleSampleNews = item => {
    if (fromDate && toDate) {
      setSampleNews(item);
      fetchListOrderZaloOA(item?.id);
    } else {
      Toast.show({
        type: 'error',
        props: {message: t('invalidDate')},
      });
    }
  };
  const fetchListOrderZaloOA = maloaitinzalo => {
    const params = {
      // đã gửi 14, chưa gửi 15
      loai: tabSelected === 1 ? 14 : 15,
      maloaitinzalo: maloaitinzalo,
      tungay: fromDate,
      denngay: toDate,
    };

    fetchData(dispatch, 'getListOrderZaloOA', params, res => {
      if (res.data.length === 0) {
        Toast.show({
          type: 'error',
          props: {message: t('nodata')},
        });
      } else {
        setData(res.data);
      }
    });
  };

  const fetchListTempalteZaloOA = () => {
    fetchData(dispatch, 'getListTempalteZaloOA', {loai: 2}, data => {
      setDataSampleNews(data.data);
    });
  };

  useEffect(() => {
    fetchListTempalteZaloOA();
  }, []);
  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar
        nameHeaderTitle={t('chosseCustomner')}
        iconRight="calendar"
        onPressRight={() => setModalCalendar(true)}
      />

      <MyView style={styles.body}>
        <MyView style={styles.tabControl}>
          <TabControl
            tabs={tabs}
            selectedIndex={tabSelected}
            onTabPress={handleTabPress}
          />
        </MyView>
        <InputSearch
          placeholder={t('searchinthelist')}
          value={stringSearch}
          getString={value => setStringSearch(value)}
          onSearch={handleSearch}
          type={true}
        />
        <MyTouchableOpacity
          onPress={() => setModal(true)}
          style={styles.newsSample}>
          <Icon
            color={Colors.semantics_Black}
            name="bill"
            width="24"
            height="24"
          />
          <MyText style={styles.txtNewsSample}>
            {Object.keys(sampleNews).length === 0
              ? t('selectATemplate')
              : sampleNews.label}
          </MyText>
          <Icon
            color={Colors.semantics_Black}
            name="rightArrow"
            width="24"
            height="24"
          />
        </MyTouchableOpacity>
        <FlatList
          data={dataSearch.length > 0 ? dataSearch : data}
          loading={false}
          fetching={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyleProp={styles.list}
          type="ZaloOaList"
          onPress={ClickCheckBox}
        />
      </MyView>
      {selectedList.length > 0 && (
        <Bottom
          sticky={false}
          titleBtn1={t('sendATemplate')}
          onPress1={handleSendZaloOA}
        />
      )}

      <ModalItemSelector
        isVisible={modal}
        onClose={() => setModal(false)}
        data={dataSampleNews}
        getItem={item => handleSampleNews(item)}
      />
      <ModalCalendar
        isVisible={modalCalendar}
        onClose={() => setModalCalendar(false)}
        onSelectDates={(fromDate, toDate) => handleGetDates(fromDate, toDate)}
        type="DateArr"
        defaultFromDate={fromDate}
        defaultToDate={toDate}
      />
      <ModalNotifi
        isVisible={modalNotifi}
        onClose={() => setModalNotifi(false)}
        data={dataNotifiError}
        TextTitle={t('notification')}
      />
    </MySafeAreaView>
  );
};

export default Index;
