import {StyleSheet} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import ListReportBranch from '../../ListReportBranch';
import currencyFormat from '~helper/currencyFormat';
import {currencyFormatNoUnit} from '~helper/currencyFormat';
import {MyView} from '~components/MyStyles';
import {Sizes} from '~theme';
import FlatList from '~components/FlatList';

const Index = React.memo(({data, typeReport, checkType, chooseType}) => {
  const {t} = useTranslation();

  const formatDate = dateString => {
    const date = moment(dateString, 'YYYY-MM-DD');
    return date.format(checkType === 'year' ? 'MM/YYYY' : 'DD/MM/YYYY');
  };
  const currentCheckType = chooseType ? 'month' : checkType;
  const nameDate = currentCheckType === 'month' ? t('day') : t('month');
  const renderContent = item => {
    switch (typeReport) {
      case 'revenue':
        return {
          type: 2,
          content_left_1: item?.tongKhachHang?.length + ' ' + t('customer'),
          content_left_2: item?.tongDonHang + ' ' + t('order'),
          content_right_1: item?.tongSanPham?.length + ' ' + t('product'),
          content_right_2: currencyFormat(item?.tongTien),
          nameBranch: `${nameDate} ${formatDate(item?.ngayPhatSinh)}`,
          quantiBranch: item?.tongCuaHang?.length + ' ' + t('branch'),
        };
      case 'cost':
        return {
          type: 1,
          content_left_1: item?.TongLoaiChiPhi?.length,
          content_right_1: currencyFormatNoUnit(item?.tongTien),
          title_left_1: t('costCategory'),
          title_right_1: 'đ',
          nameBranch: `${nameDate} ${formatDate(item?.ngayPhatSinh)}`,
          quantiBranch: item?.TongCuaHang?.length + ' ' + t('branch'),
        };
      case 'customer':
        return {
          type: 1,
          content_left_1: item?.tongKhachHang?.length,
          content_right_1: currencyFormatNoUnit(item?.tongTien),
          title_left_1: t('customer'),
          title_right_1: 'đ',
          nameBranch: `${nameDate}  ${formatDate(item?.ngayPhatSinh)}`,
          quantiBranch: item?.tongCuaHang?.length + ' ' + t('branch'),
        };
      default:
        return {};
    }
  };

  const renderItem = ({item, index}) => {
    const content = renderContent(item);

    return (
      <ListReportBranch
        key={index}
        type={content.type}
        content_left_1={content.content_left_1}
        content_left_2={content.content_left_2}
        content_right_1={content.content_right_1}
        content_right_2={content.content_right_2}
        title_left_1={content.title_left_1}
        title_right_1={content.title_right_1}
        color={content.color}
        nameBranch={content.nameBranch}
        percentage={content.percentage}
        quantiBranch={content.quantiBranch}
      />
    );
  };

  return (
    <MyView style={styles.container}>
      <FlatList
        data={data}
        loading={false}
        fetching={false}
        RenderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyleProp={styles.list}
      />
    </MyView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    gap: Sizes.spacing_4_Height,
  },
});

export default Index;
