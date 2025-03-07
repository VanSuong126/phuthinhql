import {StyleSheet} from 'react-native';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
  parseSize,
} from '~theme';
export default styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: Sizes.paddingWidth,
    marginTop: Sizes.paddingHeight,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 0,
    margin: 0,
  },
});
