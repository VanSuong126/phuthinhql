import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {TouchableOpacity, StyleSheet} from 'react-native';

import LocalDB from '~data/asyncStorage';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import {MyView, MyText} from '~components/MyStyles';

import Icon from '~components/IconXML';
import FilterOption from '~components/FilterOption';
import FavoriteMenu1 from './FavoriteMenu1';
import FavoriteMenu2 from './FavoriteMenu2';

export default function Index(props) {
  const {t} = useTranslation();

  const [visibleModalFilterOption, setVisibleModalFilterOption] =
    useState(false);
  const [dataFavoriteMenu1, setDataFavoriteMenu1] = useState([]);
  const [dataFavoriteMenu2, setDataFavoriteMenu2] = useState([]);

  const [dataMenuOriginal, setDataMenuOriginal] = useState([]);
  const [dataMenu, setDataMenu] = useState([]);

  // get data User
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      LocalDB.getUserData().then(data => {
        if (isActive && data) {
          setDataMenuOriginal(data?.Permissions);
        }
      });

      // Cleanup function to avoid memory leaks
      return () => {
        isActive = false;
      };
    }, []),
  );

  useEffect(() => {
    const transformed = dataMenuOriginal.map(item => ({
      value: item?.IdchuyenMuc,
      label: item.TenChuyenMuc,
      icon: 'chuyenmuc' + item?.IdchuyenMuc,
      selected: item.IsFavoriteMenu,
    }));
    setDataMenu(transformed);
    handleSetDataMenu(dataMenuOriginal);
  }, [dataMenuOriginal]);

  const handleSetDataMenu = data => {
    const dataMenuFavorite = data
      .filter(item => item.IsFavoriteMenu) // Lọc các mục có IsFavoriteMenu là true
      .sort((a, b) => {
        // Nếu DisplayOrder của cả hai item không phải null, sắp xếp theo DisplayOrder
        if (a.DisplayOrder !== null && b.DisplayOrder !== null) {
          return a.DisplayOrder - b.DisplayOrder;
        }
        // Nếu DisplayOrder của một trong hai item là null, sắp xếp theo ID
        if (a.DisplayOrder === null && b.DisplayOrder !== null) {
          return 1; // Đặt a sau b nếu a.DisplayOrder là null
        }
        if (a.DisplayOrder !== null && b.DisplayOrder === null) {
          return -1; // Đặt a trước b nếu b.DisplayOrder là null
        }
        // Nếu cả hai DisplayOrder đều null, sắp xếp theo ID
        return a.IDChuyenMuc - b.IDChuyenMuc;
      })
      .slice(0, 8); // Lấy 8 mục đầu tiên
    const dataMenuFast = data
      .filter(item => item.IsFastMenu)
      .sort((a, b) => a.IDChuyenMuc - b.IDChuyenMuc)
      .slice(0, 4);
    if (dataMenuFavorite) {
      setDataFavoriteMenu1(dataMenuFavorite.slice(0, 4));
      setDataFavoriteMenu2(dataMenuFavorite.slice(4));
    }
  };

  const handleApplyOption = value => {
    setVisibleModalFilterOption(false);
    const selectedValues = value.map(item => item.value);

    const sortedData = dataMenuOriginal
      .map(item => {
        if (selectedValues.includes(item.IdchuyenMuc)) {
          return {...item, IsFavoriteMenu: true};
        }
        return {...item, IsFavoriteMenu: false};
      })
      .sort((a, b) => {
        const indexA = selectedValues.indexOf(a.IdchuyenMuc);
        const indexB = selectedValues.indexOf(b.IdchuyenMuc);
        return (
          (indexA !== -1 ? indexA : selectedValues.length) -
          (indexB !== -1 ? indexB : selectedValues.length)
        );
      });

    setDataMenuOriginal(sortedData);

    LocalDB.getUserData().then(data => {
      if (data) {
        LocalDB.setUserData({...data, Permissions: sortedData});
      }
    });
  };

  return (
    <MyView style={styles.container}>
      <FilterOption
        isVisible={visibleModalFilterOption}
        onClose={() => setVisibleModalFilterOption(false)}
        icon={'key'}
        data={dataMenu}
        onListOption={value => handleApplyOption(value)}
        limitSelect={8}
        minLimit={1}
      />
      <MyView style={styles.content}>
        <MyView style={styles.wrapTitle}>
          <MyText style={styles.txtTitle}>{t('favorite')}</MyText>
          <TouchableOpacity onPress={() => setVisibleModalFilterOption(true)}>
            <Icon name="threeDot" width="24" height="24" />
          </TouchableOpacity>
        </MyView>
        <MyView style={styles.groupMenu1}>
          {dataFavoriteMenu1.map((data, index) => {
            // Kiểm tra nếu index chẵn và render 2 item trong cùng 1 hàng
            if (index % 2 === 0) {
              return (
                <MyView
                  key={index}
                  style={{flexDirection: 'row', gap: parseSizeHeight(16)}}>
                  {/* Render item hiện tại */}
                  <FavoriteMenu1 data={data} index={index} />
                  {/* Render item kế tiếp nếu tồn tại */}
                  {dataFavoriteMenu1[index + 1] && (
                    <FavoriteMenu1
                      data={dataFavoriteMenu1[index + 1]}
                      index={index + 1}
                    />
                  )}
                </MyView>
              );
            }
            return null;
          })}
        </MyView>
        <MyView style={styles.groupMenu2}>
          {dataFavoriteMenu2.map((data, index) => (
            <FavoriteMenu2 key={data.id || index} data={data} index={index} />
          ))}
        </MyView>
      </MyView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  columnWrapperStyleProp: {
    gap: parseSizeHeight(16),
    marginTop: parseSizeHeight(10),
  },
  content: {
    backgroundColor: Colors.background,
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Sizes.paddingHeight,
  },
  txtTitle: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    color: Colors.neutrals_900,
    fontWeight: '600',
  },
  groupMenu2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupMenu1: {
    gap: parseSizeHeight(16),
  },
});
