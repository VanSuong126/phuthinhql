import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';
import moment from 'moment';

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
import {PrintShipLabel, PrintInvoice} from '~helper/print';
import Icon from '~components/IconXML';
import ModalDetailOrder from '~modals/ModalDetailOrder';
import ModalReason from '~modals/ModalReason';
import Bottom2 from '~components/Bottom2';
import convertDataOrder from '~helper/convertDataOrder';
import {salesActions, commonActions} from '~redux/reducers';
import {listRole} from '~constants';
import FilterOption from '~components/FilterOption';

import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';

const Index = props => {
  const {type, fromDate, toDate} = props?.route?.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [stringSearch, setStringSearch] = useState('');
  const [listOrder, setListOrder] = useState();
  const [listOrderOrigin, setListOrderOrigin] = useState();
  const [visibleModalDetailOrder, setVisibleModalDetailOrder] = useState(false);
  const [orderIdSelected, setOrderIdSelected] = useState();
  const [visibleModalReason, setVisibleModalReason] = useState(false);
  const [titleReason, setTitleReason] = useState('');
  const [reasonDefault, setReasonDefault] = useState('');
  const [editOrderRole, setEditOrderRole] = useState(false);
  const [typeProcess, setTypeProcess] = useState('');
  const [filterOption, setFilterOption] = useState(false);
  const [dataFilter, setDataFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState();

  useFocusEffect(
    React.useCallback(() => {
      handleGetData();
    }, [type, fromDate, toDate]),
  );

  useEffect(() => {
    if (listOrderOrigin) {
      const uniqueListOrder = listOrderOrigin
        .filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              t => t.IDTinhTrangDonHang === item.IDTinhTrangDonHang,
            ),
        )
        .map(item => ({
          value: item.IDTinhTrangDonHang,
          label: item.TinhTrangDonHang,
          icon: 'key',
        }));
      setDataFilter(uniqueListOrder);
    }
  }, [listOrderOrigin]);

  useEffect(() => {
    const checkRole = async () => {
      const roles = await listRole();
      setEditOrderRole(roles.includes('order'));
    };
    checkRole();
  }, []);

  const handleGetData = () => {
    const params = {
      loai: type?.id,
      tungay: moment(fromDate).format('YYYY-MM-DD'),
      denngay: moment(toDate).format('YYYY-MM-DD'),
      chuoitimkiem: '',
    };
    fetchData(dispatch, 'findOrder', params, res => {
      if (res?.success === true) {
        setListOrderOrigin(res.data);
        if (stringSearch) {
          const dataFilter = res.data;
          const matchSearch = order => {
            const fields = [
              'MaDonHang',
              'DienThoaiNguoiNhan',
              'HoNguoiNhan',
              'TenNguoiNhan',
              'DiaChiNhan',
              'ThanhPhoNhan',
            ];
            return fields.some(field => order?.[field]?.includes(stringSearch));
          };
          // Lọc danh sách để chỉ giữ lại các đơn hàng chứa chuỗi tìm kiếm
          const listOrderFiltered = dataFilter.filter(order =>
            matchSearch(order),
          );
          // Cập nhật danh sách đơn hàng đã lọc
          setListOrder(listOrderFiltered);
        } else {
          setListOrder(res.data);
        }
      } else {
        Toast.show({
          type: 'error',
          props: {message: res?.message || t('noData')},
        });
        setListOrderOrigin();
        setListOrder();
      }
    });
  };
  // handle search
  const handleFind = () => {
    if (listOrderOrigin.length > 0) {
      // Hàm kiểm tra xem đơn hàng có chứa chuỗi tìm kiếm không
      const matchSearch = order => {
        const fields = [
          'MaDonHang',
          'DienThoaiNguoiNhan',
          'HoNguoiNhan',
          'TenNguoiNhan',
          'DiaChiNhan',
          'ThanhPhoNhan',
        ];
        return fields.some(field => order?.[field]?.includes(stringSearch));
      };

      // Lọc danh sách để chỉ giữ lại các đơn hàng chứa chuỗi tìm kiếm
      const listOrderFiltered = listOrderOrigin.filter(order =>
        matchSearch(order),
      );

      // Cập nhật danh sách đơn hàng đã lọc
      setListOrder(listOrderFiltered);
    }
  };

  // handle onPress item FlatList
  const handleOnPress = data => {
    switch (data?.action) {
      case 'selectOrder':
        setListOrder(prevListOrder =>
          prevListOrder.map(order => {
            if (order.IDDonHang === data?.orderID) {
              // Nếu đơn hàng đã có selected, đảo ngược trạng thái selected
              return {...order, selected: !order.selected};
            }
            return order;
          }),
        );
        break;
      case 'viewDetailOrder':
        setOrderIdSelected(data?.orderID);
        setVisibleModalDetailOrder(true);
        break;
      case 'editOrder':
        setOrderIdSelected(data?.orderID);
        handleRequestUpdate('updateOrder');
        break;
      case 'shipOrder':
        navigation.navigate('giao-hang', {orderID: data?.orderID});
        break;
      case 'printInvoice':
        printInvoice(data?.orderCode);
        break;
      case 'printLabel':
        printLabel(data?.orderCode);
        break;
      default:
        console.log('Unknown action');
    }
  };

  // get data Invoice
  const printInvoice = orderCode => {
    const params = {
      loai: 1,
      madonhang: orderCode,
    };
    fetchData(dispatch, 'getDetailOrder', params, res => {
      if (res?.success === true) {
        PrintInvoice({data: res?.data});
      } else {
        Toast.show({
          type: 'error',
          props: {message: t('dataInvoiceError')},
        });
      }
    });
  };
  // get data label
  const printLabel = orderCode => {
    const params = {
      madonhang: orderCode,
    };
    fetchData(dispatch, 'printLabel', params, res => {
      if (res?.success === true) {
        const dataOrder = {
          NguoiNhan: res?.data?.HoTenNguoiNhan,
          DienThoaiKhachHang: res?.data?.DienThoaiNguoiNhan,
          DiaChiNhan: res?.data?.DiaChiNhan,
        };
        PrintShipLabel({data: dataOrder, shipCode: res?.data?.MaVanDon});
      } else {
        Toast.show({
          type: 'error',
          props: {message: t('dataLabelError')},
        });
      }
    });
  };
  // open modal confirm update
  const handleRequestUpdate = kind => {
    switch (kind) {
      case 'confirmOrder':
        setVisibleModalReason(true);
        setTitleReason(t('reasonConfirmOrder'));
        setReasonDefault(t('confirmOrderOnline'));
        setTypeProcess('confirmOrder');
        break;
      case 'updateOrder':
        setVisibleModalReason(true);
        setTitleReason(t('reasonUpdateOrder'));
        setTypeProcess('updateOrder');
        break;
      case 'requestCancel':
        setVisibleModalReason(true);
        setTitleReason(t('reasonRequestCancel'));
        setTypeProcess('requestCancel');
        break;
      case 'cancelOrder':
        setVisibleModalReason(true);
        setTitleReason(t('reasonCancelOrder'));
        setTypeProcess('cancelOrder');
        break;
      default:
        console.warn('Loại yêu cầu không hợp lệ:', kind);
        break;
    }
  };
  // edit order
  const handleEditOrder = IdDonHang => {
    fetchData(
      dispatch,
      'getDetailOrder',
      {
        loai: 12,
        iddonhang: IdDonHang,
      },
      res => {
        if (res?.success === true) {
          const dataOrder = res?.data?.DonHang[0];
          const result = convertDataOrder(dataOrder);
          if (result.error) {
            Toast.show({
              type: 'error',
              props: {message: result.error},
            });
          } else {
            dispatch(salesActions.setDataSales(result));
            dispatch(commonActions.setListDiscount(result?.magiamgia));
            navigation.navigate('thong-tin-khach-hang');
          }
        }
      },
    );
  };
  // update status order
  const confirmUpdateOrder = async data => {
    // update list
    if (data?.typeUpdate === 'list') {
      if (Array.isArray(listOrder) && listOrder.length > 0) {
        const selectedOrders = listOrder.filter(item => item.selected === true);
        if (selectedOrders.length > 0) {
          const listOfIDs = selectedOrders
            .map(item => item.IDDonHang)
            .join(',');
          const paramsConfig = {
            confirmOrder: {loai: 1, CodeTrangThai: 'daxacnhan'},
            requestCancel: {loai: 60},
            cancelOrder: {loai: 1, CodeTrangThai: 'dahuydon'},
          };

          const params = {
            ...paramsConfig[typeProcess],
            lstIdDonHang: listOfIDs,
            GhiChu: data?.reason,
          };
          fetchData(dispatch, 'updateStatusOrder', params, res => {
            if (res.success) {
              Toast.show({
                type: 'success',
                props: {message: t('updateSuccess')},
              });
              handleGetData();
            } else {
              Toast.show({
                type: 'error',
                props: {message: result.error},
              });
            }
          });
        }
      }
    }

    // update item
    else {
      switch (data?.status) {
        case 'updateOrder':
          const param1 = {
            loai: 68,
            IdDonHang: data?.IdDonHang,
            GhiChu: data?.reason,
          };
          const isSuccess1 = await handleUpdateStatus(param1);
          if (isSuccess1) {
            handleEditOrder(data?.IdDonHang);
          }
          break;
        case 'requestCancel':
          const param2 = {
            loai: 60,
            IdDonHang: data?.IdDonHang,
            GhiChu: data?.reason,
          };
          const isSuccess2 = await handleUpdateStatus(param2);
          if (isSuccess2) {
            handleGetData();
          }
          break;
        case 'cancelOrder':
          const param3 = {
            loai: 3,
            IdDonHang: data?.IdDonHang,
            GhiChu: data?.reason,
          };
          const isSuccess3 = await handleUpdateStatus(param3);
          if (isSuccess3) {
            handleGetData();
          }
          break;
        case 'confirmOrder':
          const param0 = {
            loai: 1,
            CodeTrangThai: 'daxacnhan',
            IdDonHang: data?.IdDonHang,
            GhiChu: data?.reason,
          };
          const isSuccess0 = await handleUpdateStatus(param0);
          if (isSuccess0) {
            handleGetData();
          }
          break;
        default:
          console.warn('Loại yêu cầu không hợp lệ:');
          break;
      }
    }
  };

  const handleUpdateStatus = async data => {
    const params = {
      loai: data?.loai,
      CodeTrangThai: data?.CodeTrangThai,
      IdDonHang: data?.IdDonHang,
      GhiChu: data?.GhiChu,
    };
    return new Promise(resolve => {
      fetchData(dispatch, 'updateStatusOrder', params, res => {
        if (res.success) {
          resolve(true); // Trả về true nếu thành công
        } else {
          resolve(false); // Trả về false nếu thất bại
        }
      });
    });
  };

  // click confirm Reason
  const handleConfirmReason = reason => {
    if (typeProcess === 'updateOrder') {
      // điều chỉnh đơn chỉ điều chỉnh theo item
      confirmUpdateOrder({
        typeUpdate: 'item',
        IdDonHang: orderIdSelected,
        status: 'updateOrder',
        reason: reason,
      });
    } else {
      confirmUpdateOrder({typeUpdate: 'list', reason: reason});
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
  const handlFilter = () => {
    if (listOrder) {
      setFilterOption(true);
    }
  };
  const handleApplyOption = data => {
    const selectedValues = data.map(item => item.value);
    const updatedDataFilter = dataFilter.map(item => ({
      ...item,
      selected: selectedValues.includes(item.value),
    }));

    setStatusFilter(selectedValues);
    setDataFilter(updatedDataFilter);
    console.log(selectedValues);
  };

  return (
    <MySafeAreaView style={styles.container}>
      <FilterOption
        isVisible={filterOption}
        onClose={() => setFilterOption(false)}
        icon={'key'}
        data={dataFilter}
        onListOption={value => handleApplyOption(value)}
        limitSelect={-1}
      />
      <HeaderToolBar
        nameHeaderTitle={type?.label}
        iconRight={type.id === 0 ? 'filter' : null}
        onPressRight={() => handlFilter()}
      />
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
          data={
            listOrder &&
            (statusFilter?.length > 0
              ? listOrder.filter(item =>
                  statusFilter.includes(item.IDTinhTrangDonHang),
                )
              : listOrder)
          }
          grid={false}
          loading={false}
          fetching={false}
          type={type?.value}
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
          {type?.id === 1 ? (
            <Bottom
              titleBtn1={t('cancelOrder')}
              titleBtn2={t('confirmOrder')}
              sticky={false}
              onPress1={() => handleRequestUpdate('cancelOrder')}
              onPress2={() => handleRequestUpdate('confirmOrder')}
              typeBtn1={1}
            />
          ) : type?.id === 2 ? (
            <Bottom2
              listButton={[
                // Yêu cầu hủy xác nhận đơn
                {
                  title: t('cancelConfirm'),
                  typeButton: 4,
                  onPress: () => handleRequestUpdate('requestCancel'),
                  visible: !editOrderRole ? true : false,
                  size: 'primary',
                },
                // Hủy đơn
                {
                  title: t('cancelOrder'),
                  onPress: () => handleRequestUpdate('cancelOrder'),
                  typeButton: 4,
                  size: 'primary',
                  visible: editOrderRole ? true : false,
                },
              ]}
            />
          ) : null}
        </MyView>
      )}
      <ModalDetailOrder
        isVisible={visibleModalDetailOrder}
        onClose={() => setVisibleModalDetailOrder(false)}
        orderID={orderIdSelected}
        type={type?.id}
        onUpdate={data =>
          confirmUpdateOrder({
            typeUpdate: 'item',
            IdDonHang: data?.orderID,
            status: data?.status,
            reason: data?.reason,
          })
        }
      />
      <ModalReason
        isVisible={visibleModalReason}
        onClose={() => setVisibleModalReason(false)}
        onConfirm={reason => handleConfirmReason(reason)}
        titleReason={titleReason}
        deafault={reasonDefault}
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
