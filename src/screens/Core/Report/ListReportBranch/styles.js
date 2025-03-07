import {StyleSheet} from 'react-native';

import {
  Sizes,
  Colors,
  parseSizeHeight,
  parseSize,
  FontStyles,
} from '~theme';

export default styles = StyleSheet.create({
  quantiBranch: {
    fontFamily: FontStyles.InterSemiBold,
  },
  horizontalTextRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  horizontalText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtGrey: {
    fontSize: Sizes.text_tagline1,
    color: Colors.neutrals_700,
  },
  txtGrey2: {
    color: Colors.neutrals_700,
    marginLeft: Sizes.spacing_1_Height,
  },
  txtbold: {
    fontFamily: FontStyles.InterSemiBold,
    fontWeight: '600',
  },
  txtName: {
    fontSize: Sizes.text_subtitle1,
    color: Colors.neutrals_900,
    flex: 1,
  },
  percent: {
    paddingVertical: parseSizeHeight(2),
    paddingHorizontal: Sizes.spacing_3_Height,
    backgroundColor: Colors.semantics_Yellow_03,
    borderRadius: 10,
  },
  txtPercent: {
    textAlign: 'center',
    fontSize: Sizes.text_tagline1,
    color: Colors.semantics_Yellow_01,
  },
  item: {
    borderRadius: parseSize(16),
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingVertical: Sizes.spacing_3_Height,
    paddingHorizontal: Sizes.spacing_5_Height,
    gap: Sizes.spacing_2_Height,
  },
});
