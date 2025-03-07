import {StyleSheet} from 'react-native';
import {
  Sizes,
  Colors,
  parseSizeHeight,
  parseSizeWidth,
  parseSize,
  FontStyles,
} from '~theme';

export default styles = StyleSheet.create({
  status: {
    paddingVertical: parseSizeHeight(5),
    paddingHorizontal: parseSizeWidth(15),
    backgroundColor: Colors.semantics_Yellow_03,
    borderRadius: 100,
  },
  txtStatus: {
    textAlign: 'center',
    fontSize: Sizes.text_tagline1,
    color: Colors.semantics_Yellow_01,
  },
  percent: {
    paddingVertical: parseSizeHeight(2),
    paddingHorizontal: Sizes.spacing_3_Height,
    backgroundColor: Colors.semantics_Yellow_03,
    borderRadius: 100,
  },
  txtPercent: {
    textAlign: 'center',
    fontSize: Sizes.text_tagline1,
    color: Colors.semantics_Yellow_01,
  },
  txtBlack: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '500',
    color: Colors.neutrals_900,
  },
  txtGrey: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '500',
    color: Colors.neutrals_700,
    marginLeft: parseSizeWidth(10),
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    borderRadius: parseSize(12),
    backgroundColor: Colors.neutrals_100,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    padding: parseSize(15),
    gap: parseSizeHeight(10),
  },
});
