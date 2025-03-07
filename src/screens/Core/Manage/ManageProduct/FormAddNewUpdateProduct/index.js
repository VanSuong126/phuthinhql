import React, {useEffect, useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import ToggleSwitch from 'toggle-switch-react-native';
import Toast from 'react-native-toast-message';
import {useNavigation, useRoute} from '@react-navigation/native';

import styles from './styles';
import {commonSelectors, managerSelectors} from '~redux/reducers';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import Bottom from '~components/Bottom';
import fetchData from '~providers';
import InputText from '~components/inputs/InputText';
import Selects from '~components/inputs/Selects';
import InputWithUnit from '~components/inputs/InputWithUnit';
import {Colors} from '~theme';
import {
  MyAvoidView,
  MySafeAreaView,
  MyText,
  MyView,
} from '~components/MyStyles';

const Index = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const sellPriceRef = useRef(null);
  const {type, data} = route.params;

  // const [dataUnit, setDataUnit] = useState([]);
  // const [dataWarranty, setDataWarranty] = useState([]);
  const [typeOrjImage, setTypeOrjImage] = useState();
  const dataStories = useSelector(state =>
    commonSelectors.selectorListStore(state),
  );
  const dataUnit = useSelector(managerSelectors.setDataUnit);
  const dataWarranty = useSelector(managerSelectors.setDataGuarantee);

  const {
    control,
    reset,
    setValue,
    getValues,
    watch,
    setError,
    clearErrors,
    formState: {errors},
  } = useForm({
    defaultValues: {
      description: data?.MoTa || '',
      mainImage: data?.URLImage || '',
      subImage1: data?.URLImage2 || '',
      subImage2: data?.URLImage3 || '',
      subImage3: data?.URLImage4 || '',
      subImage4: data?.URLImage5 || '',
      productName: data?.TenSanPham || '',
      storeName: {label: data?.TenCuaHang, value: data?.IDCuaHang || 0},
      warranty: {label: '', value: data?.ThoiGianBaoHanh},
      quantity: data?.SoLuong || '',
      weight: data?.KhoiLuong || '',
      unit: {label: '', value: data?.IDDonViTinh || data?.IddonViTinh},
      heightMM: data?.Cao || '',
      widthMM: data?.Rong || '',
      lengthMM: data?.Dai || '',
      contactPrice: data?.GiaBan === 0 ? true : false,
      sellOnline:
        data?.SanPhamTrucTuyen === undefined || data?.SanPhamTrucTuyen === 1
          ? true
          : false,
      importPrice: data?.TriGia || 0,
      sellPrice: data?.GiaBan || 0,
      discountPrice: data?.GiamGia || 0,
      afterDiscountPrice:
        data?.GiaBan - data?.GiamGia > 0 ? data?.GiaBan - data?.GiamGia : 0,
    },
  });

  useEffect(() => {
    if (
      getValues('discountPrice') ||
      getValues('sellPrice') ||
      getValues('contactPrice')
    ) {
      if (getValues('contactPrice')) {
        setValue('discountPrice', '0', {
          shouldValidate: true,
          shouldDirty: true,
        });
        setValue('sellPrice', '0', {
          shouldValidate: true,
          shouldDirty: true,
        });
        setValue('afterDiscountPrice', '0', {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else {
        sellPriceRef.current.focus();
        const salePriceTemp = parseInt(getValues('sellPrice') ?? '0');
        const salePrice =
          salePriceTemp && salePriceTemp !== 'NaN' ? salePriceTemp : 0;
        const discountPrice =
          (((getValues('discountPrice') && getValues('discountPrice') !== 'NaN'
            ? getValues('discountPrice')
            : 0) || 0) /
            100) *
          salePrice;
        setValue('afterDiscountPrice', (salePrice - discountPrice).toString(), {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  }, [watch('discountPrice'), watch('sellPrice'), watch('contactPrice')]);

  function handleResetForm() {
    reset();
  }

  function handleValidateControlRequired() {
    return new Promise(resolve => {
      const data = getValues();
      if (!data.storeName || !data.unit || !data.warranty) {
        Toast.show({
          type: 'error',
          props: {
            message: t(
              !data.storeName
                ? 'storeRequired'
                : !data.unit
                ? 'unitRequired'
                : 'warrantyRequired',
            ),
          },
        });
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  function handleAddUpdateProduct() {
    handleValidateControlRequired().then(res => {
      if (res) {
        const dataBody = {
          tensanpham: getValues('productName'),
          sanphamtructuyen: getValues('sellOnline') ? 1 : 0,
          soluong: parseInt(getValues('quantity') ?? '0'),
          trigia: parseInt(getValues('importPrice') ?? '0'),
          giaban: parseInt(getValues('sellPrice') ?? '0'),
          iddonvitinh: parseInt(getValues('unit').value ?? '0'),
          idcuahang: parseInt(getValues('storeName').IDCuaHang ?? '0'),
          giatritiente: '&#8363',
          mota: getValues('description'),
          giamgia: getValues('isContactPrice')
            ? 0
            : parseInt(getValues('discountPrice') ?? '0'),
          thoigianbaohanh: parseInt(getValues('warranty').value ?? '0'),
          khoiluong: parseInt(getValues('weight') ?? '0'),
          dai: parseInt(getValues('lengthMM') ?? '0'),
          rong: parseInt(getValues('widthMM') ?? '0'),
          cao: parseInt(getValues('heightMM') ?? '0'),
          idnguoidung: '000',
        };

        if (type !== 'add') {
          dataBody.idSanPham = data?.IDSanPham || data?.IdsanPham;
          // dataBody.masanpham = data?.MaSanPham;

          fetchData(dispatch, 'updateInforProduct', dataBody, res => {
            if (res.success) {
              Toast.show({
                type: 'success',
                props: {
                  message: t('succesAdjustProduct'),
                },
              });
              navigation.navigate('dieu-chinh-san-pham', {
                type: type,
                data: {...res?.data, ...typeOrjImage},
              });
            } else {
              Toast.show({
                type: 'error',
                props: {
                  message: t('warningAdjustProduct'),
                },
              });
            }
          });
        } else {
          // Nếu type là 'add' thì không có idsanpham và masanpham
          fetchData(dispatch, 'addInforProduct', dataBody, res => {
            if (res.success) {
              Toast.show({
                type: 'success',
                props: {message: t('addProductSuccess')},
              });
              navigation.navigate('dieu-chinh-san-pham', {
                type: 'update',
                data: res?.data?.metadata,
              });
            } else {
              Toast.show({
                type: 'error',
                props: {message: t(res?.message)},
              });
            }
          });
        }
      }
    });
  }

  const onSubmitForm = () => {
    let hasError = false; // Flag để kiểm tra nếu có lỗi
    const fieldsToCheck = [
      'productName',
      'storeName',
      'warranty',
      'quantity',
      'unit',
    ];
    fieldsToCheck.forEach(field => {
      const value =
        field === 'storeName' || field === 'warranty' || field === 'unit'
          ? getValues(field).value
          : getValues(field);

      if (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim() === '')
      ) {
        setError(field, {
          type: 'manual',
          message: t(`request${field}`),
        });
        hasError = true; // Đánh dấu có lỗi
      } else {
        clearErrors(field);
      }
    });

    if (!hasError) {
      handleAddUpdateProduct();
    }
  };

  const fetchDataAsync = async () => {
    if (dataStories?.length === 0) {
      await fetchData(dispatch, 'getListStore');
    }
    if (!dataUnit) {
      await fetchData(
        dispatch,
        'getUnitProduct',
        {loai: 20},
        //    res => {
        //   if (res?.success === true) {
        //     setDataUnit(res?.data);
        //   }
        // }
      );
    }
    if (!dataWarranty) {
      await fetchData(
        dispatch,
        'getGuaranteeProduct',
        {loai: 23},
        //    res => {
        //   if (res?.success === true) {
        //     setDataWarranty(res?.data);
        //   }
        // }
      );
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, []);

  function handleGetImageTypeOriginal(data) {
    setTypeOrjImage(prev => ({
      ...prev,
      ...(data?.URLImage && {
        URLImage: data.URLImage,
      }),
      ...(data?.URLImage2 && {
        URLImage2: data.URLImage2,
      }),
      ...(data?.URLImage3 && {
        URLImage3: data.URLImage3,
      }),
      ...(data?.URLImage4 && {
        URLImage4: data.URLImage4,
      }),
      ...(data?.URLImage5 && {
        URLImage5: data.URLImage5,
      }),
      ...(data?.NhomSanPhams && {
        NhomSanPhams: data.NhomSanPhams,
      }),
    }));
  }

  useEffect(() => {
    handleGetImageTypeOriginal(data);
  }, [data]);
  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar
        nameHeaderTitle={t('information')}
        iconRight="renew"
        onPressRight={handleResetForm}
      />
      <MyView style={styles.body}>
        <MyAvoidView>
          {/*Content tab product information*/}
          <MyView style={[styles.formContainer, styles.show]}>
            <MyView style={styles.topItem}>
              <MyText style={[styles.requiredText, styles.fontTiny]}>
                {t('mustToInputVATPRice')}
              </MyText>
            </MyView>

            <MyView style={styles.control}>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <InputText
                    value={value}
                    styleContainer={styles.inputFull}
                    onChangeText={text => {
                      onChange(text);
                      clearErrors('productName');
                    }}
                    labelName={t('productName')}
                    styleText={styles.txtInput}
                    contentError={error ? errors?.productName?.message : null}
                  />
                )}
                name="productName"
              />
            </MyView>

            <MyView style={styles.control}>
              <Controller
                control={control}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <Selects
                    value={value?.value}
                    onChangeValue={data => {
                      onChange(data);
                      clearErrors('storeName');
                    }}
                    options={dataStories?.filter(item => item?.value !== 'all')}
                    labelName={t('storeName')}
                    contentError={error ? errors?.storeName?.message : null}
                  />
                )}
                name="storeName"
              />
            </MyView>

            <MyView style={styles.control}>
              <Controller
                control={control}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <Selects
                    value={value?.value}
                    onChangeValue={data => {
                      onChange(data);
                      clearErrors('warranty');
                    }}
                    options={dataWarranty || []}
                    labelName={t('warranty')}
                    contentError={error ? errors?.warranty?.message : null}
                  />
                )}
                name="warranty"
              />
            </MyView>

            <MyView style={[styles.wrapGroup, styles.marginControl]}>
              <Controller
                control={control}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <InputText
                    keyboardType="numeric"
                    maxLength={3}
                    value={value.toString()}
                    styleContainer={styles.input}
                    onChangeText={text => {
                      onChange(text);
                      clearErrors('quantity');
                    }}
                    labelName={t('quantity')}
                    styleText={styles.txtInput}
                    contentError={error ? errors?.quantity?.message : null}
                    editable={type === 'add' ? true : false}
                  />
                )}
                name="quantity"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <InputText
                    keyboardType="numeric"
                    maxLength={6}
                    value={value.toString()}
                    styleContainer={styles.input}
                    onChangeText={text => {
                      onChange(text);
                      clearErrors('weight');
                    }}
                    labelName={t('weighGR')}
                    styleText={styles.txtInput}
                  />
                )}
                name="weight"
              />
            </MyView>

            <MyView style={[styles.wrapGroup]}>
              <Controller
                control={control}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <Selects
                    value={value?.value}
                    // onChangeValue={onChange}
                    onChangeValue={data => {
                      onChange(data);
                      clearErrors('unit');
                    }}
                    options={dataUnit || []}
                    labelName={t('unit')}
                    contentError={error ? errors?.quantity?.message : null}
                  />
                )}
                name="unit"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <InputText
                    keyboardType="numeric"
                    maxLength={5}
                    value={value.toString()}
                    styleContainer={styles.input}
                    onChangeText={onChange}
                    labelName={t('lengthMM')}
                    styleText={styles.txtInput}
                  />
                )}
                name="lengthMM"
              />
            </MyView>

            <MyView style={[styles.wrapGroup, styles.marginControl]}>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <InputText
                    keyboardType="numeric"
                    maxLength={5}
                    value={value.toString()}
                    styleContainer={styles.input}
                    onChangeText={onChange}
                    labelName={t('widthMM')}
                    styleText={styles.txtInput}
                  />
                )}
                name="widthMM"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <InputText
                    keyboardType="numeric"
                    maxLength={5}
                    value={value.toString()}
                    styleContainer={styles.input}
                    onChangeText={onChange}
                    labelName={t('heightMM')}
                    styleText={styles.txtInput}
                  />
                )}
                name="heightMM"
              />
            </MyView>

            <MyView style={styles.wrapGroup}>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <MyView style={styles.chooseType}>
                    <ToggleSwitch
                      isOn={value}
                      offColor={Colors.neutral_50}
                      onToggle={onChange}
                      trackOnStyle={styles.onToggle}
                      trackOffStyle={styles.offToggle}
                      thumbOnStyle={styles.thumbStyle}
                      thumbOffStyle={styles.thumbStyle}
                    />
                    <MyText style={styles.txtChooseType}>
                      {t('contactPrice')}
                    </MyText>
                  </MyView>
                )}
                name="contactPrice"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <MyView style={styles.chooseType}>
                    <ToggleSwitch
                      isOn={value}
                      offColor={Colors.neutral_50}
                      onToggle={onChange}
                      trackOnStyle={styles.onToggle}
                      trackOffStyle={styles.offToggle}
                      thumbOnStyle={styles.thumbStyle}
                      thumbOffStyle={styles.thumbStyle}
                    />
                    <MyText style={styles.txtChooseType}>
                      {t('sellOnline')}
                    </MyText>
                  </MyView>
                )}
                name="sellOnline"
              />
            </MyView>

            <MyView style={styles.wrapGroup}>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <MyView style={styles.wrapInputUnit}>
                    <MyText style={styles.labelInputUnit}>
                      {t('importPrice')}
                    </MyText>
                    <InputWithUnit
                      unit={'đ'}
                      maxValue={10000000000}
                      styleContainer={styles.inputUnitContainer}
                      styleText={styles.inputUnit}
                      value={value.toString()}
                      onChangeText={onChange}
                      maxLength={20}
                    />
                  </MyView>
                )}
                name="importPrice"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <MyView style={styles.wrapInputUnit}>
                    <MyText style={styles.labelInputUnit}>
                      {t('sellPrice')}
                    </MyText>
                    <InputWithUnit
                      inputRef={sellPriceRef}
                      editable={!getValues('contactPrice')}
                      styleContainer={styles.inputUnitContainer}
                      styleText={[
                        styles.inputUnit,
                        !getValues('contactPrice') ? {} : styles.disabled,
                      ]}
                      onEndEditing={() => {
                        if (
                          !getValues('contactPrice') &&
                          getValues('sellPrice') < getValues('importPrice')
                        ) {
                          setValue(
                            'sellPrice',
                            getValues('importPrice').toString(),
                            {
                              shouldValidate: true,
                              shouldDirty: true,
                            },
                          );
                        }
                      }}
                      unit={'đ'}
                      value={value}
                      onChangeText={onChange}
                      maxLength={20}
                      maxValue={10000000000}
                    />
                  </MyView>
                )}
                name="sellPrice"
              />
            </MyView>

            <MyView style={styles.wrapGroup}>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <MyView style={styles.wrapInputUnit}>
                    <MyText style={styles.labelInputUnit}>
                      {t('discountPricePercent')}
                    </MyText>
                    <InputWithUnit
                      editable={!getValues('contactPrice')}
                      unit={'%'}
                      styleContainer={styles.inputUnitContainer}
                      styleText={[
                        styles.inputUnit,
                        !getValues('contactPrice') ? {} : styles.disabled,
                      ]}
                      value={value}
                      onChangeText={onChange}
                      maxLength={3}
                      maxValue={100}
                    />
                  </MyView>
                )}
                name="discountPrice"
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <MyView style={styles.wrapInputUnit}>
                    <MyText style={styles.labelInputUnit}>
                      {t('afterDiscountPrice')}
                    </MyText>
                    <InputWithUnit
                      editable={false}
                      styleContainer={[styles.inputUnitContainer]}
                      styleText={[styles.inputUnit, styles.disabled]}
                      unit={'đ'}
                      value={value}
                      onChangeText={onChange}
                      maxLength={20}
                      maxValue={10000000000}
                    />
                  </MyView>
                )}
                name="afterDiscountPrice"
              />
            </MyView>
          </MyView>
        </MyAvoidView>
      </MyView>

      {/*Actions*/}
      <MyView>
        <Bottom
          sticky={false}
          titleBtn1={t(type === 'add' ? 'createProduct' : 'updateButton')}
          onPress1={() => onSubmitForm()}
        />
      </MyView>
    </MySafeAreaView>
  );
};
export default Index;
