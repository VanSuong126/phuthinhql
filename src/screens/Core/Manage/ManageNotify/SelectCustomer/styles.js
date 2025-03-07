import {StyleSheet} from 'react-native';
import {
  Sizes,
  Colors,
  Width,
} from '~theme';
export default styles = StyleSheet.create({
  list: {
    gap: Sizes.spacing_4_Height,
  },
  linearHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    alignItems: 'center',
    flex: 1,
    width: Width,
    paddingHorizontal: Sizes.paddingWidth,
    gap: Sizes.spacing_3_Width,
    marginVertical: Sizes.spacing_5_Width,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 0,
    margin: 0,
    alignItems: 'center',
  },
});
