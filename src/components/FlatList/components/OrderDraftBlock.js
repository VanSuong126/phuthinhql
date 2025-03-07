import { StyleSheet, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { MyView, MyText, MyTouchableOpacity } from '~components/MyStyles';
import Icon from '~components/IconXML';
import formatPrice from '~helper/formatPrice';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';

const Index = ({ data, index, onPress }) => {
  const { t } = useTranslation();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (!data) {
      setTotalAmount(0); // Nếu không có dữ liệu thì set tổng tiền là 0
      return;
    }
  
    // Tính tổng tiền sản phẩm
    const totalProductPrice = data.sanphamdachon?.reduce(
      (total, product) => total + (product.SoLuongMua || 0) * (product.GiaSauGiam || 0),
      0
    ) || 0;
  
    // Tính tổng tiền dịch vụ cộng thêm từ danh sách `dichvucongthem`
    const additionalServicePrice = data.dichvucongthem?.reduce(
      (total, service) => total + (service.SoLuong || 0) * (service.DonGia || 0),
      0
    ) || 0;
  
    // Tính tổng tiền đơn hàng
    const totalOrderPrice = totalProductPrice
      + additionalServicePrice
      + (data.phiship || 0)
      + (data.vat || 0)
      - (data.sotiengiamtrensanpham || 0)
      - (data.sotiengiam || 0);
  
    setTotalAmount(totalOrderPrice);
  }, [data]);
  

  return (
    <Pressable
     onPress={() => onPress({ action: 'selectOrder', IdDonHangNhap: data.IdDonHangNhap })}
     style={[
        styles.boxOrder,
        data?.selected ? { backgroundColor: Colors?.semantics_Green_03 } : null
      ]}
      key={index}
    >
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <MyText style={[styles.textName, { fontWeight: '600', color: Colors.semantics_Black }]}>{data?.ho} {data?.ten}</MyText>
        </MyView>
        <MyView style={styles.wrapInfo}>
          <Icon name="cart" width="24" height="24" color={Colors.semantics_Grey} />
          <MyText style={styles.textInfo}>{data?.sanphamdachon?.length || 0}</MyText>
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="phone" width="24" height="24" />
          <MyText style={styles.textInfo}>{data?.dienthoai}</MyText>
        </MyView>
        <MyView style={styles.wrapInfo}>
          <MyText style={styles.textPrice}>{formatPrice(totalAmount)}đ</MyText>
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="location" width="24" height="24" />
          <MyText style={[styles.textInfo, { flex: 1 }]}>{data?.diachi}, {data?.thanhpho}</MyText>
        </MyView>
      </MyView>
     { !data?.selected&& <MyView style={styles.bottom_RightBox}>
        <MyTouchableOpacity
          onPress={() => onPress({ action: 'viewDetailOrder', data: data })}
          style={styles.btn}>
          <MyText style={styles.textButton}>{t('viewDetail')}</MyText>
        </MyTouchableOpacity>
      </MyView>}
    </Pressable>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapViewInfo: {
    backgroundColor: Colors.semantics_Yellow_03,
    paddingHorizontal: parseSizeHeight(16),
    paddingVertical: parseSizeWidth(8),
    borderRadius: 20,
  },
  btn: {
    alignSelf: 'flex-end',
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
