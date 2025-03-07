import {StyleSheet} from 'react-native';
import {
  Sizes,
  Colors,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
  Height,
} from '~theme';

export default styles = StyleSheet.create({
  txtWhite: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.neutrals_50,
    marginLeft: Sizes.spacing_1_Width,
  },
  advanced: {
    width: parseSizeWidth(113),
    height: parseSizeHeight(38),
    borderRadius: 100,
    backgroundColor: Colors.brand_01,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: parseSizeHeight(-8),
  },
  modalListCardStyle: {
    height: parseSizeHeight(140),
    alignItems: 'center',
  },
  txtText: {
    fontSize: Sizes.text_subtitle1,
    color: Colors.neutrals_500,
    textAlign: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTitleTimeReport: {
    fontSize: Sizes.text_h6,
    textAlign: 'center',
    color: Colors.neutrals_900,
  },
  timeReport: {
    paddingHorizontal: parseSizeWidth(10),
    paddingVertical: Sizes.spacing_1_Height,
    backgroundColor: Colors.semantics_Green_03,
    borderRadius: 100,
  },
  txtTimeReport: {
    fontSize: Sizes.text_tagline1,
    color: Colors.semantics_Green_01,
  },
  body: {
    flex: 1,
    gap: Sizes.spacing_5_Height,
    paddingHorizontal: Sizes.paddingWidth,
  },
  container: {
    paddingHorizontal: 0,
    gap: Sizes.spacing_3_Height,
    flex: 1,
  },
});
