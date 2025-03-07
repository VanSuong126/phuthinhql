import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import moment from 'moment';

import { MyView, MySafeAreaView } from '~components/MyStyles';
import InputSearch from '~inputs/InputSearch';
import FlatList from '~components/FlatList';
import fetchData from '~providers';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import ModalCalendar from '~modals/ModalCalendar';
import {PrintShipLabel,PrintInvoice} from '~helper/print';

import {
  Sizes,
  parseSizeWidth,
} from '~theme';
import ModalItemSelector from '~modals/ModalItemSelector';


const Index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [stringSearch, setStringSearch] = useState('');
  const [visibleModalCalendar, setVisibleModalCalendar] = useState(false);
  const [listOrderOrigin, setListOrderOrigin] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [modalItemSelector, setModalItemSelector] = useState(false);
  const [orderSelectPrint, setOrderSelectPrint] = useState();
  const [dataType, setDataType] = useState([]);

  const [loading, setLoading] = useState(false);


  const dataTypePrint =[
    {value:1, label: "In phiếu mua hàng" , nameIcon: 'print'},
    {value:2, label: "In nhãn vận chuyển" , nameIcon: 'print'},
  ]


  const handleGetDateFromCalendar = (fromDate, toDate) => {
    setLoading(true);
    const params = {
      loai: 4,
      tungay: moment(fromDate).format('YYYY-MM-DD'),
      denngay: moment(toDate).format('YYYY-MM-DD'),
      chuoitimkiem: stringSearch,
    }
    fetchData(dispatch, 'findOrder', params, (res) => {
      if (res?.success === true) {
        setListOrder(res.data);
        setListOrderOrigin(res.data);
        setLoading(false);
      }
      else {
        Toast.show({
          type: 'error',
          props: { message: res?.message || t('noData') },
        });
        setLoading(false);
      }
    });
  };

  const handleFind = () => {
    setLoading(true);
    if (listOrderOrigin.length > 0 && stringSearch) {
      const filterdata = listOrderOrigin.filter(item =>
        Object.values(item).some(
          value =>
            value &&
            value.toString().toLowerCase().includes(stringSearch.toLowerCase()),
        ),
      );
      setListOrder(filterdata);
      setLoading(false);
    }
    else {
      setListOrder(listOrderOrigin);
      setLoading(false);
    }

  }

  const handleOnPress = data => {
    switch (data?.action) {
      case 'printInvoice':
        printInvoice(data?.orderCode);
        break;
      case 'printLabel':
        printLabel(data?.orderCode);
        break;
      default:
        console.log('Unknown action');
    }
  };
  
// get data Invoice
  const printInvoice = orderCode => {
    const params = {
      loai: 1,
      madonhang: orderCode,
    };
    fetchData(dispatch, 'getDetailOrder', params, res => {
      if (res?.success === true) {
        PrintInvoice({data: res?.data});
      } else {
        Toast.show({
          type: 'error',
          props: {message: t('dataInvoiceError')},
        });
      }
    });
  };
  // get data label
  const printLabel = orderCode => {
    const params = {
      madonhang: orderCode,
    };
    fetchData(dispatch, 'printLabel', params, res => {
      if (res?.success === true) {
        const dataOrder = {
          NguoiNhan: res?.data?.HoTenNguoiNhan,
          DienThoaiKhachHang: res?.data?.DienThoaiNguoiNhan,
          DiaChiNhan: res?.data?.DiaChiNhan,
        };
        PrintShipLabel({data: dataOrder, shipCode: res?.data?.MaVanDon});
      } else {
        Toast.show({
          type: 'error',
          props: {message: t('dataLabelError')},
        });
      }
    });
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar
        nameHeaderTitle={t('printLabel')}
        iconRight="calendar"
        onPressRight={() => setVisibleModalCalendar(true)}
      />
      <InputSearch
        value={stringSearch}
        type="Secondary"
        styleInputSearch={styles.seacrch}
        placeholder={t('searchOrder')}
        getString={value => setStringSearch(value)}
        onSearch={() => handleFind()}
      />
      <MyView style={styles.content}>
        <FlatList
          data={listOrder || []}
          grid={false}
          loading={false}
          fetching={loading}
          type="listOrderPrint"
          onPress={item => handleOnPress(item)}
        />
      </MyView>
      <ModalCalendar
        isVisible={visibleModalCalendar}
        type="DateArr"
        isWithinRange={true}
        onClose={() => setVisibleModalCalendar(false)}
        onSelectDates={(fromDate, toDate) =>
          handleGetDateFromCalendar(fromDate, toDate)
        }
      />
      <ModalItemSelector
        isVisible={modalItemSelector}
        onClose={() => setModalItemSelector(false)}
        data={dataType}
        getItem={res => {res?.value ===1 ? printInvoice() : printLabel()}}
      />
    </MySafeAreaView>
  );
};

export default Index;


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    flex: 1,
  },
  seacrch: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: parseSizeWidth(10),
  },
  content: {
    flex: 1,
    paddingHorizontal: Sizes.paddingWidth,
    marginTop: Sizes.marginHeight,
  },
});
