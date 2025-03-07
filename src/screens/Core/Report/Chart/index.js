import React, {useState, useMemo, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useRoute, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {reportSelectors} from '~redux/reducers';

import styles from './styles';
import {MyView, MyText, MySafeAreaView} from '~components/MyStyles';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import InputSearch from '~inputs/InputSearch';
import Bottom from '~components/Bottom';
import Line from '~components/Line';
import {Colors} from '~theme';
import ChartLine from '~components/Chart/ChartLine';
import RenderListReport from './RenderListReport';
import Data from '~data/dataReport';
import ModalItemSelector from '~modals/ModalItemSelector';
import DataFillter from './DataFillter';
import fetchData from '~providers';
import handleErrorResponse from '~helper/utils';
const formatDate = (dateString, checkType, chooseType) => {
  const date = moment(dateString, 'YYYY-MM-DD');
  if (checkType === 'month' || chooseType === true) {
    return date.format('MM/YYYY');
  }
  if (checkType === 'year') {
    return date.format('YYYY');
  }
};

const Index = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const {typeReport, checkType, fromDate, toDate, branch, chooseType} =
    route.params;
  const {dataReportOverReport} = Data();

  const [modalItemSelector, setModalItemSelector] = useState(false);
  const [stringSearch, setStringSearch] = useState('');
  const [dataSearch, setDataSearch] = useState([]);

  const typeIdMap = {
    date: 'dailyChart',
    month: 'monthlyChart',
    year: 'yearChart',
  };
  const firstDate = moment(fromDate).date();
  const lastDate = moment(toDate).date();

  const dataListCard = dataReportOverReport.filter(
    item => item.name === typeReport.name || item.name === typeIdMap[checkType],
  );

  // tính một tháng có bao nhiêu ngày hoặc 1 năm có bao nhiêu tháng
  const from = moment(fromDate, 'YYYY-MM-DD');
  const totalDate =
    chooseType === true
      ? lastDate - firstDate + 1
      : checkType === 'month'
      ? from.daysInMonth()
      : 12;

  // let {startDate, endDate} = useMemo(() => {
  //   // let startDate, endDate;

  //   if (checkType === 'date') {
  //     startDate = moment(fromDate).startOf('month').format('YYYY-MM-DD');
  //     endDate = moment(fromDate).endOf('month').format('YYYY-MM-DD');
  //   } else if (checkType === 'month') {
  //     startDate = moment(fromDate).startOf('year').format('YYYY-MM-DD');
  //     endDate = moment(fromDate).endOf('year').format('YYYY-MM-DD');
  //   }

  //   return {startDate, endDate};
  // }, []);

  //handle nút Tùy chọn
  const handleDetailReport = item => {
    if (item.name !== typeIdMap[checkType]) {
      navigation.navigate('bao-cao-chi-tiet', {
        typeReport: item,
        fromDate: fromDate,
        toDate: toDate,
        checkType: checkType,
        branch: branch,
        chooseType: false,
      });
    }
  };

  const handleSearch = () => {
    if (stringSearch !== '') {
      const searchData = fillterData.filter(item =>
        Object.values(item).some(
          value =>
            value &&
            value.toString().toLowerCase().includes(stringSearch.toLowerCase()),
        ),
      );
      setDataSearch(searchData);
    } else {
      setDataSearch([]);
    }
  };
  //lấy data từ selector
  const dataReport = useSelector(state => {
    switch (typeReport.name) {
      case 'revenue':
        return reportSelectors.setReportDate(state);
      case 'cost':
        return reportSelectors.setReportFeeByDate(state);
      case 'customer':
        return reportSelectors.setReportDate(state);
      default:
        return {};
    }
  });
  //check điều kiện data có phải là [] ko
  const dataReNew = useMemo(() => {
    const data = Array.isArray(dataReport) ? dataReport : [];

    return data;
  }, [dataReport]);

  // lọc data để chạy map
  const fillterData = useMemo(() => {
    return DataFillter(dataReNew, typeReport.name, checkType);
  }, [dataReNew]);

  //từ fillter data lọc ra data cho chart
  const dataChart = useMemo(() => {
    // Tạo mảng chartData với số phần tử là daysInMonth và mặc định giá trị là 0
    const chartData = new Array(totalDate).fill(0);
    const currentCheckType = chooseType ? 'month' : checkType;

    const checkMonthOrYear = (ngayPhatSinh, tong) => {
      const date = moment(ngayPhatSinh);

      // Kiểm tra nếu chooseType là true và ngày hiện tại trong khoảng từ fromDate đến toDate
      const isInRange = chooseType
        ? date.isBetween(moment(fromDate), moment(toDate), 'day', '[]')
        : true;

      if (isInRange) {
        if (currentCheckType === 'month') {
          // Tính toán chỉ số trong mảng chartData dựa trên khoảng cách từ fromDate
          const dayIndex = date.diff(moment(fromDate), 'days');

          // Kiểm tra nếu dayIndex nằm trong phạm vi của mảng chartData
          if (dayIndex >= 0 && dayIndex < chartData.length) {
            chartData[dayIndex] += tong;
          }
        } else if (currentCheckType === 'year') {
          const monthIndex = date.month();
          if (monthIndex >= 0 && monthIndex < chartData.length) {
            chartData[monthIndex] += tong;
          }
        }
      }
    };
    fillterData.forEach(item => {
      checkMonthOrYear(
        item?.ngayPhatSinh,
        typeReport.name === 'customer'
          ? item?.tongKhachHang?.length
          : item?.tongTien,
      );
    });

    return chartData;
  }, [fillterData]);

  const fechDataReport = () => {
    const params = {
      tuNgay: fromDate,
      denNgay: toDate,
      storeId: branch,
    };
    fetchData(dispatch, 'getReportDate', params, data => {
      if (data?.message) {
        Toast.show({
          type: 'error',
          props: handleErrorResponse(data, t('errorFectching')),
        });
      }
    });
  };
  useEffect(() => {
    if (typeReport.name === 'customer') {
      fechDataReport();
    }
  }, []);

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar
        containerStyle={styles.header}
        nameHeaderTitle={
          checkType === 'year' ? t('yearChart') : t('monthlyChart')
        }
      />
      <MyView style={styles.chart}>
        <ChartLine
          type={checkType}
          sizeLabel={checkType === 'month' || chooseType === true ? 27 : 60}
          data={dataChart}
          selected={fromDate}
          lastDay={totalDate}
          firstDay={firstDate}
          typeValue={typeReport.name === 'customer' && 'person'}
        />
      </MyView>

      <MyView style={styles.body}>
        <Line color={Colors.neutrals_300} thickness={1} />
        <MyView style={styles.horizontal}>
          <MyText style={styles.txtTitleTimeReport}>{t('reportTime')}</MyText>
          <MyView style={styles.timeReport}>
            <MyText style={styles.txtTimeReport}>
              {formatDate(fromDate, checkType, chooseType)}
            </MyText>
          </MyView>
        </MyView>
        <InputSearch
          placeholder={t('search')}
          value={stringSearch}
          getString={value => setStringSearch(value)}
          onSearch={handleSearch}
        />
        <RenderListReport
          data={dataSearch.length > 0 ? dataSearch : fillterData}
          typeReport={typeReport.name}
          checkType={checkType}
          chooseType={chooseType}
        />
      </MyView>

      <Bottom
        titleBtn1={t('option')}
        sticky={false}
        onPress1={() => setModalItemSelector(true)}
        typeBtn1={1}
        type="OnceButton"
      />

      <ModalItemSelector
        isVisible={modalItemSelector}
        onClose={() => setModalItemSelector(false)}
        data={dataListCard}
        getItem={item => handleDetailReport(item)}
        stylesModal={styles.modalListCardStyle}
      />
    </MySafeAreaView>
  );
};

export default Index;
