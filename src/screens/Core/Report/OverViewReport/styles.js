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
  modalListCardStyle: {
    height: parseSizeHeight(140),
    alignItems: 'center',
  },
  chart: {
    height: parseSizeHeight(190),
    alignItems: 'center',
    justifyContent: 'center',
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    gap: Sizes.spacing_5_Height,
    paddingBottom: Sizes.paddingWidth,
    paddingHorizontal: Sizes.paddingWidth,
  },
  container: {
    paddingHorizontal: 0,
    backgroundColor: Colors.background,
    flex: 1,
  },
});
