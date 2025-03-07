import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { MyView, MyText, MyTouchableOpacity } from '~components/MyStyles';
import Icon from '~components/IconXML';
import { Sizes, Colors, FontStyles, parseSizeHeight, parseSizeWidth } from '~theme';
import fetchData from '~providers';
import FilterOption from '~components/FilterOption';


const Index = ({getData}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [visibleModalMerit, setVisibleModalMerit] = useState(false);
    const [dataMerit, setDataMerit] = useState();

    useEffect(() => {
        if (dataMerit && dataMerit.dataFilter) {
            const selectedItems = dataMerit.dataFilter.filter(item => item.selected); // Lọc các item đã chọn
            const IDChiTietDichVuCongThem = selectedItems.length > 0 
                ? selectedItems.map(item => item.value).join(',')
                : ''; // Nếu không có item nào được chọn, trả về chuỗi rỗng
            const labels = selectedItems.length > 0 
                ? selectedItems.map(item => item.label) 
                : []; // Nếu không có item nào được chọn, trả về mảng rỗng
            const NoiDungDichVuCongThem = labels.length > 0 
                ? `Xin vía (${labels.join(', ')})`
                : ''; // Nếu không có label nào, trả về chuỗi rỗng
    
            const dataGet = {
                "DichVuCongThem": [
                    {
                        "IDSanPham": dataMerit?.IDDichVuCongThem || '', // Kiểm tra null/undefined
                        "SoLuong": 1,
                        "IDChiTietDichVuCongThem": IDChiTietDichVuCongThem
                    }
                ],
                "NoiDungDichVuCongThem": NoiDungDichVuCongThem
            };
            getData(dataGet); // Gọi hàm getData với dữ liệu đã chuẩn bị
        }
    }, [dataMerit]);
    

    useEffect(() => {
        fetchData(dispatch, 'getExtraService', { loai: 1 }, (data) => {
            if (data?.success === true) {
                const dataConvert = data?.data[0]?.ChiTiet.map((item, index) => ({
                    value: item?.IDChiTietDichVuCongThem,
                    label: item.TenChiTietDichVuCongThem,
                    selected: false
                }));
                setDataMerit({...data?.data[0],dataFilter:dataConvert });
            }
        })
    }, []);

    const handleApplyMerit = (selectedData) => {
        const updatedMerit = dataMerit?.dataFilter.map(item => ({
            ...item,
            selected: selectedData.some(selectedItem => selectedItem.value === item.value)
        }));
        setDataMerit(prev => ({
            ...prev,
            dataFilter: updatedMerit
        }));
    };
    
    const handleRemoveMerit = (item) => {
        const updatedMerit = dataMerit?.dataFilter.map(i => ({
            ...i,
            selected: i.value === item.value ? false : i.selected
        }));
        setDataMerit(prev => ({
            ...prev,
            dataFilter: updatedMerit
        }));
    };
    
    return (
        <MyView style={styles.container}>
            <MyView style={styles.content}>
                <MyView style={styles.header}>
                    <MyView style={styles.wrapTitle}>
                        <Icon name="dvctWishLuck" width="36" height="36" />
                        <MyText style={styles.title}>{t('wishLuck')}</MyText>
                    </MyView>
                    <MyTouchableOpacity style={styles.wrapMoreIcon} onPress={() => setVisibleModalMerit(true)}>
                        <Icon name="plus" width="24" height="24" color={Colors.semantics_Green_02} />
                    </MyTouchableOpacity>
                </MyView>
                <MyView style={styles.body}>
                    {dataMerit?.dataFilter && dataMerit?.dataFilter.map((item, index) => (
                        item?.selected && (
                            <MyView key={index} style={styles.wrapItemSelected}>
                                <MyText style={styles.textWish}>{item?.label}</MyText>
                                <MyTouchableOpacity style={styles.wrapIconRemove} onPress={() => handleRemoveMerit(item)}>
                                    <Icon name="close" width="18" height="18" color={Colors.semantics_Black} />
                                </MyTouchableOpacity>
                            </MyView>
                        )
                    ))}
                </MyView>

            </MyView>
            <FilterOption
                isVisible={visibleModalMerit}
                onClose={() => setVisibleModalMerit(false)}
                data={dataMerit?.dataFilter||[]}
                onListOption={data => handleApplyMerit(data)}
                limitSelect={-1}
            />
        </MyView>
    )
}
export default Index

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.neutrals_100,
        borderColor: Colors.neutrals_300,
        borderWidth: 1,
    },
    content: {
        paddingVertical: parseSizeHeight(10),
        paddingHorizontal: Sizes.paddingWidth,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrapTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
    },
    title: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_subtitle1,
        fontWeight: '500',
        textAlign: 'left',
        color: Colors.semantics_Black,
    },
    wrapMoreIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flexDirection: 'row',
        gap: parseSizeWidth(8),
        flexWrap: 'wrap',
    },
    wrapItemSelected: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: parseSizeWidth(4),
        backgroundColor: Colors.neutrals_100,
        borderRadius: 16,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: Colors.neutrals_300,
        paddingHorizontal: parseSizeWidth(16),
        paddingVertical: parseSizeHeight(4),
        marginVertical: parseSizeHeight(4),
    },
    textWish: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_tagline1,
        fontWeight: '500',
        textAlign: 'left',
        color: Colors.semantics_Grey,
    },
})