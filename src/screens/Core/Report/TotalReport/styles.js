import {StyleSheet} from 'react-native';

import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  parseSize,
  FontStyles,
} from '~theme';
export default styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTitleDetail: {
    color: Colors.neutrals_700,
  },
  txtDetail: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_h6,
    textAlign: 'right',
    marginRight: Sizes.spacing_1_Width,
  },
  txtDetailTotal: {
    flexDirection: 'row',
    width: parseSizeWidth(109),
    height: parseSizeHeight(25),
    alignItems: 'center',
  },
  BoxDetailTotal: {
    width: parseSizeWidth(139),
    height: parseSizeHeight(78),
    borderRadius: parseSize(8),
    backgroundColor: Colors.neutrals_50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_200,
    alignItems: 'center',
    justifyContent: 'center',
    gap: parseSizeHeight(10),
  },
  txtDetailTotalOneContent: {
    flexDirection: 'row',
    width: parseSizeWidth(109),
    height: parseSizeHeight(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  BoxDetailTotalOneContent: {
    paddingHorizontal: parseSizeWidth(15),
    paddingVertical: parseSizeHeight(10),
    backgroundColor: Colors.neutrals_50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: parseSize(8),
  },
  txtPriceTotal: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h3,
    fontWeight: '600',
    color: Colors.brand_01,
    marginBottom: Sizes.spacing_3_Height,
  },
  txtTotal: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    marginBottom: Sizes.spacing_2_Height,
  },
  total: {
    borderRadius: parseSize(16),
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingVertical: parseSizeHeight(18),
    paddingHorizontal: Sizes.paddingWidth,
  },
});
