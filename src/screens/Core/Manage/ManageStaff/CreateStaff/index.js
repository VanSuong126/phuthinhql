import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {commonSelectors} from '~redux/reducers';

import HeaderToolBar from '~components/headers/HeaderToolBar';
import Input from '~inputs/InputText';
import {MySafeAreaView, MyView, MyAvoidView} from '~components/MyStyles';
import Bottom from '~components/Bottom';
import styles from './styles';
import DatePicker from '~inputs/InputPicker/DatePicker';
import Branch from '~inputs/InputPicker/Branch';
import RolePicker from '~inputs/InputPicker/RolePicker';
import fetchData from '~providers';
import {handleErrorResponse} from '~helper/utils';

const Index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const route = useRoute();
  const {dataStaff} = route.params || {dataStaff: []};

  // State variables for each input field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [account, setAccount] = useState('');
  const [branch, setBranch] = useState([]);
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [role, setRole] = useState([]);

  const handleUndo = () => {
    setFirstName('');
    setLastName('');
    setBranch([]);
    setBirthday('');
    setPhoneNumber('');
    setEmail('');
    setIdNumber('');
    setRole([]);
  };
  const sendMail = item => {
    const params = {
      to: item?.email,
      title: `Tạo tài khoản ${item?.taiKhoan}`,
      body: `<div>
      <div style="border-radius: 10px; text-align: center; font-size: 20px; box-shadow: 3px 0px 5px 2px #999999; padding: 10px; width: 80%; margin: 0 auto; border: 1px solid #ccc">
       <div style="width: 150px; margin: 0 auto; padding-bottom: 20px;">
         <img src="https://uat.phuckhanggem.com/_imageslibrary/logo.png" style="width: 100%; object-fit: cover" />
       </div>
       <div style="font-weight: bold">Tạo tài khoản ${item?.taiKhoan} thành công.</div>
       <div>Sử dụng mật khẩu <b>${item?.matKhau}</b> để đăng nhập</div>
       <div style="font-style: italic; margin-top: 50px; font-size: 15px">Đây là thư gửi tự động. Vui lòng không trả lời. Cảm ơn./.</div>
       </div>
      </div>`,
    };
    fetchData(dispatch, 'sendMailBooking', params, data => {
      if (data.success) {
        Toast.show({
          type: 'success',
          props: {
            message: t('addAccountSuccess'),
          },
        });
        navigation.navigate('quan-tri');
      }
    });
  };

  const createAccount = () => {
    fetchData(
      dispatch,
      'addStaff',
      {
        ho: lastName,
        ten: firstName,
        taiKhoan: account,
        soDienThoai: phoneNumber,
        idCuaHang: branch[0],
        ngaySinhNhat: moment(birthday).format('YYYY-MM-DD'),
        email: email,
        cmnd: idNumber,
        idvaitro: role[0],
      },
      data => {
        if (data.success === true) {
          sendMail(data?.data);
        } else {
          Toast.show({
            type: 'error',
            props: handleErrorResponse(data.message, t('updateFail')),
          });
        }
      },
    );
  };

  const updateAccount = () => {
    fetchData(
      dispatch,
      'updateInforStaff',
      {
        idNguoiDung: dataStaff[0]?.idNguoiDung,
        ho: lastName,
        ten: firstName,
        taiKhoan: account,
        soDienThoai: phoneNumber,
        idCuaHang: branch[0],
        ngaySinhNhat: moment(birthday).format('YYYY-MM-DD'),
        email: email,
        cmnd: idNumber,
        idvaitro: role[0],
      },
      data => {
        if (data.success === true) {
          Toast.show({
            type: 'success',
            props: {
              message: t('updateSuccess'),
            },
          });
          navigation.navigate('quan-tri-nguoi-dung');
        } else {
          Toast.show({
            type: 'error',
            props: handleErrorResponse(data.message, t('updateFail')),
          });
        }
      },
    );
  };

  const handleAddEmployee = () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !account.trim() ||
      branch.length === 0 ||
      birthday === '' ||
      !phoneNumber.trim() ||
      !email.trim() ||
      !idNumber.trim() ||
      role.length === 0
    ) {
      Toast.show({
        type: 'error',
        props: {message: t('missInformation')},
      });
      return;
    }
    if (dataStaff.length === 0) {
      createAccount();
    } else {
      updateAccount();
    }
  };

  useEffect(() => {
    if (dataStaff && dataStaff.length > 0) {
      setFirstName(dataStaff[0]?.ten || '');
      setLastName(dataStaff[0]?.ho || '');
      setBranch([dataStaff[0]?.idCuaHang] || []);
      setBirthday(moment(dataStaff[0]?.ngaySinhNhat) || '');
      setPhoneNumber(dataStaff[0]?.soDienThoai || '');
      setEmail(dataStaff[0]?.email || '');
      setIdNumber(dataStaff[0]?.cmnd || '');
      setRole([dataStaff[0]?.idVaiTro] || []);
      setAccount(dataStaff[0]?.taiKhoan || '');
    }
  }, [dataStaff]);

  const dataStories = useSelector(commonSelectors.selectorListStore) || [];
  useEffect(() => {
    if (dataStories.length === 0) {
      fetchData(dispatch, 'getListStore');
    }
  }, []);

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar
        nameHeaderTitle={
          dataStaff.length === 0 ? t('addEmployee') : t('editEmployee')
        }
      />
      <MyAvoidView>
        <MyView style={styles.body}>
          <MyView style={styles.content}>
            <MyView style={styles.horizontal}>
              <Input
                styleContainer={styles.smallInput}
                labelName={t('lastNameInput')}
                value={lastName}
                onChangeText={setLastName}
              />
              <Input
                styleContainer={styles.smallInput}
                labelName={t('firstNameInput')}
                value={firstName}
                onChangeText={setFirstName}
              />
            </MyView>
            <Input
              styleContainer={styles.Input}
              labelName={t('account')}
              value={account}
              onChangeText={setAccount}
            />
            <Branch
              labelName={t('storeName')}
              styleBoxArrowDown={styles.inputPicker}
              onChangeValue={item => setBranch([item[0].IDCuaHang])}
              isSelected={dataStories.filter(
                store => store.IDCuaHang === branch[0],
              )}
              limitSelected={1}
              data={dataStories?.filter(item => item?.value !== 'all')}
            />
            <DatePicker
              styleContainer={styles.inputDate}
              labelName={t('dateOfBirth')}
              getValue={setBirthday}
              value={birthday}
              isSelected={birthday}
            />
            <Input
              styleContainer={styles.Input}
              labelName={t('phoneNumber')}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
            />
            <Input
              styleContainer={styles.Input}
              labelName={t('email')}
              value={email}
              onChangeText={setEmail}
            />
            <Input
              styleContainer={styles.Input}
              labelName={t('idCard')}
              value={idNumber}
              onChangeText={setIdNumber}
              keyboardType="numeric"
            />
            <RolePicker
              labelName={t('jobPosition')}
              styleBoxArrowDown={styles.inputPicker}
              onChangeValue={item => setRole([item[0]?.value])}
              isSelected={role}
            />
          </MyView>
        </MyView>
      </MyAvoidView>

      <Bottom
        sticky={false}
        titleBtn1={t('undo')}
        onPress1={handleUndo}
        titleBtn2={dataStaff.length === 0 ? t('addEmployee') : t('confirm')}
        onPress2={() => {
          handleAddEmployee();
        }}
      />
    </MySafeAreaView>
  );
};

export default Index;
