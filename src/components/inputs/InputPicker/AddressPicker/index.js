import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import Icon from '~components/IconXML';
import {
    MyView,
    MyText,
    MyTouchableOpacity,
} from '~components/MyStyles';
import { salesActions, salesSelectors } from '~redux/reducers';
import ModalAddressPicker from '~modals/ModalAddressPicker';
import {
    Colors,
    Sizes,
    parseSizeHeight,
    FontStyles,
} from '~theme';

const Index = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    //init state
    const [visibleModalPicker, setVisibleModalPicker] = useState(false);

    // global state
    const orderData = useSelector(state => salesSelectors.selectDataSales(state));
    const deliveryData = useSelector(state => salesSelectors.selectDeliveryAddress(state));

    const handleSelectAddress = data => {
        const dataUpdate = {
            ...orderData,
            ho: data?.Ho,
            ten: data?.Ten,
            tenkhachhang: `${data?.Ho} ${data?.Ho}`,
            dienthoai: data?.DienThoai,
            dienthoainhan: data?.DienThoai,
            email: data?.Email,
            maquocgia: data?.MaQuocGia,
            tenquocgia: data?.TenQuocGia,
            mabang: data?.MaBang,
            tenbang: data?.TenBang,
            tenquan: data?.TenQuan,
            zipcode: data?.ThanhPho,
            thanhpho: data?.ThanhPho,
            diachi: data?.DiaChi,
        }
        dispatch(salesActions.setDataSales(dataUpdate));
    }

    return (
        <MyView style={styles.container}>
            <MyView style={styles.wrapIcon}>
                <Icon name="location" width="24" height="24" />
            </MyView>
            <MyView style={styles.wrapInfo}>
                <MyView style={styles.wrapTitle}>
                    <MyText style={styles.titleTitle}>{t('recipientInfo')}</MyText>
                    <MyTouchableOpacity onPress={() => setVisibleModalPicker(true)}>
                        <Icon name="rightArrow" width="24" height="24" />
                    </MyTouchableOpacity>
                </MyView>
                <MyView style={styles.wrapDetail}>
                    <MyText style={styles.textInfo}>{orderData?.ho} {orderData?.ten} | {orderData?.dienthoai}</MyText>
                    <MyText style={styles.textInfo}>{orderData?.diachi}</MyText>
                    <MyText style={styles.textInfo}>{orderData?.thanhpho}</MyText>
                </MyView>
            </MyView>
            <ModalAddressPicker
                isVisible={visibleModalPicker}
                onClose={() => setVisibleModalPicker(false)}
                data={deliveryData?.DiaChiNhanHang || []}
                typeFlatlist="deliveryAddress"
                selected={item => handleSelectAddress(item)}
            />
        </MyView>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        backgroundColor: Colors.neutrals_100,
        paddingHorizontal: Sizes.paddingWidth,
        paddingVertical: parseSizeHeight(10),
        borderWidth: 1,
        borderColor: Colors.neutrals_300,
    },
    wrapIcon:{
        flex:0.1,
      },
      wrapInfo:{
        flex:0.9,
      },
    wrapTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleTitle: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_subtitle1,
        fontWeight: '600',
        color: Colors.semantics_Black,
    },
    wrapDetail: {
        marginTop: parseSizeHeight(10),
        gap: parseSizeHeight(4),
    },
    textInfo: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_subtitle2,
        fontWeight: '500',
        color: Colors.semantics_Grey,
    },
})