import React, {useState, useMemo, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-toast-message';

import {reportSelectors} from '~redux/reducers';
import styles from './styles';
import {MyView, MyText, MySafeAreaView} from '~components/MyStyles';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import SortByTop from '~components/SortByTop';
import BoxArrowDown from '~inputs/InputPicker/BoxArrowDown';
import InputSearch from '~inputs/InputSearch';
import Bottom from '~components/Bottom';
import RenderListReport from './RenderListReport';
import ModalItemSelector from '~modals/ModalItemSelector';
import Data from '~data/dataReport';
import FilterOption from '~components/FilterOption';
import {parseSizeHeight} from '~theme';
import DataSort from './DataSort';
import fetchData from '~providers';
import {Colors} from '~theme';
import Icon from '~components/IconXML';
import {TouchableOpacity} from 'react-native';
import ModalFilterAdress from '~modals/ModalFilterAdress';
import {handleErrorResponse} from '~helper/utils';

const fomatDate = (fromDate, toDate, checkType) => {
  const startDate = moment(fromDate);
  const enDate = moment(toDate);
  if (checkType === 'year') {
    return startDate.format('YYYY');
  } else if (checkType === 'month') {
    return startDate.format('MM/YYYY');
  } else if (checkType === 'date' && startDate.isSame(enDate, 'day')) {
    // Nếu type là date và fromDate bằng toDate, trả về một giá trị
    return startDate.format('DD/MM/YYYY');
  } else {
    // Trả về chuỗi startDate - enDate cho tất cả các trường hợp khác
    return `${startDate.format('DD/MM/YYYY')} - ${enDate.format('DD/MM/YYYY')}`;
  }
};

const checkSameMonth = (date1, date2) => {
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  const isSameMonth =
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth();

  if (!isSameMonth) {
    return false;
  }
  return true;
};

const isFullMonth = (fromdate, todate) => {
  const startOfMonth = moment(fromdate).startOf('month');
  const endOfMonth = moment(fromdate).endOf('month');

  // Kiểm tra nếu fromdate là ngày đầu tiên của tháng và todate là ngày cuối cùng của tháng
  return (
    moment(fromdate).isSame(startOfMonth, 'day') &&
    moment(todate).isSame(endOfMonth, 'day')
  );
};
const Index = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute();
  const {typeReport, fromDate, toDate, checkType, branch, chooseType} =
    route.params;
  const {
    dataSortRevenue,
    dataSortCost,
    dataSortCustomer,
    dataHightandLowInventory,
    dataHightandLow,
    dataReportOverReport,
    dataSortOrder,
    dataHightandLowCustomerBirthday,
    dataHightandLowCustomerFavorite,
  } = Data();

  const dataSort = useMemo(() => {
    switch (typeReport.name) {
      case 'revenue':
        return dataSortRevenue;
      case 'cost':
        return dataSortCost;
      case 'customer':
        return dataSortCustomer;
      case 'order':
        return dataSortOrder;
      default:
        return [];
    }
  }, [typeReport]);

  const [top, setTop] = useState(10);
  // thay đổi data khi sắp xếp theo top hay từ cao đến thấp
  const [dataChange, setDataChange] = useState([]);
  // check có đang thay đổi không
  const [checkChange, setCheckChange] = useState(false);
  const [stringSearch, setStringSearch] = useState('');
  // sắp xếp theo danh sách
  const [fillterByList, setFillterByList] = useState(dataSort[0]);
  const [modalFilterAdvenced, seModalFilterAdvenced] = useState(false);
  const [filterAdvenced, setFilterAdvenced] = useState({
    country: true,
    district: true,
    provine_citi: true,
    status: true,
  });

  const [modalSortByOrder, setModalSortByOrder] = useState(false);
  const [modalSortReport, setModalSortReport] = useState(false);
  const [modalListCard, setModalListCard] = useState(false);

  const typeIdMap = {
    date: 'dailyChart',
    month: 'monthlyChart',
    year: 'yearChart',
  };

  const dataSortHightandLow = dataHightandLow.map(item => ({
    value: item?.value,
    label:
      typeReport.name === 'cost'
        ? `${t('cost')} (${item.label})`
        : `${t('from')} ${item.label}`,
  }));

  const dataListCard = useMemo(() => {
    const currentCheckType = chooseType ? 'month' : checkType;
    return dataReportOverReport.filter(item => {
      if (item.name === typeReport.name) return true;

      if (typeReport.name !== 'order' && typeReport.name !== 'wareHoue') {
        return item.name === typeIdMap[currentCheckType];
      }
    });
  }, []);

  const dataReport = useSelector(state => {
    switch (typeReport.name) {
      case 'revenue':
        return reportSelectors.setReportDate(state);
      case 'cost':
        return reportSelectors.setReportFeeByDate(state);
      case 'wareHoue':
        return reportSelectors.setReportWareHouseDetailByTop(state);
      case 'customer':
        if (fillterByList.id === 1) {
          return reportSelectors.setReportRevenueByBirthday(state);
        }
        if (fillterByList.id === 2) {
          return reportSelectors.setReportFavoriteProduct(state);
        }
      case 'order':
        if (fillterByList.id === 1) {
          return reportSelectors.setReportOrderTransportByDate(state);
        }
        if (fillterByList.id === 2) {
          return reportSelectors.setReportOrderAdressByDate(state);
        }
      default:
        return [];
    }
  });

  const dataCheck = useMemo(() => {
    const data = Array.isArray(dataReport) ? dataReport : [];
    return data;
  }, [dataReport]);

  //data mặc định chỉ thay đổi khi fillterByList thay đổi
  const dataReportDetails = useMemo(() => {
    if (typeReport.name === 'revenue' || typeReport.name === 'cost') {
      setCheckChange(false);
    }

    const data = DataSort(dataCheck, typeReport.name, fillterByList?.id);
    return data;
  }, [fillterByList, dataCheck]);

  const handleSearch = () => {
    if (stringSearch !== '') {
      const filterdata = dataReportDetails.filter(item =>
        Object.values(item).some(
          value =>
            value &&
            value.toString().toLowerCase().includes(stringSearch.toLowerCase()),
        ),
      );
      setCheckChange(true);
      setDataChange(filterdata);
    } else {
      setCheckChange(false);
    }
  };

  //sắp xếp theo Top
  const handleSortByList = (item = 1) => {
    if (
      typeReport.name === 'wareHoue' ||
      typeReport.name === 'customer' ||
      typeReport.name === 'order' ||
      (typeReport.name === 'customer' && fillterByList.id === 1)
    ) {
      setTop(item * 10);
      setCheckChange(false);
    } else if (item !== null) {
      const dataSortByList = dataReportDetails
        .sort((a, b) => b.tongTien - a.tongTien)
        .slice(0, item * 10);
      setDataChange(dataSortByList);
      setCheckChange(true);
    } else {
      setCheckChange(false);
    }
  };

  // sắp xếp từ theo cao và thấp
  const handleSortHightAndLow = item => {
    let sortdata = checkChange ? [...dataChange] : [...dataReportDetails];

    if (typeReport.name === 'customer') {
      if (fillterByList.id === 1) {
        const sortByDaysUntilBirthday = order => {
          return order === 1
            ? (a, b) => a.soNgayToiSinhNhat - b.soNgayToiSinhNhat
            : (a, b) => b.soNgayToiSinhNhat - a.soNgayToiSinhNhat;
        };
        sortdata.sort(sortByDaysUntilBirthday(item?.value));
      }
      if (fillterByList.id === 2) {
        const sortByFavorite = order => {
          return order === 1
            ? (a, b) => b.soLuongQuanTam - a.soLuongQuanTam
            : (a, b) => a.soLuongQuanTam - b.soLuongQuanTam;
        };
        sortdata.sort(sortByFavorite(item?.value));
      }
    } else if (typeReport.name !== 'wareHoue') {
      const sortByHightAndLow = order => {
        return order === 1
          ? (a, b) => b.tongTien - a.tongTien
          : (a, b) => a.tongTien - b.tongTien;
      };
      sortdata.sort(sortByHightAndLow(item?.value));
    }

    if (typeReport.name === 'wareHoue') {
      switch (item?.value) {
        case 1:
          sortdata.sort((a, b) => b.phanTramTonKho - a.phanTramTonKho);
          break;
        case 2:
          sortdata.sort((a, b) => a.phanTramTonKho - b.phanTramTonKho);
          break;
        case 3:
          sortdata.sort((a, b) => b.phanTramDaBan - a.phanTramDaBan);
          break;
        case 4:
          sortdata.sort((a, b) => a.phanTramDaBan - b.phanTramDaBan);
          break;
      }
    }
    setDataChange(sortdata);
    setCheckChange(true);
  };

  const handleDetailReport = item => {
    const currentCheckType = chooseType ? 'month' : checkType;

    if (item.name === typeIdMap[currentCheckType]) {
      if (chooseType === true && checkSameMonth(toDate, fromDate) === false) {
        Toast.show({
          type: 'warning',
          props: {message: t('warningSameMonth')},
        });
      } else if (
        chooseType === true &&
        isFullMonth(fromDate, toDate) === false
      ) {
        Toast.show({
          type: 'warning',
          props: {message: t('warningFullDayofMonth')},
        });
      } else {
        navigation.navigate('bieu-do', {
          typeReport: typeReport,
          checkType: checkType,
          fromDate: fromDate,
          toDate: toDate,
          branch: branch,
          chooseType: chooseType,
        });
      }
    }
  };

  const fechDataReport = async () => {
    const params = {
      tuNgay: fromDate,
      denNgay: toDate,
      storeId: branch,
    };
    let nameReport = '';

    switch (typeReport.name) {
      case 'revenue':
        nameReport = 'getReportDate';
        break;
      case 'cost':
        nameReport = 'getReportFeeByDate';
        break;
      default:
        break;
    }

    if (nameReport) {
      await fetchData(dispatch, nameReport, params, data => {
        if (data?.data === true) {
          Toast.show({
            type: 'error',
            props: {message: t('noData')},
          });
        }
        if (data?.message) {
          Toast.show({
            type: 'error',
            props: handleErrorResponse(data, t('errorFectching')),
          });
        }
      });
    }
  };

  const fechDataReportByTop = async () => {
    let nameReport = '';
    let params = {top: top};

    switch (typeReport.name) {
      case 'customer':
        if (fillterByList.id === 1) {
          nameReport = 'getReportRevenueByBirthday';
          params = {
            ...params,
            tuNgay: fromDate,
            denNgay: toDate,
            storeId: branch,
          };
        } else if (fillterByList.id === 2) {
          nameReport = 'getReportFavoriteProduct';
          params = {
            ...params,
            tuNgay: fromDate,
            denNgay: toDate,
            storeId: branch,
          };
        }
        break;
      case 'wareHoue':
        nameReport = 'getReportWareHouseDetailByTop';
        params = {
          ...params,
          tuNgay: fromDate,
          denNgay: toDate,
          storeId: branch,
        };
        break;
      case 'order':
        if (fillterByList.id === 1) {
          nameReport = 'getReportOrderTransportByDate';
          params = {
            ...params,
            tuNgay: fromDate,
            denNgay: toDate,
            storeId: branch,
          };
        } else if (fillterByList.id === 2) {
          nameReport = 'getReportOrderAdressByDate';
          params = {
            ...params,
            tuNgay: fromDate,
            denNgay: toDate,
            quocGia: filterAdvenced?.country,
            quanHuyen: filterAdvenced?.district,
            trangThai: filterAdvenced?.status,
            tinhThanh: filterAdvenced?.provine_citi,
            storeId: branch,
          };
        }
        break;
      default:
        return;
    }

    if (nameReport) {
      await fetchData(dispatch, nameReport, params, data => {
        if (data?.data?.metadata?.length === 0) {
          Toast.show({
            type: 'error',
            props: {message: t('nodata')},
          });
        }
      });
    }
  };

  useEffect(() => {
    if (typeReport?.name === 'revenue' || typeReport?.name === 'cost') {
      fechDataReport();
    }
  }, [top]);

  useEffect(() => {
    if (typeReport?.name !== 'revenue' && typeReport?.name !== 'cost') {
      fechDataReportByTop();
      setCheckChange(false);
    }
  }, [top, fillterByList, filterAdvenced]);

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar
        nameHeaderTitle={typeReport.title}
        iconRight="sort"
        onPressRight={() => setModalSortByOrder(true)}
      />
      <MyView style={styles.body}>
        <MyView>
          <SortByTop
            getTypeSort={item => handleSortByList(item)}
            data={dataReportDetails}
            typeReport={typeReport.name}
          />
        </MyView>
        <BoxArrowDown
          labelName={t('viewBy')}
          value={fillterByList?.title || t('viewBy')}
          styleText={styles.txtText}
          onPress={() => setModalSortReport(true)}
        />
        <MyView style={styles.horizontal}>
          <MyText style={styles.txtTitleTimeReport}>{t('reportTime')}</MyText>
          <MyView style={styles.timeReport}>
            <MyText style={styles.txtTimeReport}>
              {fomatDate(fromDate, toDate, checkType)}
            </MyText>
          </MyView>
        </MyView>
        <InputSearch
          placeholder={t('searchinthelist')}
          value={stringSearch}
          getString={value => setStringSearch(value)}
          onSearch={handleSearch}
        />
        <RenderListReport
          dataChange={dataChange}
          data={dataReportDetails}
          typeReport={typeReport.name}
          typeView={fillterByList?.id}
          checkChange={checkChange}
        />
        {typeReport?.name === 'order' && fillterByList?.id === 2 && (
          <TouchableOpacity
            onPress={() => seModalFilterAdvenced(true)}
            style={styles.advanced}>
            <Icon
              name="assets"
              width="18"
              height="18"
              color={Colors.neutrals_50}
            />
            <MyText style={styles.txtWhite}>{t('advence')}</MyText>
          </TouchableOpacity>
        )}
      </MyView>
      <Bottom
        titleBtn1={t('changeConditions')}
        titleBtn2={t('option')}
        sticky={false}
        onPress1={() => navigation.navigate('bao-cao')}
        onPress2={() => setModalListCard(true)}
        colorBtn1={Colors.semantics_Green_03}
        TextColorButton1={Colors.semantics_Green_01}
      />
      {typeReport.name !== 'wareHoue' && (
        <ModalItemSelector
          isVisible={modalSortReport}
          onClose={() => setModalSortReport(false)}
          data={dataSort}
          getItem={item => setFillterByList(item)}
          stylesModal={
            typeReport.name === 'revenue'
              ? {height: parseSizeHeight(216)}
              : {height: parseSizeHeight(160)}
          }
        />
      )}
      <ModalItemSelector
        isVisible={modalListCard}
        onClose={() => setModalListCard(false)}
        data={dataListCard}
        getItem={item => handleDetailReport(item)}
        stylesModal={styles.modalListCardStyle}
      />
      <FilterOption
        isVisible={modalSortByOrder}
        onClose={() => setModalSortByOrder(false)}
        limitSelect={1}
        data={
          typeReport.name === 'wareHoue'
            ? dataHightandLowInventory
            : typeReport.name === 'customer' && fillterByList.id === 1
            ? dataHightandLowCustomerBirthday
            : typeReport.name === 'customer' && fillterByList.id === 2
            ? dataHightandLowCustomerFavorite
            : dataSortHightandLow
        }
        stylesModal={
          typeReport.name === 'wareHoue'
            ? {height: parseSizeHeight(390)}
            : {height: parseSizeHeight(280)}
        }
        onListOption={item => handleSortHightAndLow(item[0])}
      />
      <ModalFilterAdress
        isVisible={modalFilterAdvenced}
        onClose={() => seModalFilterAdvenced(false)}
        filter={setFilterAdvenced}
      />
    </MySafeAreaView>
  );
};

export default Index;
