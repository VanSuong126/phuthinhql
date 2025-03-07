import {StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import ListReportBranch from '../../ListReportBranch';
import currencyFormat from '~helper/currencyFormat';
import {currencyFormatNoUnit} from '~helper/currencyFormat';
import {MyView} from '~components/MyStyles';
import {Sizes} from '~theme';
const Index = ({data = [], typeReport}) => {
  const {t} = useTranslation();

  const totalPercent = useMemo(() => {
    const total = data.reduce((total, item) => {
      const amount =
        typeReport === 'revenue'
          ? item?.tongDoanhThu
          : typeReport === 'cost' || typeReport === 'order'
          ? item?.tongTien
          : typeReport === 'wareHoue'
          ? (item?.soLuongTonKho, 0)
          : item?.tongDoanhThu;
      return total + (amount || 0);
    }, 0);

    return total / 100;
  }, [data]);

  // fomat percent chỉ lấy 2 số cuối sau ','
  const fomatPercent = value => {
    // Check for Infinity and handle it
    if (value < 0 || value === 0 || !value || !isFinite(value)) {
      return 0;
    }
    return Math.round(value * 100) / 100;
  };

  const renderContent = item => {
    switch (typeReport) {
      case 'revenue':
        return {
          type: 2,
          content_left_1: item?.tongSoKhachHang + ' ' + t('customer'),
          content_left_2: item?.tongSoDonHang + ' ' + t('order'),
          content_right_1: item?.tongSoSanPham + ' ' + t('product'),
          content_right_2: currencyFormat(item?.tongDoanhThu),
          color: item?.maMauCuaHang,
          nameBranch: item?.tenCuaHang,
          percentage: item?.tongDoanhThu / totalPercent,
        };
      case 'cost':
        return {
          content_left_1: item?.tongLoaiChiPhi,
          title_left_1: t('costCategory'),
          content_right_1: currencyFormatNoUnit(item?.tongTien),
          title_right_1: 'đ',
          color: item?.maMauCuaHang,
          nameBranch: item?.tenCuaHang,
          percentage: item?.tongTien / totalPercent,
          type: 1,
        };
      case 'wareHoue':
        return {
          content_left_1: item?.soLuongTonKho,
          title_left_1: t('inventory'),
          content_right_1: item?.soLuongBanRa,
          title_right_1: t('sold'),
          content_left_2: `${item?.phanTramTonKho}%`,
          title_left_2: t('inventory'),
          content_right_2: `${item?.phanTramBanRa}%`,
          title_right_2: t('sold'),
          color: item?.maMauCuaHang,
          nameBranch: item?.tenCuaHang,
          percentage: item?.soLuongTonKho / totalPercent,
          type: 1,
        };
      case 'customer':
        return {
          key: item?.IDCuaHang,
          content_left_1: item?.tongSoKhachHang,
          title_left_1: t('customer'),
          content_right_1: currencyFormatNoUnit(item?.tongDoanhThu),
          title_right_1: 'đ',
          color: item?.maMauCuaHang,
          nameBranch: item?.tenCuaHang,
          percentage: item?.tongDoanhThu / totalPercent,
          type: 1,
        };
      case 'order':
        return {
          content_left_1: `${item?.tongSoDonHang}`,
          title_left_1: t('order'),
          content_right_1: currencyFormatNoUnit(item?.tongTien),
          title_right_1: 'đ',
          content_left_2: `${item?.tongSoSanPham}`,
          title_left_2: t('product'),
          content_right_2: `${item?.tongSoQuocGia}`,
          title_right_2: t('country'),
          content_left_3: `${item?.tongSoTinhThanh}`,
          title_left_3: t('provine_citi'),
          content_right_3: `${item?.tongSoQuanHuyen}`,
          title_right_3: t('district'),
          color: item?.maMauCuaHang,
          nameBranch: item?.tenCuaHang,
          percentage: item?.tongTien / totalPercent,
          type: 1,
        };
    }
  };
  return (
    <MyView style={styles.container}>
      {data.map((item, index) => {
        const content = renderContent(item);

        return (
          <ListReportBranch
            key={index}
            type={content?.type}
            content_left_1={content?.content_left_1}
            content_left_2={content?.content_left_2}
            content_right_1={content?.content_right_1}
            content_right_2={content?.content_right_2}
            title_left_1={content?.title_left_1}
            title_left_2={content?.title_left_2}
            title_right_1={content?.title_right_1}
            title_right_2={content?.title_right_2}
            title_right_3={content?.title_right_3}
            content_right_3={content?.content_right_3}
            title_left_3={content?.title_left_3}
            content_left_3={content?.content_left_3}
            color={content?.color}
            nameBranch={content?.nameBranch}
            percentage={fomatPercent(content?.percentage) || 0}
            dateComparison={content?.dateComparison}
          />
        );
      })}
    </MyView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Sizes.spacing_4_Height,
  },
});
export default Index;
