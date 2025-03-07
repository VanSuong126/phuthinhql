import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import HeaderToolBar from '~components/headers/HeaderToolBar';
import {MyView, MySafeAreaView, MyText} from '~components/MyStyles';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';
import FlatList from '~components/FlatList';
import Icon from '~components/IconXML';
import Bottom from '~components/Bottom';
import fetchData from '~providers';
import Toast from 'react-native-toast-message';

const Index = () => {
  const {t} = useTranslation();
  const route = useRoute();
  const {type, data} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState([]);
  const [dataGroupProduct, setDataGroupProduct] = useState([]);
  const handleChosseGroup = item => {
    const checkList = selectedItem.some(product => product.id === item.id)
      ? selectedItem.filter(product => product.id !== item.id) // Xóa nếu đã tồn tại
      : [...selectedItem, item]; // Thêm nếu chưa tồn tại

    setSelectedItem(checkList);
  };

  function fetchDataGroupProduct() {
    fetchData(dispatch, 'getListGroupProduct', {}, data => {
      if (data?.success) {
        const result = data?.data;
        const dataGroup = result.map(item => ({
          id: item.IDNhomSanPham,
          label: item.MoTa,
        }));
        setDataGroupProduct(dataGroup);
      }
    });
  }

  // lấy thông tin sản phẩm sau khi thêm nhóm sản phẩm
  const getProduct = idSanPham => {
    if (idSanPham) {
      const params = {
        loai: 3,
        timkiem: idSanPham,
        soluongsanpham: 1,
      };

      fetchData(dispatch, 'getProductManager', params, res => {
        if (res.success === true) {
          Toast.show({
            type: 'success',
            props: {message: t('succesGroupProduct')},
          });

          navigation.navigate('dieu-chinh-san-pham', {
            type: type,
            data: res?.data[0],
          });
        } else {
          navigation.navigate('quan-tri-san-pham');
        }
      });
    } else {
      navigation.navigate('quan-tri-san-pham');
    }
  };

  const handleUpdateProductGroup = () => {
    const params = {
      idSanPham: data?.IDSanPham || data?.IdsanPham,
      idsNhomSanPham: selectedItem.map(item => item?.id),
    };

    fetchData(dispatch, 'updateProductGroup', params, res => {
      if (res?.success) {
        getProduct(res?.data?.metadata?.IDSanPham);
      } else {
        Toast.show({
          type: 'success',
          props: {message: t('warningGroupProduct')},
        });
      }
    });
  };

  useEffect(() => {
    fetchDataGroupProduct();
  }, []);

  useEffect(() => {
    if (data?.NhomSanPhams && dataGroupProduct.length > 0) {
      const groupIds = data?.NhomSanPhams.split(',').map(id => id.trim());
      const selected = dataGroupProduct.filter(item =>
        groupIds.includes(item.id.toString()),
      );
      setSelectedItem(selected);
    }
  }, [data, dataGroupProduct]);

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar
        nameHeaderTitle={t('productGroup')}
        iconRight="renew"
        onPressRight={() => setSelectedItem([])}
      />
      <MyView style={styles.body}>
        <MyView style={styles.wrapTitle}>
          <MyView style={styles.wrapIcon}>
            <Icon
              width={13.5}
              height={13.5}
              name="groupProduct"
              color={Colors.semantics_Black}
            />
          </MyView>
          <MyText style={styles.txtTitle}>{t('productGroup')}</MyText>
        </MyView>
        <FlatList
          data={dataGroupProduct}
          loading={false}
          fetching={false}
          type="groupProducts"
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatlist}
          onPress={handleChosseGroup}
          isSelected={selectedItem}
        />
      </MyView>
      <MyView style={styles.bottom}>
        <Bottom
          sticky={false}
          titleBtn1={t('addImage')}
          onPress1={() =>
            navigation.navigate(
              type === 'add' ? 'them-moi-hinh-san-pham' : 'sua-hinh-san-pham',
              {type: type, data: data},
            )
          }
          titleBtn2={type === 'add' ? t('upload') : t('update')}
          onPress2={handleUpdateProductGroup}
        />
      </MyView>
    </MySafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  flatlist: {
    gap: Sizes.spacing_2_Height,
  },
  txtSelected: {
    color: Colors.semantics_Green_01,
  },
  txtOption: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_700,
    textAlign: 'center',
  },
  selectedItemLeft: {
    flexDirection: 'row',
    gap: Sizes.spacing_4_Width,
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: Colors.semantics_Green_03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing_5_Width,
    paddingVertical: Sizes.spacing_3_Height,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutrals_300,
    backgroundColor: Colors.neutrals_100,
    gap: Sizes.spacing_4_Width,
    marginTop: parseSizeHeight(8),
  },
  wrapIcon: {
    borderWidth: 1,
    borderColor: Colors.neutrals_200,
    backgroundColor: Colors.neutrals_100,
    width: 36,
    height: 36,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.semantics_Black,
  },
  wrapTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(15),
    paddingHorizontal: Sizes.spacing_5_Width,
  },
  body: {
    paddingVertical: parseSizeHeight(10),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.neutrals_300,
    backgroundColor: Colors.neutrals_100,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
