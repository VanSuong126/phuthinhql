import { StyleSheet } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import Icon from '~components/IconXML';
import {
    Colors,
    Sizes,
    FontStyles,
    parseSizeHeight,
    parseSizeWidth,
} from '~theme';
import { MyText, MyView, MySafeAreaView, MyTouchableOpacity } from '~components/MyStyles';


const Index = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dataTypeScan = [
        { id:0 ,value: 'daxacnhan', label: t('confirmOrderOnline') },
        { id:1 ,value: 'dangvanchuyen', label: t('confirmOrderShipment') },
        { id:2,value: 'dagiaohang', label: t('confirmOrderComplete') },
    ]

    return (
        <MySafeAreaView style={styles.container}>
        <MyView style={styles.content}>
            {dataTypeScan.map((item, index) => (
                <MyTouchableOpacity 
                    key={index} 
                    style={styles.wrapDropDown} 
                    onPress={() => navigation.navigate('quet-ma-xu-ly-don',{typeScanHandle:item?.value, title : item?.label})} 
                >
                    <Icon name={'scan'} width="24" height="24"  />
                    <MyText style={styles.textItem}>{item?.label}</MyText>
                    <Icon name="arrowRight" width="18" height="18" />
                </MyTouchableOpacity>
            ))}
        </MyView>
    </MySafeAreaView>    
    )
}

export default Index;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
    },
    content: {
        paddingHorizontal: Sizes.paddingWidth,
        gap:parseSizeHeight(15),
    },
    wrapDropDown: {
        height: parseSizeHeight(64),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.paddingWidth,
        borderColor: Colors.neutrals_300,
        borderRadius: 12,
        shadowColor: Colors.black,
        backgroundColor: Colors.neutrals_100,
        borderStyle: 'solid',
        borderWidth: 1,
        // borderColor: '#dddde3',
    },
    textItem: {
        flex: 1,
        marginLeft: parseSizeWidth(23),
        fontFamily: FontStyles.InterRegular,
        fontWeight: '500',
        fontSize: Sizes.text_subtitle1,
        color: Colors.neutrals_700,
    },
})
