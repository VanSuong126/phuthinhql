import {StyleSheet} from 'react-native';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    gap: Sizes.spacing_3_Height,
  },
  header: {
    height: Sizes.spacing_9_Height,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: Sizes.paddingHeight,
    gap: Sizes.spacing_3_Height,
    backgroundColor: Colors.neutrals_100,
  },
  iconHeader: {
    position: 'absolute',
    right: Sizes.paddingWidth,
    top: parseSizeHeight(26),
    bottom: parseSizeHeight(14),
  },
  txtHeader: {
    height: parseSizeHeight(28),
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'center',
    color: '#454545',
  },
  total: {
    backgroundColor: Colors.neutrals_100,
    borderWidth: 0.5,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(20),
    gap: Sizes.spacing_3_Height,
  },
  contentTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.semantics_Black,
  },
  txtContent: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    color: Colors.accent_yellow,
  },
  body: {
    paddingHorizontal: Sizes.paddingWidth,
    flex: 1,
  },
  boxProduct: {
    borderRadius: Sizes.spacing_4_Width,
    backgroundColor: Colors.neutrals_100,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: parseSizeWidth(10),
    paddingVertical: parseSizeWidth(10),
    marginBottom: Sizes.spacing_4_Height,
    gap: Sizes.spacing_4_Height,
  },
  flatlistProduct: {
    flex: 1,
  },
  topBoxProduct: {
    gap: parseSizeWidth(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageProduct: {
    width: parseSizeWidth(75),
    height: parseSizeHeight(90),
    borderRadius: Sizes.spacing_2_Width,
  },
  right_topBox: {
    justifyContent: 'space-between',
  },
  txtNameProduct: {
    width: parseSizeWidth(228),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.semantics_Black,
  },
  right_topBoxRepair: {
    width: parseSizeWidth(228),
    justifyContent: 'center',
    gap: parseSizeHeight(15),
  },
  txtTitleUpdate: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.semantics_Black,
  },
  topBoxPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtPrice: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.semantics_Black,
  },

  txtCount: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',

    textAlign: 'center',
    color: Colors.semantics_Black,
  },
  middleBoxProduct: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  boxDiscount: {
    flexDirection: 'row',
    gap: parseSizeWidth(5),
  },
  txtIdProduct: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',

    color: Colors.neutrals_700,
  },
  txtDiscountProdcut: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',

    color: Colors.semantics_Yellow_02,
  },
  txtCodeOrder: {
    color: Colors.neutrals_700,
  },

  bottomBox: {
    gap: Sizes.spacing_3_Height,
  },
  line: {
    height: parseSizeHeight(1),
    borderRadius: 100,
    backgroundColor: Colors.neutrals_300,
  },
  txtUpdate: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '600',

    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  txtNote: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',

    textAlign: 'left',
    color: Colors.neutrals_700,
  },
});
