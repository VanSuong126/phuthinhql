import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

import HeaderToolBar from '~components/headers/HeaderToolBar';
import styles from './styles';
import InputSearch from '~inputs/InputSearch';
import {MySafeAreaView, MyView, MyText} from '~components/MyStyles';
import FlatList from '~components/FlatList';
import Bottom from '~components/Bottom';
import fetchData from '~providers';
import ModalFilter from '~modals/ModalFilter';
import Toast from 'react-native-toast-message';

const dataFilterCustomer = t => [
  {
    id: 1,
    title: t('birthday'),
    name: 'birthday',
    data: [
      {id: 1, label: t('filterMonth'), type: 'month'},
      {id: 2, label: t('filterWeek'), type: 'isoWeek'},
      {id: 3, label: t('filterToday'), type: 'toDay'},
    ],
  },
  {
    id: 2,
    title: t('revenue'),
    name: 'revenue',
    data: [
      {id: 1, label: `< 5 ${t('million')}`, type: 'smaller', value: 5},
      {id: 2, label: `5 - 10 ${t('million')}`, type: 'between', value: [5, 10]},
      {id: 3, label: `> 10 ${t('million')}`, type: 'bigger', value: 10},
      {id: 4, label: `> 20 ${t('million')}`, type: 'bigger', value: 20},
      {id: 5, label: `> 50 ${t('million')}`, type: 'bigger', value: 50},
      {id: 6, label: `> 100 ${t('million')}`, type: 'bigger', value: 100},
    ],
  },
  {
    id: 3,
    title: t('order'),
    name: 'order',
    data: [
      {id: 1, label: `< 5 ${t('filterOrders')}`, type: 'smaller', value: 5},
      {
        id: 2,
        label: `5 - 10 ${t('filterOrders')}`,
        type: 'between',
        value: [5, 10],
      },
      {id: 3, label: `> 10 ${t('filterOrders')}`, type: 'bigger', value: 10},
      {id: 4, label: `> 20 ${t('filterOrders')}`, type: 'bigger', value: 20},
      {id: 5, label: `> 50 ${t('filterOrders')}`, type: 'bigger', value: 50},
      {id: 6, label: `> 100 ${t('filterOrders')}`, type: 'bigger', value: 100},
    ],
  },
];

const Index = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const {screenBack} = route.params || '';
  const [modalFilter, setModalFilter] = useState(false);
  const [stringSearch, setStringSearch] = useState('');
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [selectedIDKhachHang, setSelectedIDKhachHang] = useState([]);
  const [checkFilter, setCheckFilter] = useState(false);

  // sắp xếp khách hàng theo ngày sinh nhật gần nhất đến xa nhất
  const dataSort = useMemo(() => {
    const today = moment().startOf('day');

    return data
      .map(customer => {
        const birthday = moment(customer.ngaySinh).startOf('day');
        const currentYear = today.year();
        let birthdayThisYear = birthday.year(currentYear);

        if (birthdayThisYear.isBefore(today)) {
          birthdayThisYear.add(1, 'year');
        }
        const differenceInDays = birthdayThisYear.diff(today, 'days');
        return {...customer, soNgayToiSinhNhat: differenceInDays};
      })
      .sort((a, b) => a.soNgayToiSinhNhat - b.soNgayToiSinhNhat);
  }, [data]);

  // lấy id khách hàng khi click vào box
  const handleGetItem = item => {
    const idKhachHang = item.idKhachHang;

    if (selectedIDKhachHang.some(selected => selected === idKhachHang)) {
      setSelectedIDKhachHang(prev =>
        prev.filter(selected => selected !== idKhachHang),
      );
    } else {
      setSelectedIDKhachHang(prev => [...prev, idKhachHang]);
    }
  };

  const handleFilter = item => {
    let filteredData = [...dataSort];
    let birthday = null;
    let revenue = null;
    let order = null;

    item.forEach(filterItem => {
      if (filterItem.groupName === 'birthday') {
        birthday = {...filterItem};
      }
      if (filterItem.groupName === 'revenue') {
        revenue = {...filterItem};
      }
      if (filterItem.groupName === 'order') {
        order = {...filterItem};
      }
    });

    // so sánh theo ngày tháng sinh
    if (birthday) {
      const today = moment().format('MM-DD');
      if (birthday.type === 'toDay') {
        filteredData = filteredData.filter(customer => {
          const birthdayDate = moment(customer.ngaySinh).format('MM-DD');
          return today === birthdayDate;
        });
      } else if (birthday.type) {
        const start = moment().format('MM-DD');
        const end = moment().endOf(birthday.type).format('MM-DD');

        filteredData = filteredData.filter(customer => {
          const birthdayDate = moment(customer.ngaySinh).format('MM-DD');
          return start <= birthdayDate && birthdayDate <= end;
        });
      }
    }

    //so sánh doanh thu
    if (revenue) {
      const multiplier = 1000000;
      let condition;
      if (revenue.type === 'smaller') {
        condition = customer => customer.tongTien < revenue.value * multiplier;
      } else if (revenue.type === 'bigger') {
        condition = customer => customer.tongTien > revenue.value * multiplier;
      } else if (revenue.type === 'between') {
        const [minValue, maxValue] = revenue.value.map(val => val * multiplier);
        condition = customer =>
          customer.tongTien >= minValue && customer.tongTien <= maxValue;
      }

      if (condition) {
        filteredData = filteredData.filter(condition);
      }
    }

    //so sánh đơn hàng
    if (order) {
      let condition;
      if (order.type === 'smaller') {
        condition = customer => customer.tongSoDonHang < order.value;
      } else if (order.type === 'bigger') {
        condition = customer => customer.tongSoDonHang > order.value;
      } else if (order.type === 'between') {
        const [minValue, maxValue] = order.value.map(val => val);
        condition = customer =>
          customer.tongSoDonHang >= minValue &&
          customer.tongSoDonHang <= maxValue;
      }
      if (condition) {
        filteredData = filteredData.filter(condition);
      }
    }

    setSelectedIDKhachHang([]);

    if (filteredData.length === 0) {
      setCheckFilter(true);
      setDataSearch(filteredData);
      return;
    }
    setCheckFilter(false);
    setDataSearch(filteredData);
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
      setSelectedIDKhachHang([]);

      if (filterdata.length === 0) {
        setCheckFilter(true);
        setDataSearch(filterdata);
        return;
      }
      setCheckFilter(false);
      setDataSearch(filterdata);
    } else {
      setCheckFilter(false);
      setDataSearch([]);
      setSelectedIDKhachHang([]);
    }
  };

  // click chọn và trả về thông tin khách hàng đã chọn
  const handleConfirm = () => {
    if (selectedIDKhachHang.length > 0) {
      const inforCustomer = data.filter(customer =>
        selectedIDKhachHang.includes(customer.idKhachHang),
      );
      navigation.navigate(screenBack, {inforCustomer: inforCustomer});
    }
  };

  // call api khách hàng sử dụng app khách hàng
  const fetchDataCustomer = async () => {
    let apiName = '';
    if (screenBack === 'thong-bao-mail') {
      apiName = 'getCustomerHasEmail';
    }
    if (screenBack === 'tao-thong-bao') {
      apiName = 'getReportRevenueCustomerUsed';
    }
    if (apiName !== '') {
      fetchData(dispatch, apiName, {}, data => {
        if (data?.success) {
          setData(data?.data);
        } else {
          Toast.show({
            type: 'success',
            props: {message: t('timeOut')},
          });
        }
      });
    } else {
      Toast.show({
        type: 'success',
        props: {message: t('timeOut')},
      });
    }
  };

  useEffect(() => {
    fetchDataCustomer();
  }, []);

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar
        nameHeaderTitle={t('chosseCustomner')}
        iconRight="filter"
        onPressRight={() => setModalFilter(true)}
      />
      <InputSearch
        placeholder={t('searchinthelist')}
        value={stringSearch}
        getString={value => setStringSearch(value)}
        onSearch={handleSearch}
        type={true}
      />
      <MyView style={styles.body}>
        <FlatList
          data={
            dataSearch.length > 0 || (dataSearch.length === 0 && checkFilter)
              ? dataSearch
              : dataSort
          }
          loading={false}
          fetching={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyleProp={styles.list}
          type="listCustomer"
          onPress={handleGetItem}
          isSelected={selectedIDKhachHang}
        />
      </MyView>
      <Bottom
        sticky={false}
        titleBtn1={t('deselectAll')}
        titleBtn2={t('select')}
        onPress1={() => setSelectedIDKhachHang([])}
        onPress2={() => handleConfirm()}
        typeBtn2={selectedIDKhachHang.length === 0 && 2}
      />
      <ModalFilter
        isVisible={modalFilter}
        onClose={() => setModalFilter(false)}
        filter={handleFilter}
        data={dataFilterCustomer(t)}
      />
    </MySafeAreaView>
  );
};

export default Index;
