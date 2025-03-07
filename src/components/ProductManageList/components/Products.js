import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {MyText, MyView} from '~components/MyStyles';
import LocalDB from '~data/asyncStorage';
import NoImage from '~assets/images/imageAvailable.png';

import {
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '~theme';
import ModalImportProduct from '~modals/ModalImportProduct';
import ModalPushTurn from '~modals/ModalPushTurn';
import {useDispatch} from 'react-redux';
import fetchData from '~providers';
import Toast from 'react-native-toast-message';
import Icon from '~components/IconXML';

const ProductManageFlatlist = ({
  data,
  onReloadData,
  onPressEdit,
  isDeSelectedAll,
  onSelectItem,
  index,
}) => {
  const dispatch = useDispatch();
  const [urlWeb, setUrlWeb] = useState('');
  const {t} = useTranslation();
  const [isPressItem, setIsPressItem] = useState(false);
  const [productSelected, setProductSelected] = useState({
    IDSanPham: 0,
    MaSanPham: '',
    TenSanPham: '',
    URLImage: '',
    GiaBan: 0,
    SoLuong: 0,
  });
  const [openModalImport, setOpenModalImport] = useState(false);
  const [modalPushTurn, setModalPushTurn] = useState(false);
  const [imageUrl, setImageUrl] = useState(`${NoImage}`);

  // cập nhật lại ảnh từ sever khi ảnh lưu vào cache
  const updateImage = () => {
    setImageUrl(`${data?.URLImage}?random=${new Date().getTime()}`);
  };

  const formatPrice = price => {
    return `${new Intl.NumberFormat('vi-VN').format(price)}đ`;
  };

  useEffect(() => {
    if (isDeSelectedAll) {
      setIsPressItem(false);
    }
  }, [isDeSelectedAll]);
  useEffect(() => {
    LocalDB.getUserData().then(data => {
      setUrlWeb(data?.ViewImageUrl);
    });
    updateImage();
  }, []);
  function preHandleImport() {
    setProductSelected({
      IDSanPham: data.IDSanPham,
      MaSanPham: data.MaSanPham,
      TenSanPham: data.TenSanPham,
      URLImage: data.URLImage,
      GiaBan: data.GiaBan,
      SoLuong: data.SoLuong,
    });
    setOpenModalImport(true);
  }

  async function handleUpdateProductAmount(data) {
    fetchData(dispatch, 'entryProductInventory', data, res => {
      if (res.success === true) {
        Toast.show({
          type: 'success',
          props: {message: t('importProductSuccess')},
        });
        onReloadData();
      } else {
        Toast.show({
          type: 'error',
          props: {message: res?.message},
        });
      }
    });
  }
  async function handlePushTurn(item) {
    if (item) {
      const params = {
        idSanPham: item?.idSanPham,
        soLuot: item?.soLuot,
        ngayKetThuc: item?.toDate,
        ngayBatDau: item?.fromDate,
      };

      fetchData(dispatch, 'pushProductLikes', params, res => {
        if (res.success === true) {
          Toast.show({
            type: 'success',
            props: {message: t('succesPush')},
          });
          onReloadData();
        } else {
          Toast.show({
            type: 'error',
            props: {message: res?.message},
          });
        }
      });
    }
  }
  function onPressItem(data) {
    setIsPressItem(!isPressItem);
    return onSelectItem({IDSanPham: data.IDSanPham});
  }

  const preHandlePush = () => {
    setProductSelected({
      IDSanPham: data.IDSanPham,
      TenSanPham: data.TenSanPham,
      MaSanPham: data.MaSanPham,
    });
    setModalPushTurn(true);
  };

  return (
    <MyView style={[styles.boxProduct]}>
      {/*Product info basic*/}
      <ModalImportProduct
        onApply={item => handleUpdateProductAmount(item)}
        data={{
          productName: productSelected.TenSanPham,
          productID: productSelected.IDSanPham,
          codeProduct: productSelected.MaSanPham,
        }}
        isVisible={openModalImport}
        onClose={() => setOpenModalImport(false)}
      />
      <ModalPushTurn
        onApply={handlePushTurn}
        data={{
          productName: productSelected.TenSanPham,
          productID: productSelected.IDSanPham,
          codeProduct: productSelected.MaSanPham,
        }}
        isVisible={modalPushTurn}
        onClose={() => setModalPushTurn(false)}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onPressItem(data)}
        style={[styles.itemBorder, isPressItem && styles.isSelected]}>
        <MyView style={styles.mainInfo}>
          <MyView style={styles.image}>
            {data?.URLImage ? (
              <Image
                // source={{uri: imageUrl(urlWeb + data?.URLImage)}}
                source={{uri: urlWeb + imageUrl}}
                style={styles.imageProduct}
                resizeMode="stretch"
              />
            ) : (
              <Image
                source={NoImage}
                style={styles.imageProduct}
                resizeMode="cover"
              />
            )}
            {data?.GiamGia !== 0 && (
              <MyView style={styles.boxStart}>
                <Icon name="start" width="14" height="14" />
              </MyView>
            )}
          </MyView>
          <MyView style={styles.bodyBoxRight}>
            <MyView style={styles.textWrapper}>
              <MyText style={styles.txtNameProduct}>{data?.TenSanPham}</MyText>
            </MyView>
            <MyView style={styles.Price}>
              <MyText style={styles.txtPrice}>
                {!data?.GiaBan
                  ? t('contactPrice')
                  : formatPrice(
                      data?.GiamGia !== 0
                        ? data?.GiaBan - (data?.GiamGia * data?.GiaBan) / 100
                        : data?.GiaBan,
                    )}
              </MyText>
              {data?.GiamGia !== 0 && (
                <MyText style={styles.txtOldPrice}>
                  {formatPrice(data?.GiaBan)}
                </MyText>
              )}
            </MyView>
          </MyView>
        </MyView>
        {/*Sub product info*/}
        <MyView style={styles.subInfo}>
          <MyView style={styles.status}>
            <Icon name="wifiLinear" width="24" height="24" />
            <MyText style={styles.txtID}>{data?.MaSanPham}</MyText>
          </MyView>
          <MyView style={styles.amountWrapper}>
            <MyText style={styles.txtRemaining}>{t('quantity')}:</MyText>
            <MyText style={styles.amount}>{data?.SoLuong}</MyText>
          </MyView>
        </MyView>
        {/*Actions button*/}
        {!isPressItem && (
          <MyView style={styles.actionsButton}>
            <TouchableOpacity
              onPress={() => onPressEdit(data)}
              style={[styles.actionUpdate, styles.actionItem]}>
              <MyText style={[styles.textUpdate, styles.textDefault]}>
                {t('updateButton')}
              </MyText>
            </TouchableOpacity>
            <MyView style={styles.rightButton}>
              <TouchableOpacity
                onPress={preHandlePush}
                style={[styles.actionPush, styles.actionItem]}>
                <MyText style={[styles.textPush, styles.textDefault]}>
                  {t('pushTurn')}
                </MyText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={preHandleImport}
                style={[styles.actionImport, styles.actionItem]}>
                <MyText style={[styles.textImport, styles.textDefault]}>
                  {t('importProduct')}
                </MyText>
              </TouchableOpacity>
            </MyView>
          </MyView>
        )}
      </TouchableOpacity>
    </MyView>
  );
};

export default ProductManageFlatlist;

const styles = StyleSheet.create({
  rightButton: {
    flexDirection: 'row',
    gap: Sizes.spacing_3_Width,
  },
  isSelected: {
    borderColor: Colors.semantics_Green_02,
    backgroundColor: Colors.semantics_Green_03,
  },
  itemBorder: {
    borderRadius: 16,
    paddingVertical: parseSizeHeight(8),
    paddingHorizontal: parseSizeWidth(8),
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    gap: parseSizeHeight(10),
  },
  boxProduct: {
    gap: parseSizeHeight(6),
    marginVertical: parseSizeHeight(4),
    minWidth: '100%',
  },
  subInfo: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountWrapper: {
    flexDirection: 'row',
    columnGap: parseSizeWidth(5),
  },
  amount: {
    color: Colors.semantics_Yellow_02,
    fontSize: Sizes.textDefault,
  },
  actionsButton: {
    height: '100%',
    minHeight: parseSizeHeight(26),
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  actionsRight: {
    flex: 2,
    flexDirection: 'row',
    columnGap: parseSizeWidth(16),
  },
  actionItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: parseSizeHeight(5),
    paddingHorizontal: parseSizeWidth(17),
    borderRadius: 100,
  },
  actionUpdate: {
    backgroundColor: Colors.semantics_Yellow_03,
  },
  textUpdate: {
    color: Colors.semantics_Yellow_01,
  },
  textDefault: {
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    fontStyle: 'normal',
  },
  actionPrint: {
    backgroundColor: Colors.semantics_Grey_03,
  },
  textPrint: {
    color: Colors.semantics_Grey_02,
  },
  actionImport: {
    backgroundColor: Colors.semantics_Green_03,
  },

  textImport: {
    color: Colors.semantics_Green_01,
  },
  actionPush: {
    backgroundColor: Colors.neutrals_200,
  },
  textPush: {
    color: Colors.semantics_Grey,
  },
  status: {
    flexDirection: 'row',
    gap: parseSizeWidth(5),
    alignItems: 'center',
  },
  txtID: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '500',

    textAlign: 'left',
    color: Colors.brand_01,
  },
  txtRemaining: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '500',
    textAlign: 'right',
    color: Colors.neutrals_700,
    width: parseSizeWidth(100),
  },
  mainInfo: {
    flexDirection: 'row',
    gap: parseSizeWidth(8),
    overflow: 'hidden',
    flex: 1,
    width: '100%',
  },
  bodyBoxRight: {
    flex: 2,
    gap: parseSizeHeight(8),
    paddingVertical: parseSizeHeight(5),
  },
  image: {
    width: parseSizeWidth(75),
    height: parseSizeHeight(87),
    borderRadius: 8,
  },
  imageProduct: {
    objectFit: 'cover',
    height: '100%',
    maxWidth: '100%',
    borderRadius: 8,
  },
  textWrapper: {
    flex: 1,
    flexWrap: 'wrap',
  },
  txtNameProduct: {
    fontFamily: FontStyles.InterSemiBold,
    fontWeight: '600',
    textAlign: 'left',
    fontSize: Sizes.text_subtitle2,
    color: Colors.semantics_Black,
    width: '100%',
  },
  Price: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtPrice: {
    fontFamily: FontStyles.InterSemiBold,
    fontWeight: '600',

    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  txtOldPrice: {
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    textAlign: 'right',
    color: Colors.neutrals_700,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.neutrals_700,
  },
  bottom_RightBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wanrranty: {
    width: parseSizeWidth(131),
    height: parseSizeHeight(24),
    borderRadius: 100,
    backgroundColor: Colors.semantics_Yellow_03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtWanrranty: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.accent_yellow,
  },
  btnAdd: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxStart: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: Colors.neutrals_50,
    position: 'absolute',
    right: parseSizeWidth(7),
    top: parseSizeHeight(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatButton: {
    position: 'absolute',
    bottom: parseSizeHeight(20),
    right: parseSizeWidth(20),
    backgroundColor: Colors.brand_01,
    padding: parseSizeHeight(10),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatButtonText: {
    color: Colors.neutrals_100,
    fontWeight: 'bold',
  },
});
