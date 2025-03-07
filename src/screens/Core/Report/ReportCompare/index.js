import React, {useState, useRef, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Animated, Easing} from 'react-native';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

import {MyView, MySafeAreaView, MyText} from '~components/MyStyles';
import BarChartCompare from '~components/Chart/BarChartCompare';
import LineChartCompare from '~components/Chart/LineChartCompare';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import Bottom from '~components/Bottom';
import styles from './styles';
import FlatList from '~components/FlatList';
import fetchData from '~providers';
import {handleErrorResponse} from '~helper/utils';
import {parseSizeHeight, parseSizeWidth, Colors} from '~theme';

const Index = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const {nguon, dich, loaiSoLieu} = route.params || {};

  // State for selected tab and animated opacity
  const [tabSelected, setTabSelected] = useState(false);
  const [dataCompare, setDataCompare] = useState([]);
  const opacity = useRef(new Animated.Value(1)).current;
  const unit =
    loaiSoLieu === 'KH'
      ? 'customer'
      : loaiSoLieu === 'SP'
      ? 'product'
      : loaiSoLieu === 'DH'
      ? 'order'
      : 'million';
  const labelsHeader =
    loaiSoLieu === 'KH'
      ? 'customer'
      : loaiSoLieu === 'DT'
      ? 'revenue'
      : loaiSoLieu === 'DH'
      ? 'order'
      : loaiSoLieu === 'SP'
      ? 'product'
      : loaiSoLieu === 'CP' && 'cost';
  const toggleChart = () => {
    // Fade out current chart
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      // Switch chart type after fade-out animation completes
      setTabSelected(!tabSelected);
      // Fade in the new chart
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    });
  };

  const fechDataCompare = () => {
    fetchData(
      dispatch,
      'getReportCompare',
      {
        nguon: nguon,
        dich: dich,
        loaiSoLieu: loaiSoLieu,
      },
      data => {
        if (data?.success) {
          setDataCompare(data?.data);
        } else {
          Toast.show({
            type: 'error',
            props: handleErrorResponse(data?.message, t('errorFectching')),
          });
        }
      },
    );
  };
  useEffect(() => {
    fechDataCompare();
  }, []);

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t(labelsHeader)} />
      <MyView style={styles.body}>
        <MyView style={styles.chart}>
          <MyText style={styles.txtUnit}>{`${t('unit')} ${
            tabSelected ? '(%)' : `(${t(unit)})`
          }`}</MyText>
          <Animated.View style={{opacity}}>
            {tabSelected ? (
              <LineChartCompare
                sizeLabel={nguon.substring(0, 2) === 'NT' ? 70 : 150}
                chartHeight={250}
                data={dataCompare}
              />
            ) : (
              <MyView>
                <BarChartCompare
                  widthBar={parseSizeWidth(6)}
                  spacingGroupBar={
                    nguon.slice(0, 2) === 'NT'
                      ? parseSizeWidth(50)
                      : nguon.slice(0, 2) === 'NQ'
                      ? parseSizeWidth(60)
                      : parseSizeWidth(90)
                  }
                  heightChart={parseSizeHeight(250)}
                  borderRadiusBar={parseSizeWidth(4)}
                  data={dataCompare}
                />
                <MyView style={styles.noteBarCharts}>
                  <MyView style={styles.inforBarchart}>
                    <MyView
                      style={[
                        styles.colorBarChart,
                        {backgroundColor: Colors.semantics_Yellow_02},
                      ]}
                    />
                    <MyText style={styles.txtNoteBarChart}>
                      {dich.slice(0, 2) === 'QT'
                        ? `${dich.substring(2, 6)} ${t(
                            'quarter',
                          )} ${dich.substring(6, 8)}`
                        : dich.substring(2, 6)}
                    </MyText>
                  </MyView>
                  <MyView style={styles.inforBarchart}>
                    <MyView
                      style={[
                        styles.colorBarChart,
                        {backgroundColor: Colors.brand_01},
                      ]}
                    />
                    <MyText style={styles.txtNoteBarChart}>
                      {nguon.slice(0, 2) === 'QT'
                        ? `${nguon.substring(2, 6)} ${t(
                            'quarter',
                          )} ${nguon.substring(6, 8)}`
                        : nguon.substring(2, 6)}
                    </MyText>
                  </MyView>
                </MyView>
              </MyView>
            )}
          </Animated.View>
        </MyView>
        <MyView style={styles.inforDetails}>
          <MyView style={styles.titleInforDetails}>
            <MyText>
              {`${nguon.substring(2, 6)} ${t('compareWith')} ${dich.substring(
                2,
                6,
              )}`}
            </MyText>
          </MyView>
          <MyView style={styles.listInfor}>
            <MyView style={styles.titleInfor}>
              <MyView style={styles.txtTitleInfor} />
              <MyText style={styles.txtTitleInfor}>
                {tabSelected
                  ? t(unit)
                  : dich.slice(0, 2) === 'QT'
                  ? `${dich.substring(2, 6)} ${t('quarter')} ${dich.substring(
                      6,
                      8,
                    )}`
                  : `${t('year')} ${dich.substring(2, 6)}`}
              </MyText>
              <MyText style={styles.txtTitleInfor}>
                {tabSelected
                  ? '%'
                  : nguon.slice(0, 2) === 'QT'
                  ? `${nguon.substring(2, 6)} ${t('quarter')} ${nguon.substring(
                      6,
                      8,
                    )}`
                  : `${t('year')} ${nguon.substring(2, 6)}`}
              </MyText>
            </MyView>
            <FlatList
              data={dataCompare}
              grid={false}
              loading={false}
              type={tabSelected ? 'calculateDifference' : 'reportCompare'}
              keyExtractor={(item, index) => index.toString()}
              style={styles.listOption}
            />
          </MyView>
        </MyView>
      </MyView>
      <Bottom
        titleBtn1={t('changeConditions')}
        onPress1={() => navigation.goBack()}
        titleBtn2={t(tabSelected ? t('viewDifference') : t('viewData'))}
        onPress2={toggleChart}
        sticky={false}
        colorBtn1={Colors.semantics_Green_03}
        TextColorButton1={Colors.semantics_Green_01}
      />
    </MySafeAreaView>
  );
};

export default Index;
