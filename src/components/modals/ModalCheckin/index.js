import React, { useEffect, useState } from 'react';
import { StyleSheet, Image,Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';


import {getUniqueId} from 'react-native-device-info';
import { Colors, parseSizeWidth, parseSizeHeight, Sizes, FontStyles } from '~theme';
import Modal from 'react-native-modal';
import { MyView, MySafeAreaView, MyText } from '~components/MyStyles';
import Button from '~buttons/MyButton';
import Avatar from '~assets/images/person.png';
import LocalDB from '~data/asyncStorage';
import Line from '~components/Line';
import fetchData from '~providers';


const Index = props => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isVisible, onClose, data } = props;
    const [dataUser, setDataUser] = useState();
    const [idDevice, setidDevice] = useState('');


    // get data User
    useEffect(() => {
        getDeviceInfo();
        LocalDB.getUserData().then(data => {
            if (data) {
                setDataUser(data);
            }
        });
    }, []);

  //lấy id và name device
  const getDeviceInfo = async () => {
    let device = await getUniqueId();
    setidDevice(device);
  };

    const handleCheck = value => {
        const params= {
            IDNguoiDung: dataUser?.UserInfo?.IDNguoiDung,
            IDThietBi: idDevice,
            NenTangThietBi: Platform.OS,
            ChuoiCheck: data?.stringCheck,
            LoaiCheck: value,
            NgayGioCheck: moment( data?.checkDateTime).format('YYYY-MM-DD HH:mm:ss'),
            Lati:  data?.latitude,
            Longi:  data?.longitude,
          };
        fetchData(dispatch, 'confirmCheck', params, (res)=>{
            if(res.success ===true)
            {
                Toast.show({
                    type: 'success',
                    props: { message: res?.data },
                });
                onClose();
            }
            else
            {
                Toast.show({
                    type: 'error',
                    props: { message: res?.data },
                });
                onClose();
            }
        })
    }

    return (
        <Modal
            onBackdropPress={onClose}
            visible={isVisible}
            transparent={true}
            animationType="slide"
            style={styles.modal}>
            <MySafeAreaView style={styles.container}>
                <MyView style={styles.body}>
                    <MyView style={styles.line} />
                    <MyView style={styles.content}>
                        <MyView style={styles.groupDetail}>
                            <MyView style={styles.wrapAvatar}>
                                <Image source={Avatar} resizeMode="contain" style={styles.avatar} />
                            </MyView>
                            <MyView style={styles.wrapName}>
                                <MyText style={styles.textName}>
                                    {dataUser?.UserInfo?.Ho} {dataUser?.UserInfo?.Ten}
                                </MyText>
                                <MyText style={styles.textBirthDay}>
                                    {moment(dataUser?.UserInfo?.NgaySinh).format('DD/MM/YYYY')}
                                </MyText>
                            </MyView>
                        </MyView>
                        <Line color={Colors.neutrals_300} thickness={1} />
                        <MyView style={styles.wrapDetail}>
                            <MyView style={styles.wrapInfo}>
                                <MyText style={styles.titleInfo}>{t('time')}:</MyText>
                                <MyText style={styles.valueInfo}>
                                    {moment(data?.checkDateTime).format('DD/MM/YYYY')} | {moment(data?.checkDateTime).format('HH:mm:ss')}
                                </MyText>
                            </MyView>
                            <MyView style={styles.wrapInfo}>
                                <MyText style={styles.titleInfo}>{t('place')}:</MyText>
                                <MyText style={styles.valueInfo}>
                                    {data?.DiaChi}
                                </MyText>
                            </MyView>

                        </MyView>
                        <MyView style={styles.wrapDetail}>
                            <MyView style={styles.wrapInfo}>
                                <MyText style={styles.titleInfo}>{t('phoneNumber')}:</MyText>
                                <MyText style={styles.valueInfo}>
                                    {dataUser?.UserInfo?.DienThoai}
                                </MyText>
                            </MyView>
                            <MyView style={styles.wrapInfo}>
                                <MyText style={styles.titleInfo}>{t('email')}:</MyText>
                                <MyText style={styles.valueInfo}>
                                    {dataUser?.UserInfo?.Email}
                                </MyText>
                            </MyView>
                            <MyView style={styles.wrapInfo}>
                                <MyText style={styles.titleInfo}>{t('idCard')}:</MyText>
                                <MyText style={styles.valueInfo}>
                                    {dataUser?.UserInfo?.CMND}
                                </MyText>
                            </MyView>
                            <MyView style={styles.wrapInfo}>
                                <MyText style={styles.titleInfo}>{t('role')}:</MyText>
                                <MyText style={styles.valueInfo}>
                                    {dataUser?.UserInfo?.VaiTro}
                                </MyText>
                            </MyView>
                            <MyView style={styles.wrapInfo}>
                                <MyText style={styles.titleInfo}>{t('branch')}:</MyText>
                                <MyText style={styles.valueInfo}>
                                    {dataUser?.UserInfo?.StoreInfo?.TenCuaHang}
                                </MyText>
                            </MyView>
                        </MyView>
                        <MyView style={styles.wrapButton}>
                            <Button
                                title={t('checkout')}
                                onPress={() => handleCheck(2)}
                                type="2"
                                size="medium"
                            />
                            <Button
                                title={t('checkin')}
                                onPress={() => handleCheck(1)}
                                type="1"
                                size="medium"
                            />
                        </MyView>
                    </MyView>
                </MyView>
            </MySafeAreaView>
        </Modal>
    );
};

export default Index;

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        margin: 0,
        backgroundColor: 'rgba(0, 0, 0,0.35)',
        justifyContent: 'flex-end',
    },
    container: {
        flex: 0.7,
        margin: 0,
        borderStartStartRadius: parseSizeWidth(24),
        borderStartEndRadius: parseSizeWidth(24),
    },
    body: {
        flex: 1,
        paddingHorizontal: Sizes.paddingWidth,
    },
    line: {
        marginVertical: Sizes.spacing_4_Height,
        width: parseSizeWidth(45),
        height: parseSizeHeight(5),
        borderRadius: 100,
        backgroundColor: Colors.neutrals_300,
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        gap: parseSizeWidth(24),
    },
    groupDetail: {
        flexDirection: 'row',
    },
    wrapAvatar: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: parseSizeWidth(100),
        height: parseSizeWidth(100),
        borderRadius: parseSizeWidth(100),
        borderColor: Colors.neutrals_50,
        borderWidth: 1,
        backgroundColor: 'green',

    },
    wrapName: {
        marginLeft: parseSizeWidth(24),
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: parseSizeWidth(10),
    },
    textName: {
        fontSize: Sizes.text_h6,
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.neutrals_900,
        fontFamily: FontStyles.InterSemiBold,
    },
    textBirthDay: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_subtitle2,
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.neutrals_700,
    },
    wrapDetail: {
        borderWidth: 1,
        borderColor: Colors.neutrals_300,
        borderRadius: 12,
        paddingHorizontal: Sizes.paddingWidth,
        paddingVertical: Sizes.paddingHeight / 2,
        gap: Sizes.spacing_4_Width,

    },
    wrapInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleInfo: {
        textAlign: 'left',
        fontFamily: FontStyles.InterSemiBold,
        fontSize: Sizes.text_default,
        fontWeight: '500',
        color: Colors.neutrals_700,
    },
    valueInfo: {
        flex:1,
        textAlign:'right',
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_default,
        fontWeight: '500',
        color: Colors.semantics_Black,
    },

    textTitle: {
        marginBottom: parseSizeHeight(10),
        fontFamily: FontStyles.InterSemiBold,
        fontSize: Sizes.text_subtitle2,
        fontWeight: '600',
        textAlign: 'left',
        color: Colors.semantics_Black,
    },
    textInfo: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_subtitle2,
        fontWeight: '500',
        textAlign: 'left',
        color: Colors.semantics_Grey,
    },
    wrapButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },




});
