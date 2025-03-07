import {StyleSheet} from 'react-native';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSize,
  Width,
} from '~theme';
export default styles = StyleSheet.create({
  txtNewsSample: {
    flex: 1,
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_700,
    marginHorizontal: Sizes.marginWidth,
  },
  newsSample: {
    width: '100%',
    marginVertical: Sizes.spacing_5_Height,
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
  tabControl: {
    marginBottom: Sizes.spacing_3_Height,
  },
  list: {
    gap: Sizes.spacing_4_Height,
  },
  body: {
    alignItems: 'center',
    flex: 1,
    width: Width,
    paddingHorizontal: Sizes.paddingWidth,
    marginTop: Sizes.spacing_3_Height,
    marginBottom: Sizes.spacing_3_Height,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 0,
    margin: 0,
    alignItems: 'center',
  },
});
