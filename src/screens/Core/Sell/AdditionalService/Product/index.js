import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { MyView } from '~components/MyStyles';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
  parseSize,
} from '~theme';
import { salesSelectors, salesActions } from '~redux/reducers';
import FlatList from '~components/FlatList';
import ModalNoteProduct from '~components/modals/ModalNoteProduct'

const Index = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // init state
  const [dataNoteView, setDataNoteView] = useState();
  const [productCodeView, setProductCodeView] = useState();
  const [visibleModalViewNote, setVisibleModalViewNote] = useState(false);

  // data product
  const orderData = useSelector(state => salesSelectors.selectDataSales(state));



  // handle onPress from item product
  const handleOnPress = data => {
    //action addNote navigate to screen SelectSevice
    if (data?.action === 'addNote') {
      navigation.navigate('chon-dich-vu',
        {
          productCode: data?.productCode,
          customerCode: orderData?.idkhachhang
        });
    }
    //action viewNote open ModalViewNote
    else {
      setProductCodeView(data?.productCode);
      setDataNoteView(data?.ghiChu);
      setVisibleModalViewNote(true);
    }
  }
  // DeleteNote showing
  const handleDeleteNote = () => {
    setVisibleModalViewNote(false);
    const listProduct = orderData.sanphamdachon.map((product) => {
      if (product.GhiChuTang && product.MaSanPham === productCodeView) {
        product.GhiChuTang = product.GhiChuTang.filter(
          (note) => note.IDMoiQuanHe !== dataNoteView?.IDMoiQuanHe
        );
      }
      return product;
    });
    const updatedOrderData = {
      ...orderData,
      sanphamdachon: listProduct
    };
    dispatch(salesActions.setDataSales(updatedOrderData))

  }

  return (
    <MyView style={styles.container}>
      <FlatList
        data={orderData?.sanphamdachon}
        onPress={data => handleOnPress(data)}
        loading={false}
        fetching={false}
        type="extraServiceProduct"
      />
      <ModalNoteProduct
        isVisible={visibleModalViewNote}
        onClose={() => setVisibleModalViewNote(false)}
        data={dataNoteView}
        onDelete={() => handleDeleteNote()}
      />
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  dotLight: {
    width: parseSize(5),
    height: parseSize(5),
    backgroundColor: Colors.semantics_Grey,
    borderRadius: parseSize(5),
  },
  dotsContainer: {
    marginTop: parseSizeHeight(8),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: Colors.neutrals_300,
    borderRadius: 5,
  },
  contentNote: {
    color: Colors.neutrals_700,
  },
  txtFrom: {
    fontFamily: FontStyles.InterSemiBold,
    fontWeight: '600',
  },
  note: {
    width: parseSizeWidth(266),
  },
  wrapBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    height: 1,
    borderRadius: 100,
    backgroundColor: Colors.neutrals_300,
    marginVertical: Sizes.spacing_3_Height,
  },
  txtButton: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    color: Colors.semantics_Grey,
  },
  btnChoseService: {
    width: parseSizeWidth(110),
    height: parseSizeHeight(24),
    borderRadius: 100,
    backgroundColor: Colors.semantics_SmokyGrey,
    marginTop: Sizes.spacing_4_Height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtContent: {
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.semantics_Yellow_02,
  },
  txtTitle: {
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.neutrals_700,
  },
  content: { flexDirection: 'row', gap: 5 },
  txtName: {
    fontFamily: FontStyles.InterRegular,
    width: parseSizeWidth(228),
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    textAlign: 'left',
  },
  image: {
    width: parseSizeWidth(75),
    height: parseSizeHeight(87),
    backgroundColor: 'red',
    borderRadius: 8,
    marginRight: parseSizeWidth(20),
  },
  wrapTop_Right_Bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapTop_Right: {
    justifyContent: 'space-between',
    paddingVertical: Sizes.spacing_1_Height,
  },
  wrapTop: { flexDirection: 'row' },
  box: {
    borderRadius: 16,
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    marginTop: Sizes.marginHeight,
    paddingHorizontal: parseSizeWidth(9),
    paddingVertical: parseSizeHeight(10),
  },

  container: {
    flex: 1,
    paddingHorizontal: Sizes.paddingHeight,
  },
  imageProduct: {
    width: parseSizeWidth(75),
    height: parseSizeHeight(87),
    borderRadius: 8,
  }
});
