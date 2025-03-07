import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {openSettings} from 'react-native-permissions';

import HeaderToolBar from '~components/headers/HeaderToolBar';
import {MySafeAreaView, MyView, MyAvoidView} from '~components/MyStyles';
import Bottom from '~components/Bottom';
import TabControl from '~components/TabControl';
import {Colors, Sizes, Width} from '~theme';
import FormAddStories from './FormAddStorie';
import AddImage from './AddImage';
import {checkPermission} from '~helper/permission';
import {LIMIT_IMAGE_SIZE_UPLOAD, ExtensionProductImageUpload} from '~constants';
import fetchData from '~providers';

const Index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {dataStore} = route.params || {};
  const {t} = useTranslation();

  const [tabSelected, setTabSelected] = useState(0);
  const [storeCode, setStoreCode] = useState('');
  const [storeName, setStoreName] = useState('');
  const [representative, setRepresentative] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState({});
  const [parentBranch, setParentBranch] = useState({});
  const [countrySelected, setCountrySelected] = useState({
    countryCode: 'VN',
    countryName: 'Việt Nam',
  });
  const [citySelected, setCitySelected] = useState({
    cityCode: '71',
    cityName: 'TP. Hồ Chí Minh',
  });
  const [zipcodeSelected, setZipcodeSelected] = useState();
  const [branchImages, setBranchImages] = useState();
  const [typeObjCurrent, setTypeObjCurrent] = useState();
  const [originalImage, setOriginalImage] = useState();

  const tabs = [t('information'), t('image')];

  const handleTabPress = index => {
    setTabSelected(index);
  };
  const handleAddStore = () => {
    let typeFetchData = '';
    let params = {
      capDoCuaHang: level?.value,
      idCuaHangCha: parentBranch?.value,
      image: branchImages,
      fileType: typeObjCurrent,
      maCuaHang: storeCode,
      tenCuaHang: storeName,
      diaChiCuaHang: address,
      dienThoaiCuaHang: phone,
      diaChiWebCuaHang: website,
      emailCuaHang: email,
      tenNguoiDaiDienCuaHang: representative,
      maQuocGia: countrySelected.countryCode,
      maBang: citySelected.cityCode,
      thanhPho: zipcodeSelected.zipcode,
      tenQuocGia: countrySelected.countryName,
      tenBang: citySelected.cityName,
      tenQuan: zipcodeSelected.districtName,
    };

    typeFetchData = dataStore ? 'updateStore' : 'addStore';

    if (typeFetchData === 'updateStore') {
      const fileTypeImage = typeObjCurrent ? typeObjCurrent : null;
      const fileImage = branchImages ? branchImages : null;
      params = {
        ...params,
        idCuaHang: dataStore?.IDCuaHang,
        image: fileImage,
        fileType: fileTypeImage,
      };
    }

    fetchData(dispatch, typeFetchData, params, res => {
      if (res?.success) {
        Toast.show({
          type: 'success',
          props: {
            message: dataStore ? t('updateSuccess') : t('createStoreSuccess'),
          },
        });
        navigation.navigate('quan-tri-cua-hang');
      }
    });
  };

  const handleAddStorie = () => {
    if (
      !storeCode.trim() ||
      !storeName.trim() ||
      !representative.trim() ||
      !address.trim() ||
      !phone.trim() ||
      !website.trim() ||
      !email.trim() ||
      Object.keys(level).length === 0 ||
      Object.keys(parentBranch).length === 0 ||
      Object.keys(zipcodeSelected).length === 0
    ) {
      Toast.show({
        type: 'error',
        props: {message: t('missInformation')},
      });
      return;
    } else if (!originalImage && (!branchImages || !typeObjCurrent)) {
      Toast.show({
        type: 'error',
        props: {message: t('imageNotSelected')},
      });
      return;
    }
    handleAddStore();
  };

  const getImageUri = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      saveToPhotos: true,
    };
    const res = await launchImageLibrary(options);
    return res;
  };
  const handleGetPermission = async () => {
    return new Promise(resolve => {
      const permissionLocation = checkPermission('library')
        .then(permission => {
          if (!permission) {
            Alert.alert(
              t('permissionRequire'),
              t('pleaseGrantPermissionToAccessPhoto'),
              [
                {
                  text: t('destroy'),
                  style: 'cancel',
                  onPress: () => resolve(false),
                },
                {
                  text: t('openSetting'),
                  onPress: async () => {
                    await openSettings();
                    resolve(true);
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            resolve(true);
          }
        })
        .catch(() => {
          resolve(false);
        });
    });
  };
  const handleSelectImage = async from => {
    // 1. Permission check
    // 2. getImageUri();
    const check = await handleGetPermission();
    if (check) {
      try {
        const resUri = await getImageUri();
        if (!!resUri?.errorCode) {
          Toast.show({
            type: 'error',
            props: {message: t('canNotGetImage')},
          });
        } else {
          const asset = resUri.assets[0];
          const tile = Math.ceil(asset?.fileSize / LIMIT_IMAGE_SIZE_UPLOAD);
          // Giảm dung lượng ảnh
          const resizedImage = await ImageResizer.createResizedImage(
            asset.uri,
            asset?.width / tile,
            asset?.height / tile,
            ExtensionProductImageUpload, // Định dạng ảnh sau khi giảm dung lượng
            80, // Chất lượng ảnh (từ 1 đến 100)
            0, // Độ xoay ảnh
          );
          const uri = resizedImage.uri;

          if (uri) {
            const extensionOri = uri.split('.').pop();
            const extension = extensionOri === 'jpg' ? 'jpeg' : extensionOri;
            console.log('uri main', uri);
            setBranchImages(uri);
            setTypeObjCurrent(`image/${extension}`);
            setOriginalImage();
          }
        }
      } catch (e) {
        console.log('error: ', e);
      }
    } else {
      Toast.show({
        type: 'error',
        props: {message: t('missPermissionLibrary')},
      });
    }
  };
  const handleDeleteImage = () => {
    setBranchImages();
    setTypeObjCurrent();
    setOriginalImage();
  };
  useEffect(() => {
    if (dataStore) {
      setStoreCode(`${dataStore?.MaCuaHang}`);
      setStoreName(dataStore?.TenCuaHang);
      setRepresentative(dataStore?.TenNguoiDaiDienCuaHang);
      setAddress(dataStore?.DiaChiCuaHang);
      setPhone(dataStore?.DienThoaiCuaHang);
      setWebsite(dataStore?.DiaChiWebCuaHang);
      setEmail(dataStore?.EmailCuaHang);
      setCountrySelected({
        countryCode: dataStore?.MaQuocGia,
        countryName: dataStore?.TenQuocGia,
      });
      setCitySelected({
        cityCode: dataStore?.MaBang,
        cityName: dataStore?.TenBang,
      });
      setZipcodeSelected({
        zipcode: dataStore?.ThanhPho,
        // lấy quận và thành phố
        districtName: dataStore?.ThanhPho.split(',')[1]?.trim(),
      });
      setLevel({
        label: dataStore?.CapDoCuaHang + 1,
        value: dataStore?.CapDoCuaHang,
      });
      setParentBranch({
        label: '',
        value: dataStore?.IDCuaHangCha,
      });
      setOriginalImage(dataStore?.URLLogo);
    }
  }, []);

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('addNewAddress')} />

      <MyView style={styles.body}>
        <MyView style={styles.tabControl}>
          <TabControl
            tabs={tabs}
            selectedIndex={tabSelected}
            onTabPress={handleTabPress}
          />
        </MyView>

        <MyView style={styles.content}>
          {tabSelected === 0 ? (
            <FormAddStories
              storeCode={storeCode}
              setStoreCode={setStoreCode}
              storeName={storeName}
              setStoreName={setStoreName}
              representative={representative}
              setRepresentative={setRepresentative}
              address={address}
              setAddress={setAddress}
              phone={phone}
              setPhone={setPhone}
              website={website}
              setWebsite={setWebsite}
              email={email}
              setEmail={setEmail}
              level={level}
              setLevel={setLevel}
              parentBranch={parentBranch}
              setParentBranch={setParentBranch}
              countrySelected={countrySelected}
              setCountrySelected={setCountrySelected}
              citySelected={citySelected}
              setCitySelected={setCitySelected}
              setZipcodeSelected={setZipcodeSelected}
              zipcodeSelected={zipcodeSelected}
            />
          ) : (
            <AddImage
              handleDeleteImage={handleDeleteImage}
              handleSelectImage={handleSelectImage}
              branchImages={branchImages}
              originalImage={originalImage}
            />
          )}
        </MyView>
      </MyView>
      <Bottom
        sticky={false}
        titleBtn1={dataStore ? t('Sửa địa chỉ') : t('addAddress')}
        onPress1={handleAddStorie}
      />
    </MySafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    marginVertical: Sizes.paddingHeight,
    flex: 1,
    width: Width,
  },
  tabControl: {
    marginBottom: Sizes.spacing_3_Height,
  },
  body: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: Sizes.paddingWidth,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 0,
    margin: 0,
    alignItems: 'center',
  },
});

export default Index;
