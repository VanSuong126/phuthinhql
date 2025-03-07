import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { MyView, MyText, MyTouchableOpacity } from '~components/MyStyles';
import ModalSearchCustomer from '~modals/ModalSearchCustomer';
import fetchData from '~providers';
import Icon from '~components/IconXML';
import {
    Sizes,
    Colors,
    FontStyles,
    parseSizeHeight,
  } from '~theme';

import { salesActions, salesSelectors } from '~redux/reducers';


const Index = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [visibleModal, setVisibleModal] = useState(false);
    const [dataCustomer, setDataCustomer] = useState();

    const orderData = useSelector(state => salesSelectors.selectDataSales(state));


    const handleSearchSubmit = value => {
        fetchData(dispatch, 'findCustomerSell', { chuoitimkiem: value }, (res) => {
            if (res.success) {
                setDataCustomer(res.data);
            }
            else {
                setDataCustomer();
            }
        });

    };
    const handleSelected = item => {
        const dataUpdate =
        {
            ...orderData,
            idkhachhang: item?.IDKhachHang,
            hoKH: item?.Ho,
            tenKH: item?.Ten,
            dienthoaiKH: item?.DienThoai,
            emailKH: item?.Email,
            ho: item?.Ho,
            ten: item?.Ten,
            dienthoai: item?.DienThoai,
            diachi: item?.DiaChi,
            thanhpho: item?.ThanhPho,
            mabang: item?.MaBang,
            maquocgia: item?.MaQuocGia,
            tenquocgia: item?.TenQuocGia,
            tenbang: item?.TenBang,
            tenquan: item?.TenQuan,
            email: item?.Email,
            ngaysinh: item?.NgaySinhNhatDate,
            ngaysinhdate: item?.NgaySinhNhat,
            gioitinh: -1,
            ghichu: '',
        }
        dispatch(salesActions.setDataSales(dataUpdate));
        setVisibleModal(false);
    };

    return (
        <MyView style={{ paddingHorizontal: Sizes.paddingWidth }}>
            <MyTouchableOpacity style={styles.wrapOpenFind} onPress ={()=>setVisibleModal(true)}>
            <MyView style={styles.wrapTitle}>
                <Icon name={'list'} width={24} height={25} />
                <MyText style={styles.textTitle} >{t('enterFromList')}</MyText>
            </MyView>  
                <Icon name="rightArrow" width="24" height="24" />
            </MyTouchableOpacity>

            <ModalSearchCustomer
                isVisible={visibleModal}
                onClose={() => setVisibleModal(false)}
                data={dataCustomer}
                typeFlatlist="findUser"
                selected={item => handleSelected(item)}
                typeModal ={'searchCutomer'}
                onSearch ={value =>handleSearchSubmit(value) }
            />
        </MyView>
    );
};

export default Index;

const styles = StyleSheet.create({
    wrapOpenFind: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:5,
        borderWidth:2,
        backgroundColor: Colors.neutrals_100,
        borderColor: Colors.neutrals_300,
        paddingVertical:parseSizeHeight(10),
        paddingHorizontal:parseSizeHeight(24),
    },
    wrapTitle:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:parseSizeHeight(24),
    },
    textTitle:{
        fontFamily: FontStyles.InterRegular,
        fontWeight:'500',
        fontSize: Sizes.text_subtitle1,
        color: Colors.neutrals_700,
    }
})