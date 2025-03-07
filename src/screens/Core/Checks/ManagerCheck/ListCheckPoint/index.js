import {FlatList} from 'react-native';
import {StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';

import {useTranslation} from 'react-i18next';
import React, {useState, useRef, memo} from 'react';
import {useDispatch} from 'react-redux';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import QRCode from 'react-native-qrcode-svg';
import 'fast-text-encoding';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
  MyView,
  MyTouchableOpacity,
  MyText,
  MySafeAreaView,
} from '~components/MyStyles';
import Line from '~components/Line';
import truncateText from '~helper/truncateText';
import Icon from '~components/IconXML';
import Modal from 'react-native-modal';
import Button from '~buttons/MyButton';
import fetchData from '~providers';

const ItemCheck = memo(
  ({item, handleSelect, handleGenerateQR, handleDeleteCheck}) => {
    return (
      <MyView key={item?.IDDiaDiem} style={styles.box}>
        <MyText style={styles.txtLocation}>{item?.TenDiaDiem}</MyText>
        <Line color={Colors.neutrals_300} thickness={1} />
        <MyView style={styles.wrapDetail}>
          <MyText style={styles.txtAdress}>
            {truncateText(item?.DiaChi, 20)}
          </MyText>
          <MyView style={styles.groupIcon}>
            <MyTouchableOpacity
              onPress={() => handleSelect(item)}
              style={styles.btn}>
              <Icon name="edit" width="24" height="24" />
            </MyTouchableOpacity>
            <MyTouchableOpacity
              onPress={() => handleGenerateQR(item)}
              style={styles.btn}>
              <Icon name="qrcode" width="24" height="24" />
            </MyTouchableOpacity>
            <MyView style={styles.btnDelete}>
              <MyTouchableOpacity
                onPress={() => handleDeleteCheck(item)}
                style={styles.btn}>
                <Icon name="trashGrey" width="24" height="24" />
              </MyTouchableOpacity>
            </MyView>
          </MyView>
        </MyView>
      </MyView>
    );
  },
);

const Index = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [valueQR, setValueQR] = useState(null);
  const [listCheckPoint, setListCheckPoint] = useState([]);
  const capQRref = useRef();
  const dispatch = useDispatch();

  // sửa điểm check theo id
  const handleSelect = item => {
    navigation.navigate('tao-sua-diem-check', {
      dataCheckPoint: item,
      type: 2,
      headerTitle: t('updatePoint'),
    });
  };

  // QRcode theo id
  const handleGenerateQR = item => {
    setValueQR(item);
    setModalVisible(true);
  };

  //share QR
  const handleShareQR = async () => {
    capQRref.current.capture().then(uri => {
      const option = {
        url: uri,
      };
      Share.open(option);
    });
  };

  //xóa điểm check
  const handleDeleteCheck = async item => {
    const params = {
      loai: 3,
      IDDiaDiem: item?.IDDiaDiem,
      tendiadiem: item?.TenDiaDiem,
      diachi: item?.DiaChi,
      macheck: item?.MaCheck,
      latitude: item?.Latitude,
      longitude: item?.Longitude,
    };
    fetchData(dispatch, 'managerPointChecks', params, res => {
      if (res.success === true) {
        Toast.show({
          type: 'success',
          props: {message: res?.data[0]?.message},
        });
        fetchCheckPoints();
      } else {
        Toast.show({
          type: 'error',
          props: {message: res?.message},
        });
        fetchCheckPoints();
      }
    });
  };

  // get list ds check point
  const fetchCheckPoints = () => {
    const params = {
      loai: 1,
    };
    fetchData(dispatch, 'getListPointCheck', params, res => {
      if (res.success === true) {
        const data = res?.data;
        if (data?.[0]?.success === '01') {
          setListCheckPoint(res?.data);
        } else {
          setListCheckPoint([]);
          Toast.show({
            type: 'error',
            props: {message: t('notFoundData')},
          });
        }
      } else {
        Toast.show({
          type: 'error',
          props: {message: res?.message},
        });
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCheckPoints();
    }, []),
  );

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('listCheckPoint')} />
      <MyView style={styles.content}>
        <FlatList
          data={listCheckPoint}
          renderItem={({item}) => (
            <ItemCheck
              item={item}
              handleSelect={handleSelect}
              handleGenerateQR={handleGenerateQR}
              handleDeleteCheck={handleDeleteCheck}
            />
          )}
          keyExtractor={item => item?.IDDiaDiem}
          showsVerticalScrollIndicator={false}
        />

        <Modal
          style={styles.modal}
          animationType="slide"
          visible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <MyView style={styles.containerModal}>
            <MyView style={styles.line} />
            <MyView style={styles.contentModal}>
              <ViewShot
                key={valueQR?.IDDiaDiem}
                ref={capQRref}
                options={{fileName: 'QRcode', format: 'png', quality: 0.9}}
                style={styles.QR}>
                <QRCode size={250} value={valueQR?.MaCheck} />
              </ViewShot>
              <MyView style={styles.wrapButton}>
                <Button
                  onPress={() => handleShareQR()}
                  size={'primary'}
                  title={t('shareQR')}
                  type={1}
                />
              </MyView>
            </MyView>
          </MyView>
        </Modal>
      </MyView>
    </MySafeAreaView>
  );
};

export default Index;

import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
  Width,
  Height,
} from '~theme';

const styles = StyleSheet.create({
  //
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  content: {
    backgroundColor: Colors.background,
    gap: parseSizeHeight(10),
    marginHorizontal: Sizes.marginWidth,
  },
  box: {
    borderWidth: 1,
    backgroundColor: Colors.neutrals_50,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(10),
    marginTop: parseSizeHeight(10),
    borderRadius: 16,
    gap: parseSizeHeight(10),
  },
  groupIcon: {
    flex: 0.3,
    flexDirection: 'row',
    gap: parseSizeHeight(10),
    justifyContent: 'space-between',
  },
  wrapDetail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtLocation: {
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    fontSize: Sizes.text_subtitle2,
    color: Colors.neutrals_900,
  },
  txtAdress: {
    flex: 0.7,
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    fontSize: Sizes.text_subtitle2,
    color: Colors.neutrals_700,
  },
  //
  modal: {
    flex: 1,
    margin: 0,
    backgroundColor: 'rgba(0, 0, 0,0.35)',
    justifyContent: 'flex-end',
  },
  containerModal: {
    flex: 0.5,
    padding: parseSizeHeight(5),
    backgroundColor: Colors.background,
    borderStartStartRadius: parseSizeWidth(24),
    borderStartEndRadius: parseSizeWidth(24),
    justifyContent: 'flex-start',
  },
  line: {
    marginVertical: Sizes.spacing_4_Height,
    width: parseSizeWidth(45),
    height: parseSizeHeight(5),
    borderRadius: 100,
    backgroundColor: Colors.neutrals_300,
    alignSelf: 'center',
  },
  contentModal: {
    marginTop: parseSizeHeight(16),
    alignItems: 'center',
  },
  wrapButton: {
    marginTop: parseSizeHeight(24),
  },
});
