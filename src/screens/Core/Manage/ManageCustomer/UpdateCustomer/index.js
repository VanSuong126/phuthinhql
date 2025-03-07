import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {
    Colors,
    Sizes,
    parseSizeHeight,
    parseSizeWidth,
    FontStyles,
} from '~theme';
import Icon from '~components/IconXML';
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
import fetchData from '~providers';
import PersonalPicker from '~inputs/InputPicker/PersonalPicker';
import Gender from '~components/Gender';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import DatePicker from '~inputs/InputPicker/DatePicker';
import ModalAddRelationShip from '~modals/ModalAddRelationShip';
import InputMutiLine from '~components/inputs/InputMutiLine';
import ModalConfirm from '~modals/ModalConfirm';
import Line from '~components/Line';


const Index = props => {
    const { title, data } = props?.route?.params
    const navigation = useNavigation();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    //init state
    const [personal, setPersonal] = useState(data?.DanhXung);
    const [lastName, setLastName] = useState(data?.Ho);
    const [firstName, setFirstName] = useState(data?.Ten);
    const [birthday, setBirthday] = useState(data?.NgaySinhNhat);

    const [gender, setGender] = useState(data?.GioiTinh || -1);
    const [phone, setPhone] = useState(data?.DienThoai);
    const [email, setEmail] = useState(data?.Email);
    const [address, setAddress] = useState(data?.DiaChi);
    const [countrySelected, setCountrySelected] = useState({ countryCode: data?.MaQuocGia, countryName: data?.TenQuocGia });
    const [citySelected, setCitySelected] = useState({ cityCode: data?.MaBang, cityName: data?.TenBang });
    const [zipcodeSelected, setZipcodeSelected] = useState({ zipcode: data?.ThanhPho, districtName: data?.TenQuan });
    const [dataRelationShip, setDataRelationShip] = useState([]);
    const [note, setNote] = useState(data?.GhiChu);
    const [genderText, setGenderText] = useState([
        { label: t('male'), gender: 1 },
        { label: t('female'), gender: 0 },
        { label: t('unselected'), gender: -1 },
    ]);

    const [lastNameError, setLastNameError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [birthdayError, setBirthdayError] = useState();
    const [citySelectedError, setCitySelectedError] = useState('');
    const [zipcodeSelectedError, setZipcodeSelectedError] = useState();

    const [visibleAddRelationShip, setVisibleAddRelationShip] = useState(false);
    const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
    const [relationUpdate, setRelationUpdate] = useState();
    const [typeHandleRaltion, setTypeHandleRaltion] = useState();
    const [idRelationDelete, setIdRelationDelete] = useState();


    // get data relationship
    useEffect(() => {
        getRelationBuyer();
    }, []);

    // call api get Relationship
    const getRelationBuyer = async () => {
        const params = {
            idkhachhang: data?.IDKhachHang,
        };
        fetchData(dispatch, "getRelationBuyer", params, (res) => {
            if (res.success === true) {
                setDataRelationShip(res?.data)
            }
            else {
                setDataRelationShip();
            }
        })
    };

    const handleDeleteRelation =data=>{
        setIdRelationDelete(data?.ID);
        setVisibleModalConfirm(true);
    }
    // handle delete relation ship
    const confirmDeleteRelationShip = () => {
        setVisibleModalConfirm(false);
        const params = {
            loai: 4,
            idmoiquanhe: idRelationDelete,
        };
        fetchData(dispatch, "deleteRelationBuyer", params, (res) => {
            if (res?.success === true) {
                Toast.show({
                    type: 'success',
                    props: { message: res?.data?.message },
                });
                getRelationBuyer();
            }
        })
    };
    // open Modal Update relationship
    const handleUpdateRelation = (data) => {
        setTypeHandleRaltion('update');
        setRelationUpdate(data);
        setVisibleAddRelationShip(true);
    };
    // update Customer
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

    const  handleUpdateCustomer = async () => {
        if (!checkInputForm()) return false;
        const params = {
            loai: 11,
            idkhachhang: data?.IDKhachHang,
            danhxung: personal,
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
            ngaysinh: birthday == null ? '' : moment(birthday).format('YYYY-MM-DD'),
            gioitinh: gender,
            ghichu: note,
        };
        fetchData(dispatch, "updateBuyer", params, (res) => {
            if (res?.success === true) {
                Toast.show({
                    type: 'success',
                    props: { message: res?.data?.message },
                });
                navigation.goBack();
            }
            else {
                Toast.show({
                    type: 'error',
                    props: { message: res?.message },
                });
            }
        })
    }

    const handleAddUpdateRelationShip = dataNew => {
        setVisibleAddRelationShip(false);
        let params = {};
        if (typeHandleRaltion === 'update') {
            const dataUpdate = [{
                HoTen: dataNew?.HoTen,
                MoiQuanHe: dataNew?.MoiQuanHe,
                NgaySinh: dataNew?.NgaySinh,
                GioiTinh: dataNew?.GioiTinh,
                GhiChu: dataNew?.GhiChu
            }];
            params = {
                loai: 3,
                idkhachhang: data?.IDKhachHang,
                idmoiquanhe: dataNew?.ID,
                dsmoiquanhe: dataUpdate
            };
        } else {
            params = {
                loai: 2,
                idkhachhang: data?.IDKhachHang,
                dsmoiquanhe: [dataNew]
            };
        }
        fetchData(dispatch, "updateBuyer", params, (res) => {
            if (res?.success === true) {
                Toast.show({
                    type: 'success',
                    props: { message: res?.data?.message },
                });
                getRelationBuyer();
            }
            else {
                Toast.show({
                    type: 'error',
                    props: { message: res?.message },
                });
            }
        })
    }

    return (
        <MySafeAreaView style={styles.container}>
            <HeaderToolBar nameHeaderTitle={t(title)} />
            <MyAvoidView>
                <MyView style={styles.content}>
                    <PersonalPicker
                        value={personal}
                        getValue={value => setPersonal(value)}
                    />
                    <MyView style={styles.wrapName}>
                        <InputText
                            value={lastName}
                            styleContainer={styles.inputName}
                            onChangeText={value => {setLastName(value); setLastNameError('')}}
                            labelName={t('lastNameInput')}
                            styleText={styles.txtInput}
                            contentError={lastNameError}
                        />
                        <InputText
                            value={firstName}
                            styleContainer={styles.inputName}
                            onChangeText={value => {setFirstName(value); setFirstNameError('')}}
                            labelName={t('firstNameInput')}
                            styleText={styles.txtInput}
                            contentError={firstNameError}
                        />
                    </MyView>
                    <Gender
                        value={gender}
                        onSelect={value => setGender(value)}
                    />
                    <DatePicker
                        labelName={t('dateOfBirth')}
                        value={birthday}
                        getValue={val => {setBirthday(val); setBirthdayError('')}}
                        contentError={birthdayError}
                    />
                    <InputText
                        value={phone}
                        keyboardType="numeric"
                        maxLength={12}
                        onChangeText={value => {setPhone(value); setPhoneError('')}}
                        labelName={t('phoneNumber')}
                        editable={false}
                        contentError={phoneError}
                    />
                    <InputText
                        value={email}
                        onChangeText={value => setEmail(value)}
                        labelName={t('email')}
                    />
                    <InputText
                        value={address}
                        onChangeText={value => {setAddress(value); setAddressError('')}}
                        labelName={t('address')}
                        contentError={addressError}
                    />
                    <CountryPicker
                        labelName={t('country')}
                        value={countrySelected}
                        onChangeValue={value => {
                            setCountrySelected({
                                countryCode: value?.countryCode,
                                countryName: value?.label,
                            })
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
                            setZipcodeSelected();
                            setCitySelectedError('');
                        }}
                        contentError={citySelectedError}
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
                            setZipcodeSelectedError('');
                        }}
                        contentError={zipcodeSelectedError}
                    />
                    <InputMutiLine
                        labelName={t('note')}
                        value={note}
                        onChangeText={value => setNote(value)}
                        maxLength={300}
                    />
                </MyView>
                <MyView style={styles.wrapRelation}>
                    <MyText style={styles.textTitleRelation}>{t('listRelationship')}</MyText>
                    {dataRelationShip && dataRelationShip.length > 0 && dataRelationShip.map((data, index) => {
                        return (
                            <MyView key={index} style={styles.wrapInfoRelation}>
                                <MyTouchableOpacity style={styles.wrapIconClear} onPress={() => handleDeleteRelation(data)}>
                                    <Icon name="undo" width="24" height="24" />
                                </MyTouchableOpacity>
                                <MyTouchableOpacity style={styles.wrapIconEdit} onPress={() => handleUpdateRelation(data)}>
                                    <Icon name="edit" width="24" height="24" />
                                </MyTouchableOpacity>
                                <MyView style={styles.wrapInfo}>
                                    <MyText style={styles.textInfo}>{data?.MoiQuanHe}</MyText>
                                    <MyText style={styles.textInfo}>{data?.HoTen} | {genderText.find(x => x.gender === data?.GioiTinh)?.label}</MyText>
                                    <MyText style={styles.textInfo}>
                                        {data?.NgaySinh ? moment(data?.NgaySinh).format('DD/MM/YYYY') : ''}
                                    </MyText>
                                    <MyText style={styles.textInfo}>{data?.GhiChu}</MyText>
                                </MyView>
                                {index !== dataRelationShip.length - 1 && (
                                    <Line color={Colors.neutrals_300} thickness={1} />
                                )}
                            </MyView>
                        );
                    })}
                </MyView>
            </MyAvoidView>
            <Bottom
                sticky={false}
                titleBtn1={t('addRelationShip')}
                titleBtn2={t('update')}
                onPress1={() => {
                    setVisibleAddRelationShip(true);
                    setTypeHandleRaltion('add')
                }
                }
                onPress2={() => handleUpdateCustomer()}
                typeBtn2={0}
            />
            <ModalAddRelationShip
                isVisible={visibleAddRelationShip}
                onClose={() => setVisibleAddRelationShip(false)}
                onConfirm={data => handleAddUpdateRelationShip(data[0])}
                data={relationUpdate}
                type={typeHandleRaltion}
            />
            <ModalConfirm
                isVisible={visibleModalConfirm}
                onClose={() => {
                    setVisibleModalConfirm(false),
                    setIdRelationDelete('')}
                    }
                title={t('notification')}
                content={t('areYouSureDeteteRelationship')}
                onConfirm={() => confirmDeleteRelationShip()}
            />
        </MySafeAreaView>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        marginHorizontal: Sizes.marginHeight,
        gap: parseSizeHeight(20),
        marginBottom: parseSizeHeight(20),
    },
    wrapName: {
        flexDirection: 'row',
        gap: 16,
    },
    inputName: {
        width: parseSizeWidth(163),

    },
    txtInput: {
        flex: 1,
        flexDirection: 'row',
    },
    // style Relationship
    wrapRelation: {
        paddingVertical: parseSizeHeight(12),
        paddingHorizontal: Sizes.paddingWidth,
        backgroundColor: Colors.neutrals_100,
        marginVertical: parseSizeHeight(6),
        borderWidth: 1,
        borderColor: Colors.neutrals_300,
        gap: parseSizeHeight(20),
    },
    textTitleRelation: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_subtitle1,
        fontWeight: '500',
        color: Colors.semantics_Black,
    },
    wrapInfoRelation: {
        backgroundColor: Colors.neutrals_100,
        gap: parseSizeHeight(10),
    },
    wrapInfo: {
        gap: parseSizeHeight(6),
    },
    textInfo: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_subtitle2,
        fontWeight: '500',
        color: Colors.semantics_Grey,
    },
    wrapIconClear: {
        position: 'absolute',
        right: parseSizeWidth(0),
        top: parseSizeHeight(0),
        padding: parseSizeWidth(10),
        zIndex: 2,
    },
    wrapIconEdit: {
        position: 'absolute',
        right: parseSizeWidth(40),
        top: parseSizeHeight(0),
        padding: parseSizeWidth(10),
        zIndex: 2,
    }
})