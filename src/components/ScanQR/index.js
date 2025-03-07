import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextComponent } from 'react-native';
import { useDispatch } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import moment from 'moment';
import Clipboard from '@react-native-community/clipboard';

import { Sizes, Colors, Width, Height, parseSizeHeight, parseSizeWidth, FontStyles } from '~theme';
import currencyFormat from '~helper/currencyFormat';
import Button from '~buttons/MyButton';
import Line from '~components/Line';
import truncateText from '~helper/truncateText';

import {
  MyText,
  MyView,
  MyTouchableOpacity,
  MyImage,
} from '~components/MyStyles';
import Icon from '~components/IconXML';
import LocalDB from '~data/asyncStorage';
import ModalDetailOrder from '~modals/ModalDetailOrder';


const overlayColor = 'rgba(0,0,0,0.65)';
const markerSize = 230;
const markerTop = (Height - markerSize) / 2;
const markerLeft = (Width - markerSize) / 2;

// typeData :
// 0: Scan bình thường
// 1: Scan sản phẩm
// 2: Scan đơn hàng
// 3: Scan khách hàng

export default function Index({
  isActive,
  visible,
  typeData = 0,
  handleScan,
  data = null,
  gotoScreen,
  addProduct,
  typeNotify = 'success',
  contentNotification = ''
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [urlWeb, setUrlWeb] = useState('');
  const [visibleModalDetailOrder, setVisibleModalDetailOrder] = useState(false);


  useEffect(() => {
    LocalDB.getUserData().then(data => setUrlWeb(data?.ViewImageUrl));
  }, []);


  const clickAddProduct = async data => {
    const dataProductAdd = {
      IDSanPham: data?.IDSanPham,
      SoLuongMua: 1,
      GiaBan: data?.GiaBan,
      GiaSauGiam: data?.GiaSauGiam,
      ThoiGianBaoHanh: data?.ThoiGianBaoHanh,
      KhoiLuong: data?.KhoiLuong,
      GiaGiamTienMat: 0,
      TiLeGiam: 0,
      MaSanPham: data?.MaSanPham,
      TenSanPham: data?.TenSanPham,
      URLImage: data?.URLImage,
      BaoHanh: false,
      SuaChua: false,
    };
    addProduct(dataProductAdd);
  };


  const RenderProduct = () => {
    if (!Array.isArray(data)) {
      return null;
    }

    return data?.map((item, index) => {
      return (
        <MyView style={styles.boxProduct} key={index}>
          <MyTouchableOpacity onPress={() => Clipboard.setString(item?.MaSanPham)} style={styles.clipboard}>
            <MyText style={styles.textCopy}>{item?.MaSanPham}</MyText>
            <MyView style={styles.wrapIconCopy}>
              <Icon name="copy" width="18" height="18" />
            </MyView>
          </MyTouchableOpacity>
          <MyView style={styles.topBox}>
            <MyView style={styles.status}>
              <Icon name="wifiLinear" width="24" height="24" />
              <MyText style={styles.txtID}>{item?.MaSanPham}</MyText>
            </MyView>
            <MyText style={styles.txtRemaining}>
              {t('remaining')}: {item?.SoLuong}
            </MyText>
          </MyView>
          <MyView style={styles.bodyBox}>
            <MyView style={styles.image}>
              <MyImage
                source={{ uri: urlWeb + item?.URLImage }}
                style={styles.imageProduct}
                resizeMode="cover"
              />
            </MyView>
            <MyView style={styles.bodyBoxRight}>
              <MyText style={styles.txtNameProduct}>{item?.TenSanPham}</MyText>
              <MyView style={styles.Price}>
                <MyText style={styles.txtPrice}>
                  {currencyFormat(item?.GiaSauGiam)}
                </MyText>
                {data?.GiamGia !== 0 && (
                  <MyText style={styles.txtOldPrice}>
                    {currencyFormat(item?.GiaBan)}
                  </MyText>
                )}
              </MyView>
              <MyView style={styles.bottom_RightBox}>
                <MyView style={styles.wrapViewInfo}>
                  <MyText style={styles.txtViewInfo}>{t('viewInfo')}</MyText>
                </MyView>
                <MyTouchableOpacity
                  onPress={() => clickAddProduct(item)}
                  style={styles.btnAdd}>
                  <Icon name="plusBGLinear" width="30" height="30" />
                </MyTouchableOpacity>
              </MyView>
            </MyView>
          </MyView>
          <MyView style={styles.wrapButton}>
            <Button size="primary" title={t('selectedProduct')} onPress={() => gotoScreen('san-pham-da-chon')} />
          </MyView>
        </MyView>
      );
    });
  };

  const RenderOrder = () => {
    if (!Array.isArray(data)) {
      return null;
    }
    return data?.map((item, index) => {
      return (
        <MyView style={styles.boxOrder} key={index}>
          <MyTouchableOpacity onPress={() => Clipboard.setString(item?.MaDonHang)} style={styles.clipboard}>
            <MyText style={styles.textCopy}>{item?.MaDonHang}</MyText>
            <MyView style={styles.wrapIconCopy}>
              <Icon name="copy" width="18" height="18" />
            </MyView>
          </MyTouchableOpacity>
          <MyView style={styles.wrapRow}>
            <MyView style={styles.wrapInfo}>
              <Icon name="calendar" width="24" height="24" />
              <MyText style={styles.textInfo}>{moment(item?.NgayDatHang).format('DD/MM/YYYY')}</MyText>
            </MyView>
            <MyView style={styles.wrapInfo}>
              <Icon name="clock" width="24" height="24" />
              <MyText style={styles.textInfo}>{moment(item?.NgayDatHang).format('HH:mm:ss')}</MyText>
            </MyView>
          </MyView>
          <Line
            type="solid"
            thickness={2}
            color={Colors.neutrals_300}
            width="100%"
          />
          <MyView style={styles.wrapRow}>
            <MyView style={styles.wrapInfo}>
              <Icon name="barcode" width="24" height="24" />
              <MyText style={styles.textInfo}>{item?.MaDonHang}</MyText>
            </MyView>
            <MyView style={styles.wrapInfo}>
              <Icon name="cart" width="24" height="24" />
              <MyText style={styles.textInfo}>{item?.TongSoLuong}</MyText>
            </MyView>
          </MyView>
          <MyView style={styles.wrapRow}>
            <MyView style={styles.wrapInfo}>
              <Icon name="phone" width="24" height="24" />
              <MyText style={styles.textInfo}>{item?.DienThoaiKhachHang}</MyText>
            </MyView>
            <MyView style={styles.wrapInfo}>
              <MyText style={styles.textPrice}>{currencyFormat(item?.TongSoTien)}</MyText>
            </MyView>
          </MyView>
          <MyView style={styles.wrapButton}>
            <Button size="primary" title={t('viewDetail')} onPress={() => setVisibleModalDetailOrder(true)} />
          </MyView>
          <ModalDetailOrder
            isVisible={visibleModalDetailOrder}
            onClose={() => setVisibleModalDetailOrder(false)}
            orderID={item?.IDDonHang}
            type={0}
          />
        </MyView>
      );
    });
  };
  const RenderOrderHandle = () => {
    if (!Array.isArray(data)) {
      return null;
    }
    return data?.map((item, index) => {
      return (
        <MyView style={styles.boxOrder} key={index}>
          <MyTouchableOpacity onPress={() => Clipboard.setString(item?.MaDonHang)} style={styles.clipboard}>
            <MyText style={styles.textCopy}>{item?.MaDonHang}</MyText>
            <MyView style={styles.wrapIconCopy}>
              <Icon name="copy" width="18" height="18" />
            </MyView>
          </MyTouchableOpacity>
          <MyView style={styles.wrapRow}>
            <MyView style={styles.wrapInfo}>
              <MyText style={styles.textInfo}>{t('foundOrder')}</MyText>
            </MyView>
          </MyView>
          <Line
            type="solid"
            thickness={2}
            color={Colors.neutrals_300}
            width="100%"
          />
          <MyView style={styles.wrapRow}>
            <MyView style={styles.wrapInfo}>
              <Icon name="barcode" width="24" height="24" />
              <MyText style={styles.textInfo}>{item?.MaDonHang}</MyText>
            </MyView>

          </MyView>
          <MyView style={styles.wrapRow}>
            <MyView style={styles.wrapInfo}>
              <Icon name="cart" width="24" height="24" />
              <MyText style={styles.textInfo}>{item?.TongSoLuong} {t('product')}</MyText>
            </MyView>
            <MyView style={styles.wrapInfo}>
              <MyText style={styles.textPrice}>{currencyFormat(item?.TongSoTien)}</MyText>
            </MyView>
          </MyView>
          <MyView style={styles.wrapButton}>
            <Button size="primary" title={t('orderScaned')} onPress={() => gotoScreen('danh-sach-don-quet')} />
          </MyView>
        </MyView>
      );
    });
  };

  const RenderCustomer = () => {
    if (!Array.isArray(data)) {
      return null;
    }
    return data && data?.map((item, index) => {
      return (
        <MyView style={styles.boxOrder} key={index}>
          <MyTouchableOpacity onPress={() => Clipboard.setString(item?.IDKhachHang)} style={styles.clipboard}>
            <MyText style={styles.textCopy}>{item?.IDKhachHang}</MyText>
            <MyView style={styles.wrapIconCopy}>
              <Icon name="copy" width="18" height="18" />
            </MyView>
          </MyTouchableOpacity>
          <MyView style={styles.wrapRow}>
            <MyView style={styles.wrapInfo}>
              <MyText style={styles.textInfo}>{item?.Ho} {item?.Ten}</MyText>
            </MyView>
            <MyView style={styles.wrapInfo}>
              <MyText style={styles.textInfo}>{item?.IDKhachHang}</MyText>
            </MyView>
          </MyView>
          <MyView style={styles.wrapRow}>
            <MyView style={styles.wrapInfo}>
              <Icon name="bill" width="24" height="24" />
              <MyText style={styles.textInfo}>{item?.MaDonHang}</MyText>
            </MyView>
            <MyView style={styles.wrapInfo}>
              <Icon name="cart" width="24" height="24" />
              <MyText style={styles.textInfo}>{item?.NhanEmail}</MyText>
            </MyView>
          </MyView>
          <MyView style={styles.wrapRow}>
            <MyView style={styles.wrapInfo}>
              <Icon name="phone" width="24" height="24" />
              <MyText style={styles.textInfo}>{item?.DienThoai}</MyText>
            </MyView>
            <MyView style={styles.wrapInfo}>
              <MyText style={styles.textPrice}>{currencyFormat(item?.TongDoanhThuDenHienTai)}</MyText>
            </MyView>
          </MyView>
          <MyView style={styles.bottom_RightBox}>
            <MyView style={styles.wrapViewInfo}>
              <MyText style={styles.txtViewInfo}>{t('viewInfo')}</MyText>
            </MyView>
            <MyTouchableOpacity
              onPress={() => console.log('addOrder')}
              style={styles.btnAdd}>
              <Icon name="plusBGLinear" width="30" height="30" />
            </MyTouchableOpacity>
          </MyView>
        </MyView>
      );
    });
  };

  const renderContentByType = () => {
    switch (typeData) {
      case 1:
        return <RenderProduct />;
      case 2:
        return <RenderOrder />;
      case 3:
        return <RenderCustomer />;
      case 5:
        return <RenderOrderHandle />;
      default:
        return null;
    }
  };
  const handleClose = () => {
    if (typeData === 0) {
      handleScan('');
    }
    else {
      navigation.goBack();
    }
  };

  return (
    <Modal style={styles.container} isVisible={visible}>
      <MyView style={styles.header}>
        <MyText style={styles.txtTitle}>{t('scan')}</MyText>
        <MyTouchableOpacity
          onPress={() => handleClose()}
          style={styles.btnClose}>
          <Icon name="close" width="48" height="48" />
        </MyTouchableOpacity>
      </MyView>
      <QRCodeScanner
        reactivateTimeout={5000}
        onRead={e => handleScan(e.data)}
        cameraStyle={styles.cameraStyle}
        showMarker={true}
        customMarker={
          <View style={styles.overlay}>
            <View style={styles.topOverlay} />
            <View style={styles.centerOverlay}>
              <View style={styles.sideOverlay} />
              <View style={styles.markerStyle} />
              <View style={styles.sideOverlay} />
            </View>
            <View style={styles.bottomOverlay} >
              {contentNotification &&
                <MyView style={[styles.notifyStyle, { backgroundColor: typeNotify === 'success' ? Colors.semantics_Green_02 : Colors.semantics_Red_02 }]}>
                  {typeNotify === 'success' && <Icon name="tickWhite" width="18" height="18" />}
                  <MyText style={styles.txtNotifyStyle}>{contentNotification}</MyText>
                </MyView>
              }
              {typeData === 4 &&
                <MyTouchableOpacity onPress={() => Clipboard.setString(data)} style={styles.clipboardNoStyle} >
                  <MyText style={styles.textCopy}>{truncateText(data, 50)}</MyText>
                  <MyView style={styles.wrapIconCopy}>
                    <Icon name="copy" width="18" height="18" />
                  </MyView>
                </MyTouchableOpacity>
              }
            </View>
          </View>
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

      {renderContentByType() !== null && (
        <MyView style={styles.content}>
          <MyView style={styles.crossBar}>
            <Icon name="crossBar" width="45" height="5" />
          </MyView>
          {renderContentByType()}
        </MyView>
      )}

    </Modal>
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
    height: parseSizeHeight(400),
    backgroundColor: overlayColor,

  },
  header: {
    position: 'absolute',
    top: parseSizeHeight(50),
    width: Width,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    paddingTop: parseSizeHeight(10),
    backgroundColor: 'transparent',
  },
  txtTitle: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'center',
    color: '#ffffff',
    height: Sizes.spacing_9,
  },
  btnClose: {
    marginTop: parseSizeHeight(20),
    width: 48,
    height: 48,
    borderRadius: Sizes.spacing_5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifyStyle: {
    flexDirection: 'row',
    position: 'relative',
    marginTop: parseSizeHeight(16),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.semantics_Green_02,
    paddingHorizontal: parseSizeWidth(10),
    paddingVertical: parseSizeHeight(4),
    borderRadius: parseSizeHeight(100),
    zIndex: 2,
  },
  txtNotifyStyle: {
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    marginLeft: parseSizeWidth(4),
    fontSize: Sizes.text_tagline1,
    color: Colors.neutrals_50,
  },
  content: {
    borderTopLeftRadius: parseSizeHeight(24),
    borderTopRightRadius: parseSizeHeight(24),
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    paddingBottom: parseSizeHeight(40),
  },
  crossBar: {
    paddingVertical: parseSizeHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxProduct: {
    paddingHorizontal: Sizes.paddingWidth,
    gap: parseSizeHeight(6),
  },
  topBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  status: {
    flexDirection: 'row',
    gap: parseSizeWidth(5),
    alignItems: 'center',
  },
  txtID: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',

    textAlign: 'left',
    color: Colors.brand_01,
  },
  txtRemaining: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',

    textAlign: 'right',
    color: Colors.neutrals_700,
    width: parseSizeWidth(100),
  },
  bodyBox: {
    flexDirection: 'row',
    gap: parseSizeWidth(22),
  },
  bodyBoxRight: {
    gap: parseSizeHeight(8),
  },
  image: {
    width: parseSizeWidth(92),
    height: parseSizeHeight(103),
    borderRadius: 8,
  },
  imageProduct: {
    width: parseSizeWidth(92),
    height: parseSizeHeight(103),
    borderRadius: 8,
  },
  txtNameProduct: {
    width: parseSizeWidth(228),
    fontWeight: '500',

    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  Price: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtPrice: {
    fontFamily: FontStyles.InterSemiBold,
    fontWeight: '600',

    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  txtOldPrice: {
    fontWeight: '500',
    textAlign: 'right',
    color: Colors.neutrals_700,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.neutrals_700,
  },
  bottom_RightBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapViewInfo: {
    width: parseSizeWidth(114),
    height: parseSizeHeight(26),
    borderRadius: 100,
    backgroundColor: Colors.semantics_SmokyGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtViewInfo: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',

    textAlign: 'left',
    color: Colors.semantics_Grey,
  },
  btnAdd: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxStart: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: Colors.neutrals_50,
    position: 'absolute',
    right: parseSizeWidth(8),
    top: parseSizeHeight(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapButton: {
    alignItems: 'center',
    gap: parseSizeWidth(8),
  },
  //
  boxOrder: {
    paddingHorizontal: Sizes.paddingWidth,
    gap: parseSizeHeight(16),

  },
  wrapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(8),
  },
  textInfo: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '500',

    textAlign: 'left',
    color: Colors.neutrals_700,
  },
  textPrice: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '500',

    textAlign: 'right',
    color: Colors.semantics_Yellow_02,
  },
  clipboard: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    backgroundColor: Colors.semantics_Green_02,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    top: parseSizeHeight(-90),
    borderRadius: 20,
    paddingHorizontal: parseSizeWidth(10),
    paddingVertical: parseSizeHeight(4),
  },
  wrapIconCopy: {
    marginLeft: parseSizeWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCopy: {
    fontFamily: FontStyles.InterRegular,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: Sizes.text_tagline1,
    color: Colors.neutrals_50,
  },
  clipboardNoStyle: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: Colors.semantics_Red_02,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    top: parseSizeHeight(90),
    borderRadius: 20,
    paddingHorizontal: parseSizeWidth(10),
    paddingVertical: parseSizeHeight(4),
  },
  wrapStatus: {
    backgroundColor: Colors.semantics_Green_03,
    paddingHorizontal: parseSizeHeight(10),
    paddingVertical: parseSizeWidth(8),
    borderRadius: 20,

  },
  textStatus: {
    fontFamily: FontStyles.InterRegular,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: Sizes.text_tagline1,
    color: Colors.semantics_Green_01,
  },
  textName: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    flexWrap: 'wrap',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
});
