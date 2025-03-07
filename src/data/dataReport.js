import {useTranslation} from 'react-i18next';

const Data = () => {
  const {t} = useTranslation();

  return {
    dataReport: [
      {id: 4, nameIcon: 'employee', title: t('customer'), name: 'customer'},
      {
        id: 1,
        nameIcon: 'revenue',
        title: t('revenue'),
        name: 'revenue',
      },
      {
        id: 5,
        nameIcon: 'orderReport',
        title: t('order'),
        name: 'order',
      },
      {id: 2, nameIcon: 'cost', title: t('cost'), name: 'cost'},
      {id: 3, nameIcon: 'wareHouse', title: t('wareHoue'), name: 'wareHoue'},
    ],

    dataReportOverReport: [
      {
        id: 1,
        nameIcon: 'revenueDetail',
        title: t('revenueDetails'),
        name: 'revenue',
      },
      {
        id: 2,
        nameIcon: 'revenueDetail',
        title: t('costDetails'),
        name: 'cost',
      },
      {
        id: 3,
        nameIcon: 'revenueDetail',
        title: t('inventoryDetails'),
        name: 'wareHoue',
      },
      {
        id: 4,
        nameIcon: 'revenueDetail',
        title: t('customerDetails'),
        name: 'customer',
      },
      {
        id: 5,
        nameIcon: 'revenueDetail',
        title: t('orderDetail'),
        name: 'order',
      },
      // {
      //   id: 6,
      //   nameIcon: 'chartLine',
      //   title: t('dailyChart'),
      //   name: 'dailyChart',
      // },
      {
        id: 7,
        nameIcon: 'chartLine',
        title: t('monthlyChart'),
        name: 'monthlyChart',
      },
      {
        id: 8,
        nameIcon: 'chartLine',
        title: t('yearChart'),
        name: 'yearChart',
      },
    ],

    dataChosseTime: [
      {label: t('day'), value: '0'},
      {label: t('month'), value: '1'},
      {label: t('year'), value: '2'},
    ],

    dataSortRevenue: [
      {
        id: 1,
        nameIcon: 'revenueDetail',
        title: t('customerList'),
      },
      {id: 2, nameIcon: 'revenueDetail', title: t('productList')},
      {id: 3, nameIcon: 'revenueDetail', title: t('orderTypesList')},
    ],
    dataSortCost: [
      {
        id: 1,
        nameIcon: 'revenueDetail',
        title: t('costByOrder'),
      },
      {id: 2, nameIcon: 'revenueDetail', title: t('costCategories')},
    ],
    dataSortCustomer: [
      {
        id: 1,
        nameIcon: 'revenueDetail',
        title: t('customersithbirthdays'),
      },
      {id: 2, nameIcon: 'revenueDetail', title: t('productOfinterest')},
    ],
    dataSortOrder: [
      {
        id: 1,
        nameIcon: 'orderReport',
        title: t('shippingOrders'),
      },
      {id: 2, nameIcon: 'location', title: t('ordersByAddress')},
    ],
    dataHightandLow: [
      {value: 1, label: t('hight') + ' > ' + t('low')},
      {value: 2, label: t('low') + ' > ' + t('hight')},
    ],
    dataHightandLowInventory: [
      {
        value: 1,
        label: t('inventory') + ' (' + t('hight') + ' > ' + t('low') + ')',
      },
      {
        value: 2,
        label: t('inventory') + ' (' + t('low') + ' > ' + t('hight') + ')',
      },
      {
        value: 3,
        label: t('sold') + ' (' + t('hight') + ' > ' + t('low') + ')',
      },
      {
        value: 4,
        label: t('sold') + ' (' + t('low') + ' > ' + t('hight') + ')',
      },
    ],
    dataHightandLowCustomerBirthday: [
      {
        value: 1,
        label:
          t('birthday') + ' (' + t('nearest') + ' > ' + t('farthest') + ')',
      },
      {
        value: 2,
        label:
          t('birthday') + ' (' + t('farthest') + ' > ' + t('nearest') + ')',
      },
    ],
    dataHightandLowCustomerFavorite: [
      {
        value: 1,
        label: t('interested') + ' (' + t('most') + ' > ' + t('least') + ')',
      },
      {
        value: 2,
        label: t('interested') + ' (' + t('least') + ' > ' + t('most') + ')',
      },
    ],
    dataTime: [
      {
        value: 1,
        label: t('monthsOfYear'),
        name: 'monthsOfYear',
        nameIcon: 'calendar',
        key: 'NT',
      },
      {
        value: 2,
        label: t('quarterOfYear'),
        name: 'quarterOfYear',
        nameIcon: 'calendar',
        key: 'NQ',
      },
      {
        value: 3,
        label: t('monthsOfQuarter'),
        name: 'monthsOfQuarter',
        nameIcon: 'calendar',
        key: 'QT',
      },
    ],
    dataTypeReport: [
      {
        id: 1,
        nameIcon: 'employee',
        title: t('numberOfCustomers'),
        name: 'customer',
        key: 'KH',
      },
      {
        id: 2,
        nameIcon: 'revenue',
        title: t('revenue'),
        name: 'revenue',
        key: 'DT',
      },
      {
        id: 3,
        nameIcon: 'orderReport',
        title: t('numberOfOrders'),
        name: 'order',
        key: 'DH',
      },
      {
        id: 4,
        nameIcon: 'house',
        title: t('numberOfProductsSold'),
        name: 'product',
        key: 'SP',
      },
      {
        id: 5,
        nameIcon: 'revenue',
        title: t('cost'),
        name: 'cost',
        key: 'CP',
      },
    ],
  };
};

export default Data;
