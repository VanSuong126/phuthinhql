import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, SafeAreaView } from 'react-native';
import { Colors, Sizes, parseSizeHeight, parseSizeWidth, Width } from '~theme';
import { FontStyles } from '~theme';

const Index = ({ tabs, onTabPress, selectedIndex }) => {
  return (
    <View style={styles.tabsContainerStyle}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tabStyle,
            selectedIndex === index && styles.activeTabStyle
          ]}
          onPress={() => onTabPress(index)}
        >
          <Text
            style={[
              styles.tabTextStyle,
              selectedIndex === index && styles.activeTabTextStyle
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  tabsContainerStyle: {
    width: Width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: parseSizeWidth(12),
    paddingHorizontal: Sizes.paddingWidth,
  },
  tabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: parseSizeWidth(10),
    paddingHorizontal: parseSizeWidth(24),
    borderRadius: parseSizeWidth(12),
    backgroundColor: Colors.brand_02_tint80,
  },
  activeTabStyle: {
    backgroundColor: Colors.brand_01_primary,
  },
  tabTextStyle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.neutrals_900,
  },
  activeTabTextStyle: {
    color: Colors.neutrals_50,
  },
});
