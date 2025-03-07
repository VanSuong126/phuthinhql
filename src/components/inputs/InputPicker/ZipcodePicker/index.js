import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';

import { MyView, MyText } from '~components/MyStyles';
import { commonSelectors } from '~redux/reducers';
import ModalSearch from '~modals/ModalSearch';
import fetchData from '~providers';
import BoxArrowDown from '../BoxArrowDown';
import { Colors, Sizes, parseSizeHeight, FontStyles } from '~theme';

const Index = ({ labelName, countryCode, cityCode, value, styleContainer, styleText, onChangeValue, contentError='' }) => {
    const dispatch = useDispatch();
    const [visibleModal, setVisibleModal] = useState(false);
    const dataZipcode = useSelector(state => commonSelectors.selectListZipCode(state));
    const [dataConvert, setDataConvert] = useState([]);


    useEffect(() => {
        // nếu  countryCode và  cityCode tồn tại lấy dữ liệu ZipCode
        if (countryCode && cityCode) {
            setDataConvert([]);
            fetchData(dispatch, 'getListZipCode', { CountryCode: countryCode, StateCode: cityCode });
        }
        // ngược lại xóa dữ liệu ZipCode
        else {
            setDataConvert([]);
        }
    }, [countryCode, cityCode]);


    useEffect(() => {
        const updatedData = dataZipcode && dataZipcode.map((item, index) => ({
            value: index + 1,
            label: item?.SubdivisionName2,
            districtName: item?.CityName,
            wardName: item?.CityName2,
            selected: item?.SubdivisionName2 === value?.zipcode,
        }));
        setDataConvert(updatedData);
    }, [dataZipcode, value]);


    return (
        <MyView style={styles.container}>
            <BoxArrowDown
                labelName={labelName}
                value={value?.zipcode || ''}
                styleContainer={styleContainer}
                styleText={styleText}
                onPress={() => setVisibleModal(true)}
            />
            {contentError && (
                <MyText style={styles.txtError}>
                    {'* '}
                    {contentError}
                </MyText>
            )}
            <ModalSearch
                isVisible={visibleModal}
                onClose={() => setVisibleModal(false)}
                data={dataConvert}
                typeFlatlist="findZipCode"
                selected={item => onChangeValue(item)}
            />

        </MyView>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    txtError: {
        paddingTop: parseSizeHeight(5),
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_tagline2,
        fontWeight: '400',
        color: Colors.semantics_Red_02,
    },
});
