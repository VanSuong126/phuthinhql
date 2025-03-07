import {StyleSheet} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {commonSelectors} from '~redux/reducers';
import Selects from '~inputs/Selects';
import Input from '~inputs/InputText';
import {MyView, MyAvoidView} from '~components/MyStyles';
import {Sizes, Colors} from '~theme';
import CountryPicker from '~inputs/InputPicker/CountryPicker';
import CityPicker from '~inputs/InputPicker/CityPicker';
import ZipcodePicker from '~components/inputs/InputPicker/ZipcodePicker';

const Index = props => {
  const {t} = useTranslation();
  const {
    storeCode,
    setStoreCode,
    storeName,
    setStoreName,
    representative,
    setRepresentative,
    address,
    setAddress,
    phone,
    setPhone,
    website,
    setWebsite,
    email,
    setEmail,
    level,
    setLevel,
    parentBranch,
    setParentBranch,
    countrySelected,
    setCountrySelected,
    citySelected,
    setCitySelected,
    zipcodeSelected,
    setZipcodeSelected,
  } = props;

  const dataStore = useSelector(state =>
    commonSelectors.selectorInforStore(state),
  );

  const dataLevel = dataStore
    .map(item => ({
      // label cấp độ cửa hàng
      label: item.CapDoCuaHang + 1,
      // value cấp độ cửa hàng cha
      value: item.CapDoCuaHang,
    }))
    .reduce((acc, current) => {
      const isDuplicate = acc.find(item => item.value === current.value);
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);

  // Find the maximum label in the resulting dataLevel array
  const maxLabel = Math.max(...dataLevel.map(item => item.label));

  // Add the new item with label as maxLabel + 1 and a unique value
  dataLevel.push({
    label: maxLabel + 1,
    value: maxLabel, // value can be set to any unique identifier if needed
  });

  const dataParentBranch = dataStore
    .filter(item => level?.value - 1 === item.CapDoCuaHang)
    .map(item => ({
      label: item.TenCuaHang,
      value: item.IDCuaHang,
    }));

  return (
    <MyAvoidView>
      <MyView style={styles.body}>
        <Input
          labelName={t('storeCode')}
          value={storeCode}
          onChangeText={setStoreCode}
        />
        <Input
          labelName={t('store')}
          value={storeName}
          onChangeText={setStoreName}
        />
        <Input
          labelName={t('representative')}
          value={representative}
          onChangeText={setRepresentative}
        />
        <MyView style={styles.horizontal}>
          <Selects
            labelName={t('level')}
            options={dataLevel}
            onChangeValue={setLevel}
            value={level.value}
          />
          <Selects
            labelName={t('parentBranch')}
            options={dataParentBranch}
            onChangeValue={setParentBranch}
            value={parentBranch.value}
          />
        </MyView>
        <CountryPicker
          labelName={t('country')}
          value={countrySelected}
          onChangeValue={value => {
            setCountrySelected({
              countryCode: value?.countryCode,
              countryName: value?.label,
            });
            setCitySelected({});
            setZipcodeSelected({});
          }}
        />
        <CityPicker
          countryCode={countrySelected?.countryCode}
          labelName={t('province') + ', ' + t('city')}
          value={citySelected}
          onChangeValue={value => {
            setCitySelected({
              cityCode: value?.cityCode,
              cityName: value?.label,
            });
            setZipcodeSelected({});
          }}
        />
        <Input
          labelName={t('address')}
          value={address}
          onChangeText={setAddress}
        />
        <ZipcodePicker
          countryCode={countrySelected?.countryCode}
          cityCode={citySelected?.cityCode}
          labelName={t('postalCode')}
          value={zipcodeSelected}
          onChangeValue={value => {
            setZipcodeSelected({
              zipcode: value?.label,
              districtName: value?.districtName,
            });
          }}
        />
        <Input
          labelName={t('phoneNumber')}
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
        />
        <Input labelName="Website" value={website} onChangeText={setWebsite} />
        <Input labelName={t('email')} value={email} onChangeText={setEmail} />
      </MyView>
    </MyAvoidView>
  );
};

export default Index;

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Sizes.spacing_4_Height,
  },
  body: {
    gap: Sizes.spacing_4_Height,
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: Sizes.marginWidth,
    paddingVertical: Sizes.paddingHeight,
  },
});
