import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { MyView, MyText } from '~components/MyStyles';
import { useTranslation } from 'react-i18next';
import {
    Colors,
    Sizes,
    parseSize,
    parseSizeHeight,
    FontStyles,
    parseSizeWidth,
    Height,
    Width,
} from '~theme';

const Index = ({ value, onSelect }) => {
    const { t } = useTranslation();
    const options = [
        { label: t('male'), gender: 1 },
        { label: t('female'), gender: 0 },
        { label: t('unselected'), gender: -1 },
    ];

    return (
        <MyView style={styles.content}>
            {options.map(({ label, gender }) => (
                <Pressable
                    key={gender}
                    style={[styles.button, value === gender && styles.selected]}
                    onPress={() => onSelect(gender)}
                >
                    <MyText style={[styles.text,value === gender && styles.textSelected]}>{label}</MyText>
                </Pressable>
            ))}
        </MyView>
    );
};

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        gap: parseSizeWidth(16),
    },
    button: {
        backgroundColor: Colors.semantics_Green_03,
        paddingHorizontal:parseSizeWidth(24),
        paddingVertical:parseSizeHeight(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:100,
    },
    selected: {
        backgroundColor: Colors.semantics_Green_02
    },
    text: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_body2,
        color: Colors.semantics_Green_01,
        fontSize: Sizes.text_subtitle2,
    },
    textSelected: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_body2,
        color: Colors.neutrals_50,
    },
});

export default Index;
