import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {useDispatch} from 'react-redux';

import {
  MyText,
  MyView,
  MySafeAreaView,
  MyAvoidView,
} from '~components/MyStyles';
import IconXML from '~components/IconXML';
import styles from './styles';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import InputText from '~components/inputs/InputText';
import Bottom from '~components/Bottom';
import {checkPermission} from '~helper/permission';
import {LIMIT_IMAGE_SIZE_UPLOAD} from '~constants';
import {ExtensionProductImageUpload} from '~constants';
import LocalDB from '~data/asyncStorage';
import fetchData from '~providers';
import Toast from 'react-native-toast-message';

const subImages = [
  {
    order: 1,
    from: 'subImage1',
  },
  {
    order: 2,
    from: 'subImage2',
  },
  {
    order: 3,
    from: 'subImage3',
  },
  {
    order: 4,
    from: 'subImage4',
  },
];

const imageUrl = link => {
  return `${link}?random=${new Date().getTime()}`;
};

const Index = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {type, data} = route.params;
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [productImages, setProductImages] = useState({});
  const [originalImage, setOriginalImage] = useState([]);
  const [urlImage, setUrlImage] = useState([]);
  const [note, setNote] = useState('');
  const [noteOrj, setNoteOrj] = useState('');

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
            switch (from) {
              case 'mainImage':
                console.log('uri main', uri);
                setProductImages({...productImages, mainImage: uri});
                setUrlImage({...urlImage, mainImage: uri});
                break;
              case 'subImage1':
                setProductImages({...productImages, subImage1: uri});
                setUrlImage({...urlImage, subImage1: uri});
                break;
              case 'subImage2':
                setProductImages({...productImages, subImage2: uri});
                setUrlImage({...urlImage, subImage2: uri});
                break;
              case 'subImage3':
                setProductImages({...productImages, subImage3: uri});
                setUrlImage({...urlImage, subImage3: uri});
                break;
              case 'subImage4':
                setProductImages({...productImages, subImage4: uri});
                setUrlImage({...urlImage, subImage4: uri});
              default:
                break;
            }
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

  useEffect(() => {
    const fetchUrlWeb = async () => {
      try {
        let dataUser = await LocalDB.getUserData();
        const urlWeb = dataUser?.ViewImageUrl;
        if (urlWeb) {
          const url = {
            mainImage: data?.URLImage ? urlWeb + data?.URLImage : '',
            subImage1: data?.URLImage2 ? urlWeb + data?.URLImage2 : '',
            subImage2: data?.URLImage3 ? urlWeb + data?.URLImage3 : '',
            subImage3: data?.URLImage4 ? urlWeb + data?.URLImage4 : '',
            subImage4: data?.URLImage5 ? urlWeb + data?.URLImage5 : '',
          };
          setProductImages(url);
          setOriginalImage(url);
          setUrlImage({
            mainImage: imageUrl(data?.URLImage ? urlWeb + data?.URLImage : ''),
            subImage1: imageUrl(
              data?.URLImage2 ? urlWeb + data?.URLImage2 : '',
            ),
            subImage2: imageUrl(
              data?.URLImage3 ? urlWeb + data?.URLImage3 : '',
            ),
            subImage3: imageUrl(
              data?.URLImage4 ? urlWeb + data?.URLImage4 : '',
            ),
            subImage4: imageUrl(
              data?.URLImage5 ? urlWeb + data?.URLImage5 : '',
            ),
          });
        }
      } catch (error) {
        console.error('Failed to fetch urlWeb from LocalDB:', error);
      }
    };

    fetchUrlWeb();
    setNote(data?.MoTaNgan || '');
    setNoteOrj(data?.MoTaNgan || '');
  }, [data]);

  // lấy thông tin sản phẩm sau khi thêm mô tả
  const getProduct = () => {
    if (data?.IDSanPham || data?.IdsanPham) {
      const params = {
        loai: 3,
        timkiem: data?.IDSanPham || data?.IdsanPham,
        soluongsanpham: 1,
      };

      fetchData(dispatch, 'getProductManager', params, res => {
        if (res.success === true) {
          Toast.show({
            type: 'success',
            props: {message: t('succesAddImage')},
          });
          navigation.navigate('dieu-chinh-san-pham', {
            type: type,
            data: res?.data[0],
          });
        } else {
        }
      });
    } else {
      navigation.navigate('quan-tri-san-pham');
    }
  };

  const handleUpLoadIamge = () => {
    if (productImages?.mainImage !== '') {
      const getFileType = uri => {
        const extension = uri.split('.').pop().toLowerCase(); // Lấy phần đuôi và chuyển về chữ thường
        return `image/${extension}`;
      };
      const getNameFromKey = key => {
        if (key === 'mainImage') return '_1'; // mainImage luôn là _1
        const match = key.match(/\d+/); // Tìm số trong key
        return match ? `_${parseInt(match[0], 10) + 1}` : '_1'; // subImage1 -> _2, subImage2 -> _3, ...
      };
      // Hàm tạo form từ key và URI
      const createFileObject = (key, uri) => {
        const type = getFileType(uri); // Lấy loại ảnh từ URI
        const name = getNameFromKey(key); // Lấy tên từ key
        return {
          file: {
            name,
            type,
            uri,
          },
        };
      };

      // Xử lý dữ liệu
      const result = Object.entries(productImages)
        .filter(([_, uri]) => uri) // Loại bỏ các giá trị rỗng
        .map(([key, uri]) => createFileObject(key, uri)); // Chuyển đổi theo key và URI

      const params = {
        productId: data?.IDSanPham || data?.IdsanPham,
        shortDescription: note,
        images: result,
      };

      fetchData(dispatch, 'updateImageProduct', params, res => {
        if (res?.success) {
          getProduct();
        } else {
          Toast.show({
            type: 'error',
            props: {message: t('warningAddImage')},
          });
        }
      });
    } else {
      Toast.show({
        type: 'warning',
        props: {message: t('notImage')},
      });
    }
  };
  const handleRenew = () => {
    setProductImages(originalImage);
    setUrlImage({
      mainImage: imageUrl(
        originalImage?.mainImage ? originalImage?.mainImage : '',
      ),
      subImage1: imageUrl(
        originalImage?.subImage1 ? originalImage?.subImage1 : '',
      ),
      subImage2: imageUrl(
        originalImage?.subImage2 ? originalImage?.subImage2 : '',
      ),
      subImage3: imageUrl(
        originalImage?.subImage3 ? originalImage?.subImage3 : '',
      ),
      subImage4: imageUrl(
        originalImage?.subImage4 ? originalImage?.subImage4 : '',
      ),
    });
    setNote(noteOrj);
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar
        nameHeaderTitle={t('description')}
        iconRight="renew"
        onPressRight={handleRenew}
      />
      <MyAvoidView>
        <MyView style={styles.body}>
          <MyView style={styles.imagesWrapper}>
            {/* Ảnh chính */}
            <TouchableOpacity
              activeOpacity={!!productImages?.mainImage ? 1 : 0}
              onPress={() => {
                if (!productImages?.mainImage) {
                  return handleSelectImage('mainImage');
                } else {
                  return null;
                }
              }}
              style={styles.leftImages}>
              <MyView
                style={[
                  styles.imageWrapper,
                  !productImages?.mainImage ? styles.noHasImage : {},
                ]}>
                <MyView>
                  {!productImages?.mainImage ? (
                    <IconXML name={'plusCircle'} width={20} height={20} />
                  ) : (
                    <MyView style={styles.actionImageWrapper}>
                      <TouchableOpacity
                        onPress={() => {
                          setProductImages({
                            ...productImages,
                            mainImage: '',
                          });
                          setUrlImage({
                            ...urlImage,
                            mainImage: '',
                          });
                        }}
                        activeOpacity={1}
                        style={styles.xRemove}>
                        <IconXML
                          name={'xRemoveCircle'}
                          height={24}
                          width={24}
                        />
                      </TouchableOpacity>
                      <Image
                        style={styles.mainImage}
                        // source={{uri: imageUrl(productImages?.mainImage)}}
                        source={{uri: urlImage?.mainImage}}
                      />
                    </MyView>
                  )}
                </MyView>
              </MyView>
              <MyText style={styles.caption}>{t('mainImage')}</MyText>
            </TouchableOpacity>
            {/* Ảnh phụ */}
            {Array.isArray(subImages) && subImages.length > 0 ? (
              <MyView style={styles.rightImages}>
                {subImages.map(item => (
                  <TouchableOpacity
                    activeOpacity={!!productImages[item.from] ? 1 : 0}
                    onPress={() => {
                      if (!productImages[item.from]) {
                        return handleSelectImage(item.from);
                      } else {
                        return null;
                      }
                    }}
                    key={item.order}
                    style={styles.imageSubItemWrapper}>
                    <MyView
                      style={[
                        styles.imageEmpltySubItem,
                        !productImages[item.from] ? styles.noHasImage : {},
                      ]}>
                      {!productImages[item.from] ? (
                        <IconXML name={'plusCircle'} width={20} height={20} />
                      ) : (
                        <MyView style={styles.actionImageWrapper}>
                          <TouchableOpacity
                            onPress={() => {
                              setProductImages({
                                ...productImages,
                                [item.from]: '',
                              });
                              setUrlImage({
                                ...urlImage,
                                [item.from]: '',
                              });
                            }}
                            activeOpacity={1}
                            style={styles.xRemove}>
                            <IconXML
                              name={'xRemoveCircle'}
                              height={24}
                              width={24}
                            />
                          </TouchableOpacity>
                          <Image
                            style={styles.imageSubItemWrapper}
                            source={{uri: urlImage[item.from]}}
                          />
                        </MyView>
                      )}
                    </MyView>
                    <MyText style={styles.captionSubItem}>
                      Ảnh {item.order}
                    </MyText>
                  </TouchableOpacity>
                ))}
              </MyView>
            ) : (
              <MyText style={styles.errorText}></MyText>
            )}
          </MyView>

          <MyView style={styles.wrapNote}>
            <InputText
              value={note}
              styleContainer={styles.inputFull}
              onChangeText={setNote}
              labelName={t('descriptionProduct')}
              styleText={styles.txtInput}
            />
          </MyView>
        </MyView>
      </MyAvoidView>
      <MyView style={styles.bottom}>
        <Bottom
          sticky={false}
          titleBtn1={t('addGroup')}
          onPress1={() =>
            navigation.navigate(
              type === 'add' ? 'them-nhom-san-pham' : 'sua-nhom-san-pham',
              {type: type, data: data},
            )
          }
          titleBtn2={type === 'add' ? t('upload') : t('update')}
          onPress2={handleUpLoadIamge}
        />
      </MyView>
    </MySafeAreaView>
  );
};

export default Index;
