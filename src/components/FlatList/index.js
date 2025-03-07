import React, {useState} from 'react';
import {FlatList, RefreshControl, ActivityIndicator, Image} from 'react-native';
import {Colors} from '~theme';
import {MyView} from '~components/MyStyles';

const emptyImg = require('~assets/images/no-results.png');

import WareHouse from './components/WareHouseBlock';
import FindZipCode from './components/FindZipCodeBlock';
import FindUser from './components/FindUserBlock';
import ProductSelected from './components/ProductSelectedBlock';
import ExtraServiceProduct from './components/ExtraServiceProductBlock';
import RelationShip from './components/RelationshipBlock';
import ItemSelector from './components/ItemSelectorBlock';
import DeliveryAddress from './components/DeliveryAddressBlock';
import OrderPrint from './components/OrderPrintBlock';
import HistoryCheckIn from './components/HistoryCheckInBlock';
import OrderUnConfirm from './components/OrderUnConfirmBlock';
import OrderShipment from './components/OrderShipmentBlock';
import OrderRequest from './components/OrderRequestBlock';
import OrderAll from './components/OrderAllBlock';
import OrderDraft from './components/OrderDraftBlock';
import ProductDetail from './components/ProductDetailBlock';
import ListCustomer from './components/ListCustomer';
import ListDiscount from './components/ListDiscount';
import ZaloOaList from './components/ZaloOaList';
import NotifiError from './components/NotifiError';
import Customer from './components/CustomerBlock';
import ReportCompare from './components/ReportCompare';
import CalculateDifference from './components/CalculateDifference';
import ListCost from './components/ListCost';
import GroupProducts from './components/GroupProducts';
const FlatlistPage = ({
  onPress,
  onRefresh,
  onEndReached,
  data,
  horizontal = false,
  type = '',
  grid = true,
  numColumns = 1,
  fetching = false,
  loading = false,
  scrollEnabled = true,
  style,
  contentContainerStyleProp,
  columnWrapperStyleProp,
  RenderItem = null,
  isSelected,
}) => {
  const [gridState, setGrid] = useState(grid);

  const renderItem = ({item, index}) => {
    return (
      <MyView style={{flex: 1}}>
        {type === 'wareHouse' ? (
          <WareHouse onPress={onPress} data={item} index={index} />
        ) : type === 'findZipCode' ? (
          <FindZipCode onPress={onPress} data={item} index={index} />
        ) : type === 'findUser' ? (
          <FindUser onPress={onPress} data={item} index={index} />
        ) : type === 'productSelected' ? (
          <ProductSelected onPress={onPress} data={item} index={index} />
        ) : type === 'extraServiceProduct' ? (
          <ExtraServiceProduct onPress={onPress} data={item} index={index} />
        ) : type === 'relationship' ? (
          <RelationShip onPress={onPress} data={item} index={index} />
        ) : type === 'deliveryAddress' ? (
          <DeliveryAddress data={item} index={index} onPress={onPress} />
        ) : type === 'itemSelector' ? (
          <ItemSelector data={item} index={index} onPress={onPress} />
        ) : type === 'listOrderPrint' ? (
          <OrderPrint data={item} index={index} onPress={onPress} />
        ) : type === 'historyCheckin' ? (
          <HistoryCheckIn data={item} index={index} onPress={onPress} />
        ) : type === 'unConfirm' ? (
          <OrderUnConfirm data={item} index={index} onPress={onPress} />
        ) : type === 'shipment' ? (
          <OrderShipment data={item} index={index} onPress={onPress} />
        ) : type === 'requestOrder' ? (
          <OrderRequest data={item} index={index} onPress={onPress} />
        ) : type === 'allOrder' ? (
          <OrderAll data={item} index={index} onPress={onPress} />
        ) : type === 'draftOrder' ? (
          <OrderDraft data={item} index={index} onPress={onPress} />
        ) : type === 'productDetail' ? (
          <ProductDetail data={item} index={index} onPress={onPress} />
        ) : type === 'listCustomer' ? (
          <ListCustomer
            isSelected={isSelected}
            data={item}
            index={index}
            onPress={onPress}
          />
        ) : type === 'listDiscount' ? (
          <ListDiscount data={item} index={index} onPress={onPress} />
        ) : type === 'ZaloOaList' ? (
          <ZaloOaList data={item} index={index} onPress={onPress} />
        ) : type === 'notifiError' ? (
          <NotifiError data={item} index={index} />
        ) : type === 'customerManage' ? (
          <Customer
            data={item}
            index={index}
            onPress={onPress}
            isSelected={isSelected}
          />
        ) : type === 'reportCompare' ? (
          <ReportCompare data={item} />
        ) : type === 'calculateDifference' ? (
          <CalculateDifference data={item} />
        ) : type === 'listCost' ? (
          <ListCost data={item} />
        ) : type === 'groupProducts' ? (
          <GroupProducts
            isSelected={isSelected}
            data={item}
            onPress={onPress}
          />
        ) : (
          <MyView />
        )}
      </MyView>
    );
  };

  const listFooter = loading ? (
    <MyView style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator color={Colors.default} size={'large'} />
    </MyView>
  ) : (
    <MyView style={{height: 10}} /> // Thêm khoảng trống
  );

  const listEmpty =
    !data && !loading ? (
      <MyView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <MyView style={{flex: 0.4}}>
          {/* <Image source={emptyImg} style={{flex: 1}} resizeMode="stretch" /> */}
        </MyView>
      </MyView>
    ) : null;

  return (
    <FlatList
      key={gridState ? 'grid' : 'row'}
      data={data || []}
      horizontal={horizontal}
      numColumns={gridState ? numColumns : 1}
      style={[style, {padding: 0}]}
      contentContainerStyle={
        horizontal
          ? [{padding: 0, flexGrow: 1}, contentContainerStyleProp]
          : [{flexGrow: 1}, contentContainerStyleProp]
      }
      columnWrapperStyle={
        gridState && numColumns > 1
          ? [{justifyContent: 'space-between', flex: 1}, columnWrapperStyleProp]
          : null
      }
      renderItem={
        RenderItem ? RenderItem : ({item, index}) => renderItem({item, index})
      }
      keyExtractor={(item, index) => `key${index}`}
      refreshing={fetching}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.01}
      removeClippedSubviews={true}
      scrollEnabled={scrollEnabled}
      refreshControl={
        scrollEnabled && (
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={Colors.default}
            progressBackgroundColor={Colors.default}
          />
        )
      }
      ListFooterComponent={listFooter}
      ListEmptyComponent={listEmpty}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default React.memo(FlatlistPage);
