import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { MyText, MyView, MyScrollView } from '~components/MyStyles';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  parseSize,
} from '~theme';

const data = [
  { id: 1, title: 'Top 10' },
  { id: 2, title: 'Top 20' },
  { id: 3, title: 'Top 30' },
  { id: 4, title: 'Top 40' },
  { id: 5, title: 'Top 50' },
];
const Index = ({ getTypeSort, typeReport, dataSort = data, containerStyle }) => {
  const [sortByTop, setSortByTop] = useState(
    (typeReport === 'customer' ||
      typeReport === 'wareHoue' ||
      typeReport === 'order') &&
    dataSort[0].id,
  );

  const handleSort = item => {
    if (sortByTop !== item) {
      setSortByTop(Number(item));
      getTypeSort(Number(item));
    }
  };
  return (
    <MyView style={[styles.container, containerStyle]}>
      <MyScrollView
        horizontal={true}
        contentContainerStyle={[styles.scrollContainer]}>
        {dataSort.map(item => {
          return (
            <TouchableOpacity
              onPress={() => handleSort(item.id)}
              key={item.id}
              style={
                sortByTop === item.id
                  ? styles.itemSortByTopClicked
                  : styles.itemSortByTop
              }>
              <MyText
                style={
                  sortByTop === item.id
                    ? styles.txtItemSortByTopClicked
                    : styles.txtItemSortByTop
                }>
                {`${item.title}`}
              </MyText>
            </TouchableOpacity>
          );
        })}
      </MyScrollView>
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    gap: Sizes.spacing_3_Height,
  },
  txtItemSortByTop: {
    textAlign: 'center',
    color: Colors.neutrals_700,
  },
  itemSortByTop: {
    width: parseSizeWidth(93),
    height: parseSizeHeight(37),
    borderRadius: parseSize(100),
    backgroundColor: Colors.neutrals_200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtItemSortByTopClicked: {
    textAlign: 'center',
    color: Colors.semantics_Green_01,
  },
  itemSortByTopClicked: {
    width: parseSizeWidth(93),
    height: parseSizeHeight(37),
    borderRadius: 100,
    backgroundColor: Colors.semantics_Green_03,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.semantics_Green_02,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
