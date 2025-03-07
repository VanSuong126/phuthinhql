import { StyleSheet } from 'react-native';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';

export default styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    flex: 1,
    gap: parseSizeHeight(20),
  },
  header: {
    height: Sizes.spacing_9_Height,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: Sizes.paddingHeight,
    gap: Sizes.spacing_3_Height,
    backgroundColor: Colors.neutrals_100,
  },
  iconHeader: {
    position: 'absolute',
    right: Sizes.paddingWidth,
    top: parseSizeHeight(26),
    bottom: parseSizeHeight(14),
  },
  txtHeader: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'left',
    color: '#454545',
  },
  body: {
    gap: Sizes.spacing_4_Height,
    backgroundColor: '#f9f9fb',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#dddde3',
    paddingVertical: parseSizeHeight(10),
    paddingHorizontal: Sizes.paddingWidth,
  },
  wrapGroup: {
    flexDirection: 'row',
    gap: parseSizeWidth(15),

  },
  seacrch: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: parseSizeWidth(15),
  },
  twoInputInLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: parseSizeWidth(163),
  },
  inputFull: {
    width: parseSizeWidth(342),
  },
  txtInput: {
    fontSize: parseSizeHeight(16),
  },
  txtInputShip: {
    fontSize: parseSizeHeight(16),
    fontWeight: 'normal',

    textAlign: 'left',
    color: Colors.accent_yellow,
  },
  titleTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '600',
    color: Colors.semantics_Black,
  },
  wrapInfo: {
    gap: parseSizeHeight(10),
  },
  textInfo: {
  fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
  wrapIconClear:{
    position: 'absolute',
    right: parseSizeWidth(24),
    top: parseSizeHeight(0),
    padding: parseSizeWidth(10),
    zIndex: 2,
  },
  wrapTitleForm:{
    flexDirection:'row',
    justifyContent:'space-between',
  }
});
