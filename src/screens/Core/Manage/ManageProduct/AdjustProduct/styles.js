import {StyleSheet} from 'react-native';
import {
  Colors,
  FontStyles,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
  Sizes,
} from '~theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    gap: Sizes.spacing_3_Height,
    marginVertical: Sizes.spacing_3_Height,
    flex: 1,
  },
  Bottom: {},
  wrapBox: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.neutrals_300,
    backgroundColor: Colors.neutrals_100,
    paddingHorizontal: Sizes.spacing_5_Width,
    paddingVertical: parseSizeHeight(20),
    gap: Sizes.spacing_3_Height,
  },
  horizontal: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: Sizes.spacing_5_Width,
  },
  txtTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'right',
    color: Colors.semantics_Grey,
  },
  txtContent: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'right',
    color: Colors.neutrals_900,
    flex: 1,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    height: parseSize(36),
    width: parseSize(36),
    borderRadius: 18,
  },
  wraButton: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.neutrals_300,
    backgroundColor: Colors.neutrals_100,
    paddingHorizontal: Sizes.spacing_5_Width,
    paddingVertical: Sizes.spacing_3_Height,
    gap: Sizes.spacing_3_Height,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtButton: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.semantics_Black,
    flex: 1,
    textAlign: 'left',
  },
});

export default styles;
