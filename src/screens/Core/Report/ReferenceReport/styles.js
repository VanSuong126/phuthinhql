import {StyleSheet} from 'react-native';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
  parseSize,
  Width,
} from '~theme';
export default styles = StyleSheet.create({
  select: {
    height: parseSizeHeight(50),
    paddingHorizontal: parseSizeWidth(20),
    backgroundColor: Colors.neutrals_200,
    borderRadius: parseSizeWidth(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtCard: {
    width: parseSizeWidth(208),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_700,
  },
  card: {
    height: parseSizeHeight(64),
    borderRadius: parseSize(12),
    backgroundColor: Colors.neutrals_100s,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.paddingWidth,
  },
  txtLabelCard: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    marginBottom: Sizes.spacing_4_Height,
  },
  wrapCard: {},
  txtHeader: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_h3,
    fontWeight: '600',
    color: Colors.semantics_Black,
    textAlign: 'left',
  },
  button: {
    alignItems: 'center',
    marginTop: Sizes.spacing_5_Height,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.background,
    gap: Sizes.spacing_4_Height,
  },
});
