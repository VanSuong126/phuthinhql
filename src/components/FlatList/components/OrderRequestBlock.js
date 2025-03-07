import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { MyView, MyText, MyTouchableOpacity } from '~components/MyStyles';
import Icon from '~components/IconXML';
import Line from '~components/Line';
import formatPrice from '~helper/formatPrice';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';
import LocalDB from '~data/asyncStorage';
import { listRole } from '~constants';


const Index = ({ data, index, onPress }) => {
  const { t } = useTranslation();
  const [idUser, setUser] = useState();
  const [editOrderRole, setEditOrderRole] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const roles = await listRole();
      setEditOrderRole(roles.includes("order"));

      const userData = await LocalDB.getUserData();
      setUser(userData?.UserInfo?.IDNguoiDung);
    };

    fetchData();
  }, []);

  return (
    <MyView
      style={styles.boxOrder}
      key={index}
    >
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="calendar" width="24" height="24" />
          <MyText style={styles.textInfo}>{moment(data?.NgayDatHang).format('DD/MM/YYYY')}</MyText>
        </MyView>
        <MyView style={styles.wrapInfo}>
          <Icon name="clock" width="24" height="24" />
          <MyText style={styles.textInfo}>{moment(data?.NgayDatHang).format('HH:mm:ss')}</MyText>
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
          <MyText style={[styles.textName, { fontWeight: '600', color: Colors.semantics_Black }]}>{data?.HoTenNguoiNhan}</MyText>
        </MyView>
        <MyView style={styles.wrapInfo}>
          {data?.TrangThaiYeuCau === 1 ? <Icon name="toastIconSuccess" width="24" height="24" /> :
            data?.TrangThaiYeuCau === 0 ? <Icon name="toastIcon" width="24" height="24" /> :
              <Icon name="toastIcon" width="24" height="24" color={Colors.semantics_Red_02} />
          }
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="barcode" width="24" height="24" />
          <MyText style={[styles.textInfo,
          data?.TrangThaiYeuCau === 1 && { color: Colors.semantics_Green_01 },
          data?.TrangThaiYeuCau === 7 && { color: Colors.semantics_Red_02 }
          ]}>{data?.MaDonHang} </MyText>
        </MyView>

      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="phone" width="24" height="24" />
          <MyText style={styles.textInfo}>{data?.DienThoaiNguoiNhan}</MyText>
        </MyView>
        <MyView style={styles.wrapInfo}>
          <MyText style={styles.textPrice}>{formatPrice(data?.TongSoTienThanhToan)}đ</MyText>
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="location" width="24" height="24" />
          <MyText style={[styles.textInfo, { flex: 1 }]}>{data?.DiaChiNhan}, {data?.ThanhPhoNhan}</MyText>
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <MyText style={styles.textInfo}>{t('requestDate')}: </MyText>
          <MyText style={styles.textInfo2}>{moment(data?.NgayYeuCau).format('DD/MM/YYYY HH:mm:ss')}</MyText>
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <MyText style={styles.textInfo}>{t('reason')}: </MyText>
          <MyText style={styles.textInfo2}>{data?.LyDoYeuCau}</MyText>
        </MyView>
      </MyView>
      <MyView style={styles.bottom_RightBox}>
        {data?.TrangThaiYeuCau === 0 ? <MyTouchableOpacity
          onPress={() => onPress({ action: 'viewDetailOrder', orderID: data?.IDDonHang })}
          style={styles.btnView}>
          <MyText style={styles.textButtonView}>{t('viewInfo')}</MyText>
        </MyTouchableOpacity> :
          <MyTouchableOpacity
            onPress={() => onPress({ action: 'viewHistory', orderID: data?.IDDonHang })}
            style={styles.btnView}>
            <MyText style={styles.textButtonView}>{t('viewHistory')}</MyText>
          </MyTouchableOpacity>}
        {editOrderRole && data?.TrangThaiYeuCau === 0 ? <MyTouchableOpacity
          onPress={() => onPress({ action: 'processRequest', orderID: data?.IDDonHang })}
          style={styles.btn}>
          <MyText style={styles.textButton}>{t('processRequest')}</MyText>
        </MyTouchableOpacity> :
          data?.TrangThaiYeuCau === 1 && data?.IDNguoiTao == idUser ? <MyTouchableOpacity
            onPress={() => onPress({ action: 'processOrder', orderID: data?.IDDonHang })}
            style={styles.btn}>
            <MyText style={styles.textButton}>{t('processOrder')}</MyText>
          </MyTouchableOpacity> : null}
      </MyView>
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  boxOrder: {
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(15),
    marginVertical: parseSizeHeight(8),
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    borderRadius: 12,
    gap: 16,
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
    flexWrap: 'wrap',
    textAlign: 'left',
    color: Colors.neutrals_700,
  },
  textInfo2: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '500',
    flexWrap: 'wrap',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  textName: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    flexWrap: 'wrap',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  bottom_RightBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapViewInfo: {
    backgroundColor: Colors.semantics_Yellow_03,
    paddingHorizontal: parseSizeHeight(16),
    paddingVertical: parseSizeWidth(8),
    borderRadius: 20,
  },
  btn: {
    backgroundColor: Colors.brand_01,
    paddingHorizontal: parseSizeHeight(15),
    paddingVertical: parseSizeWidth(8),
    borderRadius: 20,
  },
  textButton: {
    fontFamily: FontStyles.InterRegular,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: Sizes.text_tagline1,
    color: Colors.neutrals_50,
  },
  btnView: {
    backgroundColor: Colors.semantics_Yellow_03,
    paddingHorizontal: parseSizeHeight(15),
    paddingVertical: parseSizeWidth(8),
    borderRadius: 20,
  },
  textButtonView: {
    fontFamily: FontStyles.InterRegular,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: Sizes.text_tagline1,
    color: Colors.semantics_Yellow_01,
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
  }
});
