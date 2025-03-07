import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {Colors, Sizes, parseSizeHeight, parseSizeWidth} from '~theme';
import {FontStyles} from '~theme';

const Index = ({tabs, onTabPress, selectedIndex}) => {
  const handleIndexChange = index => {
    onTabPress(index);
  };

  return (
    <SegmentedControlTab
      values={tabs}
      borderRadius={20}
      selectedIndex={selectedIndex}
      onTabPress={handleIndexChange}
      tabsContainerStyle={styles.tabsContainerStyle}
      activeTabStyle={styles.activeTabStyle}
      tabStyle={styles.tabStyle}
      tabTextStyle={styles.tabTextStyle}
      allowFontScaling={false}
    />
  );
};

export default Index;

const styles = StyleSheet.create({
  tabTextStyle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.neutrals_700,
  },
  tabStyle: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    marginHorizontal: parseSizeWidth(4),
    paddingVertical: parseSizeHeight(7),
    height: parseSizeHeight(37),
  },
  activeTabStyle: {
    backgroundColor: Colors.brand_01,
    zIndex: 1,
    borderRadius: 20,
    height: parseSizeHeight(37),
  },
  tabsContainerStyle: {
    marginHorizontal: Sizes.marginWidth,
    height: parseSizeHeight(48),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    borderStyle: 'solid',
    backgroundColor: Colors.neutrals_100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
