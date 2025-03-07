import {StyleSheet} from 'react-native';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
  Width,
} from '~theme';
export default styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  typeDiscount: {
    width: '100%',
  },
  textInput: {
    flex: 1,
    borderRadius: parseSizeWidth(8),
    backgroundColor: Colors.neutrals_200,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '400',
    color: Colors.semantics_Black,
    paddingHorizontal: parseSizeWidth(20),
    paddingVertical: parseSizeHeight(14),
    height: parseSizeHeight(50),
  },
  input: {
    width: parseSizeWidth(163),
  },
  dateArr: {
    height: parseSizeHeight(71),
    width: '100%',
  },
  txtCheckBox: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
  },
  checkBox: {
    alignItems: 'center',
    marginBottom: Sizes.spacing_2_Height,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  body: {
    alignItems: 'center',
    width: Width,
    paddingHorizontal: Sizes.paddingWidth,
    paddingTop: Sizes.spacing_5_Height,
    paddingBottom: parseSizeHeight(10),
    marginTop: Sizes.spacing_3_Width,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.neutrals_300,
    backgroundColor: Colors.neutrals_100,
    gap: Sizes.spacing_4_Height,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 0,
    margin: 0,
    alignItems: 'center',
  },
});
