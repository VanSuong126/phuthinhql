import { KEY_MAP } from '@env';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState, useRef } from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@rnmapbox/maps';
import Icon from '~components/IconXML';
import Modal from 'react-native-modal';
import {
  MyView,
  MyTouchableOpacity,
  MySafeAreaView
} from '~components/MyStyles';
import Bottom from '~components/Bottom';


MapboxGL.setAccessToken(KEY_MAP);

import styles from './styles';

const Index = ({ visible, dataLocation, onClose, formValues }) => {
  const { t } = useTranslation();

  const initialLocation = {
    latitude: parseFloat(formValues.latitude),
    longitude: parseFloat(formValues.longitude),
    address: formValues.address,
  };
  const [locationDetails, setLocationDetails] = useState({
    latitude: parseFloat(formValues.latitude),
    longitude: parseFloat(formValues.longitude),
    address: formValues.address,
  });
  const [pointAnnotationKey, setPointAnnotationKey] = useState(0);

  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize map with formValues location if available
    if (formValues.latitude !== 0 && formValues.longitude !== 0) {
      setLocationDetails(initialLocation);
      setPointAnnotationKey(prevKey => prevKey + 1);
    } else {
      handleMyLocationPress();
    }
  }, [formValues]);

  const handleMapPress = e => {
    const { coordinates } = e.geometry;
    const [longitude, latitude] = coordinates;
    setLocationDetails(prevLocation => ({
      ...prevLocation,
      latitude,
      longitude,
    }));
    setPointAnnotationKey(prevKey => prevKey + 1);
  };

  const handleConfirm = () => {
    dataLocation(locationDetails);
  };

  const handleMyLocationPress = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocationDetails(prevLocation => ({
          ...prevLocation,
          latitude,
          longitude,
        }));
        if (mapRef.current) {
          mapRef.current.setCamera({
            centerCoordinate: [longitude, latitude],
            zoomLevel: 20,
            duration: 1000,
          });
          setPointAnnotationKey(prevKey => prevKey + 1);
        }
      },
      error => {
        console.error('Error getting location: ', error);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };
  const handleCloseMap = async () => {
    await onClose();
    await setLocationDetails(initialLocation);
  };
  return (
    <Modal
      style={styles.modal}
      animationIn="zoomIn"
      animationOut="zoomOut"
      transparent={true}
      isVisible={visible}
      animationOutTiming={150}
      animationInTiming={250}
      backdropOpacity={0.3}>
      <MyView style={styles.container}>
        <MyView style={styles.content}>
          <MapboxGL.MapView
            ref={mapRef}
            style={styles.map}
            onPress={e => handleMapPress(e)}>
            <MapboxGL.Camera
              centerCoordinate={[
                locationDetails?.longitude,
                locationDetails?.latitude,
              ]}
              zoomLevel={15}
            />
            <MapboxGL.PointAnnotation
              key={`pointAnnotation-${pointAnnotationKey}`}
              coordinate={[
                parseFloat(locationDetails?.longitude),
                parseFloat(locationDetails?.latitude),
              ]}
              id={`pointAnnotation-${pointAnnotationKey}`}>
               <Icon name="locationMap" width="32" height="32" />
            </MapboxGL.PointAnnotation>
          </MapboxGL.MapView>

          <MyTouchableOpacity
            style={styles.myLocationButton}
            onPress={handleMyLocationPress}>
            <Icon name="location" width="24" height="24" color="#000" />
          </MyTouchableOpacity>
        </MyView>
        <MyView style={styles.wrapBottom}>
          <Bottom
          containerStyle = {styles.containerMap}
            titleBtn1={t('cancel')}
            titleBtn2={t('chooseLocation')}
            sticky={false}
            onPress1={() => handleCloseMap()}
            onPress2={() => handleConfirm()}
            typeBtn1={2}
          />
        </MyView>

      </MyView>

    </Modal>
  );
};

export default Index;
