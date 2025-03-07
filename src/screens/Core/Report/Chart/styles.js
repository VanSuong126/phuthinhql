import {StyleSheet} from 'react-native';
import {
  Sizes,
  Colors,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';

export default styles = StyleSheet.create({
  modalListCardStyle: {
    height: parseSizeHeight(140),
    alignItems: 'center',
  },
  scrollContainer: {
    flexDirection: 'row',
    gap: Sizes.spacing_3_Height,
  },
  content: {
    gap: Sizes.spacing_4_Height,
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
  chart: {
    width: parseSizeWidth(366),
    height: parseSizeHeight(247),
  },
  body: {
    gap: Sizes.spacing_5_Height,
    paddingHorizontal: Sizes.spacing_5_Height,
    flex: 1,
    marginBottom: Sizes.spacing_4_Height,
  },
  header: {
    paddingHorizontal: Sizes.spacing_5_Height,
    height: Sizes.spacing_9_Height,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral_100,
  },
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
});
