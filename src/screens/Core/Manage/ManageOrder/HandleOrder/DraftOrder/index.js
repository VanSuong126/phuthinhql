import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';

import {
  MyView,
  MyText,
  MySafeAreaView,
  MyTouchableOpacity,
} from '~components/MyStyles';
import InputSearch from '~inputs/InputSearch';
import Bottom from '~components/Bottom';
import FlatList from '~components/FlatList';
import fetchData from '~providers';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import Icon from '~components/IconXML';
import ModalConfirm from '~modals/ModalConfirm';
import ModalDetailOrderDraft from '~modals/ModalDetailOrderDraft';

import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';

const Index = props => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [stringSearch, setStringSearch] = useState('');
  const [listOrderOrigin, setListOrderOrigin] = useState();

  const [listOrder, setListOrder] = useState([]);
  const [visibleModalDetailOrder, setVisibleModalDetailOrder] = useState(false);
  const [orderDetail, setOrderDetail] = useState();
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
  const [contentNotification, setContentNotification] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      handleGetData();
    }, []),
  );

  const handleGetData = async () => {
    const params = {};
    fetchData(dispatch, 'getDraftOrders', params, res => {
      if (res?.success === true && res.data?.metadata.length > 0) {
        const mergedContent = res.data?.metadata.reduce((acc, item) => {
          return acc.concat({
            ...JSON.parse(item.NoiDung),
            IdDonHangNhap: item.Id,
            IdCuaHang: item.IdCuaHang,
            IdNguoiTaoDon: item.IdNguoiTaoDon,
          });
        }, []);
        setListOrderOrigin(mergedContent);
        if (stringSearch) {
          const filteredData = listOrderOrigin.filter(item => {
            return Object.values(item).some(value => {
              return String(value)
                .toLowerCase()
                .includes(stringSearch.toLowerCase());
            });
          });
          setListOrder(filteredData);
        } else {
          setListOrder(mergedContent);
        }
      } else {
        Toast.show({
          type: 'error',
          props: {message: res?.message || t('noData')},
        });
        setListOrder();
      }
    });
  };
  // handle search
  const handleFind = () => {
    const filteredData = listOrderOrigin.filter(item => {
      return Object.values(item).some(value => {
        return String(value).toLowerCase().includes(stringSearch.toLowerCase());
      });
    });
    setListOrder(filteredData);
  };
  // open modal confirm update
  const openModalConfirm = () => {
    setContentNotification(t('notifyCancelOrder'));
    setVisibleModalConfirm(true);
  };
  const confirmCancel = () => {
    setVisibleModalConfirm(false);

    if (Array.isArray(listOrder) && listOrder.length > 0) {
      const selectedOrders = listOrder.filter(item => item.selected);

      if (selectedOrders.length > 0) {
        let completedRequests = 0;

        selectedOrders.forEach(order => {
          fetchData(
            dispatch,
            'deleteDraftOrder',
            {IdDonHangNhap: order.IdDonHangNhap},
            res => {
              completedRequests += 1;
              if (completedRequests === selectedOrders.length) {
                handleGetData();
              }
            },
          );
        });
      }
    }
  };

  // handle onPress item FlatList
  const handleOnPress = data => {
    switch (data?.action) {
      case 'selectOrder':
        setListOrder(prevListOrder =>
          prevListOrder.map(order => {
            if (order.IdDonHangNhap === data?.IdDonHangNhap) {
              // Nếu đơn hàng đã có selected, đảo ngược trạng thái selected
              return {...order, selected: !order.selected};
            }
            return order;
          }),
        );
        break;
      case 'viewDetailOrder':
        setOrderDetail(data?.data);
        setVisibleModalDetailOrder(true);
        break;
      default:
        console.log('Unknown action');
    }
  };
  // handle clean selected
  const handleReset = () => {
    const updatedList = listOrder.map(item => ({
      ...item,
      selected: false,
    }));
    setListOrder(updatedList);
  };
  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('draftOrder')} />
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
          data={listOrder}
          type={'draftOrder'}
          onPress={data => handleOnPress(data)}
        />
      </MyView>
      {listOrder && listOrder.some(item => item.selected === true) && (
        <MyView style={styles.wrapBottom}>
          <MyTouchableOpacity
            style={styles.btnReset}
            onPress={() => handleReset()}>
            <Icon
              name="closeNoBG"
              width="30"
              height="30"
              color={Colors.semantics_Red_01}
            />
            <MyText style={styles.textReset}>{t('deselectAll')}</MyText>
          </MyTouchableOpacity>
          <Bottom
            titleBtn1={t('cancelOrder')}
            sticky={false}
            onPress1={() => openModalConfirm()}
            typeBtn1={1}
          />
        </MyView>
      )}
      <ModalConfirm
        isVisible={visibleModalConfirm}
        onClose={() => setVisibleModalConfirm(false)}
        title={t('notification')}
        content={t(contentNotification)}
        onConfirm={() => confirmCancel()}
      />
      <ModalDetailOrderDraft
        isVisible={visibleModalDetailOrder}
        onClose={() => setVisibleModalDetailOrder(false)}
        orderData={orderDetail}
        onRefresh={() => {
          setVisibleModalDetailOrder(false);
          Toast.show({
            type: 'success',
            props: {message: t('deleteDraftOrderSuccess')},
          });
          handleGetData();
        }}
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
  btnReset: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: Colors.semantics_Red_03,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: parseSizeWidth(10),
    paddingVertical: parseSizeHeight(4),
    borderRadius: 20,
    top: parseSizeWidth(-50),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textReset: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    textAlign: 'left',
    marginLeft: parseSizeWidth(2),
    color: Colors.semantics_Red_01,
  },
});
