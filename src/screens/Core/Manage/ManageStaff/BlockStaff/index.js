import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';
import {StyleSheet} from 'react-native';

import FlatList from '~components/FlatList';
import {MyView} from '~components/MyStyles';
import ListStaffs from '../ListStaff';
import fetchData from '~providers';
import {Sizes} from '~theme';
const Index = ({data = [], isTabSelected}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const handleUnBlock = item => {
    fetchData(
      dispatch,
      'updateStaff',
      {
        loai: 8,
        idnguoidung: item?.idNguoiDung,
        islock: 0,
      },
      data => {
        if (data.success === true) {
          Toast.show({
            type: 'success',
            props: {message: `${t('unlock')} ${t('accountLokedSuccess')}`},
          });
          isTabSelected(0);
        } else {
          Toast.show({
            type: 'error',
            props: {
              message:
                data?.message || `${t('unlock')} ${t('accountLokedFailure')}`,
            },
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
            type="block"
            onPressUnBlock={() => handleUnBlock(item)}
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
