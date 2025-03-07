import {StyleSheet} from 'react-native';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';

export default styles = StyleSheet.create({
  container: {
    gap: Sizes.spacing_3_Height,
    paddingHorizontal: 0,
    flex: 1,
  },
  header: {
    paddingHorizontal: Sizes.spacing_5_Width,
  },
  body: {
    backgroundColor: '#fcfcfd',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: Sizes.spacing_5_Width,
    paddingBottom: Sizes.paddingHeight,
  },
  input: {
    width: parseSizeWidth(342),
    height: parseSizeHeight(70),
    marginTop: 0,
  },
  checkbox: {
    marginTop: Sizes.spacing_4_Width,
    gap: parseSizeHeight(13),
  },
  textValueCheck: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',

    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  wrapInputUnit: {
    marginTop: parseSizeHeight(20),
    gap: parseSizeHeight(8),
  },
  inputUnit: {
    height: parseSizeHeight(48),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutrals_200,
    borderRadius: parseSizeWidth(8),
  },
  textUnit: {
    height: parseSizeHeight(48),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Black,
    backgroundColor: Colors.neutrals_200,
  },
  labelInput: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
});
