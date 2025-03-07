import {StyleSheet} from 'react-native';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
  parseSize,
  Width,
} from '~theme';
export default styles = StyleSheet.create({
  textInputContent: {
    width: parseSizeWidth(342),
    textAlignVertical: 'top',
    borderRadius: parseSizeWidth(8),
    backgroundColor: Colors.neutrals_200,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '400',
    color: Colors.semantics_Black,
    paddingHorizontal: parseSizeWidth(20),
    paddingVertical: parseSizeHeight(14),
  },
  label: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    color: Colors.neutrals_700,
    marginBottom: parseSizeHeight(5),
  },
  inputText: {
    width: parseSizeWidth(342),
  },
  txtCard: {
    flex: 1,
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_700,
    marginHorizontal: Sizes.marginWidth,
  },
  card: {
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
  bottom: {
    alignItems: 'center',
    marginBottom: Sizes.marginHeight,
  },
  body: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: Sizes.paddingWidth,
    gap: Sizes.spacing_3_Width,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 0,
    margin: 0,
  },
});
