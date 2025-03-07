import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import Icon from '~components/IconXML';
import { MyView, MyText, MyTouchableOpacity } from '~components/MyStyles';
import { salesActions, salesSelectors, commonSelectors } from '~redux/reducers';
import { Colors, Sizes, parseSizeHeight, FontStyles } from '~theme';
import fetchData from '~providers';
import ModalItemSelector from '~modals/ModalItemSelector';

const Index = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Init state
  const [visibleModal, setVisibleModal] = useState(false);

  // Global state
  const orderData = useSelector(salesSelectors.selectDataSales);
  const paymentMethod = useSelector(commonSelectors.selectPaymentMethod) || []; 

  useEffect(() => {
    if (paymentMethod.length === 0) {
      fetchData(dispatch, 'getPaymentMethod', { loai: 261 });
    }
  }, [paymentMethod]);

  const handleSelected = (data) => {
    if (data) {
      dispatch(salesActions.setDataSales({
        ...orderData,
        hinhthucthanhtoan: data.IDHinhThucThanhToan,
      }));
    }
  };

  const selectedPayment = paymentMethod.find(
    x => x.IDHinhThucThanhToan === orderData?.hinhthucthanhtoan
  );

  return (
    <MyTouchableOpacity style={styles.container} onPress={() => setVisibleModal(true)}>
      <MyView style={styles.wrapIcon}>
        <Icon name="payment" width="24" height="24" />
      </MyView>
      <MyView style={styles.wrapInfo}>
        <MyView style={styles.wrapTitle}>
          <MyText style={styles.titleTitle}>{t('payment')}</MyText>
          <MyView >
            <Icon name="rightArrow" width="24" height="24" />
          </MyView>
        </MyView>
        {selectedPayment && (
          <MyView style={styles.wrapDetail}>
            <MyText style={styles.textInfo}>
              {selectedPayment.TenHinhThucThanhToan}
            </MyText>
          </MyView>
        )}
      </MyView>
      <ModalItemSelector
        isVisible={visibleModal}
        onClose={() => setVisibleModal(false)}
        data={paymentMethod}
        getItem={item => handleSelected(item)}
      />
    </MyTouchableOpacity>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.neutrals_100,
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(10),
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  wrapIcon: {
    flex: 0.1,
  },
  wrapInfo: {
    flex: 0.9,
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '600',
    color: Colors.semantics_Black,
  },
  wrapDetail: {
    marginTop: parseSizeHeight(10),
  },
  textInfo: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
});
