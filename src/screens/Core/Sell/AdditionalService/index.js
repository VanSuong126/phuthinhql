import React, {useState,useEffect} from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


import {MyView, MyText, MySafeAreaView} from '~components/MyStyles';
import { salesSelectors } from '~redux/reducers';
import styles from './styles';
import Bottom from '~components/Bottom';
import Order from './Order';
import Product from './Product';
import formatPrice from '~helper/formatPrice';

const Index = ({route}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const orderData = useSelector(state => salesSelectors.selectDataSales(state));

  useEffect(() => {
    if (orderData) {
      let totalPrice = 0;
      let totalExtra = 0;
      orderData?.sanphamdachon?.map(item => {
        totalPrice += item?.SoLuongMua * item?.GiaSauGiam;
      });
      orderData?.dichvucongthem?.map(item => {
        totalExtra += item?.SoLuong * item?.DonGia;
      });
      setTotalPrice(totalPrice + totalExtra);
    }}, [orderData]);


  const handleIndexChange = index => {
    setSelectedIndex(index);
  };
  const handleContinue = () => {
    navigation.navigate('chi-tiet-tao-don');
  };
  return (
    <MySafeAreaView style={styles.container}>
      <MyView style={styles.header}>
        <MyText style={styles.txtHeader}>{t('addService')}</MyText>
      </MyView>

      <SegmentedControlTab
        tabsContainerStyle={styles.tabsContainerStyle}
        activeTabStyle={styles.activeTabStyle}
        tabStyle={styles.tabStyle}
        firstTabStyle={styles.firstTabStyle}
        lastTabStyle={styles.lastTabStyle}
        tabTextStyle={styles.tabTextStyle}
        selectedIndex={selectedIndex}
        allowFontScaling={false}
        values={['Sản phẩm', 'Đơn hàng']}
        onTabPress={handleIndexChange}
      />
      <MyView style={styles.body}>
        {selectedIndex === 1 ? (
          <Order />
        ) : (
          <Product />
        )}
      </MyView>
      <Bottom
        type="text"
        TextContent={formatPrice(totalPrice)+'đ'}
        titleBtn2="Tiếp tục"
        onPress2={() => handleContinue()}
      />
    </MySafeAreaView>
  );
};

export default Index;
