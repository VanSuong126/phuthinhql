import React, {setTimeout, useEffect, useState, useRef} from 'react';
import {StyleSheet, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';

import {MyView, MySafeAreaView} from '~components/MyStyles';
import InputSearch from '~inputs/InputSearch';
import Bottom from '~components/Bottom';
import FlatList from '~components/FlatList';
import fetchData from '~providers';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import TabControl from '~components/TabControl';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';
const Index = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [dataCustomer, setDataCustomer] = useState();
  const [stringSearch, setStringSearch] = useState('');
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [activeLoadMore, setActiveLoadMore] = useState(false);
  const [tabSelected, setTabSelected] = useState(0);
  const tabs = [t('active'), t('blocked')];

  const handleTabPress = index => {
    if (index != tabSelected) {
      setTabSelected(index);
      setStringSearch('');
    }
  };

  const getDataCustomer = (pageNum, searchValue) => {
    return new Promise((resolve, reject) => {
      const params = {
        loai: 24,
        sotrang: pageNum,
        soitem: 10,
        chuoitimkiem: searchValue,
      };

      fetchData(dispatch, 'getListBuyer', params, res => {
        if (res.success === true) {
          if (res.data.length < 10) {
            setActiveLoadMore(false);
          }
          let result = [];
          if (tabSelected === 0) {
            result = res.data.filter(user => user.TrangThai === 'ACTIVE');
          } else if (tabSelected === 1) {
            result = res.data.filter(user => user.TrangThai === 'LOCK');
          } else {
            result = res.data; // Trường hợp tab không phải 0 hoặc 1, lấy toàn bộ dữ liệu
          }
          resolve(result);
        } else {
          setActiveLoadMore(false);
          reject(); // Gọi reject khi không có dữ liệu
        }
      });
    });
  };

  // handle search
  const handleFind = async () => {
    try {
      await Keyboard.dismiss();
      await toggleLoading(true);
      await setActiveLoadMore(true);
      await setPage(1);
      await setDataCustomer();

      const data = await getDataCustomer(1, stringSearch);

      if (data.length > 0) {
        setDataCustomer(data);
      } else {
        Toast.show({
          type: 'error',
          props: {message: data?.message || t('noData')},
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        props: {message: data?.message || t('noData')},
      });
    } finally {
      toggleLoading(false);
    }
  };

  // handle search
  const handleLoadMore = async () => {
    if (!loading && !fetching && activeLoadMore) {
      await toggleLoading(true);
      const nextPage = page + 1;
      const data = await getDataCustomer(nextPage, stringSearch);
      if (data.length > 0) {
        await setDataCustomer([...dataCustomer, ...data]);
        await toggleLoading(false);
        await setPage(nextPage);
      } else {
        await toggleLoading(false);
      }
    }
  };

  const toggleLoading = async (bool = false) => {
    if (page === 1) {
      await setLoading(bool);
    } else {
      await setFetching(bool);
    }
  };

  const blockCustomer = async data => {
    fetchData(
      dispatch,
      'blockCustomer',
      {
        idKhachHang: data?.IDKhachHang,
        isLock: data?.TrangThai === 'LOCK' ? false : true,
      },
      async response => {
        // Thêm async vào đây
        if (response?.success) {
          Toast.show({
            type: 'success',
            props: {
              message:
                response?.data?.Status === 'LOCK'
                  ? t('lockCustomerSucces')
                  : t('UnlockCustomerSucces'),
            },
          });

          const dataCustomer = await getDataCustomer(1, '');
          setDataCustomer(dataCustomer);
        }
      },
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      handleFind();
    }, []),
  );

  useEffect(() => {
    getDataCustomer(1, '')
      .then(data => {
        setDataCustomer(data);
      })
      .catch(error => {
        console.error(t('errorDataCustomer'), error);
      });
  }, [tabSelected]);

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('manageCustomer')} />
      <TabControl
        tabs={tabs}
        selectedIndex={tabSelected}
        onTabPress={handleTabPress}
      />
      <InputSearch
        value={stringSearch}
        type="Secondary"
        styleInputSearch={styles.seacrch}
        placeholder={t('search')}
        getString={value => setStringSearch(value)}
        onSearch={() => handleFind()}
      />

      <MyView style={styles.content}>
        <FlatList
          data={dataCustomer}
          // loading={loading}
          // fetching={fetching}
          onPress={data =>
            navigation.navigate('chinh-sua-khach-hang', {
              title: 'updateCustomer',
              data: data,
            })
          }
          onEndReached={() => {
            if (activeLoadMore) {
              handleLoadMore();
            }
          }}
          type="customerManage"
          isSelected={blockCustomer}
        />
      </MyView>
      <Bottom
        titleBtn1={t('addCustomer')}
        sticky={false}
        onPress1={() =>
          navigation.navigate('them-moi-khach-hang', {title: 'addCustomer'})
        }
        typeBtn1={2}
      />
    </MySafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    flex: 1,
  },
  seacrch: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: parseSizeWidth(10),
    marginTop: parseSizeHeight(24),
  },
  content: {
    flex: 1,
    paddingHorizontal: Sizes.paddingWidth,
    marginTop: parseSizeHeight(12),
  },
  btnReset: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: Colors.semantics_Red_03,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: parseSizeWidth(10),
    paddingVertical: parseSizeHeight(4),
    borderRadius: 20,
    top: parseSizeWidth(-50),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textReset: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    textAlign: 'left',
    marginLeft: parseSizeWidth(2),
    color: Colors.semantics_Red_01,
  },
});
