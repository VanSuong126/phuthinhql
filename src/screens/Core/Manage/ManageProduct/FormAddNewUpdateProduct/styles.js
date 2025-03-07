import {StyleSheet} from 'react-native';
import {Colors, FontStyles, parseSize, parseSizeHeight, Sizes} from '~theme';
import {parseSizeWidth} from '~theme';

const styles = StyleSheet.create({
  tabWrapper: {
    height: parseSizeHeight(48),
    borderRadius: parseSize(24),
    backgroundColor: Colors.neutrals_100s,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.paddingSmall,
    width: '100%',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    flexDirection: 'row',
  },
  fullItem: {
    flex: 1,
    width: '100%',
    height: parseSizeHeight(37),
  },
  tabItem: {
    flex: 1,
    height: parseSizeHeight(37),
    borderRadius: parseSize(18),
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  textTabItem: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '600',
    color: Colors.neutrals_700,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textActive: {
    color: Colors.neutrals_50,
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
  topItem: {
    marginBottom: -4,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    rowGap: Sizes.spacing_4_Height,
    marginBottom: Sizes.spacing_4_Height,
  },
  requiredText: {
    color: Colors.semantics_Red_02,
  },
  fontTiny: {
    fontSize: Sizes.tiny,
  },
  input: {
    width: parseSizeWidth(163),
  },
  inputFull: {
    width: parseSizeWidth(342),
    borderWidth: 0,
  },
  txtInput: {
    fontSize: parseSizeHeight(16),
    borderWidth: 0,
  },
  wrapGroup: {
    flexDirection: 'row',
    gap: parseSizeWidth(15),
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marginControl: {
    marginBottom: Sizes.spacing_4_Height,
  },
  onToggle: {
    width: 48,
    height: 24,
    borderRadius: 100,
    backgroundColor: Colors.semantics_Green_02,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  offToggle: {
    width: 48,
    height: 24,
    borderRadius: 100,
    backgroundColor: Colors.neutrals_400,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  thumbStyle: {
    width: 20,
    height: 20,
    borderRadius: 17,
  },
  txtChooseType: {
    fontSize: Sizes.text_subtitle2,
    color: Colors.semantics_Grey_01,
  },
  chooseType: {
    // height: parseSizeHeight(50),
    flexDirection: 'row',
    // width: '100%',
    columnGap: Sizes.spacing_3_Width,
    alignItems: 'center',
    flex: 1,
    // justifyContent: 'space-between',
  },
  wrapInputUnit: {
    flexDirection: 'column',
    flex: 1,
    // gap: Sizes.spacing_3_Width,
    rowGap: 5,
    height: parseSizeHeight(71),
  },
  labelInputUnit: {
    color: Colors.neutrals_700,
    fontSize: Sizes.text_tagline1,
  },
  inputUnitContainer: {},
  disabled: {
    backgroundColor: Colors.neutrals_400,
  },
  inputUnit: {
    backgroundColor: Colors.neutrals_200,
    color: Colors.neutrals_700,
    height: parseSizeHeight(50),
    borderWidth: 0,
  },
  selectedContainer: {
    height: parseSizeHeight(40),
    borderWidth: 0,
  },
  descriptionTab: {
    flex: 1,
  },
  hidden: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
  imageContainer: {
    marginVertical: Sizes.spacing_4_Height,
    // paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: Sizes.margin,
    width: '100%',
    // justifyContent: 'space-between',
  },
});

export default styles;
