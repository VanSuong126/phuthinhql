import {Platform} from 'react-native';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import Geolocation from '@react-native-community/geolocation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

import { checkPermission } from '~helper/permission';
import Map from '~components/Map';
import styles from './styles';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import { commonActions } from '~redux/reducers';
import InputText from '~inputs/InputText';
import Button from '~buttons/MyButton';
import {
  MyView,
  MyTouchableOpacity,
  MyText,
  MyAvoidView,
  MySafeAreaView
} from '~components/MyStyles';
import fetchData from '~providers';


const Index = props => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { dataCheckPoint, type, headerTitle } = props.route?.params;
  // type =1 là tạo mới địa điểm check type =2 là sửa địa điểm check
  const [modalVisible, setModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    longitude: type === 2 && dataCheckPoint ? dataCheckPoint?.Longitude : 0,
    latitude: type === 2 && dataCheckPoint ? dataCheckPoint?.Latitude : 0,
    locationName:
      type === 2 && dataCheckPoint ? dataCheckPoint?.TenDiaDiem : '',
    qrCode: type === 2 && dataCheckPoint ? dataCheckPoint?.MaCheck : '',
    address: type === 2 && dataCheckPoint ? dataCheckPoint?.DiaChi : '',
  });

  const handleInputChange = (name, value) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleLocationData = locationDetails => {
    setFormValues(prevValues => ({
      ...prevValues,
      ...locationDetails,
    }));
    setModalVisible(false);
  };

  const handleConfirmChange = async () => {
    const { locationName, address, qrCode, latitude, longitude } = formValues;
    if (!locationName || !address || !qrCode) {
      Toast.show({
        type: 'error',
        props: { message: t('missInformation') },
      });
      return;
    }
    if (!latitude || !longitude) {
      Toast.show({
        type: 'error',
        props: { message: t('missCoordinates') },
      });
      return;
    }
    const params= {
        loai: type,
        IDDiaDiem: type === 2 ? dataCheckPoint.IDDiaDiem : -1,
        tendiadiem: locationName,
        diachi: address,
        macheck: qrCode,
        latitude,
        longitude,
      }
    fetchData(dispatch, "managerPointChecks", params, (res)=>{
      if(res.success ===true)
      {
        Toast.show({
          type: 'success',
          props: { message: res?.data[0]?.message },
        });
        if( type === 2)
        {
          navigation.goBack();
        }
      }
      else
      {
        Toast.show({
          type: 'error',
          props: { message: res?.message },
        });
      }
    })
  };

  const handleGetLocation = async ({ type }) => {
    const permissionLocation = await checkPermission('location');
    if (!permissionLocation) {
      Toast.show({
        type: 'error',
        props: { message: t('missPermissionLocation') },
      });
      return;
    }
    if (Platform.OS === 'android') {
      const checkGPS = await checkAndEnableGPS();
      if (checkGPS) {
        if (type === 'map') {
          setModalVisible(true);
        } else {
          handleSetCurrentLocation();
        }
      }
    } else {
      if (type === 'map') {
        setModalVisible(true);
      } else {
        handleSetCurrentLocation();
      }
    }
  };

  const checkAndEnableGPS = async () => {
    try {
      const success =
        await LocationServicesDialogBox.checkLocationServicesIsEnabled({
          message: `<h2>${t('openYourLocation')}</h2>${t('locationPromptMessage')}`,
          ok: t('ok'),
          cancel: t('cancel'),
        });
      if (!success.enabled) {
        LocationServicesDialogBox.forceCloseDialog();
        LocationServicesDialogBox.enableLocationServices();
        return false;
      }
      return true;
    } catch (error) {
      if (error.message === 'disabled') {
        Toast.show({
          type: 'error',
          props: { message: t('missOpenGPS') },
        });
      }
      return false;
    }
  };

  const handleNumber = (value, type) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [type]: value,
    }));
  };

  const handleSetCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setFormValues(prevValues => ({
          ...prevValues,
          latitude,
          longitude,
        }));
        dispatch(commonActions.toggleLoading(false));
      },
      error => {
        Toast.show({
          type: 'error',
          props: { message: t('missGetCurrentLocation') },
        });
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
    );
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={headerTitle} />
      <MyAvoidView>
        <MyView style={styles.content}>
          <InputText
            value={formValues.locationName}
            onChangeText={val => handleInputChange('locationName', val)}
            labelName={t('nameCheckPoint')}
          />
          <InputText
            value={formValues.qrCode}
            onChangeText={val => handleInputChange('qrCode', val)}
            labelName={t('stringGenQR')}
          />
          <InputText
            value={formValues.address}
            onChangeText={val => handleInputChange('address', val)}
            labelName={t('addressCheckin')}
          />
          <InputText
            value={`${formValues.longitude}`}
            type="custom"
            iconName ={'location'}
            onPressIcon={() => handleGetLocation({ type: 'map' })}
            onChangeText={val => handleNumber(val, 'longitude')}
            labelName={t('longitude')}
            keyboardType={'numbers-and-punctuation'}
          />
          <InputText
            value={`${formValues.latitude}`}
            type="custom"
            iconName ={'location'}
            onPressIcon={() => handleGetLocation({ type: 'map' })}
            onChangeText={val => handleNumber(val, 'latitude')}
            labelName={t('latitude')}
            keyboardType={'numbers-and-punctuation'}
          />
          <MyTouchableOpacity onPress={() => handleGetLocation({ type: 'locate' })}
            style={styles.wrapButtonGetCurrentLocation}>
            <MyText style={styles.textButtonGetCurrentLocation}> {t('ChosseCurrentLocation')}</MyText>
          </MyTouchableOpacity>
        </MyView>
      </MyAvoidView>
      <MyView style={styles.wrapButton}>
        <Button
          title={type === 1 ? t('createNewPoint') : t('updatePoint')}
          size="primary"
          type={1}
          onPress={handleConfirmChange}
        />
      </MyView>
      <Map
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        dataLocation={handleLocationData}
        formValues={formValues}
      />
    </MySafeAreaView>
  );
};

export default Index;
