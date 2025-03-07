import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import moment from 'moment';

import { MyView, MyText, MySafeAreaView, MyTouchableOpacity } from '~components/MyStyles';
import { Colors, Sizes, parseSizeHeight, parseSizeWidth, FontStyles } from '~theme';
import { salesActions, commonActions } from '~redux/reducers';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import Icon from '~components/IconXML';
import InputSearch from '~inputs/InputSearch';
import FlatList from '~components/FlatList';
import fetchData from '~providers';
import convertDataOrder from '~helper/convertDataOrder';
import ModalDetailOrder from '~modals/ModalDetailOrder';
import ModalItemSelector from '~modals/ModalItemSelector';
import ModalHistoryRequest from '~modals/ModalHistoryRequest';


const Index = props => {
    const { fromDate, toDate } = props?.route?.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { t } = useTranslation();

    const [stringSearch, setStringSearch] = useState('');
    const [listOrderOrigin, setListOrderOrigin] = useState();
    const [orderIdSelected, setOrderIdSelected] = useState();

    const [listOrder, setListOrder] = useState([]);
    const [visibleModalDetailOrder, setVisibleModalDetailOrder] = useState(false);
    const [visibleModalHistory, setVisibleModalHistory] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('0');
    const [visibleModalSelector, setVisibleModalSelector] = useState(false);
    const [loading, setLoading] = useState(false);
    const [typeHandle, setTypeHandle] = useState();
    const [dataHistoryRequest, setDataHistoryRequest] = useState([]);

    const listFilter = [
        {
            value: '0', label: t('waiting')
        },
        {
            value: '1,7', label: t('result')
        }
    ]
    const option = [
        { type: 0, value: 62, label: t('accept'), nameIcon: 'tick' },
        { type: 0, value: 67, label: t('reject'), nameIcon: 'reject' },
        { type: 1, value: 68, label: t('editOrder'), nameIcon: 'edit' },
        { type: 1, value: 3, label: t('cancelOrder'), nameIcon: 'reject' },
    ];

    useFocusEffect(
        React.useCallback(() => {
            handleGetData();
        }, [selectedFilter]),
    );

    const handleGetData = () => {
        setLoading(true);
        const params = {
            loai: 16,
            tungay: moment(fromDate).format('YYYY-MM-DD'),
            denngay: moment(toDate).format('YYYY-MM-DD'),
            trangthaiyeucau: selectedFilter,
        }
        fetchData(dispatch, 'getListOrder', params, (res) => {
            if (res?.success === true) {
                setListOrderOrigin(res.data);
                if (stringSearch) {
                    const dataFilter = res.data;
                    const matchSearch = (order) => {
                        const fields = ['MaDonHang', 'HoTenNguoiNhan', 'DienThoaiNguoiNhan', 'HoTenNguoiTao', 'HoTenNguoiPheDuyet'];
                        return fields.some(field => order?.[field]?.includes(stringSearch));
                    };
                    // Lọc danh sách để chỉ giữ lại các đơn hàng chứa chuỗi tìm kiếm
                    const listOrderFiltered = dataFilter.filter(order => matchSearch(order));
                    // Cập nhật danh sách đơn hàng đã lọc
                    setListOrder(listOrderFiltered);
                }
                else {
                    setListOrder(res.data);
                }
                setLoading(false);
            }
            else {
                Toast.show({
                    type: 'error',
                    props: { message: res?.message || t('noData') },
                });
                setListOrderOrigin();
                setListOrder();
                setLoading(false);
            }
        });
    };

    // handle search
    const handleFind = () => {
        if (listOrderOrigin.length > 0) {
            // Hàm kiểm tra xem đơn hàng có chứa chuỗi tìm kiếm không
            const matchSearch = (order) => {
                const fields = ['MaDonHang', 'HoTenNguoiNhan', 'DienThoaiNguoiNhan', 'HoTenNguoiTao', 'HoTenNguoiPheDuyet'];
                return fields.some(field => order?.[field]?.includes(stringSearch));
            };

            // Lọc danh sách để chỉ giữ lại các đơn hàng chứa chuỗi tìm kiếm
            const listOrderFiltered = listOrderOrigin.filter(order => matchSearch(order));

            // Cập nhật danh sách đơn hàng đã lọc
            setListOrder(listOrderFiltered);
        }
    };


    const handleOnPress = data => {
        switch (data?.action) {
            case 'viewDetailOrder':
                setOrderIdSelected(data?.orderID);
                setVisibleModalDetailOrder(true);
                break;
            case 'processRequest':
                setOrderIdSelected(data?.orderID);
                setVisibleModalSelector(true);
                setTypeHandle(0);
                break;
            case 'processOrder':
                setOrderIdSelected(data?.orderID);
                setVisibleModalSelector(true);
                setTypeHandle(1);
                break;
            case 'viewHistory':
                const params = {
                    loai: 17,
                    tungay: moment(fromDate).format('YYYY-MM-DD'),
                    denngay: moment(toDate).format('YYYY-MM-DD'),
                    iddonhang: data?.orderID,
                }
                fetchData(dispatch, 'getListOrder', params, (res) => {
                    if (res?.success === true) {
                        setDataHistoryRequest(res?.data);
                        setVisibleModalHistory(true);
                    }
                    else {
                        Toast.show({
                            type: 'error',
                            props: { message: res?.message || t('noData') },
                        });
                    }
                });
                break;
            default:
                console.log('Unknown action');
        }
    };

    // handle clean selected
    const handleReset = () => {
        const updatedList = listOrder.map(item => ({
            ...item,
            selected: false
        }));
        setListOrder(updatedList);
    }
    //
    const handleEditOrder = (IdDonHang) => {
        fetchData(dispatch, 'getDetailOrder', {
            loai: 12,
            iddonhang: IdDonHang,
        }, (res) => {
            if (res?.success === true) {
                const dataOrder = res?.data?.DonHang[0]
                const result = convertDataOrder(dataOrder);
                if (result.error) {
                    Toast.show({
                        type: 'error',
                        props: { message: result.error },
                    });

                } else {
                    dispatch(salesActions.setDataSales(result));
                    dispatch(commonActions.setListDiscount(result?.magiamgia));
                    navigation.navigate('thong-tin-khach-hang');
                }
            }
        })
    }

    const handleSelectedRequest = data => {
        if (data.value === 68) {
            handleEditOrder(orderIdSelected);
        }
        else {
            const params = {
                loai: data?.value,
                IdDonHang: orderIdSelected,
            };
            fetchData(dispatch, 'updateStatusOrder', params, (res) => {
                if (res.success) {
                    Toast.show({
                        type: 'success',
                        props: { message: t('handled') },
                    });
                    handleGetData();
                } else {
                    Toast.show({
                        type: 'success',
                        props: { message: t('errorInProcessing') },
                    });
                }
            });
        }
    }
    return (
        <MySafeAreaView style={styles.container}>
            <HeaderToolBar nameHeaderTitle={t('requestCancelOrder')} />
            <InputSearch
                value={stringSearch}
                type="Secondary"
                styleInputSearch={styles.seacrch}
                placeholder={t('searchOrder')}
                getString={value => setStringSearch(value)}
                onSearch={() => handleFind()}
            />
            <MyView style={styles.wrapFilter}>
                {listFilter.map((item) => (
                    <MyTouchableOpacity
                        key={item.value}
                        style={[
                            styles.filterButton,
                            selectedFilter === item?.value && {
                                backgroundColor: Colors.semantics_Green_03,
                                borderWidth: 1,
                                borderColor: Colors.semantics_Green_02,
                            },
                        ]}
                        onPress={() => setSelectedFilter(item?.value)}
                    >
                        <MyText style={[styles.textFilter,
                        selectedFilter === item?.value && {
                            color: Colors.semantics_Green_01,
                        },
                        ]}>{item.label}</MyText>
                    </MyTouchableOpacity>
                ))}
            </MyView>
            <MyView style={styles.content}>
                <FlatList
                    data={listOrder}
                    grid={false}
                    loading={loading}
                    fetching={false}
                    type={'requestOrder'}
                    onPress={data => handleOnPress(data)}
                />
            </MyView>
            <MyView style={styles.wrapBottom}>
                {listOrder && listOrder.some(item => item.selected === true) && <MyTouchableOpacity style={styles.btnReset} onPress={() => handleReset()}>
                    <Icon name="closeNoBG" width="30" height="30" color={Colors.semantics_Red_01} />
                    <MyText style={styles.textReset}>{t('deselectAll')}</MyText>
                </MyTouchableOpacity>}

            </MyView>

            <ModalDetailOrder
                isVisible={visibleModalDetailOrder}
                onClose={() => setVisibleModalDetailOrder(false)}
                orderID={orderIdSelected}
                type={0}
            />
            <ModalItemSelector
                isVisible={visibleModalSelector}
                onClose={() => setVisibleModalSelector(false)}
                data={option.filter(x => x.type === typeHandle)}
                getItem={item => handleSelectedRequest(item)}
            />
            <ModalHistoryRequest
                isVisible={visibleModalHistory}
                onClose={() => setVisibleModalHistory(false)}
                data={dataHistoryRequest}
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
    wrapFilter: {
        marginTop: Sizes.marginHeight,
        marginHorizontal: Sizes.marginWidth,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: Sizes.marginWidth,
    },
    filterButton: {
        paddingHorizontal: parseSizeWidth(24),
        paddingVertical: parseSizeWidth(10),
        backgroundColor: Colors.neutrals_200,
        borderRadius: 100,
    },
    textFilter: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_subtitle2,
        fontWeight: '500',
        color: Colors.neutrals_700,
    }
});
