import {StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import ListReportBranch from '../../ListReportBranch';
import ListReportHaveIcon from '../../ListReportHaveIcon';
import {currencyFormatNoUnit} from '~helper/currencyFormat';
import {MyView} from '~components/MyStyles';
import {Sizes, Colors} from '~theme';
import FlatList from '~components/FlatList';
import moment from 'moment';
const Index = React.memo(
  ({data = [], dataChange, typeReport, typeView, checkChange}) => {
    const {t} = useTranslation();

    const totalPrice = useMemo(() => {
      const total = data?.reduce((total, item) => {
        const amount =
          typeReport === 'wareHoue'
            ? item?.phanTramTonKho
            : typeReport === 'customer' && typeView === 2
            ? item?.soLuongQuanTam
            : typeReport === 'order'
            ? item.soDonHang
            : item?.tongTien;
        return total + amount;
      }, 0);

      return total / 100;
    }, [data]);

    // fomat percent chỉ lấy 2 số cuối sau ','
    const fomatPercent = value => {
      if (value < 0 || value === 0 || !value || !isFinite(value)) {
        return 0;
      }
      return Math.round(value * 100) / 100;
    };

    const maxPrice = Math.max(
      ...data.map(item => {
        const max =
          typeReport === 'wareHoue'
            ? item?.phanTramTonKho
            : typeReport === 'customer' && typeView === 2
            ? item?.soLuongQuanTam
            : typeReport === 'order'
            ? item.soDonHang
            : item?.tongTien;
        return max;
      }),
    );
    const dataSorted = useMemo(() => {
      return checkChange ? dataChange : data;
    }, [checkChange, data, dataChange]);

    const renderContent = item => {
      //typeView 1: lọc theo khách hàng, 2: lọc theo sản phẩm, lọc theo loại đơn hàng
      switch (typeReport) {
        case 'revenue':
          return {
            content_left_1:
              typeView === 1 ? item?.khachHang : item?.idKhachHang?.length,
            content_left_2: item?.tongDonHang,
            content_right_1:
              typeView === 2 ? item?.sanPham : item?.idSanPham?.length,
            content_right_2: `${currencyFormatNoUnit(item?.tongTien)}`,
            title_left_1: t('customer'),
            title_left_2: t('order'),
            title_right_1: t('product'),
            title_right_2: 'đ',
            nameBranch:
              typeView === 2
                ? item?.tenSanPham
                : typeView === 3
                ? item?.tenHinhThucNhanHang
                : item?.tenKhachHang,
            percentage: item?.tongTien / totalPrice,
            color: maxPrice === item?.tongTien && Colors.brand_01,
          };
        case 'cost':
          //typeView 1: lọc theo loại đơn hàng, 2:lọc theo chi phí
          return {
            content_left_1:
              typeView === 2 ? item?.TongCuaHang?.length : item?.TongLoaiChiPhi,
            content_right_1: currencyFormatNoUnit(item?.tongTien),
            title_left_1: typeView === 2 ? t('branch') : t('costCategory'),
            title_right_1: 'đ',
            nameBranch: typeView === 2 ? item?.TenLoaiChiPhi : item?.MaDonHang,
            percentage: item?.tongTien / totalPrice,
            color: maxPrice === item?.tongTien && Colors.brand_01,
          };
        case 'wareHoue':
          return {
            content_left_1: `${item?.phanTramDaBan}%`,
            content_left_2: `${item?.phanTramTonKho}%`,
            content_right_1: item?.danhSachCuaHang.length,
            content_right_2: `${currencyFormatNoUnit(
              item?.tongTienSanPhamTonKho,
            )}`,
            title_left_1: t('sold'),
            title_left_2: t('remainingStock'),
            title_right_1: t('branch'),
            title_right_2: 'đ',
            nameBranch: item?.tenSanPham,
            percentage: item?.phanTramTonKho / totalPrice,
            color: maxPrice === item?.phanTramTonKho && Colors.brand_01,
          };
        case 'customer':
          if (typeView === 2) {
            return {
              content_left_1: item?.phanTramDaBan || 0,
              content_left_2: `${item?.soKhachHangMua}` || '0',
              content_right_1: item?.soLuongQuanTam || 0,
              content_right_2: `${currencyFormatNoUnit(item?.tongTien)}`,
              title_left_1: t('sold'),
              title_left_2: t('customer'),
              title_right_1: t('interestCount'),
              title_right_2: 'đ',
              nameBranch: `${item?.tenSanPham}`,
              percentage: item?.soLuongQuanTam / totalPrice,
              color: maxPrice === item?.soLuongQuanTam && Colors.brand_01,
            };
          }
          if (typeView === 1) {
            const date = moment(item?.ngaySinhNhat);
            const age = moment().diff(date, 'years');
            return {
              content_left_1: `${item?.soDonHang}`,
              content_left_2: `${currencyFormatNoUnit(item?.tongTien)}`,
              content_right_1: moment(date)?.format('DD/MM/YYYY'),
              content_right_2: `${age}`,
              title_left_1: t('order'),
              title_left_2: 'đ',
              title_right_2: `${t('age')}`,
              nameBranch: `${item?.tenKhachHang}`,
              percentage: null,
              dateComparison: item?.ngaySinhNhat,
            };
          }

        case 'order':
          if (typeView === 1) {
            return {
              title_left: `${item?.tenNhavanchuyen}`,
              percentage: item?.soDonHang / totalPrice,
              title_left_2: `${item?.tongSoSanPham} ${t('product')}`,
              title_right_2: `${currencyFormatNoUnit(item?.tongTien)}đ`,
              content_left_1: `${item?.quocGia}`,
              content_left_2: `${item?.quanHuyen}`,
              content_right_2: `${item?.trangThaiDonHang}`,
              content_right_1: `${item?.tinhThanh}`,
              icon_left_1: 'earth',
              icon_left_2: 'location',
              icon_right_1: 'pin',
              color: maxPrice === item?.soDonHang && Colors.brand_01,
              idStatus: item?.idTrangThaiVanChuyen,
            };
          }
          if (typeView === 2) {
            return {
              title_left: `${item?.soDonHang} ${t('order')}`,
              percentage: item?.soDonHang / totalPrice,
              title_left_2: `${item?.tongSoSanPham} ${t('product')}`,
              title_right_2: `${currencyFormatNoUnit(item?.tongTien)}đ`,
              content_left_1: item?.quocGia,
              content_left_2: item?.quanHuyen,
              content_right_2: item?.trangThaiDonHang,
              content_right_1: item?.tinhThanh,
              icon_left_1: 'earth',
              icon_left_2: 'location',
              icon_right_1: 'pin',
              color: maxPrice === item?.soDonHang && Colors.brand_01,
              idStatus: item?.idTrangThaiVanChuyen,
            };
          }
      }
    };

    const renderItem = ({item, index}) => {
      const content = renderContent(item);

      return (
        <ListReportBranch
          key={index}
          type={1}
          content_left_1={content.content_left_1}
          content_left_2={content.content_left_2}
          content_right_1={content.content_right_1}
          content_right_2={content.content_right_2}
          title_left_1={content.title_left_1}
          title_left_2={content.title_left_2}
          title_right_1={content.title_right_1}
          title_right_2={content.title_right_2}
          color={content.color}
          nameBranch={content.nameBranch}
          dateComparison={content.dateComparison}
          percentage={
            content.percentage === null
              ? null
              : fomatPercent(content?.percentage)
          }
        />
      );
    };

    const renderItemHaveIcon = ({item, index}) => {
      const content = renderContent(item);

      return (
        <ListReportHaveIcon
          key={index}
          title_left={content?.title_left}
          title_left_2={content?.title_left_2}
          title_right_2={content?.title_right_2}
          percentage={
            content.percentage === null
              ? null
              : fomatPercent(content?.percentage)
          }
          content_left_1={content?.content_left_1}
          content_left_2={content?.content_left_2}
          content_right_1={content?.content_right_1}
          content_right_2={content?.content_right_2}
          icon_left_1={content?.icon_left_1}
          icon_left_2={content?.icon_left_2}
          icon_right_1={content?.icon_right_1}
          color={content?.color}
          idStatus={content?.idStatus}
        />
      );
    };

    return (
      <MyView style={styles.container}>
        <MyView style={styles.container}>
          <FlatList
            data={dataSorted}
            loading={false}
            fetching={false}
            RenderItem={
              typeReport === 'order' ? renderItemHaveIcon : renderItem
            }
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyleProp={styles.list}
          />
        </MyView>
      </MyView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    gap: Sizes.spacing_4_Height,
  },
});

export default Index;
