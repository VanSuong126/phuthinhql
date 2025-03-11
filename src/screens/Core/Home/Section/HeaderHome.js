import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { MyView, MyText } from '~components/MyStyles';
import Icon from '~components/IconXML';
import LogoAvatar from '~assets/images/person.png';
import { Sizes, Colors, parseSizeHeight, parseSizeWidth } from '~theme';

export default function Index() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const dayCurrent = moment().format('DD');
    const monthCurrent = moment().format('MM');
    return (
        <MyView style={styles.header}>
            <Pressable
                style={styles.wrapAvatar}
                onPress={() => navigation.navigate('Profile')}>
                <Image source={LogoAvatar} resizeMode="contain" style={styles.avatar} />
            </Pressable>
            <MyView style={styles.wrapTodayDate}>
                <MyText style={styles.textDateToday}>{t(`day${dayCurrent}`)}, </MyText>
                <MyText style={styles.textMonthToday}>{t(`month${monthCurrent}`)}</MyText>
            </MyView>
            <MyView style={styles.wrapNotification}>
                <Icon name="bell" width="20" height="20" />
                <MyView style={styles.wrapNumberNotification}>
                    <MyText style={styles.textNumberNotification}>4</MyText>
                </MyView>
            </MyView>
        </MyView>
    );
}

const styles = StyleSheet.create({
    header: {
        marginVertical: parseSizeHeight(16),
        height: parseSizeHeight(50),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrapAvatar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: parseSizeWidth(42),
        height: parseSizeWidth(42),
        borderRadius: parseSizeWidth(50),
        borderColor: Colors.neutrals_50,
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: 'green',
    },
    wrapTodayDate: {
        flexDirection: 'row',
        height: parseSizeWidth(42),
        backgroundColor: Colors.neutrals_100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: parseSizeWidth(29),
        paddingVertical: parseSizeWidth(10),
        borderRadius: parseSizeWidth(100),
    },
    textDateToday: {
        fontSize: Sizes.text_subtitle1,
        fontWeight: '500',
        color: Colors.neutrals_950,
    },
    textMonthToday: {
        fontSize: Sizes.text_subtitle1,
        fontWeight: '500',
        color: Colors.neutrals_950,
    },
    wrapNotification: {
        height: parseSizeWidth(42),
        width: parseSizeWidth(42),
        backgroundColor: Colors.neutrals_100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: parseSizeWidth(42),
    },
    wrapNumberNotification: {
        position: 'absolute',
        top: 0,
        right: parseSizeWidth(4),
        backgroundColor: '#FFBA4B',
        paddingHorizontal: parseSizeWidth(3),
        paddingVertical: parseSizeWidth(1),
        borderRadius: parseSizeWidth(10),
    },
    textNumberNotification: {
        fontSize: parseSizeWidth(8),
        fontWeight: '500',
        color: Colors.semantics_Red_01,
    },
});
