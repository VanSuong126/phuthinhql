import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import Icon from '~components/IconXML';
import { MyView, MyText, MyTouchableOpacity } from '~components/MyStyles';
import { salesActions, salesSelectors, commonSelectors } from '~redux/reducers';
import { Colors, Sizes, parseSizeHeight, FontStyles } from '~theme';
import fetchData from '~providers';
import LocalDB from '~data/asyncStorage';
import ModalFeeship from '~components/modals/ModalFeeship';
import formatPrice from '~helper/formatPrice';

const Index = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Init state
  const [visibleModal, setVisibleModal] = useState(false);
  const [listFeeship,setListFeeship] = useState([]);

  // Global state
  const orderData = useSelector(salesSelectors.selectDataSales);
  const transporter = useSelector(commonSelectors.selectTransporter) || [];

  const handleGetFeeship = () => {
    if (orderData?.manhavanchuyen) {
      const transporterSelected = transporter.find(x => x.MaNhaVanChuyen === orderData?.manhavanchuyen);
      getFeeshipTransporter(transporterSelected);
      setVisibleModal(true);
    }
    else {
      setVisibleModal(true);
    }
  }

  const getFeeshipTransporter =async (data) => {
    const user = await LocalDB.getUserData();
    const store =user?.StoreInfo;
     // Tính tổng tiền sản phẩm
     const sumAmountProduct = orderData?.sanphamdachon.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.GiaSauGiam * currentValue.SoLuongMua,
      0,
    );
    const sumWeight = orderData?.sanphamdachon.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.KhoiLuong,
      0,
    );

    fetchData(dispatch, 'getFeeShip',
       {
        matinhgui: store?.MaBang,
        tinhgui: store?.TenBang,
        quangui: store?.TenQuan,
        matinhnhan: orderData?.mabang,
        tinhnhan: orderData?.tenbang,
        quannhan: orderData?.tenquan,
        diachinhan: orderData?.diachi,
        trongluong: sumWeight,
        trigia: sumAmountProduct,
        manhavanchuyen: data?.MaNhaVanChuyen,
        chuyenphatnhanh: false,
        giatoithieunoitinh: data?.GiaToiThieuNoiTinh,
        giatoithieulientinh: data?.GiaToiThieuLienTinh,
      },
      (res)=>{
        if(res.success ===true)
        {
          setListFeeship([{maNhaVanChuyen:data?.MaNhaVanChuyen, feeShip:res?.data?.cuocphi }])
        }
      }
    );
  }
  
  const handleApplyFeeShip = value=>{
    const dataOrderUpdate = {...orderData, phiship: value}
    dispatch(salesActions.setDataSales(dataOrderUpdate))
  }

  return (
    <MyView style={styles.container}>
      <MyView style={styles.wrapIcon}>
        <Icon name="cost" width="24" height="24" />
      </MyView>
      <MyView style={styles.wrapInfo}>
        <MyView style={styles.wrapTitle}>
          <MyText style={styles.titleTitle}>{t('feeship')}</MyText>
          <MyTouchableOpacity onPress={() => handleGetFeeship()}>
            <Icon name="rightArrow" width="24" height="24" />
          </MyTouchableOpacity>
        </MyView>
          <MyView style={styles.wrapDetail}>
            <MyText style={styles.textInfo}>
              {formatPrice(orderData?.phiship)|| 0}đ
            </MyText>
          </MyView>
        
      </MyView>
      <ModalFeeship
        isVisible={visibleModal}
        onApply={value => handleApplyFeeShip(value)}
        listFeeship ={listFeeship}
        onClose={() => setVisibleModal(false)}
      />
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.neutrals_100,
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(10),
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  wrapIcon: {
    flex: 0.1,
  },
  wrapInfo: {
    flex: 0.9,
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '600',
    color: Colors.semantics_Black,
  },
  wrapDetail: {
    marginTop: parseSizeHeight(10),
  },
  textInfo: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '600',
    color: Colors.semantics_Yellow_02,
  },
});
