import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

import {
  MyView,
  MySafeAreaView,
  MyAvoidView,
} from '~components/MyStyles';
import {
  Colors,
  Sizes,
  parseSizeHeight,
} from '~theme';
import Bottom from '~components/Bottom';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import InputText from '~inputs/InputText';
import CountryPicker from '~components/inputs/InputPicker/CountryPicker';
import CityPicker from '~components/inputs/InputPicker/CityPicker';
import ZipcodePicker from '~components/inputs/InputPicker/ZipcodePicker';
import fetchData from '~providers';


const Index = props => {
  const { data } = props?.route?.params
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [receiverFullName, setReceiverFullName] = useState(data?.NguoiNhan);
  const [receiverphone, setReceiverPhone] = useState(data?.DienThoaiKhachHang);
  const [newDeliveryAddress, setNewDeliveryAddress] = useState(data?.DiaChiNhan);
  const [countrySelected, setCountrySelected] = useState({ countryCode: data?.MaQuocGiaNhan, countryName: data?.TenQuocGiaNhan});
  const [citySelected, setCitySelected] = useState({ cityCode: data?.MaBangNhan, cityName: data?.TenBangNhan});
  const [zipcodeSelected, setZipcodeSelected] = useState({zipcode:data?.ThanhPhoNhan, districtName: data?.TenQuanNhan});

  const handleUpdateAddressOrder =()=>{
    const params = {
      madonhang: data?.MaDonHang,
      hotennguoinhan: receiverFullName,
      dienthoainhan: receiverphone,
      diachinhan: newDeliveryAddress,
      thanhphonhan: zipcodeSelected?.zipcode,
      mabangnhan: citySelected?.cityCode,
      tenquocgianhan: countrySelected?.countryName,
      maquocgianhan: countrySelected?.countryCode,
      tenbangnhan: citySelected?.cityName,
      tenquannhan: zipcodeSelected?.districtName,
    }
    fetchData(dispatch, "updateAddressOrder", params, (res)=>{
      if(res?.success===true)
      {
        navigation.goBack();
      }
      else
      {
        Toast.show({
          type: 'error',
          props: { message: res?.message },
        });
      }
    })
  }

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('deliveryAddress')} />
      <MyAvoidView>
        <MyView style={styles.content}>
          <InputText
           styleContainer={styles.inputFull}
            maxLength={100}
            value={receiverFullName}
            onChangeText={value => setReceiverFullName(value)}
            labelName={t('receiverFullName')}
          />
          <InputText
           styleContainer={styles.inputFull}
            value={receiverphone}
            maxLength={12}
            onChangeText={value => setReceiverPhone(value)}
            labelName={t('receiverphone')}
            keyboardType={'numeric'}
          />
          <InputText
           styleContainer={styles.inputFull}
            maxLength={250}
            value={newDeliveryAddress}
            onChangeText={value => setNewDeliveryAddress(value)}
            labelName={t('newDeliveryAddress')}
          />
          <CountryPicker
            labelName={t('country')}
            value={countrySelected}
            onChangeValue={value => {
              setCountrySelected({
                countryCode: value?.countryCode,
                countryName: value?.label,
              })
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
              })
            }}
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
              })
            }}
          />
        </MyView>
      </MyAvoidView>
      <Bottom
        titleBtn1={t('update')}
        sticky={false}
        onPress1={() => handleUpdateAddressOrder()}
      />
    </MySafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Sizes.spacing_3_Height,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Sizes.paddingWidth,
    gap:parseSizeHeight(20),
  },
inputFull: {
    margin:0,
  },

})