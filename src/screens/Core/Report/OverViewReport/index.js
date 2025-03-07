import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import Toast from 'react-native-toast-message';

import styles from './styles';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import {
  MyView,
  MyText,
  MySafeAreaView,
  MyScrollView,
} from '~components/MyStyles';
import Line from '~components/Line';
import {Colors} from '~theme';
import Bottom from '~components/Bottom';
import fetchData from '~providers';
import {reportSelectors} from '~redux/reducers';
import ChartCircle from '~components/Chart/ChartCircle';
import ModalItemSelector from '~modals/ModalItemSelector';
import Data from '~data/dataReport';
import RenderTotal from './RenderTotal';
import RenderListReport from './RenderListReport';
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
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {checkType, typeReport, fromDate, toDate, branch, chooseType} =
    route.params;

  const [modalItemSelector, setModalItemSelector] = useState(false);
  const {dataReportOverReport} = Data();

  const typeIdMap = {
    date: 'dailyChart',
    month: 'monthlyChart',
    year: 'yearChart',
  };

  //lọc data trong modalListCard phù hợp vời loại Report
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
        return reportSelectors.setReportWareHouseByDate(state);
      case 'customer':
        return reportSelectors.setReportDate(state);
      case 'order':
        return reportSelectors.setReportOrderByDate(state);
      default:
        return {};
    }
  });

  const dataReNew = useMemo(() => {
    const data = Array.isArray(dataReport) ? dataReport : [];
    return data;
  }, [dataReport]);

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
          checkType: currentCheckType,
          fromDate: fromDate,
          toDate: toDate,
          branch: branch,
          chooseType: chooseType,
        });
      }
    } else {
      navigation.navigate('bao-cao-chi-tiet', {
        typeReport: item,
        fromDate: fromDate,
        toDate: toDate,
        checkType: checkType,
        branch: branch,
        chooseType: chooseType,
      });
    }
  };

  const fechDataReport = async () => {
    const params = {
      tuNgay: fromDate,
      denNgay: toDate,
      storeId: branch,
    };

    // Xác định tên report dựa trên typeReport.name
    let reportName = '';
    switch (typeReport.name) {
      case 'revenue':
        reportName = 'getReportDate';
        break;
      case 'cost':
        reportName = 'getReportFeeByDate';
        break;
      case 'wareHoue':
        reportName = 'getReportWareHouseByDate';
        break;
      case 'customer':
        reportName = 'getReportDate';
        break;
      case 'order':
        reportName = 'getReportOrderByDate';
        break;
      default:
        return;
    }

    await fetchData(dispatch, reportName, params, data => {
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
  };

  useEffect(() => {
    fechDataReport();
  }, []);

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={typeReport.title} />
      <MyScrollView>
        <MyView style={styles.body}>
          <RenderTotal data={dataReNew} typeReport={typeReport.name} />
          <MyView style={styles.chart}>
            <ChartCircle
              typeReport={typeReport.name}
              data={dataReNew}
              widthAndHeight={190}
            />
          </MyView>
          <Line color={Colors.neutrals_300} thickness={1} />
          <MyView style={styles.horizontal}>
            <MyText style={styles.txtTitleTimeReport}>{t('reportTime')}</MyText>
            <MyView style={styles.timeReport}>
              <MyText style={styles.txtTimeReport}>
                {fomatDate(fromDate, toDate, checkType)}
              </MyText>
            </MyView>
          </MyView>
          <RenderListReport data={dataReNew} typeReport={typeReport.name} />
        </MyView>
      </MyScrollView>
      <Bottom
        type="OnceButton"
        titleBtn1={t('reportDetail')}
        onPress1={() => setModalItemSelector(true)}
        sticky={false}
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
