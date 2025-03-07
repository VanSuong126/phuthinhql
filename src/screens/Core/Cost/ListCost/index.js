import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-toast-message';

import HeaderToolBar from '~components/headers/HeaderToolBar';
import {MySafeAreaView, MyView, MyText} from '~components/MyStyles';
import styles from './styles';
import FlatList from '~components/FlatList';
import fetchData from '~providers';
import DatePickerArr from '~inputs/InputPicker/DatePickerArr';
import {currencyFormatNoUnit} from '~helper/currencyFormat';
import FilterOption from '~components/FilterOption';

const Index = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [dataFilter, setDataFilter] = useState([]);
  const [modalFilter, setModalFilter] = useState(false);
  const [data, setData] = useState([]);
  const [totalPirce, setTotalPirce] = useState();
  const [totalType, setTotalType] = useState();
  const [typeCostData, setTypeCostData] = useState();
  const [loading, setLoading] = useState(false);

  // load data
  useEffect(() => {
    fechDataCost(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
  }, []);

  // call api get data
  const fechDataCost = (fromDate, toDate) => {
    fetchData(
      dispatch,
      'getListCost',
      {
        loai: 1,
        tungay: fromDate,
        denngay: toDate,
      },
      res => {
        if (res?.success === true) {
          setData(res?.data);
          setDataFilter(res?.data);
        } else {
          setData([]);
          setDataFilter([]);
        }
      },
    );
  };

  useEffect(() => {
    // Tính tong tính chi phi
    const total = dataFilter.reduce((total, item) => total + item?.SoTien, 0);
    setTotalPirce(total);
    // Tính tong loại chi phi
    const totalType = Array.from(
      new Set(dataFilter.map(item => item.IDLoaiChiPhi)),
    ).length;
    setTotalType(totalType);
  }, [dataFilter]);

  useEffect(() => {
    // lấy danh sách loại chi phi filter
    const typeCostData = Array.from(
      new Set(data.map(item => item.IDLoaiChiPhi)),
    ).map(IDLoaiChiPhi => {
      const tenLoaiChiPhi = data.find(
        item => item?.IDLoaiChiPhi === IDLoaiChiPhi,
      )?.TenLoaiChiPhi;
      return {label: tenLoaiChiPhi, value: IDLoaiChiPhi};
    });
    setTypeCostData(typeCostData);
  }, [data]);

  // handle time
  const handleTime = val => {
    fechDataCost(val?.fromDate, val?.toDate);
  };

  // handle filter
  const handleFilter = val => {
    // Lấy danh sách các IDLoaiChiPhi từ val
    const selectedIds = val.map(item => item.value);
    if (selectedIds.length === 0) {
      setDataFilter(data);
      return;
    }
    // Lọc data để lấy các mục có IDLoaiChiPhi nằm trong selectedIds
    const dataCheck = data.filter(item =>
      selectedIds.includes(item.IDLoaiChiPhi),
    );

    // Cập nhật dataFilter với kết quả lọc
    setDataFilter(dataCheck);
  };

  const openModalFilter = () => {
    if (typeCostData?.length === 0) {
      Toast.show({
        type: 'error',
        props: {message: t('noDataFilter')},
      });
      return;
    }
    setModalFilter(true);
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar
        nameHeaderTitle={t('listCost')}
        iconRight="filter"
        onPressRight={openModalFilter}
      />
      <MyView style={styles.body}>
        <MyView style={styles.inforCost}>
          <DatePickerArr
            labelName={t('time')}
            styleInput={styles.input}
            styleText={styles.txtBranch}
            styleTextYear={styles.txtBranch}
            getDate={handleTime}
            styleFomat={styles.txtBranch}
            editable={false}
          />
          <MyView style={styles.horizontal}>
            <MyText style={styles.txtTitle}>{t('numbeOfRows')}:</MyText>
            <MyText style={styles.txtContent}>{dataFilter.length ?? 0}</MyText>
          </MyView>
          <MyView style={styles.horizontal}>
            <MyText style={styles.txtTitle}>{t('totalCategories')}:</MyText>
            <MyText style={styles.txtContent}>{totalType}</MyText>
          </MyView>
          <MyView style={styles.horizontal}>
            <MyText style={styles.txtTitle}>{t('totalAmount')}:</MyText>
            <MyText style={styles.txtContent}>
              {currencyFormatNoUnit(totalPirce)} VND
            </MyText>
          </MyView>
        </MyView>
        <MyView style={styles.listCost}>
          <FlatList
            data={dataFilter.length === 0 ? data : dataFilter}
            loading={loading}
            keyExtractor={(item, index) => item.IDCuaHang()}
            contentContainerStyleProp={styles.list}
            type="listCost"
          />
        </MyView>
      </MyView>
      <FilterOption
        isVisible={modalFilter}
        onClose={() => setModalFilter(false)}
        data={typeCostData || []}
        onListOption={handleFilter}
        limitSelect={-1}
      />
    </MySafeAreaView>
  );
};

export default Index;
