import {useTranslation} from 'react-i18next';

const Data = () => {
  const {t} = useTranslation();

  return {
    dataSticky: [
      {
        id: 1,
        nameIcon: 'trashGrey',
        title: t('cancelOrder'),
        navigate: 'HuyDon',
      },
      {
        id: 2,
        nameIcon: 'saveColor',
        title: t('saveOrder'),
        navigate: 'LuuNhap',
      },
      {
        id: 3,
        nameIcon: 'billLinear',
        title: t('orderDetail'),
        navigate: 'chi-tiet-tao-don',
      },
      {
        id: 4,
        nameIcon: 'customer',
        title: t('inforCustomer'),
        navigate: 'thong-tin-khach-hang',
      },
      {
        id: 5,
        nameIcon: 'itemColor',
        title: t('extraService'),
        navigate: 'dich-vu-cong-them',
      },
      {
        id: 6,
        nameIcon: 'order',
        title: t('selectedProduct'),
        navigate: 'san-pham-da-chon',
      },
    ],
    dataStickyUpdate: [
      {
        id: 1,
        nameIcon: 'trashGrey',
        title: t('cancelUpdate'),
        navigate: 'Exist',
      },
      {
        id: 3,
        nameIcon: 'billLinear',
        title: t('orderDetail'),
        navigate: 'chi-tiet-tao-don',
      },
      {
        id: 4,
        nameIcon: 'customer',
        title: t('inforCustomer'),
        navigate: 'thong-tin-khach-hang',
      },
      {
        id: 5,
        nameIcon: 'itemColor',
        title: t('extraService'),
        navigate: 'dich-vu-cong-them',
      },
      {
        id: 6,
        nameIcon: 'order',
        title: t('selectedProduct'),
        navigate: 'san-pham-da-chon',
      },
    ],
  };
};
export default Data;
