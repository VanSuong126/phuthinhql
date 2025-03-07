import {StyleSheet} from 'react-native';
import {Sizes, Colors, parseSize} from '~theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 0,
    margin: 0,
  },
  body: {
    flex: 1,
  },
  inforCost: {
    backgroundColor: Colors.neutrals_100,
    padding: parseSize(24),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.neutrals_300,
    gap: Sizes.spacing_3_Height,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtTitle: {
    fontWeight: '500',
  },
  txtContent: {
    fontWeight: '500',
    color: Colors.neutrals_700,
  },
  listCost: {
    paddingHorizontal: Sizes.spacing_5_Width,
    flex: 1,
  },
  list: {
    gap: Sizes.spacing_3_Height,
    paddingVertical: Sizes.spacing_3_Height,
  },
});
