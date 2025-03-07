import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
    MyView,
    MyTouchableOpacity,
    MyText} from '~components/MyStyles';
import { Colors, Sizes, FontStyles, parseSize, parseSizeHeight } from '~theme';
import Line from '~components/Line';

const Index = props => {
    const { data, onPress } = props;
    const { t } = useTranslation();
    const percent = Math.round((data?.TongCheckDat / (data?.TongCheckDat + data?.TongCheckThieu + data?.TongKhongCheck)) * 100);
    return (
        <MyTouchableOpacity style={styles.container}  onPress={() => onPress(data)}>
            <MyView style={styles.content}>
                <MyView style={styles.wrapHead}>
                    <MyView style={styles.wrapInfoUser}>
                        <MyView style={styles.wrapTextHead}>
                            <MyText style={styles.textName}>{data?.HoTen}</MyText>
                            <MyText style={styles.textPermission}>{data?.ChucVu}</MyText>
                        </MyView>
                    </MyView>
                    <MyView style={styles.wrapInfoUser}>
                        <MyView style={styles.wrapNumberBranch}>
                            <MyText style={styles.textNumberBranch}>{1} {t('place')}</MyText>
                        </MyView>
                    </MyView>
                </MyView>
                <Line color={Colors.neutrals_300} thickness={1} />
                <MyView style={styles.wrapDetail}>
                    <MyView style={styles.wrapPercent}>
                        <MyView style={styles.percent}>
                            <MyText style={styles.textPercent}>
                            {percent}%
                            </MyText>
                        </MyView>
                    </MyView>
                    <MyView style={styles.groupItem}>
                    <MyView style={styles.wrapItem}>
                            <MyText style={styles.textDetail}>{t('pass')}</MyText>
                            <MyText style={[styles.textValueDetail, {color: Colors.semantics_Green_01}]}>{data?.TongCheckDat}</MyText>
                        </MyView>
                        <MyView style={styles.wrapItem}>
                            <MyText style={styles.textDetail}>{t('noPass')}</MyText>
                            <MyText style={[styles.textValueDetail, {color: Colors.semantics_Red_01}]}>
                                {data?.TongCheckKhongDat}
                            </MyText>
                        </MyView>
                    </MyView>
                    <MyView style={styles.groupItem}>
                        <MyView style={styles.wrapItem}>
                            <MyText style={styles.textDetail}>{t('checkAPart')}</MyText>
                            <MyText style={[styles.textValueDetail, {color: Colors.semantics_Yellow_02}]}>{data?.TongCheckThieu}</MyText>
                        </MyView>
                        <MyView style={styles.wrapItem}>
                            <MyText style={styles.textDetail}>{t('missCheck')}</MyText>
                            <MyText style={styles.textValueDetail}>{data?.TongKhongCheck}</MyText>
                        </MyView>
                    </MyView>
                </MyView>
            </MyView>
        </MyTouchableOpacity>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        marginTop: parseSizeHeight(16),
        marginHorizontal: Sizes.marginWidth,
        borderColor: Colors.neutrals_300,
        borderWidth: Sizes.border,
        borderRadius: parseSizeHeight(16),
        backgroundColor: Colors.neutrals_50,
        paddingHorizontal: Sizes.paddingWidth,
        paddingVertical: parseSizeHeight(10),
    },
    wrapHead: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: parseSizeHeight(10),
    },
    wrapInfoUser: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    wrapTextHead: {
        gap: parseSizeHeight(5),
    },
    textName: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_subtitle1,
        fontWeight: '500',
        color: Colors.neutrals_900,
        textAlign: 'left',
    },
    textPermission: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_tagline1,
        fontWeight: '500',
        color: Colors.neutrals_700,
        textAlign: 'left',
    },
    textNumberBranch: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_tagline1,
        fontWeight: '500',
        color: Colors.semantics_Green_01,
        textAlign: 'right',

    },
    wrapNumberBranch: {
        backgroundColor: Colors.semantics_Green_03,
        paddingHorizontal: parseSizeHeight(16),
        paddingVertical: parseSizeHeight(4),
        borderRadius: 20,
    },
    wrapDetail: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:  parseSizeHeight(10),
        gap:parseSizeHeight(18),
    },
    groupItem: {
        flex: 0.45,
        justifyContent: 'space-between',
    },
    wrapItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 2,
        marginHorizontal: 1,
    },
    textDetail: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_tagline1,
        fontWeight: '500',
        color: Colors.semantics_Black,
        textAlign: 'left',
    }, 
    textValueDetail: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_tagline1,
        fontWeight: '500',
        color: Colors.semantics_Grey,
        textAlign: 'right',
    },
    wrapPercent: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Sizes.radius,
        padding: Sizes.padding / 2,
    },
    percent: {
        width: parseSize(40),
        height: parseSize(40),
        borderRadius: Sizes.radius * 5,
        backgroundColor: Colors.semantics_Green_01,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textPercent: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_subtitle2,
        fontWeight: '500',
        color: Colors.semantics_Green_03,
        textAlign: 'center',
    },

});
