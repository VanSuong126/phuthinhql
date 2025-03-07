import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import styles from './styles';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import {MySafeAreaView, MyView} from '~components/MyStyles';
import InputSearch from '~components/inputs/InputSearch';
import Bottom from '~components/Bottom';
import {useDispatch} from 'react-redux';
import fetchData from '~providers';
import ProductManageList from '~components/ProductManageList';
import DeSelectedAll from '~components/DeSelectedAll';
import ModalWarning from '~components/modals/ModalWarning';
import Toast from 'react-native-toast-message';
import TabControl from '~components/TabControl';
import SortByTop from '~components/SortByTop';
import ModalListBottom from '~modals/ModalListBottom';

const dataSort = [
  {id: 5, title: 'SL < 5'},
  {id: 10, title: 'SL < 10'},
  {id: 15, title: 'SL < 15'},
  {id: 20, title: 'SL < 20'},
];

const dataUpdate = [
  {
    id: 1,
    title: 'information',
    navigateUpdate: 'dieu-chinh-san-pham',
    typeNavigate: 'update',
  },
  {
    id: 2,
    title: 'description',
    navigateUpdate: 'sua-hinh-san-pham',
    typeNavigate: 'update',
  },
  {
    id: 3,
    title: 'productGroup',
    navigateUpdate: 'sua-nhom-san-pham',
    typeNavigate: 'update',
  },
];

const Index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [modalListUpdate, setModalListUpdate] = useState(false);
  const [stringSearch, setStringSearch] = useState('');
  const [products, setProducts] = useState();

  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [activeLoadMore, setActiveLoadMore] = useState(false);
  const [typeData, setTypeData] = useState(0);
  const [numberProduct, setNumberProduct] = useState(5);

  const [itemsSelected, setItemsSelected] = useState([]);
  const [isDeSelectedAll, setIsDeSelectedAll] = useState(false);
  const [productUpdate, setProductUpdate] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      handleFind();
      setItemsSelected([]);
    }, [typeData, numberProduct]),
  );

  // call get data
  const getProductsAsync = (pageNum, searchValue) => {
    return new Promise((resolve, reject) => {
      const params = {
        loai: typeData === 0 ? 3 : 10,
        numberPage: pageNum,
        timkiem: typeData === 0 ? searchValue : null,
        soluongsanpham: typeData === 0 ? null : numberProduct,
      };

      fetchData(dispatch, 'getProductManager', params, res => {
        if (res.success === true) {
          if (res.data.length < 10) {
            setActiveLoadMore(false);
          }
          resolve(res.data);
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
      await setProducts();
      const data = await getProductsAsync(1, stringSearch);
      if (data.length > 0) {
        setProducts(data);
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

  // handle load more
  const handleLoadMore = async () => {
    if (!loading && !fetching && activeLoadMore) {
      await toggleLoading(true);
      const nextPage = page + 1;
      const data = await getProductsAsync(nextPage, stringSearch);
      if (data.length > 0) {
        await setProducts([...products, ...data]);
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

  function handleOnSelectItem(data) {
    const indexExist = itemsSelected.findIndex(
      item => item.IDSanPham === data?.IDSanPham,
    );
    if (indexExist === -1) {
      setIsDeSelectedAll(false);
      setItemsSelected([
        ...itemsSelected,
        {
          IDSanPham: data?.IDSanPham,
        },
      ]);
    } else {
      const newItems = itemsSelected.filter(
        item => item.IDSanPham !== data?.IDSanPham,
      );
      setItemsSelected(newItems);
    }
  }

  function onRefresh() {
    setItemsSelected([]);
    setIsDeSelectedAll(true);
  }

  function preHandleEditProduct(data) {
    setModalListUpdate(true);
    setProductUpdate(data);
  }

  const createListLabelPrint = () => {
    fetchData(
      dispatch,
      'createListLabel',
      {danhSachInNhan: JSON.stringify(itemsSelected)},
      res => {
        if (res.success === true) {
          Toast.show({
            type: 'success',
            props: {message: t('createListLabelPrintSuccess')},
          });
        }
      },
    );
    onRefresh();
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('manageProduct')} />
      {/*Tab bar product view*/}
      <TabControl
        tabs={[t('all'), t('almostOutOfStock')]}
        selectedIndex={typeData}
        onTabPress={setTypeData}
      />
      {typeData === 1 ? (
        <SortByTop
          containerStyle={styles.containerSortTop}
          getTypeSort={item => setNumberProduct(item)}
          dataSort={dataSort}
          typeReport={'wareHoue'}
        />
      ) : (
        <InputSearch
          value={stringSearch}
          styleInputSearch={styles.seacrch}
          type="wareHouse"
          placeholder={t('findProduct')}
          getString={value => setStringSearch(value)}
          onSearch={handleFind}
        />
      )}
      <MyView style={styles.body}>
        {/*List product*/}
        <ProductManageList
          onRefresh={() => handleFind()}
          contentContainerStyleProp={styles.flatlistProduct}
          onPressEdit={data => preHandleEditProduct(data)}
          isDeSelectedAll={isDeSelectedAll}
          onSelectItem={data => handleOnSelectItem(data)}
          data={products}
          // loading={loading}
          // fetching={fetching}
          onPress={data => handleAdd(data)}
          onEndReached={() => {
            if (activeLoadMore) {
              handleLoadMore();
            }
          }}
          type="wareHouse"
        />
        {/* Toggle deSelectedAll*/}
        <DeSelectedAll onPress={onRefresh} show={itemsSelected.length > 0} />
      </MyView>
      <MyView style={styles.footer}>
        {itemsSelected.length > 0 ? (
          <Bottom
            sticky={false}
            titleBtn1={t('createListPrint')}
            onPress1={() => createListLabelPrint()}
          />
        ) : (
          <Bottom
            sticky={false}
            titleBtn1={t('addNew')}
            onPress1={() => navigation.navigate('them-moi-san-pham')}
          />
        )}
      </MyView>

      <ModalListBottom
        isVisible={modalListUpdate}
        onClose={() => {
          setModalListUpdate(false);
        }}
        data={dataUpdate}
        itemProduct={productUpdate}
      />
    </MySafeAreaView>
  );
};

export default Index;
