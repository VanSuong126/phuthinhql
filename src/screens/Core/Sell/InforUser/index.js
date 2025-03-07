import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import Icon from '~components/IconXML';
import styles from './styles';
import {
  MySafeAreaView,
  MyView,
  MyText,
  MyAvoidView,
  MyTouchableOpacity,
} from '~components/MyStyles';
import Bottom from '~components/Bottom';
import InputText from '~inputs/InputText';
import CountryPicker from '~components/inputs/InputPicker/CountryPicker';
import CityPicker from '~components/inputs/InputPicker/CityPicker';
import ZipcodePicker from '~components/inputs/InputPicker/ZipcodePicker';
import CustomerPicker from '~components/inputs/InputPicker/CustomerPicker';
import { salesActions, salesSelectors } from '~redux/reducers';
import fetchData from '~providers';
import ModalAddressPicker from '~modals/ModalAddressPicker';
import DatePicker from '~inputs/InputPicker/DatePicker';

const Index = ({ route }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  //init state
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState();
  const [countrySelected, setCountrySelected] = useState({ countryCode: 'VN', countryName: 'Việt Nam' });
  const [citySelected, setCitySelected] = useState({ cityCode: '71', cityName: 'TP. Hồ Chí Minh' });
  const [zipcodeSelected, setZipcodeSelected] = useState();
  const [visibleModalPicker, setVisibleModalPicker] = useState(false);

  const [lastNameError, setLastNameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [birthdayError, setBirthdayError] = useState();
  const [citySelectedError, setCitySelectedError] = useState('');
  const [zipcodeSelectedError, setZipcodeSelectedError] = useState();

  // global state
  const orderData = useSelector(state => salesSelectors.selectDataSales(state));
  const deliveryData = useSelector(state => salesSelectors.selectDeliveryAddress(state));

  // update form when orderData change
  useEffect(() => {
    if (orderData?.idkhachhang) {
      setLastName(orderData?.ho);
      setFirstName(orderData?.ten);
      setPhone(orderData?.dienthoai);
      setEmail(orderData?.email);
      setAddress(orderData?.diachi);
      setBirthday({ date:orderData?.ngaysinhdate , value: orderData?.ngaysinh });
      setCountrySelected({ countryCode: orderData?.maquocgia, countryName: orderData?.tenquocgia });
      setCitySelected({ cityCode: orderData?.mabang, cityName: orderData?.tenbang });
      setZipcodeSelected({ zipcode: orderData?.thanhpho, districtName: orderData?.tenquan });
      // if idkhachhang different get new list delivery address
      if (deliveryData?.IDKhachHang !== orderData?.idkhachhang) {
        getlistAddressByID();
      }
      handleCleanError();
    }
  }, [orderData]);

  // handle get data birthday
  const convertBirthday = (date) => {
    const dateString = moment(date).format('DD/MM/YYYY');
    const dateTime = moment(date).format('yyyy-MM-DD');
    if (date) {
      setBirthday({ date: dateString, value: dateTime });
      setBirthdayError('');
    }
  }

  // check intput form
  const checkInputForm = () => {
    const fields = [
      { value: lastName, setError: setLastNameError, message: t('emptyLastName') },
      { value: firstName, setError: setFirstNameError, message: t('emptyFirstName') },
      { value: phone, setError: setPhoneError, message: t('emptyPhone') },
      { value: address, setError: setAddressError, message: t('emptyAddress') },
      { value: birthday, setError: setBirthdayError, message: t('emptyBirthday') },
      { value: citySelected, setError: setCitySelectedError, message: t('emptyCitySelected') },
      { value: zipcodeSelected, setError: setZipcodeSelectedError, message: t('emptyZipcodeSelected') },
    ];
  
    let isValid = true;
  
    fields.forEach(({ value, setError, message }) => {
      if (!value) {
        setError(message);
        isValid = false;
      } else {
        setError('');
      }
    });
  
    return isValid;
  };
  
  const checkInfoCustomer = () => {
    // call api add new customer and get idcustomer 
    fetchData(dispatch, 'addBuyer', {
      ho: lastName,
      ten: firstName,
      dienthoai: phone,
      diachi: address,
      thanhpho: zipcodeSelected?.zipcode,
      mabang: citySelected?.cityCode,
      maquocgia: countrySelected?.countryCode,
      tenquocgia: countrySelected?.countryName,
      tenbang: citySelected?.cityName,
      tenquan: zipcodeSelected?.districtName,
      email: email,
      ngaysinh: birthday?.value,
      gioitinh: -1,
      ghichu: '',
    }, (res) => {
      if (res.success === true) {
        const obj = JSON.parse(res.data?.data);
        const idKhachHang = obj?.IDKhachHang;
        if (idKhachHang) {
          // add data order
          const dataUpdate = {
            ...orderData,
            idkhachhang: idKhachHang,
            hoKH: lastName,
            tenKH: firstName,
            dienthoaiKH: phone,
            emailKH: email,
            ngaysinh: birthday?.value,
            ngaysinhdate: birthday?.date,
            ho: lastName,
            ten: firstName,
            tenkhachhang: `${firstName} ${lastName}`,
            dienthoai: phone,
            dienthoainhan: phone,
            email: email,
            maquocgia: countrySelected?.countryCode,
            tenquocgia: countrySelected?.countryName,
            mabang: citySelected?.cityCode,
            tenbang: citySelected?.cityName,
            tenquan: zipcodeSelected?.districtName,
            zipcode: zipcodeSelected?.zipcode,
            thanhpho: zipcodeSelected?.zipcode,
            diachi: address,
          }
          dispatch(salesActions.setDataSales(dataUpdate));
          // if null product goBack WareHouse if exist goto AdditinationService
          if (orderData && orderData?.sanphamdachon?.length > 0) {
            navigation.navigate('dich-vu-cong-them');
          }
          else {
            navigation.navigate('kho-hang');
          }
        }
      }
      else {
        Toast.show({
          type: 'error',
          props: { message: res?.message },
        });
      }
    })
  };

  // update delivery address
  const updateDeliveryAddress = () => {
    const dataUpdate = {
      ...orderData,
      ho: lastName,
      ten: firstName,
      tenkhachhang: `${firstName} ${lastName}`,
      dienthoai: phone,
      dienthoainhan: phone,
      email: email,
      maquocgia: countrySelected?.countryCode,
      tenquocgia: countrySelected?.countryName,
      mabang: citySelected?.cityCode,
      tenbang: citySelected?.cityName,
      tenquan: zipcodeSelected?.districtName,
      zipcode: zipcodeSelected?.zipcode,
      thanhpho: zipcodeSelected?.zipcode,
      diachi: address,
      ngaysinh: birthday?.value,
    }
    dispatch(salesActions.setDataSales(dataUpdate));
  }

  // handle button continue
  const handleContinue = () => {
    if (!checkInputForm()) return;
    const { idkhachhang, sanphamdachon } = orderData || {};
    // update order
    if (idkhachhang) {
      updateDeliveryAddress();
      navigation.navigate(sanphamdachon?.length > 0 ? 'dich-vu-cong-them' : 'kho-hang');
    } else {
      checkInfoCustomer();
    }
  };
  

  // clean all form
  const handleCleanCustomer = () => {
    handleCleanError();
    setLastName('');
    setFirstName('');
    setBirthday();
    setPhone('');
    setEmail('');
    setAddress('');
    setCountrySelected();
    setCitySelected();
    setZipcodeSelected();
    dispatch(salesActions.setDataSales(
      {
        ...orderData,
        idkhachhang: '',
        hoKH: '',
        tenKH: '',
        dienthoaiKH: '',
        emailKH: '',
        ho: '',
        ten: '',
        dienthoai: '',
        diachi: '',
        thanhpho: '',
        mabang: '71',
        maquocgia: 'VN',
        tenquocgia: 'Viet Nam',
        tenbang: 'TP Hồ Chí Minh',
        tenquan: '',
        email: '',
        ngaysinh: '',
        ngaysinhdate: '',
        gioitinh: -1,
        ghichu: '',
      }
    ))
  };
  const handleCleanError = () => {
    setLastNameError('');
    setFirstNameError('');
    setBirthdayError('');
    setPhoneError('');
    setAddressError('');
    setCitySelectedError('');
    setZipcodeSelectedError('');
  }

  // get data delivery address
  const getlistAddressByID = () => {
    fetchData(dispatch, 'addBuyer', {
      ho: orderData?.hoKH,
      ten: orderData?.tenKH,
      dienthoai: orderData?.dienthoaiKH,
    }, (res) => {
      if (res.success === true) {
        const obj = JSON.parse(res.data?.data);
        dispatch(salesActions.setDeliveryAddress(obj))
      }
    });
  }

  const handleSelectAddress = data => {
    const dataUpdate = {
      ...orderData,
      ho: data?.Ho,
      ten: data?.Ten,
      tenkhachhang: `${data?.Ho} ${data?.Ho}`,
      dienthoai: data?.DienThoai,
      dienthoainhan: data?.DienThoai,
      email: data?.Email,
      maquocgia: data?.MaQuocGia,
      tenquocgia: data?.TenQuocGia,
      mabang: data?.MaBang,
      tenbang: data?.TenBang,
      tenquan: data?.TenQuan,
      zipcode: data?.ThanhPho,
      thanhpho: data?.ThanhPho,
      diachi: data?.DiaChi,
    }
    dispatch(salesActions.setDataSales(dataUpdate));
  }

  // clean all form
  const handleCleanAddress = () => {
    handleCleanError();
    setLastName('');
    setFirstName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setCountrySelected();
    setCitySelected();
    setZipcodeSelected();
    setVisibleModalPicker(false);
  };

  return (
    <MySafeAreaView style={styles.container}>
      <MyView style={styles.header}>
        <MyText style={styles.txtHeader}>{t('recipientInfo')}</MyText>
        <MyTouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconHeader}>
          <Icon name="renew" width="24" height="24" />
        </MyTouchableOpacity>
      </MyView>
      <CustomerPicker />
      {orderData?.idkhachhang && <MyView style={styles.body}>
        <MyTouchableOpacity style={styles.wrapIconClear} onPress={handleCleanCustomer}>
          <Icon name="undo" width="24" height="24" />
        </MyTouchableOpacity>
        <MyText style={styles.titleTitle}>{t('inforCustomer')}</MyText>
        <MyView style={styles.wrapInfo}>
          <MyText style={styles.textInfo}>{orderData?.hoKH} {orderData?.tenKH}</MyText>
          <MyText style={styles.textInfo}>{orderData?.dienthoaiKH}</MyText>
         {orderData?.ngaysinh&& <MyText style={styles.textInfo}>{orderData?.ngaysinhdate}</MyText>}
          <MyText style={styles.textInfo}>{orderData?.emailKH}</MyText>
        </MyView>
      </MyView>}
      <MyAvoidView>
        <MyView style={styles.body}>
          <MyView style={styles.wrapTitleForm}>
            <MyText style={styles.titleTitle}>{t('recipientInfo')}</MyText>
            {orderData?.idkhachhang && <MyTouchableOpacity onPress={() => setVisibleModalPicker(true)}>
              <Icon name="rightArrow" width="24" height="24" />
            </MyTouchableOpacity>}
          </MyView>
          <MyView style={styles.wrapGroup}>
            <InputText
              value={lastName}
              styleContainer={styles.input}
              onChangeText={value => {setLastName(value); setLastNameError('')}}
              labelName={t('lastNameInput')}
              styleText={styles.txtInput}
              contentError={lastNameError}
            />
            <InputText
              value={firstName}
              styleContainer={styles.input}
              onChangeText={value => {setFirstName(value); setFirstNameError('')}}
              labelName={t('firstNameInput')}
              styleText={styles.txtInput}
              contentError={firstNameError}
            />
          </MyView>
          <MyView style={styles.wrapGroup}>
          <MyView style={styles.wrapGroup}>
            {!orderData?.idkhachhang && <DatePicker
              labelName={t('dateOfBirth')}
              styleContainer={styles.input}
              value={birthday?.value}
              getValue={val => convertBirthday(val)}
              contentError={birthdayError}
              minDate={new Date('1900-01-01')}
              maxDate={new Date()}
            />}

            <InputText
              value={phone}
              styleContainer={orderData?.idkhachhang?styles.inputFull: styles.input}
              onChangeText={value => { setPhone(value); setPhoneError('') }}
              keyboardType="numeric"
              maxLength={12}
              labelName={t('phoneNumber')}
              styleText={styles.txtInput}
              contentError={phoneError}
            />
          </MyView>
          </MyView>

          <InputText
            value={email}
            styleContainer={styles.inputFull}
            onChangeText={value => setEmail(value)}
            labelName={t('email')}
            styleText={styles.txtInput}
          />
          <CountryPicker
            labelName={t('country')}
            value={countrySelected}
            onChangeValue={value => {
              setCountrySelected({
                countryCode: value?.countryCode,
                countryName: value?.label,
              });
              setCitySelected();
              setZipcodeSelected();
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
              setCitySelectedError('');
              setZipcodeSelected();
            }}
            contentError={citySelectedError}
          />
          <InputText
            value={address}
            styleContainer={styles.inputFull}
            onChangeText={value => {setAddress(value); setAddressError('')}}
            labelName={t('address')}
            styleText={styles.txtInput}
            contentError={addressError}
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
              setZipcodeSelectedError();
            }}
            contentError={zipcodeSelectedError}
          />
        </MyView>
      </MyAvoidView>
      <Bottom
        titleBtn1="Tiếp tục"
        onPress1={() => handleContinue()}
      />
      <ModalAddressPicker
        isVisible={visibleModalPicker}
        onClose={() => setVisibleModalPicker(false)}
        data={deliveryData?.DiaChiNhanHang || []}
        typeFlatlist="deliveryAddress"
        selected={item => handleSelectAddress(item)}
        onCleanAddress={() => handleCleanAddress()}
      />
    </MySafeAreaView>
  );
};

export default Index;
