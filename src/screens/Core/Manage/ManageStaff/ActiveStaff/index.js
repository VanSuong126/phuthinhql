import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

import FlatList from '~components/FlatList';
import {MyView} from '~components/MyStyles';
import ListStaffs from '../ListStaff';
import fetchData from '~providers';
import {Sizes} from '~theme';
import {handleErrorResponse} from '~helper/utils';

const Index = ({data = [], isTabSelected}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const handleBlock = item => {
    fetchData(
      dispatch,
      'updateStaff',
      {
        loai: 8,
        idnguoidung: item?.idNguoiDung,
        islock: 1,
      },
      data => {
        if (data.success === true) {
          Toast.show({
            type: 'success',
            props: {message: `${t('lock')} ${t('accountLokedSuccess')}`},
          });
          isTabSelected(1);
        } else {
          Toast.show({
            type: 'error',
            props: {
              message:
                data?.message || `${t('lock')} ${t('accountLokedFailure')}`,
            },
          });
        }
      },
    );
  };
  
  const handleChangePass = item => {
    fetchData(
      dispatch,
      'changePass',
      {
        taiKhoanReset: item?.taiKhoan,
        isAutoSendEmail: true,
      },
      data => {
        if (data.success === true) {
          // sendMail(data?.data);
          Toast.show({
            type: 'success',
            props: {message: t('warningChangePassStaff')},
          });
        } else {
          Toast.show({
            type: 'error',
            // props: {message: data?.message || t('passChangeFailed')},
            props: handleErrorResponse(data.message, t('passChangeFailed')),
          });
        }
      },
    );
  };

  const handleUpdate = item => {
    navigation.navigate('them-moi-nhan-vien', {dataStaff: [item]});
  };

  return (
    <MyView style={styles.list}>
      <FlatList
        data={data}
        loading={false}
        fetching={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyleProp={styles.list}
        RenderItem={({item}) => (
          <ListStaffs
            data={item}
            type="active"
            onPressBlock={() => handleBlock(item)}
            onPressChangePass={() => handleChangePass(item)}
            onPressUpdate={() => handleUpdate(item)}
          />
        )}
      />
    </MyView>
  );
};
const styles = StyleSheet.create({
  list: {
    gap: Sizes.spacing_3_Height,
  },
});
export default Index;
