import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '~components/IconXML';
import { Colors, Sizes, parseSizeWidth } from '~theme';
const BottomMenu = ({ navigation }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('Home');
    const menuItems = [
        { key: 'Home', label: 'home', icon: 'home' },
        { key: 'Booking', label: 'booking', icon: 'calendar' },
        { key: 'Members', label: 'member', icon: 'star' },
        { key: 'Profile', label: 'account', icon: 'user' },
    ];

    const handlePress = (key) => {
        setActiveTab(key);
        navigation?.navigate(key); // Nếu có navigation, chuyển màn hình
    };

    return (
        <View style={styles.container}>
            {menuItems.map((item) => (
                <TouchableOpacity
                    key={item?.key}
                    style={[styles.menuItem, activeTab === item.key && styles.activeMenuItem]}
                    onPress={() => handlePress(item?.key)}
                >
                    <Icon name={item?.icon} width="20" height="20" stroke={activeTab === item.key ? Colors.brand_01_primary : Colors.neutrals_300} />
                    <Text style={[styles.label, activeTab === item.key && styles.activeLabel]}>
                        {t(item?.label)}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default BottomMenu;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: parseSizeWidth(90),
        paddingHorizontal: parseSizeWidth(20),
        backgroundColor: Colors.neutrals_50,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        zIndex: 999,
        elevation: 999,
        gap: parseSizeWidth(10),
    },
    menuItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '25%',
        marginHorizontal: parseSizeWidth(10),
        gap: parseSizeWidth(8),
        paddingBottom: parseSizeWidth(10),
    },
    activeMenuItem: {
        borderTopWidth: parseSizeWidth(2),
        marginHorizontal: parseSizeWidth(10),
        borderTopColor: Colors.accent_system_02,
    },
    label: {
        fontSize: Sizes.text_tagline1,
        color: Colors.neutrals_300,
        fontWeight: '500',
    },
    activeLabel: {
        color: Colors.brand_01_primary,
    },
}); 
