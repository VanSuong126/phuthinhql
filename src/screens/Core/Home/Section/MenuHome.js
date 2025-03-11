import React from "react";
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet } from "react-native";
import { MyView, MyTouchableOpacity, MyText } from '~components/MyStyles';
import { useNavigation } from "@react-navigation/native";
import { dataMenu } from "~data/dataMenu";
import { Sizes, Colors, parseSizeWidth } from '~theme';

const MenuScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    return (
        <MyView style={styles.container}>
            {dataMenu.map((item) => (
                <MyTouchableOpacity
                    key={item.id}
                    style={styles.menuItem}
                    onPress={() => navigation.navigate(item.nameNavigation)}
                >
                    <MyView style={styles.wrapIconMenu}>
                        <Image source={item?.linkIcon} style={styles.icon} />
                    </MyView>
                    <MyView style={styles.wrapNameMenu}>
                        <MyText style={styles.nameMenu}>{t(item?.nameMenu)}</MyText>
                    </MyView>
                </MyTouchableOpacity>
            ))}
        </MyView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: parseSizeWidth(14),
    },
    menuItem: {
        flex: 1, // Co giãn tự động
        minWidth: "20%", // Đảm bảo không quá nhỏ
        maxWidth: "25%", // Giới hạn để không quá to
        alignItems: "center",
        gap:parseSizeWidth(6),
    },
    wrapIconMenu:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        height:parseSizeWidth(80),
        borderRadius:parseSizeWidth(8),
        backgroundColor: Colors.brand_01_tint50,
    },
    icon: {
        width: parseSizeWidth(42),
        height: parseSizeWidth(42),
        resizeMode: "contain",
    },
    wrapNameMenu: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    nameMenu: {
        fontSize: Sizes.text_tagline1,
        fontWeight: "500",
        color: Colors.neutrals_900,
        textAlign: "center",
    },
});

export default MenuScreen;
