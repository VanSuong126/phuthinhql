import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MyView, MyText } from '~components/MyStyles';
import { Colors, Sizes, FontStyles, parseSizeHeight } from '~theme';
import PlusAndMinus from '~components/PlusAndMinus';
import fetchData from '~providers';
import { salesActions, salesSelectors } from '~redux/reducers';
import Icon from '~components/IconXML';


const Index = () => {
  const dispatch = useDispatch();
  const [dataExtraService, setDataExtraService] = useState([]);
  const orderData = useSelector(state => salesSelectors.selectDataSales(state));


  useEffect(() => {
    fetchData(dispatch, 'getExtraService', { loai: 2 }, (data) => {
      if (data.success) {
        setDataExtraService(data.data);
      }
      else {

      }
    });
  }, []);

  const handleQuantityChange = (data, val) => {
    let dichVuCongThem = orderData?.dichvucongthem || [];

    // Tìm dịch vụ hiện tại (nếu có)
    const existingService = dichVuCongThem.find(item => item.ID === data.IDDichVuCongThem);

    if (val === 0 && existingService) {
      // Xóa dịch vụ nếu số lượng là 0 và dịch vụ đã tồn tại
      dichVuCongThem = dichVuCongThem.filter(item => item.ID !== data.IDDichVuCongThem);
    } else if (existingService) {
      // Cập nhật số lượng nếu dịch vụ đã tồn tại
      dichVuCongThem = dichVuCongThem.map(item =>
        item.ID === data.IDDichVuCongThem ? { ...item, SoLuong: val } : item
      );
    } else {
      // Thêm mới dịch vụ nếu chưa có trong danh sách
      dichVuCongThem = [...dichVuCongThem, { ID: data.IDDichVuCongThem, SoLuong: val, DonGia: data.GiaTien, IDChiTietDichVuCongThem: "" }];
    }

    // Cập nhật lại orderData nếu có thay đổi
    dispatch(salesActions.setDataSales({ ...orderData, dichvucongthem: dichVuCongThem }));
  };



  return (
    <MyView style={styles.container}>
      {dataExtraService?.map(item => {
        return (
          <MyView key={item.IDDichVuCongThem} style={styles.wrapItem}>
            <MyView style={styles.wrapNameService}>
              <Icon name={item?.IDDichVuCongThem < 4 ? `dvct${item?.IDDichVuCongThem}` : 'dvctOrder'} width="36" height="36" />
              <MyText style={styles.nameExtraService}>{item?.TenDichVuCongThem}</MyText>
            </MyView>
            <PlusAndMinus
              onCountChange={val => handleQuantityChange(item, val)}
              initCount={
                orderData?.dichvucongthem?.find(x => x.ID === item.IDDichVuCongThem)?.SoLuong || 0
              }
              limitCount={0}
            />
          </MyView>
        );
      })}
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  txtUnSelect: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    textAlign: 'center',
    color: Colors.neutrals_300,
  },
  txtQuanti: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    textAlign: 'center',
    color: Colors.neutrals_900,
  },
  txtTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  nameExtraService: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  container: {
    flex: 1,
    marginTop: Sizes.marginHeight,
    gap: Sizes.spacing_4_Height,
    backgroundColor: Colors.background,
  },
  wrapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(12),
    backgroundColor: Colors.neutrals_100,
    borderColor: Colors.neutrals_300,
    borderWidth: 1,
  },
  wrapNameService: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.spacing_2_Width,
  },
});
