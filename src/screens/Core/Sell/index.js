import {Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';

import {checkPermission} from '~helper/permission';
import LocalDB from '~data/asyncStorage';
import styles from './styles';
import FastMenu from '~screens/Core/FastMenu';
import Icon from '~components/IconXML';
import {Width, Colors} from '~theme';
import {commonActions} from '~redux/reducers';
import HeaderMain from '~components/headers/HeaderMain';
import BackgroundTotalSell from '~assets/images/backgroundTotalSell.png';
import ModalCreateOrder from '~components/modals/ModalCreateOrder';
import {
  MyView,
  MyText,
  MyTouchableOpacity,
  MySafeAreaView,
  MyImageBackground,
} from '~components/MyStyles';

const Index = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentDate = moment().format('YYYY-MM-DD');
  const [isPressed, setIsPressed] = useState(null);
  const [dataOrigin, setDataOrigin] = useState([]);
  const [dotLight, setDotLight] = useState(0);
  const [visibleModalCreate, setVisibleModalCreate] = useState(false);

  const handlePressIn = index => {
    setIsPressed(index);
  };
  const handleClickQRCheck = async () => {
    const permissionCamera = await checkPermission('camera');

    if (!permissionCamera) {
      Toast.show({
        type: 'error',
        props: {message: t('errorPermissionCamera')},
      });
    }

    if (permissionCamera) {
      navigation.navigate('quet-ma-ban-hang');
      setIsPressed(false);
    }
  };

  const handlePressOut = value => {
    setIsPressed(false);
    switch (value) {
      case 1:
        handleClickQRCheck();
        break;
      case 2:
        setVisibleModalCreate(true);
        break;
      case 3:
        navigation.navigate('in-lai-don');
        break;
      case 4:
        navigation.navigate('don-hang');
        break;
      case 5:
        navigation.navigate('quan-tri-don-nhap');
        break;
      default:
        console.log('no value');
    }
  };

  const OrderPending = dataOrigin.filter(
    order => order.IDTinhTrangDonHang === 1,
  ).length;
  const OrderCreated = dataOrigin.filter(
    order => order.IDTinhTrangDonHang !== 1,
  ).length;

  const getListOrder = async () => {
    const dataUser = await LocalDB.getUserData();
    await dispatch(commonActions.toggleLoading(true));

    const payload = {
      params: {
        loai: 0,
        idnguoidung: dataUser.UserInfo.IDNguoiDung,
        idcuahang: 0,
        tungay: currentDate,
        denngay: currentDate,
        chuoitimkiem: '',
      },
      onSuccess: async data => {
        await dispatch(commonActions.toggleLoading(false));
        setDataOrigin(data);
      },
      onError: async () => {
        await dispatch(commonActions.toggleLoading(false));
      },
    };
    await dispatch(commonActions.findOrder(payload));
  };

  useEffect(() => {
    getListOrder();
  }, []);

  const dataSales = [
    {id: 1, image: require('~assets/images/carouselImage.png')},
    {id: 2, image: require('~assets/images/carouselImage.png')},
    {id: 3, image: require('~assets/images/carouselImage.png')},
    {id: 4, image: require('~assets/images/carouselImage.png')},
  ];

  const renderItemSales = ({item}) => {
    return (
      <MyView key={item.id} style={styles.Notifi}>
        <Image
          source={item.image}
          resizeMode="cover"
          style={styles.imageSales}
        />
      </MyView>
    );
  };

  return (
    <MySafeAreaView style={styles.container}>
      <ModalCreateOrder
        isVisible={visibleModalCreate}
        onClose={() => setVisibleModalCreate(false)}
      />
      <HeaderMain title={t('order')} />
      <MyView style={styles.content}>
        <MyView showsVerticalScrollIndicator={false} style={styles.body}>
          <MyView style={styles.wrapGroupContent}>
            <MyView style={styles.leftSite}>
              <MyImageBackground
                source={BackgroundTotalSell}
                style={styles.wrapTotalOrderOfDay}>
                <MyView style={styles.wrapOrderOfDay}>
                  <MyText style={styles.txtOrderOfDay}>
                    {t('ordersOfDay')}
                  </MyText>
                  <MyText style={styles.txtResulOrderOfDay}>
                    {dataOrigin.length}
                  </MyText>
                </MyView>
                <MyView style={styles.wrapTotalOrder}>
                  <MyText style={styles.txtTitle}>{t('ordersCreated')}</MyText>
                  <MyText style={styles.txtResult}>{OrderCreated}</MyText>
                </MyView>
                <MyView style={styles.wrapTotalOrder}>
                  <MyText style={styles.txtTitle}>
                    {t('ordersProcessing')}
                  </MyText>
                  <MyText style={styles.txtResult}>{OrderPending}</MyText>
                </MyView>
              </MyImageBackground>
            </MyView>
            <MyView style={styles.rightSite}>
              <MyTouchableOpacity
                activeOpacity={1}
                style={[styles.button, isPressed === 1 && styles.buttonPressed]}
                onPressIn={() => handlePressIn(1)}
                onPressOut={() => handlePressOut(1)}>
                <Icon
                  name={isPressed === 1 ? 'scanLinear' : 'scan'}
                  width="24"
                  height="24"
                />
                <MyText
                  style={[
                    styles.txtButton,
                    isPressed === 1 && styles.txtButtonPressed,
                  ]}>
                  {t('scan')}{' '}
                </MyText>
              </MyTouchableOpacity>

              <MyTouchableOpacity
                activeOpacity={1}
                onPressIn={() => handlePressIn(2)}
                onPressOut={() => handlePressOut(2)}
                style={[
                  styles.button,
                  isPressed === 2 && styles.buttonPressed,
                ]}>
                <Icon
                  name={isPressed === 2 ? 'plusLinear' : 'plus'}
                  width="24"
                  height="24"
                />
                <MyText
                  style={[
                    styles.txtButton,
                    isPressed === 2 && styles.txtButtonPressed,
                  ]}>
                  {t('createOrder')}
                </MyText>
              </MyTouchableOpacity>
            </MyView>
          </MyView>
          <MyView style={styles.groupButtonUnder}>
            <MyTouchableOpacity
              activeOpacity={1}
              onPressIn={() => handlePressIn(3)}
              onPressOut={() => handlePressOut(3)}
              style={[styles.button, isPressed === 3 && styles.buttonPressed]}>
              <Icon
                name={isPressed === 3 ? 'printLinear' : 'print'}
                width="24"
                height="24"
              />
              <MyText
                style={[
                  styles.txtButton,
                  isPressed === 3 && styles.txtButtonPressed,
                ]}>
                {t('print')}
              </MyText>
            </MyTouchableOpacity>

            <MyTouchableOpacity
              activeOpacity={1}
              onPressIn={() => handlePressIn(4)}
              onPressOut={() => handlePressOut(4)}
              style={[styles.button, isPressed === 4 && styles.buttonPressed]}>
              <Icon
                name={'file'}
                width="24"
                height="24"
                color={isPressed === 4 && Colors.brand_01}
              />
              <MyText
                style={[
                  styles.txtButton,
                  isPressed === 4 && styles.txtButtonPressed,
                ]}>
                {t('manageOrder')}
              </MyText>
            </MyTouchableOpacity>

            <MyTouchableOpacity
              activeOpacity={1}
              onPressIn={() => handlePressIn(5)}
              onPressOut={() => handlePressOut(5)}
              style={[styles.button, isPressed === 5 && styles.buttonPressed]}>
              <Icon
                name={isPressed === 5 ? 'billLinear' : 'bill'}
                width="24"
                height="24"
              />
              <MyText
                style={[
                  styles.txtButton,
                  isPressed === 5 && styles.txtButtonPressed,
                ]}>
                {t('tempOrder')}
              </MyText>
            </MyTouchableOpacity>
          </MyView>
          <MyView style={styles.sales}>
            <Carousel
              data={dataSales}
              renderItem={renderItemSales}
              sliderWidth={Width}
              itemWidth={Width}
              keyExtractor={item => item.id.toString()}
              onSnapToItem={index => setDotLight(index)}
            />
          </MyView>
          <MyView style={styles.dotsContainer}>
            {dataSales.map((dot, index) => (
              <MyView
                key={index}
                style={dotLight === index ? styles.dotLight : styles.dot}
              />
            ))}
          </MyView>
        </MyView>
      </MyView>
      <FastMenu />
    </MySafeAreaView>
  );
};

export default Index;
