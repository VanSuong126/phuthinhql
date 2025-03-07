import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';


import { MyView, MyText, MySafeAreaView, MyTouchableOpacity } from '~components/MyStyles';
import Bottom from '~components/Bottom';
import FlatList from '~components/FlatList';
import fetchData from '~providers';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import Icon from '~components/IconXML';
import ModalDetailOrder from '~modals/ModalDetailOrder';
import { managerActions, managerSelectors } from '~redux/reducers';

import {
    Colors,
    Sizes,
    parseSizeHeight,
    parseSizeWidth,
    FontStyles,
} from '~theme';

const Index = props => {
    const {title, typeScanHandle} = props?.route?.params;
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const listOrder = useSelector(state => managerSelectors.selectListOrderScan(state));

    const [visibleModalDetailOrder, setVisibleModalDetailOrder] = useState(false);
    const [orderIDDetail, setOrderIDDetail] = useState();

    // handle onPress item FlatList
    const handleOnPress = data => {
        switch (data?.action) {
            case 'selectOrder':
                const dataSelected =listOrder.map((order) => {
                    if (order.IDDonHang === data?.orderID) {
                        // Nếu đơn hàng đã có selected, đảo ngược trạng thái selected
                        return { ...order, selected: !order.selected };
                    }
                    return order;
                });
                dispatch(managerActions.setListOrderScan(dataSelected));
                break;
            case 'viewDetailOrder':
                setOrderIDDetail(data?.orderID);
                setVisibleModalDetailOrder(true);
                break;
            default:
                console.log('Unknown action');
        }
    };
    
    // update status order
    const updateStatusOrder = async () => {
        const listIdSuccess = [];
        // update list
            if (Array.isArray(listOrder) && listOrder.length > 0) {
                const selectedOrders = listOrder.filter(item => item.selected === true);
                if (selectedOrders) {
                    for (const order of selectedOrders) {
                        const isSuccess = await handleUpdateStatus({ idDonHang: order?.IDDonHang, status: typeScanHandle });
                        if (isSuccess) {
                            listIdSuccess.push(order?.IDDonHang);
                        }
                    }
                }
            }  
        const updatedListOrder = listOrder.filter(item => !listIdSuccess.includes(item?.IDDonHang));
        dispatch(managerActions.setListOrderScan(updatedListOrder));
        if(listIdSuccess.length>0)
        {
            Toast.show({
                type: 'success',
                props: {message: t('updateSuccess')},
              });
        }   
    }
    
    const handleUpdateStatus = async data => {
        const params = {
            CodeTrangThai: data?.status,
            IDDonHang: data?.idDonHang,
        };
        
        return new Promise(resolve => {
            fetchData(dispatch, 'updateStatusOrder', params, (res) => {
                if (res.success) {
                    resolve(true); // Trả về true nếu thành công
                } else {
                    resolve(false); // Trả về false nếu thất bại
                }
            });
        });
    }
    
    // handle clean selected
    const handleReset = () => {
        const updatedList = listOrder.map(item => ({
            ...item,
            selected: false
        }));
        dispatch(managerActions.setListOrderScan(updatedList));
    }

    return (
        <MySafeAreaView style={styles.container}>
            <HeaderToolBar nameHeaderTitle={title} />
            <MyView style={styles.content}>
                <FlatList
                    data={listOrder}
                    grid={false}
                    loading={false}
                    fetching={false}
                    type={'unConfirm'}
                    onPress={data => handleOnPress(data)}
                />
            </MyView>
            {listOrder && listOrder.some(item => item.selected === true) && (<MyView style={styles.wrapBottom}>
                <MyTouchableOpacity style={styles.btnReset} onPress={() => handleReset()}>
                    <Icon name="closeNoBG" width="30" height="30" color={Colors.semantics_Red_01} />
                    <MyText style={styles.textReset}>{t('deselectAll')}</MyText>
                </MyTouchableOpacity>
                <Bottom
                    titleBtn1={t('confirm')}
                    sticky={false}
                    onPress1={() => updateStatusOrder()}
                    typeBtn1={1}
                />
            </MyView>)}
            <ModalDetailOrder
                isVisible={visibleModalDetailOrder}
                onClose={() => setVisibleModalDetailOrder(false)}
                orderID={orderIDDetail}
                type={0}
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
    }
});
