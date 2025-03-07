import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

import currencyFormat from '~helper/currencyFormat';
import {commonSelectors, managerSelectors} from '~redux/reducers';
import ModalWarning from '~components/modals/ModalWarning';
import fetchData from '~providers';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import {
  MySafeAreaView,
  MyView,
  MyText,
  MyAvoidView,
} from '~components/MyStyles';
import Icon from '~components/IconXML';
import styles from './styles';
import Bottom from '~components/Bottom';
import {TouchableOpacity} from 'react-native';
const Index = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const {type, data} = route.params;
  const dispatch = useDispatch();

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  // const [unit, setUnit] = useState([]);
  // const [warranty, setWarranty] = useState([]);

  const dataStories = useSelector(commonSelectors.selectorListStore) || [];
  const dataUnit = useSelector(managerSelectors.setDataUnit);
  const dataGuarantee = useSelector(managerSelectors.setDataGuarantee);

  const unit = useMemo(
    () =>
      dataUnit
        ? dataUnit?.find(
            item =>
              item.IDDonViTinh === (data?.IDDonViTinh ?? data?.IddonViTinh),
          )
        : {},
    [dataUnit],
  );

  const warranty = useMemo(
    () =>
      dataGuarantee
        ? dataGuarantee?.find(item => item.value === data?.ThoiGianBaoHanh)
        : {},
    [dataGuarantee],
  );

  const checkStore = useMemo(() => {
    return dataStories.length !== 0
      ? dataStories.filter(
          store => store?.IDCuaHang === (data?.IDCuaHang ?? data?.IdcuaHang),
        )
      : [];
  }, [dataStories, data]);

  function handleDeleteProduct() {
    setShowConfirmDelete(false);
    fetchData(
      dispatch,
      'deleteProductManager',
      {idsanpham: data?.IDSanPham},
      res => {
        if (res?.success) {
          Toast.show({
            type: 'success',
            position: 'top',
            props: {message: t('successDelete')},
          });
          navigation.goBack();
        }
      },
    );
  }

  const fetchDataAsync = async () => {
    if (dataStories?.length === 0) {
      await fetchData(dispatch, 'getListStore');
    }
    if (!dataUnit) {
      await fetchData(
        dispatch,
        'getUnitProduct',
        {loai: 20},
        //   res => {
        //   if (res?.success === true) {
        //     const checkUnit = res?.data.filter(
        //       item => item.IDDonViTinh === (data?.IDDonViTinh ?? data?.IddonViTinh),
        //     );
        //     setUnit(checkUnit[0]);
        //   }
        // }
      );
    }
    if (!dataGuarantee) {
      await fetchData(
        dispatch,
        'getGuaranteeProduct',
        {loai: 23},
        //   res => {
        //   if (res?.success === true) {
        //     const checkUnit = res?.data.filter(
        //       item => item.value === data?.ThoiGianBaoHanh,
        //     );
        //     setWarranty(checkUnit[0]);
        //   }
        // }
      );
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, []);

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar
        nameHeaderTitle={t('information')}
        onPressBack={() => navigation.navigate('quan-tri-san-pham')}
      />
      <MyAvoidView>
        <MyView style={styles.body}>
          <MyView style={styles.wrapBox}>
            <MyView style={styles.horizontal}>
              <MyText style={styles.txtTitle}>{t('productCode')}:</MyText>
              <MyText style={styles.txtContent}>
                {data?.MaSanPham || '-'}
              </MyText>
            </MyView>
            <MyView style={styles.horizontal}>
              <MyText style={styles.txtTitle}>{t('productName')}:</MyText>
              <MyText style={styles.txtContent}>
                {data?.TenSanPham || '-'}
              </MyText>
            </MyView>
            <MyView style={styles.horizontal}>
              <MyText style={styles.txtTitle}>{t('storeName')}:</MyText>
              <MyText style={styles.txtContent}>
                {checkStore[0]?.TenCuaHang || '-'}
              </MyText>
            </MyView>
          </MyView>

          <MyView style={styles.wrapBox}>
            <MyView style={styles.horizontal}>
              <MyText style={styles.txtTitle}>{t('warranty')}:</MyText>
              <MyText style={styles.txtContent}>
                {warranty?.label || '-'}
              </MyText>
            </MyView>
            <MyView style={styles.horizontal}>
              <MyText style={styles.txtTitle}>{t('quantity')}:</MyText>
              <MyText style={styles.txtContent}>{data?.SoLuong || '-'}</MyText>
            </MyView>
            <MyView style={styles.horizontal}>
              <MyText style={styles.txtTitle}>{t('weighGR')}:</MyText>
              <MyText style={styles.txtContent}>
                {data?.KhoiLuong || '-'}
              </MyText>
            </MyView>
            <MyView style={styles.horizontal}>
              <MyText style={styles.txtTitle}>{t('unit')}:</MyText>
              <MyText style={styles.txtContent}>
                {unit?.TenDonViTinh || '-'}
              </MyText>
            </MyView>
            <MyView style={styles.horizontal}>
              <MyText style={styles.txtTitle}>{t('lengthMM')}:</MyText>
              <MyText style={styles.txtContent}>{data?.Dai || '-'}</MyText>
            </MyView>
            <MyView style={styles.horizontal}>
              <MyText style={styles.txtTitle}>{t('widthMM')}:</MyText>
              <MyText style={styles.txtContent}>{data?.Rong || '-'}</MyText>
            </MyView>
            <MyView style={styles.horizontal}>
              <MyText style={styles.txtTitle}>{t('heightMM')}:</MyText>
              <MyText style={styles.txtContent}>{data?.Cao || '-'}</MyText>
            </MyView>
          </MyView>
          <MyView style={styles.wrapBox}>
            <MyView style={styles.horizontal}>
              <MyText style={styles.txtTitle}>{t('importPrice')}:</MyText>
              <MyText style={styles.txtContent}>
                {currencyFormat(data?.TriGia) || '-'}
              </MyText>
            </MyView>
            <MyView style={styles.horizontal}>
              <MyText style={styles.txtTitle}>{t('sellPrice')}:</MyText>
              <MyText style={styles.txtContent}>
                {currencyFormat(data?.GiaBan) || '-'}
              </MyText>
            </MyView>
            <MyView style={styles.horizontal}>
              <MyText style={styles.txtTitle}>
                {t('discountPricePercent')}:
              </MyText>
              <MyText style={styles.txtContent}>
                {data?.GiamGia ? `${data?.GiamGia}%` : '-'}
              </MyText>
            </MyView>
            <MyView style={styles.horizontal}>
              <MyText style={styles.txtTitle}>
                {t('afterDiscountPrice')}:
              </MyText>
              <MyText style={styles.txtContent}>
                {currencyFormat(data?.GiaSauGiam) || '-'}
              </MyText>
            </MyView>
          </MyView>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                type === 'update'
                  ? 'sua-hinh-san-pham'
                  : 'them-moi-hinh-san-pham',
                {type: type, data: data},
              )
            }
            style={styles.wraButton}>
            <MyView style={styles.icon}>
              <Icon width="18" height="18" name="image" />
            </MyView>
            <MyText style={styles.txtButton}>{t('image')}</MyText>
            <Icon width="24" height="24" name="rightArrow" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                type === 'update' ? 'sua-nhom-san-pham' : 'them-nhom-san-pham',
                {type: type, data: data},
              )
            }
            style={styles.wraButton}>
            <MyView style={styles.icon}>
              <Icon width="18" height="18" name="groupProduct" />
            </MyView>
            <MyText style={styles.txtButton}>{t('productGroup')}</MyText>
            <Icon width="24" height="24" name="rightArrow" />
          </TouchableOpacity>
        </MyView>
      </MyAvoidView>

      <MyView style={styles.Bottom}>
        <Bottom
          sticky={false}
          titleBtn1={t('delete')}
          onPress1={() => setShowConfirmDelete(true)}
          titleBtn2={t('updateButton')}
          onPress2={() =>
            navigation.navigate('sua-san-pham', {
              type: type,
              data: data,
            })
          }
        />
      </MyView>
      {/*Modal delete product*/}
      <ModalWarning
        isVisible={showConfirmDelete}
        onClose={() => {
          setShowConfirmDelete(false);
        }}
        textButton={t('confirm')}
        title={t('notification')}
        content={t('canNotRevertAfterDeleteProduct')}
        onPress={() => handleDeleteProduct()}
      />
    </MySafeAreaView>
  );
};

export default Index;
