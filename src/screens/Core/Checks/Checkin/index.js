import React, { useState, useEffect } from 'react';
import { StyleSheet, Linking } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import RNQRGenerator from 'rn-qr-generator';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import Geolocation from '@react-native-community/geolocation';

import { Sizes, Width, Height, parseSizeHeight, FontStyles } from '~theme';
import { checkPermission } from '~helper/permission';
import { MyText, MyView, MyTouchableOpacity } from '~components/MyStyles';
import Icon from '~components/IconXML';
import ModalConfirm from '~modals/ModalConfirm';
import UploadImage from '~components/UploadImage';
import fetchData from '~providers';
import ModalCheckin from '~components/modals/ModalCheckin';

const overlayColor = 'rgba(0,0,0,0.65)';
const markerSize = 230;
const markerTop = (Height - markerSize) / 2;
const markerLeft = (Width - markerSize) / 2;

export default function Index() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [isActive, setIsActive] = useState(true);
    const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
    const [contentNotification, setContentNotification] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const [dataCheck, setDataCheck] = useState(null);
    const [modalCheckin, setModalCheckin] = useState(false);

    // check permission 
    useEffect(() => {
        checkPermistion();
        if (Platform.OS === 'android') {
            requestLocationPermission();
        } else {
            startLocationUpdates();
        }
    }, []);

    const checkPermistion = async () => {
        const permissionLocation = await checkPermission('location');
        const permissionCamera = await checkPermission('camera');

        if (!permissionLocation) {
            setVisibleModalConfirm(true);
            setContentNotification(t('missPermissionLocation'));
            return;
        }
        else if (!permissionCamera) {
            setVisibleModalConfirm(true);
            setContentNotification(t('missPermissionCamera'));
            return;
        }
        else {
            setIsActive(true);
        }
    };
    // get current location
    const requestLocationPermission = () => {
        Geolocation.requestAuthorization(
            () => {
                startLocationUpdates();
            },
            error => {
                goToAppSettings();
            },
        );
    };
    // get longti lati
    const startLocationUpdates = () => {
        Geolocation.getCurrentPosition(
            position => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            error => {
                console.error('Error getting location: ', error);
                checkAndEnableGPS();
            },
            { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
        );
    };
    // check enable GPS on android
    const checkAndEnableGPS = () => {
        if (Platform.OS === 'android') {
            LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message: `<h2>${t('openYourLocation')}</h2>${t('locationPromptMessage')}`,
                ok: t('ok'),
                cancel: t('cancel'),
            })
                .then(success => {
                    console.log('GPS status:', success);
                    if (!success.enabled) {
                        LocationServicesDialogBox.forceCloseDialog();
                        LocationServicesDialogBox.enableLocationServices();
                    } else {
                        Geolocation.getCurrentPosition(position => {
                            setLatitude(position.coords.latitude);
                            setLongitude(position.coords.longitude);
                        });
                    }
                })
                .catch(error => {
                    if (error.message === 'disabled') {
                        navigation.goBack();
                    }
                });
        }
    };
    // open setting device
    const goToAppSettings = () => {
        if (Platform.OS === 'android') {
            Linking.openSettings();
        } else {
            Linking.openURL('app-settings:');
        }
    };
    // handle Scan
    const handleScan = stringCheck => {
        setIsActive(false);
        const params = {
            stringCheck,
            latitude,
            longitude,
        };
        fetchData(dispatch, 'checkDistance', params, (res) => {
            if (res?.success === true) {
                const checkDateTime = new Date();
                const dataChecks = {
                    ...res?.data,
                    stringCheck,
                    latitude,
                    longitude,
                    checkDateTime,
                }

                setDataCheck(dataChecks);
                setModalCheckin(true);
            }
            else {
                Toast.show({
                    type: 'error',
                    props: { message: res?.message },
                });
            }
        })
    };
    // handle scan photo from library
    const handleScanQRFromImage = async imageUri => {
        RNQRGenerator.detect({
            uri: imageUri,
        })
            .then(response => {
                if (response?.values?.length > 0) {
                    const stringCheck = response.values[0];
                    handleScan(stringCheck);
                } else {
                    Toast.show({
                        type: 'error',
                        props: { message: t('errorQR') },
                    });
                }
            })
            .catch(error => {
                Toast.show({
                    type: 'error',
                    props: { message: error },
                });
            });
    };

    return (
        <MyView style={styles.container} >
            <MyView style={styles.header}>
                <MyText style={styles.txtTitle}>{t('attendance')}</MyText>
                <MyTouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.btnClose}>
                    <Icon name="close" width="48" height="48" />
                </MyTouchableOpacity>
            </MyView>
            <QRCodeScanner
                reactivateTimeout={3000}
                onRead={e => handleScan(e.data)}
                cameraStyle={styles.cameraStyle}
                showMarker={true}
                customMarker={
                    <MyView style={styles.overlay}>
                        <MyView style={styles.topOverlay} />
                        <MyView style={styles.centerOverlay}>
                            <MyView style={styles.sideOverlay} />
                            <MyView style={styles.markerStyle} />
                            <MyView style={styles.sideOverlay} />
                        </MyView>
                        <MyView style={styles.bottomOverlay} >
                            <MyView style={styles.wrapUpload}>
                                <UploadImage getUrlImage={url => handleScanQRFromImage(url)} />
                            </MyView>
                        </MyView>
                    </MyView>
                }
                reactivate={isActive}
                cameraProps={{
                    rectOfInterest: {
                        x: markerLeft / Width,
                        y: markerTop / Height,
                        width: markerSize / Width,
                        height: markerSize / Height,
                    },
                    cameraViewDimensions: { width: Width, height: Height },
                }}
            />
            <ModalConfirm
                isVisible={visibleModalConfirm}
                type={1}
                onClose={() => setVisibleModalConfirm(false)}
                title={t('notification')}
                content={contentNotification}
                onConfirm={() => setVisibleModalConfirm(false)}
            />
            <ModalCheckin
                isVisible={modalCheckin}
                data={dataCheck}
                onClose={() => setModalCheckin(false)}
            />
        </MyView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Width,
        height: Height,
        margin: 0,
    },
    cameraStyle: {
        width: Width,
        height: Height,
    },
    markerStyle: {
        borderColor: '#ffffff',
        borderWidth: 4,
        borderRadius: Sizes.spacing_2_Height,
        width: markerSize,
        height: markerSize,
        backgroundColor: 'transparent',
        marginHorizontal: -4,
        marginVertical: -1,
        zIndex: 2,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    topOverlay: {
        flex: 1,
        backgroundColor: overlayColor,
    },
    centerOverlay: {
        flexDirection: 'row',
    },
    sideOverlay: {
        backgroundColor: overlayColor,
        flex: 1,
    },
    bottomOverlay: {
        height: parseSizeHeight(440),
        backgroundColor: overlayColor,
    },
    header: {
        position: 'absolute',
        top: parseSizeHeight(50),
        width: Width,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        backgroundColor: 'transparent',
    },
    txtTitle: {
        fontFamily: FontStyles.InterSemiBold,
        fontSize: Sizes.text_h5,
        fontWeight: '600',
        color: '#ffffff',
    },
    btnClose: {
        marginTop: parseSizeHeight(25),
        width: 48,
        height: 48,
        borderRadius: Sizes.spacing_5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapUpload: {
        paddingVertical: parseSizeHeight(60),
        alignItems: 'center',
    },
});
