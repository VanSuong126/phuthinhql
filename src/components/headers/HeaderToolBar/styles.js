import {StyleSheet} from 'react-native';
import {Colors, Sizes, FontStyles, parseSizeHeight} from '~theme';

export default styles = StyleSheet.create({
  stylesModalSort: {
    height: parseSizeHeight(300),
  },
  containerHeaderStyle: {
    height: Sizes.spacing_9_Height,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral_100,
    paddingHorizontal: Sizes.paddingWidth,
  },
  wrapIconBack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapTitleHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitleHeader: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.semantics_Black,
  },
});
