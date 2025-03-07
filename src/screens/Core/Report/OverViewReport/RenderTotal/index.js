import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import TotalReport from '../../TotalReport';
import currencyFormat from '~helper/currencyFormat';

const fomatPercent = value => {
  // Check for Infinity and handle it
  if (value < 0 || value === 0 || !value || !isFinite(value)) {
    return 0;
  }
  return Math.round(value * 100) / 100;
};

const Index = ({data = [], typeReport}) => {
  const {t} = useTranslation();

  // Hàm render nội dung dựa trên typeReport
  const renderContent = () => {
    switch (typeReport) {
      case 'revenue':
        const {totalRevenue, totalOrder, totalCustomer, totalProduct} =
          useMemo(() => {
            const totalRevenue = data?.reduce(
              (total, item) => total + item?.tongDoanhThu,
              0,
            );
            const totalCustomer = data.reduce(
              (total, item) => total + item?.tongSoKhachHang,
              0,
            );
            const totalProduct = data.reduce(
              (total, item) => total + item?.tongSoSanPham,
              0,
            );
            const totalOrder = data.reduce(
              (total, item) => total + item?.tongSoDonHang,
              0,
            );
            return {
              totalRevenue,
              totalOrder,
              totalCustomer,
              totalProduct,
            };
          }, [data]);

        return {
          title: t('totalRevenue'),
          contentTitle: currencyFormat(totalRevenue),
          title_boxLeft_1: t('customer'),
          content_boxLeft_1: totalCustomer,
          title_boxLeft_2: t('branch'),
          content_boxLeft_2: data?.length,
          title_boxRight_1: t('product'),
          content_boxRight_1: totalProduct,
          title_boxRight_2: t('order'),
          content_boxRight_2: totalOrder,
        };

      case 'cost':
        // tính tổng số lượng đơn hàng
        const {totalFee, totalTypeFee} = useMemo(() => {
          const totalFee = data.reduce(
            (total, item) => total + item?.tongTien,
            0,
          );
          const totalTypeFee = data.reduce(
            (total, item) => total + item?.tongLoaiChiPhi,
            0,
          );

          return {totalFee, totalTypeFee};
        }, [data]);
        return {
          title: t('totalExpenses'),
          contentTitle: currencyFormat(totalFee),
          title_boxLeft_1: t('costCategory'),
          content_boxLeft_1: totalTypeFee,
          title_boxRight_1: t('branch'),
          content_boxRight_1: data.length,
          quantityContent: 1,
        };
      case 'wareHoue':
        const {totalInventory, totalSold, totalTypeProduct} = useMemo(() => {
          const totalInventory = data.reduce(
            (total, item) => total + item?.soLuongTonKho,
            0,
          );
          const totalSold = data.reduce(
            (total, item) => total + item?.soLuongBanRa,
            0,
          );
          const totalTypeProduct = data.reduce(
            (total, item) => total + item?.tongSoLoaiSanPham,
            0,
          );
          return {totalInventory, totalSold, totalTypeProduct};
        }, [data]);

        const totalWareHouse = (totalInventory + totalSold) / 100;

        return {
          title: t('inventory'),
          contentTitle: totalInventory || 0,
          title_boxLeft_1: t('inventory'),
          content_boxLeft_1: `${fomatPercent(
            totalInventory / totalWareHouse,
          )}%`,
          title_boxRight_1: t('sold'),
          content_boxRight_1: `${fomatPercent(totalSold / totalWareHouse)}%`,
          title_boxLeft_2: t('product'),
          content_boxLeft_2: totalTypeProduct || 0,
          title_boxRight_2: t('branch'),
          content_boxRight_2: data?.length || 0,
          quantityContent: 2,
        };
      case 'customer':
        const {totalCustommerPrice, totalCustomer2} = useMemo(() => {
          const totalCustommerPrice = data?.reduce(
            (total, item) => total + item?.tongDoanhThu,
            0,
          );
          const totalCustomer2 = data?.reduce(
            (total, item) => total + item?.tongSoKhachHang,
            0,
          );
          return {
            totalCustommerPrice,
            totalCustomer2,
          };
        }, [data]);
        return {
          title: t('revenue'),
          contentTitle: currencyFormat(totalCustommerPrice),
          title_boxLeft_1: t('customer'),
          content_boxLeft_1: totalCustomer2,
          title_boxRight_1: t('branch'),
          content_boxRight_1: data?.length,
          quantityContent: 1,
        };
      default:
      case 'order':
        const {totalPriceOrder, totalOrder2} = useMemo(() => {
          const totalPriceOrder = data?.reduce(
            (total, item) => total + item?.tongTien,
            0,
          );
          const totalOrder2 = data?.reduce(
            (total, item) => total + item?.tongSoDonHang,
            0,
          );
          return {
            totalPriceOrder,
            totalOrder2,
          };
        }, [data]);
        return {
          title: t('revenue'),
          contentTitle: currencyFormat(totalPriceOrder),
          title_boxLeft_1: t('order'),
          content_boxLeft_1: totalOrder2,
          title_boxRight_1: t('branch'),
          content_boxRight_1: data?.length,
          quantityContent: 1,
        };
    }
  };

  const content = renderContent();

  if (!content) return null;

  return (
    <TotalReport
      title={content.title}
      contentTitle={content.contentTitle}
      title_boxLeft_1={content.title_boxLeft_1}
      content_boxLeft_1={content.content_boxLeft_1}
      title_boxLeft_2={content.title_boxLeft_2}
      content_boxLeft_2={content.content_boxLeft_2}
      title_boxRight_1={content.title_boxRight_1}
      content_boxRight_1={content.content_boxRight_1}
      title_boxRight_2={content.title_boxRight_2}
      content_boxRight_2={content.content_boxRight_2}
      quantityContent={content.quantityContent}
    />
  );
};

export default Index;
