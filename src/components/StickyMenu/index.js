import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import styles from './styles';
import {
  MyLinearGradient,
  MyTouchableOpacity,
  MyView,
  MyText,
} from '~components/MyStyles';
import Modal from 'react-native-modal';
import {salesActions, commonActions, salesSelectors} from '~redux/reducers';
import Icon from '~components/IconXML';
import ModalConfirm from '~modals/ModalConfirm';
import Toast from 'react-native-toast-message';
import fetchData from '~providers';
import {Colors} from '~theme';

const dataSticky = [
  {id: 1, nameIcon: 'trashGrey', title: 'cancelOrder', navigate: 'HuyDon'},
  {id: 2, nameIcon: 'saveColor', title: 'saveOrder', navigate: 'LuuNhap'},
  {
    id: 3,
    nameIcon: 'billLinear',
    title: 'orderDetail',
    navigate: 'chi-tiet-tao-don',
  },
  {
    id: 4,
    nameIcon: 'customer',
    title: 'inforCustomer',
    navigate: 'thong-tin-khach-hang',
  },
  {
    id: 5,
    nameIcon: 'itemColor',
    title: 'extraService',
    navigate: 'dich-vu-cong-them',
  },
  {
    id: 6,
    nameIcon: 'order',
    title: 'selectedProduct',
    navigate: 'san-pham-da-chon',
  },
];

const dataStickyUpdate = [
  {
    id: 1,
    nameIcon: 'cancelUpdate',
    title: 'cancelUpdate',
    navigate: 'CancelUpdate',
  },
  {
    id: 3,
    nameIcon: 'billLinear',
    title: 'orderDetail',
    navigate: 'chi-tiet-tao-don',
  },
  {
    id: 4,
    nameIcon: 'customer',
    title: 'inforCustomer',
    navigate: 'thong-tin-khach-hang',
  },
  {
    id: 5,
    nameIcon: 'itemColor',
    title: 'extraService',
    navigate: 'dich-vu-cong-them',
  },
  {
    id: 6,
    nameIcon: 'order',
    title: 'selectedProduct',
    navigate: 'san-pham-da-chon',
  },
];

const Index = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [openMenu, setOpenMenu] = useState(false);
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
  const [contentNotification, setContentNotification] =
    useState('areYouCancelOrder');
  const [typeNotify, setTypeNotify] = useState(0);
  const [isSuccessNotify, setIsSuccessNotify] = useState(false);
  const [stickyData, setStickyData] = useState(dataSticky);

  const orderData = useSelector(state => salesSelectors.selectDataSales(state));

  // Update sticky data based on order data
  useEffect(() => {
    setStickyData(
      orderData?.madonhang || orderData?.madonchung
        ? dataStickyUpdate
        : dataSticky,
    );
  }, [orderData]);

  // Utility function to check if order has product and customer
  const hasProductAndCustomer = useCallback(() => {
    return orderData?.sanphamdachon?.length > 0 && orderData?.idkhachhang;
  }, [orderData]);

  const handleOpenMenu = () => setOpenMenu(prev => !prev);

  const handleClick = navigate => {
    if (navigate === 'HuyDon') {
      setContentNotification('areYouCancelOrder');
      setTypeNotify(0);
      setVisibleModalConfirm(true);
      setIsSuccessNotify(false);
      setOpenMenu(false);
    } else if (navigate === 'CancelUpdate') {
      dispatch(salesActions.setDataSales(null));
      dispatch(salesActions.setDeliveryAddress(null));
      dispatch(commonActions.setListProduct({reset: true}));
      dispatch(commonActions.setListDiscount([]));
      navigation.navigate('don-hang');
      setOpenMenu(false);
    } else if (navigate === 'LuuNhap') {
      if (!(orderData?.sanphamdachon?.length > 0 || orderData?.idkhachhang)) {
        Toast.show({
          type: 'error',
          props: {message: t('emptyDataOrderCannotSave')},
        });
      } else {
        const typeDraftOrder = orderData?.IdDonHangNhap
          ? 'updateDraftOrder'
          : 'createDraftOrder';
        const params = {
          IdDonHangNhap: orderData?.IdDonHangNhap || null,
          NoiDung: JSON.stringify(orderData),
        };
        fetchData(dispatch, typeDraftOrder, params, res => {
          if (res.success) {
            dispatch(
              salesActions.setDataSales({
                ...orderData,
                IdDonHangNhap: res?.data?.metadata?.IdDonHangNhap,
              }),
            );
            setContentNotification('saveOrderDragSuccess');
            setIsSuccessNotify(true);
            setTypeNotify(0);
            setVisibleModalConfirm(true);
          } else {
            Toast.show({
              type: 'error',
              props: {message: t('saveOrderDragFail')},
            });
          }
        });
      }
      setOpenMenu(false);
    } else if (['dich-vu-cong-them', 'chi-tiet-tao-don'].includes(navigate)) {
      if (!hasProductAndCustomer()) {
        setContentNotification('noProductAndCustomer');
        setTypeNotify(1);
        setVisibleModalConfirm(true);
        setIsSuccessNotify(false);
      } else {
        navigation.navigate(navigate);
      }
      setOpenMenu(false);
    } else {
      navigation.navigate(navigate);
      setOpenMenu(false);
    }
  };

  const confirmCancelOrder = () => {
    if (typeNotify === 0) {
      dispatch(salesActions.setDataSales(null));
      dispatch(salesActions.setDeliveryAddress(null));
      dispatch(commonActions.setListProduct({reset: true}));
      dispatch(commonActions.setListDiscount([]));
      navigation.navigate('tao-don-hang');
    }
    setVisibleModalConfirm(false);
  };

  return (
    <MyView style={styles.containerModal}>
      {!openMenu ? (
        <MyTouchableOpacity onPress={handleOpenMenu} style={styles.sticky}>
          <MyLinearGradient style={styles.stickyLinear}>
            <Icon name={'editWhite'} width="30" height="30" />
          </MyLinearGradient>
        </MyTouchableOpacity>
      ) : (
        <Modal isVisible={openMenu} style={styles.content}>
          {stickyData
            .slice()
            .reverse()
            .map(item => (
              <MyTouchableOpacity
                key={item.id}
                onPress={() => handleClick(item.navigate)}
                style={item.id === 1 ? styles.btnCancel : styles.btn}>
                <Icon
                  name={item.nameIcon}
                  width="24"
                  height="24"
                  color={item.id !== 1 && Colors.semantics_Green_01}
                />
                <MyText
                  style={item.id === 1 ? styles.txtBtnCancel : styles.txtBtn}>
                  {t(item.title)}
                </MyText>
              </MyTouchableOpacity>
            ))}
          <MyTouchableOpacity
            onPress={handleOpenMenu}
            style={styles.stickyOpenedMenu}>
            <MyLinearGradient style={styles.stickyLinear}>
              <Icon name={'closeStickyMenu'} width="30" height="30" />
            </MyLinearGradient>
          </MyTouchableOpacity>
        </Modal>
      )}
      <ModalConfirm
        isVisible={visibleModalConfirm}
        type={typeNotify}
        onClose={() => setVisibleModalConfirm(false)}
        title={t('notification')}
        titleConfirm={t('OK')}
        titleCancel={t('close')}
        content={t(contentNotification)}
        onConfirm={confirmCancelOrder}
        isSuccessNotify={isSuccessNotify}
      />
    </MyView>
  );
};

export default Index;
