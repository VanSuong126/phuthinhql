import React, {useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import {Colors} from '~theme';
import {MyView} from '~components/MyStyles';
import Products from './components/Products';

const emptyImg = require('~assets/images/no-results.png');

const ProductManageList = ({
  onPress,
  onRefresh,
  onEndReached,
  data,
  onSelectItem,
  onPressEdit,
  onPressDelete,
  isDeSelectedAll,
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
}) => {
  const [gridState, setGrid] = useState(grid);

  const renderItem = ({item, index}) => {
    return (
      <MyView style={{flex: 1}}>
        {type === 'wareHouse' ? (
          <Products
            onReloadData={onRefresh}
            onPressDelete={onPressDelete}
            onPressEdit={onPressEdit}
            isDeSelectedAll={isDeSelectedAll}
            onSelectItem={onSelectItem}
            onPress={onPress}
            data={item}
            index={index}
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
  ) : null;

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

export default React.memo(ProductManageList);
